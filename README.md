# Driver App

A React Native mobile application for drivers, built with TypeScript.

## Features

- 🚗 Driver dashboard with online/offline toggle
- 📊 Trip management and history
- 💰 Earnings tracking
- 👤 User profile management
- 🔐 Authentication (to be implemented)

## Getting Started

### Prerequisites

- Node.js (>=16)
- React Native development environment set up
  - For iOS: Xcode and CocoaPods
  - For Android: Android Studio and Android SDK

### Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

3. Run the app:

For iOS:
```bash
npm run ios
```

For Android:
```bash
npm run android
```

## Project Structure

```
driverApp/
├── src/
│   ├── navigation/      # Navigation configuration
│   ├── screens/         # Screen components
│   ├── components/      # Reusable components
│   ├── utils/           # Utility functions
│   └── types/           # TypeScript type definitions
├── App.tsx              # Main app component
└── package.json        # Dependencies and scripts
```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm test` - Run tests
- `npm run lint` - Run linter

## Technologies Used

- React Native
- TypeScript
- React Navigation
- React Native Vector Icons
- React Native Safe Area Context
- Supabase (Authentication & Database)
- React Native Config (Environment Variables)

## Backend Integration

This app is fully integrated with **Supabase** for:
- ✅ Authentication (Phone/OTP and Email/Password)
- ✅ Database operations (PostgreSQL)
- ✅ Real-time data synchronization
- ✅ Row Level Security (RLS)

### Quick Setup

1. **Install dependencies:**
   ```bash
   npm install
   cd ios && pod install && cd ..  # For iOS
   ```

2. **Set up Supabase:**
   - Create a project at [Supabase](https://supabase.com)
   - Get your project URL and anon key
   - Create `.env` file with your credentials:
     ```env
     SUPABASE_URL=your_project_url
     SUPABASE_ANON_KEY=your_anon_key
     ```

3. **Set up database:**
   - Go to Supabase SQL Editor
   - Run the SQL from `supabase/schema.sql`

4. **Run the app:**
   ```bash
   npm start
   npm run android  # or npm run ios
   ```

For detailed setup instructions, see:
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Complete Supabase setup guide
- [ENV_SETUP.md](./ENV_SETUP.md) - Environment variables guide
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Implementation details

## Next Steps

- [x] Implement authentication flow ✅
- [x] Connect to backend API ✅
- [ ] Add map integration for trip tracking
- [ ] Add push notifications
- [ ] Implement real-time trip updates
- [ ] Add payment integration
