import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

interface Trip {
  id: string;
  date: string;
  time: string;
  price: string;
  driver: string;
  vehicleType: string;
  from: string;
  to: string;
  status: 'completed' | 'canceled' | 'scheduled';
}

const mockTrips: Trip[] = [
  {
    id: '1',
    date: 'Nov 9',
    time: '2:30 PM',
    price: '$18.75',
    driver: 'Zacharis Fredrick',
    vehicleType: 'Economy',
    from: '123 Main St, New York, NY',
    to: 'Times Square, Manhattan, NY',
    status: 'completed',
  },
  {
    id: '2',
    date: 'Nov 9',
    time: '2:30 PM',
    price: '$18.75',
    driver: 'Zacharis Fredrick',
    vehicleType: 'Economy',
    from: '123 Main St, New York, NY',
    to: 'Times Square, Manhattan, NY',
    status: 'completed',
  },
  {
    id: '3',
    date: 'Nov 9',
    time: '2:30 PM',
    price: '$18.75',
    driver: 'Zacharis Fredrick',
    vehicleType: 'Economy',
    from: '123 Main St, New York, NY',
    to: 'Times Square, Manhattan, NY',
    status: 'canceled',
  },
];

const TripsScreen = ({navigation}: any) => {
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Canceled' | 'Scheduled'>('All');

  const filteredTrips =
    filter === 'All'
      ? mockTrips
      : filter === 'Scheduled'
      ? []
      : mockTrips.filter(trip => trip.status === filter.toLowerCase());

  const renderTripItem = ({item}: {item: Trip}) => (
    <TouchableOpacity
      style={styles.tripCard}
      onPress={() => navigation.navigate('TripDetails', {trip: item})}>
      <View style={styles.tripHeader}>
        <View style={styles.tripDate}>
          <Text style={styles.tripDateText}>{item.date}</Text>
          <Text style={styles.tripTimeText}>{item.time}</Text>
        </View>
        <Text style={styles.tripPrice}>{item.price}</Text>
      </View>

      <View style={styles.tripDriver}>
        <View style={styles.driverAvatar}>
          <Icon name="person" size={20} color={COLORS.text.primary} />
        </View>
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>
            {item.driver} {item.vehicleType}
          </Text>
        </View>
      </View>

      <View style={styles.tripRoute}>
        <Text style={styles.routeText} numberOfLines={1}>
          {item.from} {item.to}
        </Text>
      </View>

      <View style={styles.tripFooter}>
        <View
          style={[
            styles.statusBadge,
            item.status === 'completed' && styles.statusBadgeCompleted,
            item.status === 'canceled' && styles.statusBadgeCanceled,
          ]}>
          <Text
            style={[
              styles.statusText,
              item.status === 'completed' && styles.statusTextCompleted,
              item.status === 'canceled' && styles.statusTextCanceled,
            ]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="location-on" size={64} color={COLORS.text.tertiary} />
      <Text style={styles.emptyTitle}>No trips found</Text>
      <Text style={styles.emptySubtitle}>No scheduled trips</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Ride History"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.filters}>
        {(['All', 'Completed', 'Canceled', 'Scheduled'] as const).map(
          filterOption => (
            <TouchableOpacity
              key={filterOption}
              style={[
                styles.filterButton,
                filter === filterOption && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(filterOption)}>
              <Text
                style={[
                  styles.filterButtonText,
                  filter === filterOption && styles.filterButtonTextActive,
                ]}>
                {filterOption}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </View>

      {filteredTrips.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={filteredTrips}
          renderItem={renderTripItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  filters: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: COLORS.text.primary,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  tripCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tripDate: {
    flex: 1,
  },
  tripDateText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  tripTimeText: {
    fontSize: 12,
    color: COLORS.text.tertiary,
  },
  tripPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  tripDriver: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  driverAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  tripRoute: {
    marginBottom: 12,
  },
  routeText: {
    fontSize: 14,
    color: COLORS.text.primary,
    lineHeight: 20,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  statusBadgeCompleted: {
    backgroundColor: COLORS.success + '20',
  },
  statusBadgeCanceled: {
    backgroundColor: COLORS.error + '20',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
  statusTextCompleted: {
    color: COLORS.success,
  },
  statusTextCanceled: {
    color: COLORS.error,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.text.tertiary,
  },
});

export default TripsScreen;
