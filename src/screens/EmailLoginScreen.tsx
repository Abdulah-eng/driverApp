import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../utils/constants';

const EmailLoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(text.length === 0 || emailRegex.test(text));
  };

  const handleContinue = () => {
    if (isValid && email.length > 0) {
      navigation.navigate('OTPVerification', {email});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>

          <Text
            style={[
              styles.title,
              !isValid && email.length > 0 && styles.titleError,
            ]}>
            Please enter a valid email address
            {!isValid && email.length > 0 && '**'}
          </Text>

          <TextInput
            style={[
              styles.input,
              !isValid && email.length > 0 && styles.inputError,
            ]}
            placeholder="example@gmail.com"
            placeholderTextColor={COLORS.text.tertiary}
            value={email}
            onChangeText={validateEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.helperText}>
            We'll never share your email with anyone else.
          </Text>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.backButtonFooter}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.continueButton,
                isValid && email.length > 0 && styles.continueButtonActive,
              ]}
              onPress={handleContinue}
              disabled={!isValid || email.length === 0}>
              <Text
                style={[
                  styles.continueButtonText,
                  isValid &&
                    email.length > 0 &&
                    styles.continueButtonTextActive,
                ]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 24,
    left: 24,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 24,
  },
  titleError: {
    color: COLORS.error,
  },
  input: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text.primary,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 12,
  },
  inputError: {
    borderColor: COLORS.error,
    color: COLORS.error,
  },
  helperText: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    marginBottom: 32,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  backButtonFooter: {
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

export default EmailLoginScreen;
