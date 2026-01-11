// MOVO App Design System - Based on Figma
export const COLORS = {
  // Primary Colors
  primary: '#007AFF', // Blue accent
  primaryDark: '#0051D5',
  
  // Background Colors (Dark Theme)
  background: '#0A0E27', // Dark blue background
  backgroundSecondary: '#1A1F3A',
  surface: '#1E2339',
  surfaceLight: '#252B45',
  
  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#ECEDEE',
    tertiary: '#B0B3C0',
    disabled: '#6B7280',
  },
  
  // Status Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Vehicle Type Colors
  movoPlus: '#007AFF', // Blue
  movoPrime: '#FFD700', // Gold
  movoMax: '#E91E63', // Pink
  movoEco: '#4CAF50', // Green
  movoSafe: '#2196F3', // Light Blue
  movoCargo: '#FF9800', // Orange
  movoAir: '#9C27B0', // Purple
  
  // UI Elements
  border: '#2A2F4A',
  divider: '#1E2339',
  overlay: 'rgba(0, 0, 0, 0.7)',
  
  // Map Colors
  mapBackground: '#0A0E27',
  routeLine: '#FFFFFF',
  routeLineActive: '#4CAF50',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 999,
};

export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'Plus Jakarta Sans',
    bold: 'Plus Jakarta Sans Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    h1: 68, // Large headings from Figma
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};
