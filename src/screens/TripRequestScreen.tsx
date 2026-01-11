import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

const TripRequestScreen = ({navigation, route}: any) => {
  const tripRequest = route?.params?.request || {
    id: '1234',
    passengerName: 'Sarah Johnson',
    passengerRating: 4.8,
    from: 'Downtown Plaza',
    to: 'Airport Terminal 2',
    distance: '12.5 km',
    estimatedTime: '18 min',
    estimatedFare: 25.5,
    paymentMethod: 'Credit Card',
  };

  const [timeLeft, setTimeLeft] = useState(15);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAccept = () => {
    navigation.navigate('ActiveTrip', {trip: tripRequest});
  };

  const handleDecline = () => {
    navigation.goBack();
  };

  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={region}>
          <Marker
            coordinate={{latitude: 37.78825, longitude: -122.4324}}
            title="Pickup Location"
          />
          <Marker
            coordinate={{latitude: 37.78425, longitude: -122.4094}}
            title="Dropoff Location"
            pinColor="green"
          />
        </MapView>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.timerContainer}>
          <Icon name="timer" size={20} color="#FF5722" />
          <Text style={styles.timerText}>{timeLeft}s remaining</Text>
        </View>

        <View style={styles.passengerInfo}>
          <View style={styles.avatar}>
            <Icon name="person" size={32} color="#FFFFFF" />
          </View>
          <View style={styles.passengerDetails}>
            <Text style={styles.passengerName}>{tripRequest.passengerName}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{tripRequest.passengerRating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.routeInfo}>
          <View style={styles.routeItem}>
            <View style={[styles.routeDot, styles.pickupDot]} />
            <View style={styles.routeContent}>
              <Text style={styles.routeLabel}>Pickup</Text>
              <Text style={styles.routeAddress}>{tripRequest.from}</Text>
            </View>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routeItem}>
            <View style={[styles.routeDot, styles.dropoffDot]} />
            <View style={styles.routeContent}>
              <Text style={styles.routeLabel}>Dropoff</Text>
              <Text style={styles.routeAddress}>{tripRequest.to}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tripDetails}>
          <View style={styles.detailItem}>
            <Icon name="straighten" size={20} color="#666666" />
            <Text style={styles.detailText}>{tripRequest.distance}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="access-time" size={20} color="#666666" />
            <Text style={styles.detailText}>{tripRequest.estimatedTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="attach-money" size={20} color="#666666" />
            <Text style={styles.detailText}>${tripRequest.estimatedFare}</Text>
          </View>
        </View>

        <View style={styles.paymentInfo}>
          <Icon name="credit-card" size={20} color="#666666" />
          <Text style={styles.paymentText}>
            Payment: {tripRequest.paymentMethod}
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.declineButton}
            onPress={handleDecline}>
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={handleAccept}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width,
    height: height * 0.5,
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: height * 0.55,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF5722',
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  passengerDetails: {
    flex: 1,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  routeInfo: {
    marginBottom: 20,
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
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  detailItem: {
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginTop: 4,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  paymentText: {
    fontSize: 14,
    color: '#666666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  declineButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  declineButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default TripRequestScreen;
