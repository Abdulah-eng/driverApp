import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const EmergencyAssistanceScreen = ({navigation}: any) => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const emergencyContacts = [
    {id: '1', name: 'Emergency Services', number: '911', icon: 'local-police'},
    {id: '2', name: 'MOVO Safety Line', number: '+1-800-MOVO-SAFE', icon: 'phone'},
    {id: '3', name: 'Trusted Contact', number: '+1 (555) 123-4567', icon: 'person'},
  ];

  const handleEmergencyCall = (number: string) => {
    Alert.alert(
      'Call Emergency',
      `Are you sure you want to call ${number}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Call',
          style: 'destructive',
          onPress: () => {
            Linking.openURL(`tel:${number}`);
          },
        },
      ],
    );
  };

  const handleActivateEmergency = () => {
    Alert.alert(
      'Activate Emergency Assistance',
      'This will notify emergency services and your trusted contacts. Are you sure?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Activate',
          style: 'destructive',
          onPress: () => {
            setIsEmergencyActive(true);
            // In a real app, this would trigger emergency protocols
            Alert.alert(
              'Emergency Activated',
              'Emergency services and your contacts have been notified. Help is on the way.',
            );
          },
        },
      ],
    );
  };

  const handleDeactivateEmergency = () => {
    Alert.alert(
      'Deactivate Emergency',
      'Are you sure you want to deactivate emergency assistance?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Deactivate',
          onPress: () => {
            setIsEmergencyActive(false);
            Alert.alert('Emergency Deactivated', 'Emergency assistance has been turned off.');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Emergency Assistance"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.warningBanner}>
          <Icon name="warning" size={32} color={COLORS.text.primary} />
          <Text style={styles.warningTitle}>Emergency Assistance</Text>
          <Text style={styles.warningText}>
            Use this feature only in genuine emergencies. False alarms may result in penalties.
          </Text>
        </View>

        {!isEmergencyActive ? (
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={handleActivateEmergency}>
            <Icon name="warning" size={48} color={COLORS.text.primary} />
            <Text style={styles.emergencyButtonText}>Activate Emergency</Text>
            <Text style={styles.emergencyButtonSubtext}>
              Tap to notify emergency services
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.activeEmergencyContainer}>
            <View style={styles.activeIndicator}>
              <View style={styles.pulseCircle} />
              <Icon name="warning" size={48} color={COLORS.text.primary} />
            </View>
            <Text style={styles.activeTitle}>Emergency Active</Text>
            <Text style={styles.activeSubtext}>
              Emergency services have been notified. Help is on the way.
            </Text>
            <TouchableOpacity
              style={styles.deactivateButton}
              onPress={handleDeactivateEmergency}>
              <Text style={styles.deactivateButtonText}>Deactivate Emergency</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.contactsSection}>
          <Text style={styles.sectionTitle}>Quick Contact</Text>
          <Text style={styles.sectionSubtitle}>
            Tap to call emergency contacts directly
          </Text>

          {emergencyContacts.map(contact => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactCard}
              onPress={() => handleEmergencyCall(contact.number)}>
              <View style={styles.contactIcon}>
                <Icon name={contact.icon} size={24} color={COLORS.text.primary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
              </View>
              <Icon name="phone" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>What happens when activated?</Text>
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Icon name="check-circle" size={20} color={COLORS.success} />
              <Text style={styles.infoText}>
                Emergency services are immediately notified with your location
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="check-circle" size={20} color={COLORS.success} />
              <Text style={styles.infoText}>
                Your trusted contacts receive an alert with your location
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="check-circle" size={20} color={COLORS.success} />
              <Text style={styles.infoText}>
                Real-time location sharing is enabled automatically
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.safetyTipsButton}
          onPress={() => navigation.navigate('SafetyTips')}>
          <Icon name="info" size={20} color={COLORS.primary} />
          <Text style={styles.safetyTipsText}>View Safety Tips</Text>
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
  warningBanner: {
    backgroundColor: COLORS.error,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  warningTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 12,
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: COLORS.text.primary,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.9,
  },
  emergencyButton: {
    backgroundColor: COLORS.error,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
    minHeight: 200,
    justifyContent: 'center',
  },
  emergencyButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emergencyButtonSubtext: {
    fontSize: 14,
    color: COLORS.text.primary,
    opacity: 0.9,
  },
  activeEmergencyContainer: {
    backgroundColor: COLORS.error,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
    minHeight: 200,
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  pulseCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.error,
    opacity: 0.3,
  },
  activeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  activeSubtext: {
    fontSize: 14,
    color: COLORS.text.primary,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 24,
  },
  deactivateButton: {
    backgroundColor: COLORS.text.primary,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  deactivateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.error,
  },
  contactsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.error + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  infoSection: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  safetyTipsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  safetyTipsText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
  },
});

export default EmergencyAssistanceScreen;
