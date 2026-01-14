import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';
import {useAuth} from '../context/AuthContext';
import {databaseService} from '../services/databaseService';

const {width, height} = Dimensions.get('window');

interface VehicleType {
  id: string;
  name: string;
  price: string;
  time: string;
  color: string;
  icon: string;
}

const vehicleTypes: VehicleType[] = [
  {
    id: 'plus',
    name: 'MOVO Plus',
    price: '$31.76',
    time: '12 min',
    color: COLORS.movoPlus,
    icon: 'directions-car',
  },
  {
    id: 'prime',
    name: 'MOVO Prime',
    price: '$31.76',
    time: '12 min',
    color: COLORS.movoPrime,
    icon: 'directions-car',
  },
  {
    id: 'max',
    name: 'MOVO Max',
    price: '$31.76',
    time: '12 min',
    color: COLORS.movoMax,
    icon: 'airport-shuttle',
  },
  {
    id: 'eco',
    name: 'MOVO Eco',
    price: '$45.12',
    time: '12 min',
    color: COLORS.movoEco,
    icon: 'electric-car',
  },
  {
    id: 'safe',
    name: 'MOVO Safe',
    price: '$45.12',
    time: '12 min',
    color: COLORS.movoSafe,
    icon: 'child-care',
  },
  {
    id: 'cargo',
    name: 'MOVO Cargo',
    price: '$45.12',
    time: '12 min',
    color: COLORS.movoCargo,
    icon: 'local-shipping',
  },
  {
    id: 'air',
    name: 'MOVO Air',
    price: '$256',
    time: '45 min',
    color: COLORS.movoAir,
    icon: 'flight',
  },
];

