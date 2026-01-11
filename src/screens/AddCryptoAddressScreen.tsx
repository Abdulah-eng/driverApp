import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const AddCryptoAddressScreen = ({navigation}: any) => {
  const [label, setLabel] = useState('Binance Wallet');
  const [network, setNetwork] = useState('Binance-Chain BSC');
  const [address, setAddress] = useState(
    '45sdfa5f46s46dfsad655ff4asdf',
  );

  const networks = [
    'Binance-Chain BSC',
    'Ethereum',
    'Polygon',
    'Solana',
    'Bitcoin',
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Add Crypto address"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Label (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter label"
            placeholderTextColor={COLORS.text.tertiary}
            value={label}
            onChangeText={setLabel}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Choose a Network</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{network}</Text>
            <Icon name="arrow-drop-down" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter your Wallet Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter wallet address"
            placeholderTextColor={COLORS.text.tertiary}
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </View>

        <Text style={styles.infoText}>
          Ensure your wallet supports USDT deposits.
        </Text>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            // Save crypto address
            navigation.goBack();
          }}>
          <Text style={styles.saveButtonText}>Save Wallet</Text>
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
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text.primary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.text.primary,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 32,
    lineHeight: 20,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
});

export default AddCryptoAddressScreen;
