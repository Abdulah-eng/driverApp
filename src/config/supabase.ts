import {createClient} from '@supabase/supabase-js';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get Supabase URL and key from environment variables
// Fallback to empty strings if not set (will show warning)
const supabaseUrl = (Config.SUPABASE_URL as string) || '';
const supabaseAnonKey = (Config.SUPABASE_ANON_KEY as string) || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials not found. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file',
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types (will be generated from Supabase schema)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          phone: string;
          email: string | null;
          full_name: string;
          avatar_url: string | null;
          rating: number;
          total_trips: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          phone: string;
          email?: string | null;
          full_name: string;
          avatar_url?: string | null;
          rating?: number;
          total_trips?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          phone?: string;
          email?: string | null;
          full_name?: string;
          avatar_url?: string | null;
          rating?: number;
          total_trips?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      trips: {
        Row: {
          id: string;
          driver_id: string;
          passenger_name: string | null;
          passenger_phone: string | null;
          pickup_location: string;
          dropoff_location: string;
          pickup_lat: number | null;
          pickup_lng: number | null;
          dropoff_lat: number | null;
          dropoff_lng: number | null;
          fare: number;
          vehicle_type: string;
          status: 'pending' | 'active' | 'completed' | 'cancelled';
          scheduled_at: string | null;
          started_at: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          driver_id: string;
          passenger_name?: string | null;
          passenger_phone?: string | null;
          pickup_location: string;
          dropoff_location: string;
          pickup_lat?: number | null;
          pickup_lng?: number | null;
          dropoff_lat?: number | null;
          dropoff_lng?: number | null;
          fare: number;
          vehicle_type: string;
          status?: 'pending' | 'active' | 'completed' | 'cancelled';
          scheduled_at?: string | null;
          started_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          driver_id?: string;
          passenger_name?: string | null;
          passenger_phone?: string | null;
          pickup_location?: string;
          dropoff_location?: string;
          pickup_lat?: number | null;
          pickup_lng?: number | null;
          dropoff_lat?: number | null;
          dropoff_lng?: number | null;
          fare?: number;
          vehicle_type?: string;
          status?: 'pending' | 'active' | 'completed' | 'cancelled';
          scheduled_at?: string | null;
          started_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      earnings: {
        Row: {
          id: string;
          driver_id: string;
          trip_id: string | null;
          amount: number;
          type: 'trip' | 'tip' | 'bonus';
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          driver_id: string;
          trip_id?: string | null;
          amount: number;
          type: 'trip' | 'tip' | 'bonus';
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          driver_id?: string;
          trip_id?: string | null;
          amount?: number;
          type?: 'trip' | 'tip' | 'bonus';
          description?: string | null;
          created_at?: string;
        };
      };
      ratings: {
        Row: {
          id: string;
          trip_id: string;
          driver_id: string;
          rating: number;
          comment: string | null;
          tags: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          trip_id: string;
          driver_id: string;
          rating: number;
          comment?: string | null;
          tags?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          trip_id?: string;
          driver_id?: string;
          rating?: number;
          comment?: string | null;
          tags?: string[] | null;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: string;
          read?: boolean;
          created_at?: string;
        };
      };
    };
  };
};
