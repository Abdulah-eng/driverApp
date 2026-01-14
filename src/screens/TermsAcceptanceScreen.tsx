import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../utils/constants';

const TermsAcceptanceScreen = ({navigation}: any) => {
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    if (agreed) {
      navigation.navigate('Welcome');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Accept Our Terms and Privacy Policy</Text>
          <Text style={styles.subtitle}>Before you continue</Text>

          <Text style={styles.mainText}>
            To use MOVO, you need to agree to our Terms of Service and Privacy
            Policy. These explain how we collect, use, and protect your personal
            information, including your phone number and location data.
          </Text>

          <Text style={styles.privacyText}>
            MOVO never shares your data without consent. You're always in
            control, you can review, download, or delete your data anytime from
            your profile settings.
          </Text>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAgreed(!agreed)}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && (
                <Icon name="check" size={20} color={COLORS.background} />
              )}
            </View>
            <Text style={styles.checkboxText}>
              I agree to the terms and conditions.
            </Text>
          </TouchableOpacity>

          <Text style={styles.acceptanceText}>
            Accepting means you understand how MOVO keeps your rides secure, your
            payments private, and your account safe.
          </Text>

          <TouchableOpacity
            style={[
              styles.continueButton,
              agreed && styles.continueButtonActive,
            ]}
            onPress={handleContinue}
            disabled={!agreed}>
            <Text
              style={[
                styles.continueButtonText,
                agreed && styles.continueButtonTextActive,
              ]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: 24,
  },
  mainText: {
    fontSize: 16,
    color: COLORS.text.secondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  privacyText: {
    fontSize: 16,
    color: COLORS.text.secondary,
    lineHeight: 24,
    marginBottom: 32,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 6,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.text.primary,
    borderColor: COLORS.text.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.primary,
    lineHeight: 24,
  },
  acceptanceText: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    lineHeight: 20,
    marginBottom: 32,
  },
  continueButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
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

export default TermsAcceptanceScreen;
