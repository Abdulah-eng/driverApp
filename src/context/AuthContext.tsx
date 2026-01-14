import React, {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {authService, AuthUser} from '../services/authService';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (phone: string, password: string) => Promise<{error: any}>;
  signUp: (data: {
    phone: string;
    email?: string;
    password: string;
    full_name: string;
  }) => Promise<{error: any}>;
  signOut: () => Promise<void>;
  updateUser: (user: AuthUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (phone: string, password: string) => {
    try {
      const {user: signedInUser, error} = await authService.signIn(phone, password);
      if (error) {
        return {error};
      }
      setUser(signedInUser);
      return {error: null};
    } catch (error: any) {
      return {error: {message: error.message || 'Sign in failed'}};
    }
  };

  const signUp = async (data: {
    phone: string;
    email?: string;
    password: string;
    full_name: string;
  }) => {
    try {
      const {user: newUser, error} = await authService.signUp(data);
      if (error) {
        return {error};
      }
      setUser(newUser);
      return {error: null};
    } catch (error: any) {
      return {error: {message: error.message || 'Sign up failed'}};
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateUser = (updatedUser: AuthUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        updateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
