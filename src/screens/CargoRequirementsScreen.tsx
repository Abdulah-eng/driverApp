import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const CargoRequirementsScreen = ({navigation}: any) => {
  const [deliveryProtection, setDeliveryProtection] = useState(false);
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

  const pickup = {
    street: '',
    details: '',
    phone: '',
  };

  const delivery = {
    street: '',
    details: '',
    phone: '',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Cargo Requirement"
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
          <Text style={styles.sectionTitle}>Pickup point</Text>
          <TextInput
            style={styles.input}
            placeholder="Street, building"
            placeholderTextColor={COLORS.text.tertiary}
            value={pickup.street}
            onChangeText={text => (pickup.street = text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Pickup location details"
            placeholderTextColor={COLORS.text.tertiary}
            value={pickup.details}
            onChangeText={text => (pickup.details = text)}
            multiline
          />
          <View style={styles.phoneInput}>
            <TouchableOpacity style={styles.countryCodeButton}>
              <Text style={styles.flag}>🇬🇪</Text>
              <Icon name="arrow-drop-down" size={20} color={COLORS.text.primary} />
            </TouchableOpacity>
            <TextInput
              style={styles.phoneInputField}
              placeholder="Sender's phone"
              placeholderTextColor={COLORS.text.tertiary}
              value={pickup.phone}
              onChangeText={text => (pickup.phone = text)}
              keyboardType="phone-pad"
            />
            <TouchableOpacity>
              <Icon name="contacts" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery address</Text>
          <TextInput
            style={styles.input}
            placeholder="Street, building"
            placeholderTextColor={COLORS.text.tertiary}
            value={delivery.street}
            onChangeText={text => (delivery.street = text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Delivery location details"
            placeholderTextColor={COLORS.text.tertiary}
            value={delivery.details}
            onChangeText={text => (delivery.details = text)}
            multiline
          />
          <View style={styles.phoneInput}>
            <TouchableOpacity style={styles.countryCodeButton}>
              <Text style={styles.flag}>🇬🇪</Text>
              <Icon name="arrow-drop-down" size={20} color={COLORS.text.primary} />
            </TouchableOpacity>
            <TextInput
              style={styles.phoneInputField}
              placeholder="Recipient phone"
              placeholderTextColor={COLORS.text.tertiary}
              value={delivery.phone}
              onChangeText={text => (delivery.phone = text)}
              keyboardType="phone-pad"
            />
            <TouchableOpacity>
              <Icon name="contacts" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <Icon name="info-outline" size={20} color={COLORS.text.tertiary} />
              <Text style={styles.sectionTitle}>Delivery protection</Text>
            </View>
            <Switch
              value={deliveryProtection}
              onValueChange={setDeliveryProtection}
              trackColor={{false: COLORS.border, true: COLORS.primary}}
              thumbColor={COLORS.text.primary}
            />
          </View>
          <Text style={styles.protectionText}>
            Add a security code for delivery
          </Text>
          {deliveryProtection && (
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => setShowHowItWorks(true)}>
              <Text style={styles.infoButtonText}>How it works</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderLeft}>
            <Icon name="info-outline" size={20} color={COLORS.text.tertiary} />
            <Text style={styles.sectionTitle}>Parcel details</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Weight (Required)"
            placeholderTextColor={COLORS.text.tertiary}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <Text style={styles.helperText}>Maximum weight is 1000kg</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholder="Notes for courier (Optional)"
            placeholderTextColor={COLORS.text.tertiary}
            value={notes}
            onChangeText={setNotes}
            multiline
            maxLength={300}
          />
          <Text style={styles.characterCount}>{notes.length}/300</Text>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            // Save cargo requirements
          }}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => navigation.navigate('RideSelection', {cargo: true})}>
          <Text style={styles.confirmButtonText}>Confirm ride</Text>
        </TouchableOpacity>

        <Text style={styles.lockedText}>
          Price and arrival time are locked
        </Text>
      </ScrollView>

      <Modal
        visible={showHowItWorks}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowHowItWorks(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Icon name="info-outline" size={24} color={COLORS.primary} />
              <Text style={styles.modalTitle}>How it works</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalText}>
                1. We send a 4-digit code to you and the recipient via Sms when
                the courier leaves
              </Text>
              <Text style={styles.modalText}>
                2. The recipient must give this code to the courier to receive
                the package
              </Text>
              <Text style={styles.modalText}>
                3. You'll receive a confirmation once delivery is finished
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowHowItWorks(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showGuidelines}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGuidelines(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Icon name="info-outline" size={24} color={COLORS.primary} />
              <Text style={styles.modalTitle}>Delivery Guidelines</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalText}>1. Parcel value ≤ PKR 14 000</Text>
              <Text style={styles.modalText}>
                2. Weight & size within limits
              </Text>
              <Text style={styles.modalText}>
                3. Recipient knows—share the details
              </Text>
              <Text style={styles.modalText}>
                4. Check courier name & photo in app
              </Text>
              <Text style={styles.modalText}>
                5. No banned or illegal items
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowGuidelines(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
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
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 12,
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flag: {
    fontSize: 24,
  },
  phoneInputField: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  protectionText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  infoButton: {
    paddingVertical: 8,
  },
  infoButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    marginBottom: 12,
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    textAlign: 'right',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  lockedText: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  modalBody: {
    marginBottom: 24,
    gap: 16,
  },
  modalText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
});

export default CargoRequirementsScreen;
