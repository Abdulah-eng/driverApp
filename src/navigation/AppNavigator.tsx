import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import TripsScreen from '../screens/TripsScreen';
import EarningsScreen from '../screens/EarningsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ActiveTripScreen from '../screens/ActiveTripScreen';
import TripRequestScreen from '../screens/TripRequestScreen';
import TripDetailsScreen from '../screens/TripDetailsScreen';
import RatingScreen from '../screens/RatingScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import PaymentsManagementScreen from '../screens/PaymentsManagementScreen';
import WalletScreen from '../screens/WalletScreen';
import VehicleManagementScreen from '../screens/VehicleManagementScreen';
import DocumentUploadScreen from '../screens/DocumentUploadScreen';
import ReferralScreen from '../screens/ReferralScreen';
import AboutScreen from '../screens/AboutScreen';
// New screens based on Figma
import PhoneVerificationScreen from '../screens/PhoneVerificationScreen';
import EmailLoginScreen from '../screens/EmailLoginScreen';
import TermsAcceptanceScreen from '../screens/TermsAcceptanceScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import MapHomeScreen from '../screens/MapHomeScreen';
import RideSelectionScreen from '../screens/RideSelectionScreen';
import AssigningDriverScreen from '../screens/AssigningDriverScreen';
import TripCompletionScreen from '../screens/TripCompletionScreen';
import TripReceiptScreen from '../screens/TripReceiptScreen';
import LiveChatScreen from '../screens/LiveChatScreen';
import SafetyCenterScreen from '../screens/SafetyCenterScreen';
import ScheduleRideScreen from '../screens/ScheduleRideScreen';
import CargoRequirementsScreen from '../screens/CargoRequirementsScreen';
import MOVOPassScreen from '../screens/MOVOPassScreen';
import VehicleInfoScreen from '../screens/VehicleInfoScreen';
import HelpArticleScreen from '../screens/HelpArticleScreen';
import SafetyTipsScreen from '../screens/SafetyTipsScreen';
import AddCryptoAddressScreen from '../screens/AddCryptoAddressScreen';
import PlanRouteScreen from '../screens/PlanRouteScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Trips') {
            iconName = 'history';
          } else if (route.name === 'Promo') {
            iconName = 'local-offer';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else {
            iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#1E2339',
          borderTopColor: '#2A2F4A',
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={MapHomeScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Promo" component={ReferralScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* Onboarding & Auth Screens */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
      <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="TermsAcceptance" component={TermsAcceptanceScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      
      {/* Main App Screens */}
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="PlanRoute" component={PlanRouteScreen} />
      <Stack.Screen name="RideSelection" component={RideSelectionScreen} />
      <Stack.Screen name="AssigningDriver" component={AssigningDriverScreen} />
      <Stack.Screen name="ActiveTrip" component={ActiveTripScreen} />
      <Stack.Screen name="TripRequest" component={TripRequestScreen} />
      <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
      <Stack.Screen name="Rating" component={RatingScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="LiveChat" component={LiveChatScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="TripCompletion" component={TripCompletionScreen} />
      <Stack.Screen name="TripReceipt" component={TripReceiptScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="PaymentsManagement" component={PaymentsManagementScreen} />
      <Stack.Screen name="AddCryptoAddress" component={AddCryptoAddressScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="VehicleManagement" component={VehicleManagementScreen} />
      <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} />
      <Stack.Screen name="Referral" component={ReferralScreen} />
      <Stack.Screen name="SafetyCenter" component={SafetyCenterScreen} />
      <Stack.Screen name="ScheduleRide" component={ScheduleRideScreen} />
      <Stack.Screen name="CargoRequirements" component={CargoRequirementsScreen} />
      <Stack.Screen name="MOVOPass" component={MOVOPassScreen} />
      <Stack.Screen name="VehicleInfo" component={VehicleInfoScreen} />
      <Stack.Screen name="HelpArticle" component={HelpArticleScreen} />
      <Stack.Screen name="SafetyTips" component={SafetyTipsScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
