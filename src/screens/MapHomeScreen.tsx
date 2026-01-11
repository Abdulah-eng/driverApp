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

const MapHomeScreen = ({navigation}: any) => {
  const [searchText, setSearchText] = useState('');

  const region = {
    latitude: 41.7151,
    longitude: 44.8271,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const savedPlaces = [
    {id: '1', label: 'Home', address: '456 Oak Ave, Brooklyn, NY'},
    {id: '2', label: 'Work', address: '789 Broadway, Manhattan, NY'},
    {id: '3', label: 'Work HQ', address: '123 Main St, New York, NY'},
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        onMenuPress={() => navigation.openDrawer()}
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
            {
              elementType: 'labels.text.fill',
              stylers: [{color: COLORS.text.tertiary}],
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [{color: COLORS.mapBackground}],
            },
          ]}>
          <Marker
            coordinate={{latitude: 41.7151, longitude: 44.8271}}
            title="Your Location"
          />
        </MapView>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search" size={24} color={COLORS.text.tertiary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Where to?"
              placeholderTextColor={COLORS.text.tertiary}
              value={searchText}
              onChangeText={setSearchText}
              onFocus={() => navigation.navigate('PlanRoute')}
            />
          </View>

          <View style={styles.savedPlacesContainer}>
            <TouchableOpacity style={styles.addAddressButton}>
              <Text style={styles.addAddressText}>+ Add address</Text>
            </TouchableOpacity>
            {savedPlaces.map(place => (
              <TouchableOpacity
                key={place.id}
                style={styles.savedPlaceButton}
                onPress={() => {
                  setSearchText(place.address);
                  navigation.navigate('RideSelection', {
                    destination: place.address,
                  });
                }}>
                <Text style={styles.savedPlaceText}>{place.label}</Text>
              </TouchableOpacity>
            ))}
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
  searchContainer: {
    position: 'absolute',
    top: 80,
    left: 16,
    right: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.text.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    gap: 12,
    ...COLORS.shadows?.medium,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.background,
  },
  savedPlacesContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  addAddressButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addAddressText: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  savedPlaceButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  savedPlaceText: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
});

export default MapHomeScreen;
