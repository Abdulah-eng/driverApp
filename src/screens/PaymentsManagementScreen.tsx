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

const PaymentsManagementScreen = ({navigation}: any) => {
  const addOptions = [
    {
      id: 'bank',
      title: 'Add Bank Account',
      icon: 'account-balance',
      onPress: () => {},
    },
    {
      id: 'card',
      title: 'Add credit/debit card',
      icon: 'credit-card',
      onPress: () => {},
    },
    {
      id: 'crypto',
      title: 'Add Crypto address',
      icon: 'currency-bitcoin',
      onPress: () => navigation.navigate('AddCryptoAddress'),
    },
  ];

  const paymentMethods = [
    {
      id: '1',
      type: 'email',
      name: 'mo***34**@gmail.com',
      action: 'Remove',
      actionColor: COLORS.error,
    },
    {
      id: '2',
      type: 'visa',
      name: 'VISA',
      number: '5555',
      action: 'Remove',
      actionColor: COLORS.error,
    },
    {
      id: '3',
      type: 'mastercard',
      name: 'Mastercard',
      number: '5555',
      action: 'Remove',
      actionColor: COLORS.error,
    },
    {
      id: '4',
      type: 'apple',
      name: 'Apple Pay',
      number: '5555',
      action: 'Connect',
      actionColor: COLORS.primary,
    },
    {
      id: '5',
      type: 'google',
      name: 'Google Pay',
      number: '5555',
      action: 'Disconnect',
      actionColor: COLORS.error,
    },
    {
      id: '6',
      type: 'stripe',
      name: 'Stripe',
      action: 'Link',
      actionColor: COLORS.primary,
    },
    {
      id: '7',
      type: 'paypal',
      name: 'PayPal',
      action: 'Link',
      actionColor: COLORS.primary,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'bank':
        return 'account-balance';
      case 'card':
      case 'visa':
      case 'mastercard':
        return 'credit-card';
      case 'crypto':
        return 'currency-bitcoin';
      case 'apple':
        return 'apple';
      case 'google':
        return 'google';
      case 'stripe':
        return 'payment';
      case 'paypal':
        return 'payments';
      default:
        return 'payment';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Manage Payment Methods"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.addSection}>
          {addOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={styles.addOption}
              onPress={option.onPress}>
              <Icon name={option.icon} size={24} color={COLORS.primary} />
              <Text style={styles.addOptionText}>{option.title}</Text>
              <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.methodsSection}>
          {paymentMethods.map(method => (
            <View key={method.id} style={styles.methodItem}>
              <View style={styles.methodLeft}>
                <Icon
                  name={getIcon(method.type)}
                  size={24}
                  color={COLORS.primary}
                />
                <View style={styles.methodInfo}>
                  <Text style={styles.methodName}>
                    {method.name}
                    {method.number && ` ....${method.number}`}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {borderColor: method.actionColor},
                ]}
                onPress={() => {}}>
                <Text style={[styles.actionText, {color: method.actionColor}]}>
                  {method.action}
                </Text>
              </TouchableOpacity>
            </View>
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
  addSection: {
    marginBottom: 32,
  },
  addOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  addOptionText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  methodsSection: {
    marginBottom: 24,
  },
  methodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PaymentsManagementScreen;
