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

const MOVOPassScreen = ({navigation}: any) => {
  const [planType, setPlanType] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [isActive, setIsActive] = useState(false);
  const [hasPaymentIssue, setHasPaymentIssue] = useState(false);

  const monthlyPlan = {
    price: '£10',
    period: '/ month',
    description: 'Flexible monthly access to priority rides and enhanced reliability.',
    billing: 'Billed monthly. Cancel anytime.',
    renewal: 'April 15, 2026',
    benefits: [
      'Priority driver matching',
      'Reduced driver cancellations',
      'Enhanced ride reliability',
      'Priority support access',
      'No-cancel protection included',
    ],
  };

  const yearlyPlan = {
    price: '£98',
    period: '/ year',
    description: 'Best value for frequent riders who want long-term reliability.',
    billing: 'That\'s £8 per month (save 18% vs monthly)',
    renewal: 'April 15, 2027',
    benefits: [
      'Everything in Monthly',
      'Lower monthly cost',
      'Priority driver matching',
      'Reduced driver cancellations',
      'Enhanced ride reliability',
    ],
  };

  const currentPlan = planType === 'Monthly' ? monthlyPlan : yearlyPlan;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="MOVO Pass"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Start Your MOVO Pass</Text>
        <Text style={styles.headerSubtitle}>
          Priority rides. Fewer cancellations. Guaranteed reliability.
        </Text>

        <View style={styles.planToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              planType === 'Yearly' && styles.toggleButtonActive,
            ]}
            onPress={() => setPlanType('Yearly')}>
            <Text
              style={[
                styles.toggleButtonText,
                planType === 'Yearly' && styles.toggleButtonTextActive,
              ]}>
              Plan/Yearly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              planType === 'Monthly' && styles.toggleButtonActive,
            ]}
            onPress={() => setPlanType('Monthly')}>
            <Text
              style={[
                styles.toggleButtonText,
                planType === 'Monthly' && styles.toggleButtonTextActive,
              ]}>
              Plan/Monthly
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <Text style={styles.planName}>MOVO Pass ({planType})</Text>
            {isActive ? (
              <Text style={styles.statusActive}>active</Text>
            ) : (
              <Text style={styles.statusOffline}>Offline</Text>
            )}
          </View>

          <Text style={styles.planDescription}>{currentPlan.description}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{currentPlan.price}</Text>
            <Text style={styles.period}>{currentPlan.period}</Text>
          </View>
          <Text style={styles.billing}>{currentPlan.billing}</Text>

          <View style={styles.benefitsSection}>
            <Text style={styles.benefitsTitle}>What's included</Text>
            {currentPlan.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Icon name="check-circle" size={20} color={COLORS.success} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>

          <View style={styles.renewalSection}>
            <Text style={styles.renewalText}>
              You'll be notified before renewal
            </Text>
            <Text style={styles.renewalDate}>Renews on: {currentPlan.renewal}</Text>
          </View>

          <View style={styles.paymentSection}>
            {hasPaymentIssue && (
              <View style={styles.paymentIssue}>
                <Text style={styles.paymentIssueLabel}>Payment issue</Text>
                <Text style={styles.paymentIssueText}>
                  We couldn't process your payment. Update your method to keep
                  your Pass active.
                </Text>
              </View>
            )}
            <View style={styles.paymentMethod}>
              <Text style={styles.paymentMethodLabel}>Payment method</Text>
              <View style={styles.paymentMethodRow}>
                <Text style={styles.paymentMethodText}>
                  VISA Visa **** 5555
                </Text>
                <TouchableOpacity>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.reliabilitySection}>
            <Text style={styles.reliabilityText}>
              When demand is high, MOVO Pass riders are matched first with
              reliable drivers.
            </Text>
            {planType === 'Yearly' && (
              <Text style={styles.reliabilityText}>
                Drivers accepting these rides are held to stricter reliability
                rules.
              </Text>
            )}
          </View>

          {isActive ? (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsActive(false)}>
              <Text style={styles.cancelButtonText}>Cancel MOVO Pass</Text>
            </TouchableOpacity>
          ) : hasPaymentIssue ? (
            <TouchableOpacity
              style={styles.reactivateButton}
              onPress={() => {
                setHasPaymentIssue(false);
                setIsActive(true);
              }}>
              <Text style={styles.reactivateButtonText}>Re-activate</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setIsActive(true)}>
              <Text style={styles.confirmButtonText}>
                Confirm & Start MOVO Pass
              </Text>
            </TouchableOpacity>
          )}

          <Text style={styles.footerText}>
            Your subscription starts immediately.
          </Text>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: 24,
    lineHeight: 22,
  },
  planToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: COLORS.text.primary,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
  toggleButtonTextActive: {
    color: COLORS.background,
  },
  planCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  statusActive: {
    fontSize: 14,
    color: COLORS.success,
    fontWeight: '500',
  },
  statusOffline: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    fontWeight: '500',
  },
  planDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  period: {
    fontSize: 18,
    color: COLORS.text.secondary,
    marginLeft: 4,
  },
  billing: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    marginBottom: 24,
  },
  benefitsSection: {
    marginBottom: 24,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  renewalSection: {
    marginBottom: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  renewalText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  renewalDate: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  paymentSection: {
    marginBottom: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  paymentIssue: {
    backgroundColor: COLORS.error + '20',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  paymentIssueLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.error,
    marginBottom: 8,
  },
  paymentIssueText: {
    fontSize: 14,
    color: COLORS.error,
    lineHeight: 20,
  },
  paymentMethod: {
    marginBottom: 16,
  },
  paymentMethodLabel: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    marginBottom: 8,
  },
  paymentMethodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: 16,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  changeText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  reliabilitySection: {
    marginBottom: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  reliabilityText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
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
  cancelButton: {
    backgroundColor: COLORS.error,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  reactivateButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  reactivateButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    textAlign: 'center',
  },
});

export default MOVOPassScreen;
