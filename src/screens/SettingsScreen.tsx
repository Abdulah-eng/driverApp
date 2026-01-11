import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const SettingsScreen = ({navigation}: any) => {
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [appearance, setAppearance] = useState('Light');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    'Arabic',
    'Bengali',
    'English',
    'French',
    'German',
    'Hindi',
    'Italian',
    'Japanese',
    'Javanese',
    'Korean',
    'Marathi',
    'Portuguese',
    'Russian',
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Setting"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manage membership</Text>
          <View style={styles.membershipCard}>
            <Text style={styles.membershipName}>MOVO Pass</Text>
            <Text style={styles.membershipStatus}>Status: active</Text>
            <Text style={styles.membershipDescription}>
              Your membership is currently active and in good standing.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language & Region</Text>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setShowLanguageModal(true)}>
            <Text style={styles.settingItemText}>Language</Text>
            <View style={styles.settingItemRight}>
              <Text style={styles.settingItemValue}>{selectedLanguage}</Text>
              <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.appearanceButtons}>
            {['Light', 'Dark', 'Device'].map(theme => (
              <TouchableOpacity
                key={theme}
                style={[
                  styles.appearanceButton,
                  appearance === theme && styles.appearanceButtonActive,
                ]}
                onPress={() => setAppearance(theme)}>
                <Text
                  style={[
                    styles.appearanceButtonText,
                    appearance === theme && styles.appearanceButtonTextActive,
                  ]}>
                  {theme}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessibility</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Text style={styles.settingItemText}>Haptic feedback</Text>
              <Text style={styles.settingItemSubtext}>Vibrate on interactions</Text>
            </View>
            <Switch
              value={hapticFeedback}
              onValueChange={setHapticFeedback}
              trackColor={{false: COLORS.border, true: COLORS.primary}}
              thumbColor={COLORS.text.primary}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Text style={styles.settingItemText}>High contrast</Text>
              <Text style={styles.settingItemSubtext}>off</Text>
            </View>
            <Switch
              value={highContrast}
              onValueChange={setHighContrast}
              trackColor={{false: COLORS.border, true: COLORS.primary}}
              thumbColor={COLORS.text.primary}
            />
          </View>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingItemText}>Text size</Text>
            <View style={styles.settingItemRight}>
              <Text style={styles.settingItemValue}>Default</Text>
              <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingItemText}>Location permissions</Text>
            <View style={styles.settingItemRight}>
              <Text style={styles.settingItemValue}>While using the app</Text>
              <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingItemText}>Data & privacy</Text>
            <View style={styles.settingItemRight}>
              <Text style={styles.settingItemValue}>Export or delete your data</Text>
              <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingItemText}>Terms of service</Text>
            <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingItemText}>Privacy Policy</Text>
            <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingItemText}>Open Source Licenses</Text>
            <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('PhoneVerification')}>
          <Icon name="logout" size={20} color={COLORS.error} />
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 2.5.0</Text>
      </ScrollView>

      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <Icon name="close" size={24} color={COLORS.text.primary} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {languages.map(language => (
                <TouchableOpacity
                  key={language}
                  style={styles.languageItem}
                  onPress={() => {
                    setSelectedLanguage(language);
                    setShowLanguageModal(false);
                  }}>
                  <Text
                    style={[
                      styles.languageText,
                      selectedLanguage === language && styles.languageTextSelected,
                    ]}>
                    {language}
                  </Text>
                  {selectedLanguage === language && (
                    <Icon name="check" size={20} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  membershipCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
  },
  membershipName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  membershipStatus: {
    fontSize: 14,
    color: COLORS.success,
    marginBottom: 8,
  },
  membershipDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingItemLeft: {
    flex: 1,
  },
  settingItemText: {
    fontSize: 16,
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  settingItemSubtext: {
    fontSize: 14,
    color: COLORS.text.tertiary,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingItemValue: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  appearanceButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  appearanceButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  appearanceButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '20',
  },
  appearanceButtonText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  appearanceButtonTextActive: {
    color: COLORS.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.error,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    marginTop: 16,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    textAlign: 'center',
    marginTop: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  languageText: {
    fontSize: 16,
    color: COLORS.text.primary,
  },
  languageTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default SettingsScreen;
