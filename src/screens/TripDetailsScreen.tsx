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

const TripDetailsScreen = ({navigation, route}: any) => {
  const trip = route?.params?.trip || {
    id: '1234',
    date: 'January 15, 2024',
    time: '10:30 AM',
    passengerName: 'John Smith',
    passengerPhone: '+1 (555) 123-4567',
    from: 'Downtown Plaza, 123 Main St',
    to: 'Airport Terminal 2, Airport Road',
    distance: '12.5 km',
    duration: '18 min',
    fare: 25.5,
    tip: 5.0,
    total: 30.5,
    paymentMethod: 'Credit Card',
    status: 'completed',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Icon name="check-circle" size={32} color="#4CAF50" />
          </View>
          <Text style={styles.statusText}>Trip Completed</Text>
          <Text style={styles.tripId}>Trip #{trip.id}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passenger Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Icon name="person" size={20} color="#666666" />
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{trip.passengerName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="phone" size={20} color="#666666" />
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{trip.passengerPhone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.routeItem}>
              <View style={[styles.routeDot, styles.pickupDot]} />
              <View style={styles.routeContent}>
                <Text style={styles.routeLabel}>Pickup</Text>
                <Text style={styles.routeAddress}>{trip.from}</Text>
              </View>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routeItem}>
              <View style={[styles.routeDot, styles.dropoffDot]} />
              <View style={styles.routeContent}>
                <Text style={styles.routeLabel}>Dropoff</Text>
                <Text style={styles.routeAddress}>{trip.to}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Details</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Icon name="calendar-today" size={20} color="#666666" />
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>{trip.date}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="access-time" size={20} color="#666666" />
              <Text style={styles.infoLabel}>Time</Text>
              <Text style={styles.infoValue}>{trip.time}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="straighten" size={20} color="#666666" />
              <Text style={styles.infoLabel}>Distance</Text>
              <Text style={styles.infoValue}>{trip.distance}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="timer" size={20} color="#666666" />
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>{trip.duration}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <View style={styles.paymentCard}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Fare</Text>
              <Text style={styles.paymentValue}>${trip.fare.toFixed(2)}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Tip</Text>
              <Text style={styles.paymentValue}>${trip.tip.toFixed(2)}</Text>
            </View>
            <View style={styles.paymentDivider} />
            <View style={styles.paymentRow}>
              <Text style={styles.paymentTotalLabel}>Total</Text>
              <Text style={styles.paymentTotalValue}>
                ${trip.total.toFixed(2)}
              </Text>
            </View>
            <View style={styles.paymentMethod}>
              <Icon name="credit-card" size={20} color="#666666" />
              <Text style={styles.paymentMethodText}>
                Paid with {trip.paymentMethod}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="receipt" size={20} color="#007AFF" />
            <Text style={styles.actionButtonText}>Download Receipt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share" size={20} color="#007AFF" />
            <Text style={styles.actionButtonText}>Share Trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  placeholder: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
  statusIcon: {
    marginBottom: 12,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  tripId: {
    fontSize: 14,
    color: '#666666',
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoLabel: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    marginLeft: 12,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  routeItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    marginTop: 4,
  },
  pickupDot: {
    backgroundColor: '#007AFF',
  },
  dropoffDot: {
    backgroundColor: '#4CAF50',
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginLeft: 5,
    marginBottom: 8,
  },
  routeContent: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  routeAddress: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666666',
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  paymentDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  paymentTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  paymentTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 8,
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#666666',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
});

export default TripDetailsScreen;
