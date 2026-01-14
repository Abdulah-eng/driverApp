import {supabase} from '../config/supabase';
import {Alert} from 'react-native';

export interface AuthUser {
  id: string;
  phone: string;
  email?: string;
  full_name?: string;
}

export interface SignupData {
  phone: string;
  email?: string;
  password: string;
  full_name: string;
}

class AuthService {
  /**
   * Sign up a new user with phone and password
   */
  async signUp(data: SignupData): Promise<{user: AuthUser | null; error: any}> {
    try {
      // First, sign up with Supabase Auth (using phone as identifier)
      const {data: authData, error: authError} = await supabase.auth.signUp({
        phone: data.phone,
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
          },
        },
      });

      if (authError) {
        return {user: null, error: authError};
      }

      if (!authData.user) {
        return {user: null, error: {message: 'Failed to create user'}};
      }

      // Create user profile in users table
      const {error: profileError} = await supabase.from('users').insert({
        id: authData.user.id,
        phone: data.phone,
        email: data.email || null,
        full_name: data.full_name,
        rating: 0,
        total_trips: 0,
      });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        // User is created in auth but profile creation failed
        // This is okay, profile can be created later
      }

      return {
        user: {
          id: authData.user.id,
          phone: data.phone,
          email: data.email,
          full_name: data.full_name,
        },
        error: null,
      };
    } catch (error: any) {
      return {user: null, error: {message: error.message || 'Signup failed'}};
    }
  }

  /**
   * Sign in with phone and password
   */
  async signIn(phone: string, password: string): Promise<{user: AuthUser | null; error: any}> {
    try {
      const {data, error} = await supabase.auth.signInWithPassword({
        phone: phone,
        password: password,
      });

      if (error) {
        return {user: null, error};
      }

      if (!data.user) {
        return {user: null, error: {message: 'No user returned'}};
      }

      // Fetch user profile
      const {data: profile, error: profileError} = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        // PGRST116 means no rows returned, which is okay for new users
        console.error('Error fetching user profile:', profileError);
      }

      return {
        user: {
          id: data.user.id,
          phone: data.user.phone || phone,
          email: data.user.email || profile?.email,
          full_name: profile?.full_name || data.user.user_metadata?.full_name,
        },
        error: null,
      };
    } catch (error: any) {
      return {user: null, error: {message: error.message || 'Login failed'}};
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<{error: any}> {
    try {
      const {error} = await supabase.auth.signOut();
      return {error};
    } catch (error: any) {
      return {error: {message: error.message || 'Sign out failed'}};
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const {
        data: {user},
      } = await supabase.auth.getUser();

      if (!user) {
        return null;
      }

      // Fetch user profile
      const {data: profile} = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      return {
        id: user.id,
        phone: user.phone || '',
        email: user.email || profile?.email,
        full_name: profile?.full_name || user.user_metadata?.full_name,
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Reset password
   */
  async resetPassword(phone: string): Promise<{error: any}> {
    try {
      // Supabase doesn't support phone-based password reset directly
      // We'll use email if available, otherwise show a message
      const {data: userData} = await supabase
        .from('users')
        .select('email')
        .eq('phone', phone)
        .single();

      if (userData?.email) {
        const {error} = await supabase.auth.resetPasswordForEmail(userData.email, {
          redirectTo: 'movodriverapp://reset-password',
        });
        return {error};
      } else {
        return {
          error: {
            message:
              'Password reset requires an email address. Please contact support.',
          },
        };
      }
    } catch (error: any) {
      return {error: {message: error.message || 'Password reset failed'}};
    }
  }

  /**
   * Send OTP to phone number
   */
  async sendOTP(phone: string): Promise<{error: any}> {
    try {
      const {error} = await supabase.auth.signInWithOtp({
        phone: phone,
      });
      return {error};
    } catch (error: any) {
      return {error: {message: error.message || 'Failed to send OTP'}};
    }
  }

  /**
   * Verify OTP
   */
  async verifyOTP(phone: string, token: string): Promise<{user: AuthUser | null; error: any}> {
    try {
      const {data, error} = await supabase.auth.verifyOtp({
        phone: phone,
        token: token,
        type: 'sms',
      });

      if (error) {
        return {user: null, error};
      }

      if (!data.user) {
        return {user: null, error: {message: 'Verification failed'}};
      }

      // Fetch or create user profile
      let {data: profile} = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (!profile) {
        // Create profile if it doesn't exist
        const {data: newProfile} = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            phone: phone,
            full_name: data.user.user_metadata?.full_name || 'User',
            rating: 0,
            total_trips: 0,
          })
          .select()
          .single();
        profile = newProfile;
      }

      return {
        user: {
          id: data.user.id,
          phone: phone,
          email: profile?.email,
          full_name: profile?.full_name,
        },
        error: null,
      };
    } catch (error: any) {
      return {user: null, error: {message: error.message || 'OTP verification failed'}};
    }
  }

  /**
   * Resend OTP
   */
  async resendOTP(phone: string): Promise<{error: any}> {
    return this.sendOTP(phone);
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updates: {full_name?: string; email?: string; avatar_url?: string}): Promise<{error: any}> {
    try {
      const {error} = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId);

      return {error};
    } catch (error: any) {
      return {error: {message: error.message || 'Profile update failed'}};
    }
  }
}

export const authService = new AuthService();
