export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  rating: number;
  totalTrips: number;
}

export interface Trip {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  fare: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  passengerName?: string;
  passengerPhone?: string;
}

export interface Earnings {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  breakdown: {
    trips: number;
    tips: number;
    bonuses: number;
  };
}

export interface NavigationParamList {
  Login: undefined;
  MainTabs: undefined;
  Home: undefined;
  Trips: undefined;
  Earnings: undefined;
  Profile: undefined;
}
