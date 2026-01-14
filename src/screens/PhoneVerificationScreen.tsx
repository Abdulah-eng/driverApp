import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../utils/constants';
import {authService} from '../services/authService';

const PhoneVerificationScreen = ({navigation}: any) => {
  const [countryCode, setCountryCode] = useState('+995');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const countries = [
    {code: '+995', flag: '🇬🇪', name: 'Georgia'},
    {code: '+1', flag: '🇺🇸', name: 'United States'},
    {code: '+44', flag: '🇬🇧', name: 'United Kingdom'},
  ];

  const handleContinue = async () => {
    if (phoneNumber.length < 9) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber}`.replace(/\s/g, '');

    setIsLoading(true);
    try {
      const {error} = await authService.sendOTP(fullPhoneNumber);
      
      if (error) {
        Alert.alert('Error', error.message || 'Failed to send OTP. Please try again.');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigation.navigate('OTPVerification', {
        phoneNumber: fullPhoneNumber,
      });
    } catch (err: any) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>MOVO</Text>
            </View>

            <Text style={styles.title}>Enter Your Phone Number</Text>

            <View style={styles.phoneInputContainer}>
              <TouchableOpacity
                style={styles.countryCodeButton}
                onPress={() => setShowCountryPicker(!showCountryPicker)}>
                <Text style={styles.flag}>🇬🇪</Text>
                <Text style={styles.countryCode}>{countryCode}</Text>
                <Icon name="arrow-drop-down" size={20} color={COLORS.text.primary} />
              </TouchableOpacity>

              <TextInput
                style={styles.phoneInput}
                placeholder="Mobile Number"
                placeholderTextColor={COLORS.text.tertiary}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.continueButton,
                phoneNumber.length >= 9 && styles.continueButtonActive,
                isLoading && styles.continueButtonDisabled,
              ]}
              onPress={handleContinue}
              disabled={phoneNumber.length < 9 || isLoading}>
              {isLoading ? (
                <ActivityIndicator color={COLORS.background} />
              ) : (
                <Text
                  style={[
                    styles.continueButtonText,
                    phoneNumber.length >= 9 && styles.continueButtonTextActive,
                  ]}>
                  Continue
                </Text>
              )}
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By continuing, you agree to MOVO Terms of Service and Privacy
              Policy
            </Text>

            <Text style={styles.orText}>or</Text>

            <TouchableOpacity style={styles.socialButton}>
              <Icon name="google" size={20} color="#000" />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Icon name="email" size={20} color="#000" />
              <Text style={styles.socialButtonText}>Continue with Email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
              <Icon name="apple" size={20} color="#FFF" />
              <Text style={[styles.socialButtonText, styles.appleButtonText]}>
                Continue with Apple
              </Text>
            </TouchableOpacity>

            <Text style={styles.privacyText}>
              We use your phone number only for login and ride updates. Your
              personal information is always protected.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 32,
    textAlign: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  flag: {
    fontSize: 24,
  },
  countryCode: {
    fontSize: 16,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  continueButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonActive: {
    backgroundColor: COLORS.text.primary,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.tertiary,
  },
  continueButtonTextActive: {
    color: COLORS.background,
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  termsText: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  orText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.text.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  appleButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.background,
  },
  appleButtonText: {
    color: COLORS.text.primary,
  },
  privacyText: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 18,
  },
});

export default PhoneVerificationScreen;
