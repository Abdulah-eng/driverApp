import {supabase} from '../config/supabase';
import {Trip, Earnings, User} from '../types';

class DatabaseService {
  /**
   * Get user profile
   */
  async getUserProfile(userId: string): Promise<User | null> {
    try {
      const {data, error} = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.full_name,
        phone: data.phone,
        email: data.email,
        avatar: data.avatar_url,
        rating: data.rating || 0,
        totalTrips: data.total_trips || 0,
      };
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      return null;
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(
    userId: string,
    updates: {
      name?: string;
      email?: string;
      avatar?: string;
    },
  ): Promise<{error: any}> {
    try {
      const updateData: any = {};
      if (updates.name) updateData.full_name = updates.name;
      if (updates.email) updateData.email = updates.email;
      if (updates.avatar) updateData.avatar_url = updates.avatar;

      const {error} = await supabase
        .from('users')
        .update(updateData)
        .eq('id', userId);

      return {error};
    } catch (error: any) {
      return {error: {message: error.message || 'Update failed'}};
    }
  }

  /**
   * Get trips for a driver
   */
  async getTrips(
    driverId: string,
    filters?: {
      status?: 'pending' | 'active' | 'completed' | 'cancelled';
      limit?: number;
    },
  ): Promise<Trip[]> {
    try {
      let query = supabase
        .from('trips')
        .select('*')
        .eq('driver_id', driverId)
        .order('created_at', {ascending: false});

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const {data, error} = await query;

      if (error) {
        console.error('Error fetching trips:', error);
        return [];
      }

      return (data || []).map(trip => ({
        id: trip.id,
        from: trip.pickup_location,
        to: trip.dropoff_location,
        date: trip.created_at.split('T')[0],
        time: trip.created_at.split('T')[1]?.split('.')[0] || '',
        fare: trip.fare,
        status: trip.status,
        passengerName: trip.passenger_name || undefined,
        passengerPhone: trip.passenger_phone || undefined,
      }));
    } catch (error) {
      console.error('Error in getTrips:', error);
      return [];
    }
  }

  /**
   * Get a single trip
   */
  async getTrip(tripId: string): Promise<Trip | null> {
    try {
      const {data, error} = await supabase
        .from('trips')
        .select('*')
        .eq('id', tripId)
        .single();

      if (error) {
        console.error('Error fetching trip:', error);
        return null;
      }

      return {
        id: data.id,
        from: data.pickup_location,
        to: data.dropoff_location,
        date: data.created_at.split('T')[0],
        time: data.created_at.split('T')[1]?.split('.')[0] || '',
        fare: data.fare,
        status: data.status,
        passengerName: data.passenger_name || undefined,
        passengerPhone: data.passenger_phone || undefined,
      };
    } catch (error) {
      console.error('Error in getTrip:', error);
      return null;
    }
  }

  /**
   * Create a new trip
   */
  async createTrip(tripData: {
    driver_id: string;
    pickup_location: string;
    dropoff_location: string;
    fare: number;
    vehicle_type: string;
    passenger_name?: string;
    passenger_phone?: string;
    pickup_lat?: number;
    pickup_lng?: number;
    dropoff_lat?: number;
    dropoff_lng?: number;
  }): Promise<{trip: Trip | null; error: any}> {
    try {
      const {data, error} = await supabase
        .from('trips')
        .insert({
          ...tripData,
          status: 'pending',
        })
        .select()
        .single();

      if (error) {
        return {trip: null, error};
      }

      return {
        trip: {
          id: data.id,
          from: data.pickup_location,
          to: data.dropoff_location,
          date: data.created_at.split('T')[0],
          time: data.created_at.split('T')[1]?.split('.')[0] || '',
          fare: data.fare,
          status: data.status,
          passengerName: data.passenger_name || undefined,
          passengerPhone: data.passenger_phone || undefined,
        },
        error: null,
      };
    } catch (error: any) {
      return {trip: null, error: {message: error.message || 'Failed to create trip'}};
    }
  }

  /**
   * Update trip status
   */
  async updateTripStatus(
    tripId: string,
    status: 'pending' | 'active' | 'completed' | 'cancelled',
  ): Promise<{error: any}> {
    try {
      const updateData: any = {status};

      if (status === 'active') {
        updateData.started_at = new Date().toISOString();
      } else if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const {error} = await supabase
        .from('trips')
        .update(updateData)
        .eq('id', tripId);

      return {error};
    } catch (error: any) {
      return {error: {message: error.message || 'Failed to update trip'}};
    }
  }

  /**
   * Get earnings for a driver
   */
  async getEarnings(
    driverId: string,
    period?: 'today' | 'week' | 'month' | 'all',
  ): Promise<Earnings> {
    try {
      let query = supabase
        .from('earnings')
        .select('*')
        .eq('driver_id', driverId)
        .order('created_at', {ascending: false});

      // Apply date filters if period is specified
      if (period) {
        const now = new Date();
        let startDate: Date;

        switch (period) {
          case 'today':
            startDate = new Date(now.setHours(0, 0, 0, 0));
            break;
          case 'week':
            startDate = new Date(now.setDate(now.getDate() - 7));
            break;
          case 'month':
            startDate = new Date(now.setMonth(now.getMonth() - 1));
            break;
          default:
            startDate = new Date(0);
        }

        query = query.gte('created_at', startDate.toISOString());
      }

      const {data, error} = await query;

      if (error) {
        console.error('Error fetching earnings:', error);
        return {
          total: 0,
          today: 0,
          thisWeek: 0,
          thisMonth: 0,
          breakdown: {
            trips: 0,
            tips: 0,
            bonuses: 0,
          },
        };
      }

      const earnings = data || [];
      const now = new Date();
      const todayStart = new Date(now.setHours(0, 0, 0, 0));
      const weekStart = new Date(now.setDate(now.getDate() - 7));
      const monthStart = new Date(now.setMonth(now.getMonth() - 1));

      const total = earnings.reduce((sum, e) => sum + e.amount, 0);
      const today = earnings
        .filter(e => new Date(e.created_at) >= todayStart)
        .reduce((sum, e) => sum + e.amount, 0);
      const thisWeek = earnings
        .filter(e => new Date(e.created_at) >= weekStart)
        .reduce((sum, e) => sum + e.amount, 0);
      const thisMonth = earnings
        .filter(e => new Date(e.created_at) >= monthStart)
        .reduce((sum, e) => sum + e.amount, 0);

      const breakdown = {
        trips: earnings.filter(e => e.type === 'trip').reduce((sum, e) => sum + e.amount, 0),
        tips: earnings.filter(e => e.type === 'tip').reduce((sum, e) => sum + e.amount, 0),
        bonuses: earnings.filter(e => e.type === 'bonus').reduce((sum, e) => sum + e.amount, 0),
      };

      return {
        total,
        today,
        thisWeek,
        thisMonth,
        breakdown,
      };
    } catch (error) {
      console.error('Error in getEarnings:', error);
      return {
        total: 0,
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        breakdown: {
          trips: 0,
          tips: 0,
          bonuses: 0,
        },
      };
    }
  }

  /**
   * Create earning record
   */
  async createEarning(earningData: {
    driver_id: string;
    trip_id?: string;
    amount: number;
    type: 'trip' | 'tip' | 'bonus';
    description?: string;
  }): Promise<{error: any}> {
    try {
      const {error} = await supabase.from('earnings').insert(earningData);
      return {error};
    } catch (error: any) {
      return {error: {message: error.message || 'Failed to create earning'}};
    }
  }

  /**
   * Submit rating
   */
  async submitRating(ratingData: {
    trip_id: string;
    driver_id: string;
    rating: number;
    comment?: string;
    tags?: string[];
  }): Promise<{error: any}> {
    try {
      const {error} = await supabase.from('ratings').insert(ratingData);
      return {error};
    } catch (error: any) {
      return {error: {message: error.message || 'Failed to submit rating'}};
    }
  }

  /**
   * Get notifications
   */
  async getNotifications(userId: string, unreadOnly?: boolean): Promise<any[]> {
    try {
      let query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', {ascending: false});

      if (unreadOnly) {
        query = query.eq('read', false);
      }

      const {data, error} = await query;

      if (error) {
        console.error('Error fetching notifications:', error);
        return [];
      }

      return (data || []).map(notif => ({
        id: notif.id,
        type: notif.type,
        title: notif.title,
        message: notif.message,
        time: this.formatTimeAgo(notif.created_at),
        read: notif.read,
        icon: this.getNotificationIcon(notif.type),
      }));
    } catch (error) {
      console.error('Error in getNotifications:', error);
      return [];
    }
  }

  /**
   * Mark notification as read
   */
  async markNotificationAsRead(notificationId: string): Promise<{error: any}> {
    try {
      const {error} = await supabase
        .from('notifications')
        .update({read: true})
        .eq('id', notificationId);

      return {error};
    } catch (error: any) {
      return {error: {message: error.message || 'Failed to mark as read'}};
    }
  }

  /**
   * Mark all notifications as read
   */
  async markAllNotificationsAsRead(userId: string): Promise<{error: any}> {
    try {
      const {error} = await supabase
        .from('notifications')
        .update({read: true})
        .eq('user_id', userId)
        .eq('read', false);

      return {error};
    } catch (error: any) {
      return {error: {message: error.message || 'Failed to mark all as read'}};
    }
  }

  // Helper methods
  private formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  }

  private getNotificationIcon(type: string): string {
    const iconMap: {[key: string]: string} = {
      trip: 'location-on',
      promo: 'card-giftcard',
      receipt: 'receipt',
      feature: 'help-outline',
      default: 'notifications',
    };
    return iconMap[type] || iconMap.default;
  }
}

export const databaseService = new DatabaseService();
