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

const EarningsScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Earnings</Text>
          <TouchableOpacity>
            <Icon name="calendar-today" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Total Earnings Card */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Earnings</Text>
          <Text style={styles.totalAmount}>$1,245.50</Text>
          <Text style={styles.totalPeriod}>This Month</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="today" size={24} color="#007AFF" />
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="attach-money" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>$245</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="trending-up" size={24} color="#FF9800" />
            <Text style={styles.statValue}>+12%</Text>
            <Text style={styles.statLabel}>Growth</Text>
          </View>
        </View>

        {/* Earnings Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Earnings Breakdown</Text>
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownItem}>
              <View style={styles.breakdownLeft}>
                <Icon name="check-circle" size={20} color="#4CAF50" />
                <Text style={styles.breakdownText}>Completed Trips</Text>
              </View>
              <Text style={styles.breakdownAmount}>$1,200.00</Text>
            </View>
            <View style={styles.breakdownItem}>
              <View style={styles.breakdownLeft}>
                <Icon name="stars" size={20} color="#FFD700" />
                <Text style={styles.breakdownText}>Tips</Text>
              </View>
              <Text style={styles.breakdownAmount}>$45.50</Text>
            </View>
            <View style={styles.breakdownItem}>
              <View style={styles.breakdownLeft}>
                <Icon name="local-offer" size={20} color="#FF9800" />
                <Text style={styles.breakdownText}>Bonuses</Text>
              </View>
              <Text style={styles.breakdownAmount}>$0.00</Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <View style={styles.transactionCard}>
            <View style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <Icon name="directions-car" size={20} color="#007AFF" />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>Trip #1234</Text>
                <Text style={styles.transactionSubtitle}>Downtown → Airport</Text>
              </View>
              <Text style={styles.transactionAmount}>+$25.50</Text>
            </View>
            <View style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <Icon name="stars" size={20} color="#FFD700" />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>Tip</Text>
                <Text style={styles.transactionSubtitle}>From passenger</Text>
              </View>
              <Text style={styles.transactionAmount}>+$5.00</Text>
            </View>
          </View>
        </View>

        {/* Withdraw Button */}
        <TouchableOpacity
          style={styles.withdrawButton}
          onPress={() => navigation.navigate('Wallet')}>
          <Text style={styles.withdrawButtonText}>Withdraw Earnings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  totalCard: {
    backgroundColor: '#007AFF',
    margin: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  totalPeriod: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  breakdownText: {
    fontSize: 16,
    color: '#000000',
  },
  breakdownAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionIcon: {
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  transactionSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  withdrawButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  withdrawButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EarningsScreen;
