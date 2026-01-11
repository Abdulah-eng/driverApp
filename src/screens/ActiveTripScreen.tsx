import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const {width, height} = Dimensions.get('window');

const ActiveTripScreen = ({navigation}: any) => {
  const [message, setMessage] = useState('');

  const region = {
    latitude: 41.7151,
    longitude: 44.8271,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const driver = {
    name: 'Zacharis Fredrick',
    rating: 5.0,
    totalRatings: 724,
    totalRides: 5148,
    vehicle: 'Silver Toyota Camry',
    plate: 'ABC 3244',
    arrivalTime: '8 MIN',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
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

      <View style={styles.driverCard}>
        <Text style={styles.arrivalText}>
          Driver is arriving in {driver.arrivalTime}
        </Text>

        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <Icon name="person" size={40} color={COLORS.text.primary} />
            <View style={styles.diamondBadge}>
              <Icon name="diamond" size={12} color={COLORS.primary} />
            </View>
          </View>

          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <View style={styles.ratingRow}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>
                {driver.rating} ({driver.totalRatings} ratings)
              </Text>
            </View>
            <Text style={styles.ridesText}>Rides ({driver.totalRides})</Text>
          </View>

          <View style={styles.vehicleInfo}>
            <View style={styles.plateContainer}>
              <Text style={styles.plateText}>{driver.plate}</Text>
            </View>
            <Text style={styles.vehicleText}>{driver.vehicle}</Text>
            <Text style={styles.vehicleType}>Economy</Text>
          </View>
        </View>

        <View style={styles.messageContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="send message here!"
            placeholderTextColor={COLORS.text.tertiary}
            value={message}
            onChangeText={setMessage}
          />
          <Icon name="chat-bubble-outline" size={20} color={COLORS.text.tertiary} />
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.callButton}>
            <Icon name="phone" size={20} color={COLORS.text.primary} />
            <Text style={styles.callButtonText}>Call Driver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sosButton}>
            <Icon name="notifications" size={20} color={COLORS.text.primary} />
            <Text style={styles.sosButtonText}>SOS</Text>
          </TouchableOpacity>
        </View>
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
    height: height * 0.6,
  },
  driverCard: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 32,
  },
  arrivalText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 20,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 16,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  diamondBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  ridesText: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  vehicleInfo: {
    alignItems: 'flex-end',
  },
  plateContainer: {
    backgroundColor: COLORS.text.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 4,
  },
  plateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  vehicleText: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  vehicleType: {
    fontSize: 12,
    color: COLORS.text.tertiary,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 12,
  },
  messageInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  callButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  sosButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.error,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  sosButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
});

export default ActiveTripScreen;