const RideSelectionScreen = ({navigation, route}: any) => {
  const [selectedVehicle, setSelectedVehicle] = useState('plus');
  const [promoCode, setPromoCode] = useState('');
  const [guaranteedRide, setGuaranteedRide] = useState(false);
  const [isCreatingTrip, setIsCreatingTrip] = useState(false);
  const {user} = useAuth();

  const pickup = route?.params?.pickup || '456 Oak Ave, Brooklyn, NY';
  const destination = route?.params?.destination || '456 Oak Ave, Brooklyn, NY';
  const pickupLat = route?.params?.pickupLat;
  const pickupLng = route?.params?.pickupLng;
  const dropoffLat = route?.params?.dropoffLat;
  const dropoffLng = route?.params?.dropoffLng;

  const selectedVehicleData = vehicleTypes.find(v => v.id === selectedVehicle);

  const region = {
    latitude: pickupLat || 41.7151,
    longitude: pickupLng || 44.8271,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleConfirmRide = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'You must be logged in to book a ride');
      return;
    }

    setIsCreatingTrip(true);

    try {
      // Extract fare from price string (remove $ sign)
      const fare = parseFloat(selectedVehicleData?.price.replace('$', '') || '0');

      const {trip, error} = await databaseService.createTrip({
        driver_id: user.id,
        pickup_location: pickup,
        dropoff_location: destination,
        fare: fare,
        vehicle_type: selectedVehicleData?.name || 'Standard',
        pickup_lat: pickupLat,
        pickup_lng: pickupLng,
        dropoff_lat: dropoffLat,
        dropoff_lng: dropoffLng,
      });

      if (error) {
        Alert.alert('Error', error.message || 'Failed to create trip. Please try again.');
        setIsCreatingTrip(false);
        return;
      }

      setIsCreatingTrip(false);
      // Navigate to assigning driver screen with trip data
      navigation.navigate('AssigningDriver', {tripId: trip?.id});
    } catch (err: any) {
      setIsCreatingTrip(false);
      Alert.alert('Error', 'Failed to create trip. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        onMenuPress={() => navigation.goBack()}
        onBellPress={() => navigation.navigate('Notifications')}
      />

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

      <View style={styles.bottomSheet}>
        <View style={styles.handle} />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.arrivalInfo}>
            <View>
              <Text style={styles.arrivalTime}>Arrives by 14:32</Text>
              <Text style={styles.guaranteeText}>Time is guaranteed</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{selectedVehicleData?.price}</Text>
              <Text style={styles.priceLocked}>Price locked</Text>
              <Text style={styles.noExtraCharges}>
                No extra charges after booking
              </Text>
            </View>
          </View>

          <View style={styles.vehicleSelection}>
            <Text style={styles.chooseRideText}>Choose your ride</Text>

            <View style={styles.selectedVehicleCard}>
              <View style={styles.selectedVehicleHeader}>
                <Text style={styles.selectedVehicleName}>
                  {selectedVehicleData?.name}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('VehicleInfo', {
                      vehicleType: selectedVehicle,
                    })
                  }>
                  <Icon name="info-outline" size={20} color={COLORS.text.primary} />
                </TouchableOpacity>
              </View>
              <View style={styles.selectedVehicleDetails}>
                <Text style={styles.selectedVehiclePrice}>
                  {selectedVehicleData?.price}
                </Text>
                <Text style={styles.selectedVehicleTime}>
                  {selectedVehicleData?.time}
                </Text>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.vehicleScroll}>
              {vehicleTypes.map(vehicle => (
                <TouchableOpacity
                  key={vehicle.id}
                  style={[
                    styles.vehicleOption,
                    selectedVehicle === vehicle.id && {
                      borderColor: vehicle.color,
                      borderWidth: 2,
                    },
                  ]}
                  onPress={() => setSelectedVehicle(vehicle.id)}>
                  <Icon
                    name={vehicle.icon}
                    size={32}
                    color={
                      selectedVehicle === vehicle.id
                        ? vehicle.color
                        : COLORS.text.tertiary
                    }
                  />
                  <Text
                    style={[
                      styles.vehicleOptionPrice,
                      selectedVehicle === vehicle.id && {
                        color: vehicle.color,
                      },
                    ]}>
                    {vehicle.price}
                  </Text>
                  <Text style={styles.vehicleOptionTime}>{vehicle.time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.routeInfo}>
            <View style={styles.routeItem}>
              <Icon name="location-on" size={20} color={COLORS.primary} />
              <View style={styles.routeText}>
                <Text style={styles.routeLabel}>Pickup</Text>
                <Text style={styles.routeAddress}>{pickup}</Text>
              </View>
            </View>
            <View style={styles.routeItem}>
              <Icon name="place" size={20} color={COLORS.error} />
              <View style={styles.routeText}>
                <Text style={styles.routeLabel}>Destination</Text>
                <Text style={styles.routeAddress}>{destination}</Text>
              </View>
            </View>
          </View>

          <View style={styles.guaranteedRideSection}>
            <View style={styles.guaranteedRideHeader}>
              <Icon name="info-outline" size={20} color={COLORS.text.tertiary} />
              <Text style={styles.guaranteedRideTitle}>Guaranteed Ride</Text>
            </View>
            <View style={styles.guaranteedRideContent}>
              <Text style={styles.guaranteedRideText}>
                If your driver cancels, you get instant credit.
              </Text>
              <TouchableOpacity
                style={[
                  styles.toggle,
                  guaranteedRide && styles.toggleActive,
                ]}
                onPress={() => setGuaranteedRide(!guaranteedRide)}>
                <View
                  style={[
                    styles.toggleThumb,
                    guaranteedRide && styles.toggleThumbActive,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.promoSection}>
            <TextInput
              style={styles.promoInput}
              placeholder="Promo code"
              placeholderTextColor={COLORS.text.tertiary}
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.confirmButton, isCreatingTrip && styles.confirmButtonDisabled]}
            onPress={handleConfirmRide}
            disabled={isCreatingTrip}>
            {isCreatingTrip ? (
              <ActivityIndicator color={COLORS.text.primary} />
            ) : (
              <>
                <Icon name="credit-card" size={20} color={COLORS.text.primary} />
                <Text style={styles.confirmButtonText}>Confirm ride</Text>
                <Icon name="calendar-today" size={20} color={COLORS.text.primary} />
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.lockedText}>
            Price and arrival time are locked
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: width,
    height: height * 0.5,
  },
  bottomSheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 16,
    maxHeight: height * 0.6,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  arrivalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  arrivalTime: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  guaranteeText: {
    fontSize: 12,
    color: COLORS.text.tertiary,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  priceLocked: {
    fontSize: 12,
    color: COLORS.success,
    marginBottom: 2,
  },
  noExtraCharges: {
    fontSize: 10,
    color: COLORS.text.tertiary,
  },
  vehicleSelection: {
    marginBottom: 24,
  },
  chooseRideText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  selectedVehicleCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  selectedVehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedVehicleName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  selectedVehicleDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedVehiclePrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  selectedVehicleTime: {
    fontSize: 16,
    color: COLORS.text.secondary,
  },
  vehicleScroll: {
    marginBottom: 16,
  },
  vehicleOption: {
    width: 100,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  vehicleOptionPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginTop: 8,
    marginBottom: 4,
  },
  vehicleOptionTime: {
    fontSize: 12,
    color: COLORS.text.tertiary,
  },
  routeInfo: {
    marginBottom: 24,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
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
  guaranteedRideSection: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  guaranteedRideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  guaranteedRideTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  guaranteedRideContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guaranteedRideText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text.secondary,
    marginRight: 12,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: COLORS.primary,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.text.primary,
  },
  toggleThumbActive: {
    transform: [{translateX: 20}],
  },
  promoSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  promoInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 12,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  lockedText: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default RideSelectionScreen;
