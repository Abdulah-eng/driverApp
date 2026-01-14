import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const PlanRouteScreen = ({navigation}: any) => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  const savedPlaces = [
    {id: '1', label: 'Home', address: '456 Oak Ave, Brooklyn, NY', icon: 'home'},
    {id: '2', label: 'Work', address: '789 Broadway, Manhattan, NY', icon: 'work'},
  ];

  const recentPlaces = [
    '456 Oak Ave, Brooklyn, NY',
    '789 Broadway, Manhattan, NY',
    '123 Main St, New York, NY',
  ];

  const handleContinue = () => {
    if (pickup && destination) {
      // In a real app, you would geocode addresses to get lat/lng
      // For now, we'll pass the addresses and let the map handle coordinates
      navigation.navigate('RideSelection', {
        pickup,
        destination,
        // You can add geocoding here to get actual coordinates
        // pickupLat: ...,
        // pickupLng: ...,
        // dropoffLat: ...,
        // dropoffLng: ...,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Plan your route"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pickup Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pickup location"
            placeholderTextColor={COLORS.text.tertiary}
            value={pickup}
            onChangeText={setPickup}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Destination</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter destination"
            placeholderTextColor={COLORS.text.tertiary}
            value={destination}
            onChangeText={setDestination}
          />
          <TouchableOpacity style={styles.addStopsButton}>
            <Text style={styles.addStopsText}>Add stops</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved places</Text>
          {savedPlaces.map(place => (
            <TouchableOpacity
              key={place.id}
              style={styles.placeItem}
              onPress={() => {
                if (!pickup) {
                  setPickup(place.address);
                } else if (!destination) {
                  setDestination(place.address);
                }
              }}>
              <Icon name={place.icon} size={24} color={COLORS.primary} />
              <View style={styles.placeInfo}>
                <Text style={styles.placeLabel}>{place.label}</Text>
                <Text style={styles.placeAddress}>{place.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent</Text>
          {recentPlaces.map((place, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recentItem}
              onPress={() => {
                if (!pickup) {
                  setPickup(place);
                } else if (!destination) {
                  setDestination(place);
                }
              }}>
              <Icon name="history" size={24} color={COLORS.text.tertiary} />
              <Text style={styles.recentText}>{place}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            pickup && destination && styles.continueButtonActive,
          ]}
          disabled={!pickup || !destination}
          onPress={handleContinue}>
          <Text
            style={[
              styles.continueButtonText,
              pickup &&
                destination &&
                styles.continueButtonTextActive,
            ]}>
            Continue
          </Text>
        </TouchableOpacity>
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
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text.primary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addStopsButton: {
    marginTop: 12,
    paddingVertical: 8,
  },
  addStopsText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  placeAddress: {
    fontSize: 14,
    color: COLORS.text.tertiary,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  recentText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text.primary,
  },
  continueButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonActive: {
    backgroundColor: COLORS.primary,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.tertiary,
  },
  continueButtonTextActive: {
    color: COLORS.text.primary,
  },
});

export default PlanRouteScreen;
