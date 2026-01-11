import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker} from 'react-native-maps';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const {width, height} = Dimensions.get('window');

const AssigningDriverScreen = ({navigation}: any) => {
  useEffect(() => {
    // Simulate driver assignment
    const timer = setTimeout(() => {
      navigation.replace('ActiveTrip');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

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
            title="Your Location"
          />
        </MapView>

        <View style={styles.overlay}>
          <View style={styles.statusContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.statusTitle}>Assigning your driver</Text>
            <Text style={styles.statusSubtitle}>
              We only assign drivers who can complete this ride.
            </Text>
          </View>
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
    height: height,
  },
  overlay: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  statusContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    minWidth: 280,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  statusSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default AssigningDriverScreen;
