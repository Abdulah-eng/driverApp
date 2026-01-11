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
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const PaymentMethodsScreen = ({navigation}: any) => {
  const [selectedMethod, setSelectedMethod] = useState('wallet');
  const walletBalance = 15.0;

  const paymentMethods = [
    {id: 'visa1', type: 'VISA', number: '5555', icon: 'credit-card'},
    {id: 'mastercard1', type: 'Mastercard', number: '5555', icon: 'credit-card'},
    {id: 'apple', type: 'Apple Pay', number: '5555', icon: 'apple'},
    {id: 'google', type: 'Google Pay', number: '5555', icon: 'google'},
    {id: 'mastercard2', type: 'Mastercard', number: '5555', icon: 'credit-card'},
    {id: 'stripe', type: 'Stripe', number: '', icon: 'payment'},
    {id: 'paypal', type: 'PayPal', number: '', icon: 'payments'},
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Payment"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.walletCard}>
          <Text style={styles.walletLabel}>Wallet balance</Text>
          <Text style={styles.walletAmount}>${walletBalance.toFixed(2)}</Text>
          <Text style={styles.walletDescription}>
            Credits from refunds and promotions
          </Text>
          <TouchableOpacity style={styles.addFundsButton}>
            <Text style={styles.addFundsText}>Add Funds</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cashSection}>
          <View style={styles.paymentMethodRow}>
            <View style={styles.paymentMethodLeft}>
              <Icon name="money" size={24} color={COLORS.primary} />
              <Text style={styles.paymentMethodName}>Cash</Text>
            </View>
            <View style={styles.radioButton}>
              {selectedMethod === 'cash' && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </View>
          <Text style={styles.cashDescription}>Always available</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Other Payment Methods</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('PaymentsManagement')}>
              <Text style={styles.manageText}>Manage</Text>
            </TouchableOpacity>
          </View>

          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={styles.paymentMethodRow}
              onPress={() => setSelectedMethod(method.id)}>
              <View style={styles.paymentMethodLeft}>
                <Icon name={method.icon} size={24} color={COLORS.primary} />
                <View style={styles.paymentMethodInfo}>
                  <Text style={styles.paymentMethodName}>{method.type}</Text>
                  {method.number && (
                    <Text style={styles.paymentMethodNumber}>
                      ....{method.number}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.radioButton}>
                {selectedMethod === method.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
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
    padding: 16,
    paddingBottom: 32,
  },
  walletCard: {
    backgroundColor: COLORS.success,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  walletLabel: {
    fontSize: 14,
    color: COLORS.text.primary,
    opacity: 0.9,
    marginBottom: 8,
  },
  walletAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  walletDescription: {
    fontSize: 12,
    color: COLORS.text.primary,
    opacity: 0.8,
    marginBottom: 16,
  },
  addFundsButton: {
    backgroundColor: COLORS.text.primary,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  addFundsText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.success,
  },
  cashSection: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  manageText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  paymentMethodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  paymentMethodNumber: {
    fontSize: 14,
    color: COLORS.text.tertiary,
  },
  cashDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 8,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
});

export default PaymentMethodsScreen;
