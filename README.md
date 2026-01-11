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

## Next Steps

- [ ] Implement authentication flow
- [ ] Add map integration for trip tracking
- [ ] Connect to backend API
- [ ] Add push notifications
- [ ] Implement real-time trip updates
- [ ] Add payment integration
