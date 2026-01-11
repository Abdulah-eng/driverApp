import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../utils/constants';

const OTPVerificationScreen = ({route, navigation}: any) => {
  const phoneNumber = route?.params?.phoneNumber || route?.params?.email || '+1234567890';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [isValid, setIsValid] = useState(true);

  const isEmail = route?.params?.email ? true : false;

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setIsValid(true);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length !== 6) {
      return;
    }
    // Simulate verification - correct code is 967425
    if (code === '967425') {
      navigation.navigate('TermsAcceptance');
    } else {
      setIsValid(false);
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setIsValid(true);
    // TODO: Implement resend OTP
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {isEmail
            ? `Enter the 6-digit code we sent to: ${phoneNumber}`
            : `We sent a 6-digit code to ${phoneNumber}.`}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => {
            const hasError = otp.join('').length === 6 && !isValid;
            return (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={[
                  styles.otpInput,
                  hasError && styles.otpInputError,
                ]}
                value={digit}
                onChangeText={text => handleOtpChange(text, index)}
                onKeyPress={({nativeEvent}) =>
                  handleKeyPress(nativeEvent.key, index)
                }
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            );
          })}
        </View>

        {otp.join('').length === 6 && !isValid && (
          <Text style={styles.errorText}>Incorrect code. Try again.</Text>
        )}

        <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
          <Text style={styles.resendText}>Resend code</Text>
        </TouchableOpacity>

        <Text style={styles.helperText}>
          Didn't get a code? It may take a moment to arrive.
        </Text>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.continueButton,
              otp.join('').length === 6 && isValid && styles.continueButtonActive,
            ]}
            onPress={handleVerify}
            disabled={otp.join('').length !== 6 || !isValid}>
            <Text
              style={[
                styles.continueButtonText,
                otp.join('').length === 6 &&
                  isValid &&
                  styles.continueButtonTextActive,
              ]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  otpInput: {
    flex: 1,
    height: 60,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    backgroundColor: COLORS.surface,
  },
  otpInputError: {
    borderColor: COLORS.error,
    color: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  resendButton: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  resendText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  helperText: {
    color: COLORS.text.tertiary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  backButton: {
    padding: 8,
  },
  continueButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
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
});

export default OTPVerificationScreen;
