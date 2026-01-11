import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../utils/constants';

const WelcomeScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to MOVO!</Text>
        <Text style={styles.subtitle}>Ready to ride?</Text>
        <Text style={styles.description}>Go to Map & Start Riding</Text>

        <Text style={styles.privacyText}>
          MOVO never shares your data without consent. You're always in control,
          you can review, download, or delete your data anytime from your
          profile settings.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.buttonText}>Go to Map & Start Riding</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: COLORS.text.secondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: COLORS.text.tertiary,
    marginBottom: 48,
    textAlign: 'center',
  },
  privacyText: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: COLORS.text.primary,
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.background,
  },
});

export default WelcomeScreen;
