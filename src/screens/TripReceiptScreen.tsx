import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';
import {databaseService} from '../services/databaseService';

const {width} = Dimensions.get('window');

const TripReceiptScreen = ({navigation, route}: any) => {
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const tripId = route?.params?.tripId;
  const fare = route?.params?.fare || 0;
  const tipAmount = route?.params?.tipAmount || 0;

  useEffect(() => {
    loadTripData();
  }, [tripId]);

  const loadTripData = async () => {
    if (tripId) {
      try {
        const tripData = await databaseService.getTrip(tripId);
        if (tripData) {
          setTrip({
            totalFare: fare || tripData.fare,
            baseFare: (fare || tripData.fare) * 0.4,
            distance: 5.2,
            time: 15,
            promoDiscount: 0,
            paymentMethod: 'Card.... 4242',
            driver: {
              name: tripData.passengerName || 'Passenger',
              vehicle: 'Standard Vehicle',
              plate: 'ABC-3244',
            },
            pickup: tripData.from,
            destination: tripData.to,
            pickupTime: new Date().toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            }),
            duration: 15,
            distanceKm: 5.2,
          });
        }
      } catch (error) {
        console.error('Error loading trip:', error);
      }
    } else {
      // Fallback to route params if no tripId
      setTrip({
        totalFare: fare || 13.88,
        baseFare: (fare || 13.88) * 0.4,
        distance: 5.2,
        time: 15,
        promoDiscount: 0,
        paymentMethod: 'Card.... 4242',
        driver: {
          name: 'Passenger',
          vehicle: 'Standard Vehicle',
          plate: 'ABC-3244',
        },
        pickup: '456 Oak Ave, Brooklyn, NY',
        destination: '456 Oak Ave, Brooklyn, NY',
        pickupTime: '2:30 PM',
        duration: 15,
        distanceKm: 5.2,
      });
    }
    setLoading(false);
  };

  const region = {
    latitude: 41.7151,
    longitude: 44.8271,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
        title="Trip receipt"
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : trip ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={region}
            customMapStyle={[
              {
                elementType: 'geometry',
                stylers: [{color: COLORS.mapBackground}],
              },
            ]}>
            <Marker
              coordinate={{latitude: 41.7151, longitude: 44.8271}}
              pinColor={COLORS.primary}
            />
            <Marker
              coordinate={{latitude: 41.7201, longitude: 44.8301}}
              pinColor={COLORS.error}
            />
            <Polyline
              coordinates={[
                {latitude: 41.7151, longitude: 44.8271},
                {latitude: 41.7201, longitude: 44.8301},
              ]}
              strokeColor={COLORS.routeLine}
              strokeWidth={3}
            />
          </MapView>
        </View>

        <View style={styles.receiptContainer}>
          <Text style={styles.totalFare}>Total fare: ${trip.totalFare}</Text>

          <View style={styles.breakdown}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Base fare</Text>
              <Text style={styles.breakdownValue}>${trip.baseFare}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>
                Distance ({trip.distance} mi)
              </Text>
              <Text style={styles.breakdownValue}>
                ${(trip.distance * 2).toFixed(2)}
              </Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>
                Time (~{trip.time} min)
              </Text>
              <Text style={styles.breakdownValue}>
                ${(trip.time * 0.5).toFixed(2)}
              </Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Promo Discount</Text>
              <Text style={[styles.breakdownValue, styles.discount]}>
                -${trip.promoDiscount}
              </Text>
            </View>
          </View>

          <View style={styles.paymentInfo}>
            <Text style={styles.paymentText}>
              Paid with {trip.paymentMethod}
            </Text>
          </View>

          <View style={styles.driverInfo}>
            <View style={styles.driverAvatar}>
              <Icon name="person" size={32} color={COLORS.text.primary} />
            </View>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{trip.driver.name}</Text>
              <Text style={styles.vehicleInfo}>
                {trip.driver.vehicle} {trip.driver.plate}
              </Text>
            </View>
          </View>

          <View style={styles.routeInfo}>
            <View style={styles.routeItem}>
              <Icon name="location-on" size={20} color={COLORS.primary} />
              <View style={styles.routeText}>
                <Text style={styles.routeLabel}>Pickup</Text>
                <Text style={styles.routeAddress}>
                  {trip.pickup} {trip.pickupTime}
                </Text>
              </View>
            </View>
            <View style={styles.routeItem}>
              <Icon name="place" size={20} color={COLORS.error} />
              <View style={styles.routeText}>
                <Text style={styles.routeLabel}>Destination</Text>
                <Text style={styles.routeAddress}>
                  {trip.destination} {trip.pickupTime}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.tripSummary}>
            <View style={styles.summaryItem}>
              <Icon name="access-time" size={20} color={COLORS.text.tertiary} />
              <Text style={styles.summaryText}>Duration {trip.duration} min</Text>
            </View>
            <View style={styles.summaryItem}>
              <Icon name="location-on" size={20} color={COLORS.text.tertiary} />
              <Text style={styles.summaryText}>Distance {trip.distanceKm} km</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.reportButton}>
              <Icon name="report-problem" size={20} color={COLORS.error} />
              <Text style={styles.reportButtonText}>Report an issue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadButton}>
              <Icon name="download" size={20} color={COLORS.primary} />
              <Text style={styles.downloadButtonText}>Download Receipt</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      ) : null}
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
    paddingBottom: 32,
  },
  mapContainer: {
    height: 200,
    marginBottom: 16,
  },
  map: {
    width: width,
    height: 200,
  },
  receiptContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
  },
  totalFare: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 20,
  },
  breakdown: {
    marginBottom: 20,
    gap: 12,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  discount: {
    color: COLORS.success,
  },
  paymentInfo: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginBottom: 20,
  },
  paymentText: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  vehicleInfo: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  routeInfo: {
    marginBottom: 20,
    gap: 16,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  routeText: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    marginBottom: 4,
  },
  routeAddress: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  tripSummary: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryText: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  reportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  reportButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.error,
  },
  downloadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  downloadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TripReceiptScreen;
