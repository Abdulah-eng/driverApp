import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const VehicleInfoScreen = ({navigation, route}: any) => {
  const vehicleType = route?.params?.vehicleType || 'plus';

  const vehicleInfo: Record<string, any> = {
    plus: {
      name: 'MOVO Plus',
      description: 'Comfortable Daily Rides',
      bestFor: ['Daily commuting', 'City travel', 'Everyday rides'],
      carType: [
        'Clean and comfortable sedans or SUVs',
        'Well-maintained vehicles',
        'Good seating comfort for daily use',
        'Economy-only cars are not used in this category',
      ],
      expect: [
        'A smooth and comfortable ride',
        'A clean vehicle',
        'A professional driver',
      ],
    },
    prime: {
      name: 'MOVO Prime',
      description: 'Premium & Business-Class Rides',
      bestFor: ['Business meetings', 'Corporate travel', 'VIP or professional rides'],
      carType: [
        'Premium sedans or SUVs',
        'Black-colored vehicles only',
        'High-quality interior and exterior',
        'Examples include Mercedes-Benz, Toyota Camry, Lexus, and similar vehicles',
      ],
      expect: [
        'Premium comfort',
        'Professional presentation',
        'Experienced drivers',
      ],
    },
    max: {
      name: 'MOVO Max',
      description: 'Extra Space & Group Travel',
      bestFor: ['Group trips', 'Airport rides', 'Large luggage'],
      carType: [
        'SUVs or minivans',
        'Large interior space',
        'Suitable for multiple passengers or luggage',
      ],
      expect: [
        'More legroom and seating space',
        'Extra luggage capacity',
        'Comfortable group travel',
      ],
    },
    eco: {
      name: 'MOVO Eco',
      description: 'Premium Electric Rides',
      bestFor: ['Eco-conscious riders', 'Modern city travel', 'Quiet, smooth rides'],
      carType: [
        'Premium electric vehicles only',
        'Quiet and modern cars',
        'Examples include Tesla and other high-end electric vehicles',
      ],
      expect: [
        'Quiet and smooth ride',
        'Modern driving experience',
        'Eco-friendly transportation',
      ],
    },
    safe: {
      name: 'MOVO Safe',
      description: 'Child & Safety-Focused Rides',
      bestFor: ['Families with children', 'Safety-conscious passengers'],
      carType: [
        'Vehicles equipped with child safety seats',
        'Clean and safety-checked interiors',
      ],
      expect: [
        'Safety-focused driving',
        'Verified vehicles and drivers',
        'Extra care during the trip',
      ],
      priceTiming: [
        'Price is shown before booking',
        'Safety standards are prioritized over speed',
      ],
    },
    cargo: {
      name: 'MOVO Cargo',
      description: 'Cargo & Parcel Delivery',
      bestFor: ['Parcel delivery', 'Business shipments', 'Transporting goods'],
      carType: [
        'Vans or large capacity vehicles',
        'Suitable for transporting goods',
      ],
      expect: [
        'Secure handling of parcels',
        'Delivery-focused service',
        'No passenger seating',
      ],
      priceTiming: ['Price is shown before booking'],
    },
    air: {
      name: 'MOVO Air',
      description: 'Cargo & Parcel Delivery',
      whatYouGet: [
        'Private aircraft for your trip',
        'Licensed pilot verified by MOVO',
        'Fixed route between selected cities',
        'Priority boarding',
        'No ride cancellations',
      ],
      travelTime: 'Guaranteed flight time: 45 minutes',
      capacity: ['Passengers: 1-X', 'Luggage: Up to X kg'],
      pickupDropoff: [
        'Departure: Approved airport',
        'Arrival: Approved airport',
      ],
      pricing: [
        'Final price is locked before booking.',
        'No hidden fees. No post-flight charges.',
      ],
      safety: [
        'Aircraft inspected regularly',
        'Licensed and verified pilots',
        'Weather-aware flight approval',
        'Insurance included in every flight',
        'MOVO AIR operates only with certified partners',
      ],
      cancellation: 'Once booked. MOVO AIR flights cannot be canceled by the operator.',
    },
  };

  const info = vehicleInfo[vehicleType] || vehicleInfo.plus;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="MOVO Plus Info"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.vehicleName}>{info.name}</Text>
        {info.description && (
          <Text style={styles.vehicleDescription}>{info.description}</Text>
        )}

        {info.bestFor && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Best for</Text>
            {info.bestFor.map((item: string, index: number) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {info.carType && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              What kind of car will arrive
            </Text>
            {info.carType.map((item: string, index: number) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {info.expect && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What you can expect</Text>
            {info.expect.map((item: string, index: number) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {info.whatYouGet && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What You Get</Text>
            {info.whatYouGet.map((item: string, index: number) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {info.travelTime && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Travel Time</Text>
            <Text style={styles.sectionText}>{info.travelTime}</Text>
          </View>
        )}

        {info.capacity && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Capacity</Text>
            {info.capacity.map((item: string, index: number) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {info.pickupDropoff && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pickup & Drop-off</Text>
            {info.pickupDropoff.map((item: string, index: number) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {info.pricing && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pricing & Guarantees</Text>
            {info.pricing.map((item: string, index: number) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {info.safety && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Safety First</Text>
            {info.safety.map((item: string, index: number) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {info.priceTiming && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price & timing</Text>
            {info.priceTiming.map((item: string, index: number) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {info.cancellation && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>No Cancellation Policy</Text>
            <Text style={styles.sectionText}>{info.cancellation}</Text>
          </View>
        )}
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
  vehicleName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  vehicleDescription: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  bullet: {
    fontSize: 14,
    color: COLORS.text.secondary,
    width: 20,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
});

export default VehicleInfoScreen;
