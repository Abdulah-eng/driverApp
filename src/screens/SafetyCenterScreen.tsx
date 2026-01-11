import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const SafetyCenterScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Safety Center"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.safetyButton, styles.emergencyButton]}
          onPress={() => navigation.navigate('EmergencyAssistance')}>
          <Icon name="warning" size={32} color={COLORS.text.primary} />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonTitle}>Emergency Assistance</Text>
            <Text style={styles.buttonSubtitle}>
              Use only when you need urgent help.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.safetyButton, styles.shareButton]}
          onPress={() => navigation.navigate('ShareLocation')}>
          <Icon name="location-on" size={32} color={COLORS.text.primary} />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonTitle}>Share Real-Time Location</Text>
            <Text style={styles.buttonSubtitle}>
              Send your trip details and current location to someone you trust.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.safetyButton, styles.tipsButton]}
          onPress={() => navigation.navigate('SafetyTips')}>
          <Icon name="info" size={32} color={COLORS.text.primary} />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonTitle}>Safety Tips</Text>
            <Text style={styles.buttonSubtitle}>
              Guidance to keep you and your passengers safe.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.liveChatButton}
          onPress={() => navigation.navigate('LiveChat')}>
          <Icon name="chat-bubble-outline" size={24} color={COLORS.primary} />
          <Text style={styles.liveChatText}>Live Chat Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.supportLink}
          onPress={() => navigation.navigate('HelpSupport')}>
          <Text style={styles.supportLinkText}>Contact MOVO Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.supportLink}
          onPress={() => navigation.navigate('SafetyTips')}>
          <Text style={styles.supportLinkText}>View Safety Tips</Text>
        </TouchableOpacity>
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
    padding: 16,
    paddingBottom: 32,
  },
  safetyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    gap: 16,
  },
  emergencyButton: {
    backgroundColor: COLORS.error,
  },
  shareButton: {
    backgroundColor: COLORS.primary,
  },
  tipsButton: {
    backgroundColor: COLORS.warning,
  },
  buttonContent: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: COLORS.text.primary,
    opacity: 0.9,
    lineHeight: 20,
  },
  liveChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  liveChatText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  supportLink: {
    paddingVertical: 12,
    marginBottom: 8,
  },
  supportLinkText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
});

export default SafetyCenterScreen;
