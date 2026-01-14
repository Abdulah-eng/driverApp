import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Share,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const ShareLocationScreen = ({navigation}: any) => {
  const [isSharing, setIsSharing] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const region = {
    latitude: 41.7151,
    longitude: 44.8271,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const currentLocation = {
    address: '456 Oak Ave, Brooklyn, NY',
    coordinates: {latitude: 41.7151, longitude: 44.8271},
  };

  const savedContacts = [
    {id: '1', name: 'Mom', phone: '+1 (555) 123-4567'},
    {id: '2', name: 'Dad', phone: '+1 (555) 234-5678'},
    {id: '3', name: 'Sarah', phone: '+1 (555) 345-6789'},
  ];

  const handleStartSharing = () => {
    if (!contactName && !contactPhone) {
      Alert.alert('Error', 'Please enter a contact name or phone number');
      return;
    }

    setIsSharing(true);
    Alert.alert(
      'Location Sharing Started',
      `Your real-time location is now being shared with ${contactName || contactPhone}. They will receive updates every few minutes.`,
    );
  };

  const handleStopSharing = () => {
    Alert.alert(
      'Stop Sharing',
      'Are you sure you want to stop sharing your location?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Stop',
          style: 'destructive',
          onPress: () => {
            setIsSharing(false);
            setContactName('');
            setContactPhone('');
            Alert.alert('Sharing Stopped', 'Location sharing has been disabled.');
          },
        },
      ],
    );
  };

  const handleShareViaApp = async (contact: {name: string; phone: string}) => {
    try {
      const shareMessage = `I'm sharing my real-time location with you. Current location: ${currentLocation.address}\n\nView on map: https://maps.google.com/?q=${currentLocation.coordinates.latitude},${currentLocation.coordinates.longitude}`;
      
      await Share.share({
        message: shareMessage,
        title: 'My Location',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleQuickShare = (contact: {name: string; phone: string}) => {
    setContactName(contact.name);
    setContactPhone(contact.phone);
    handleStartSharing();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Share Location"
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
            coordinate={currentLocation.coordinates}
            title="Your Current Location"
            pinColor={COLORS.primary}
          />
        </MapView>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.currentLocationCard}>
          <Icon name="location-on" size={24} color={COLORS.primary} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Current Location</Text>
            <Text style={styles.locationAddress}>{currentLocation.address}</Text>
          </View>
        </View>

        {!isSharing ? (
          <View style={styles.sharingSection}>
            <Text style={styles.sectionTitle}>Share with Contact</Text>
            <Text style={styles.sectionSubtitle}>
              Enter contact details to start sharing your real-time location
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Contact Name (Optional)"
              placeholderTextColor={COLORS.text.tertiary}
              value={contactName}
              onChangeText={setContactName}
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number or Email"
              placeholderTextColor={COLORS.text.tertiary}
              value={contactPhone}
              onChangeText={setContactPhone}
              keyboardType="phone-pad"
            />

            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartSharing}>
              <Icon name="location-on" size={20} color={COLORS.text.primary} />
              <Text style={styles.startButtonText}>Start Sharing</Text>
            </TouchableOpacity>

            <View style={styles.savedContactsSection}>
              <Text style={styles.savedContactsTitle}>Quick Share</Text>
              {savedContacts.map(contact => (
                <TouchableOpacity
                  key={contact.id}
                  style={styles.contactItem}
                  onPress={() => handleQuickShare(contact)}>
                  <View style={styles.contactAvatar}>
                    <Icon name="person" size={20} color={COLORS.text.primary} />
                  </View>
                  <View style={styles.contactDetails}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactPhone}>{contact.phone}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleShareViaApp(contact)}
                    style={styles.shareIconButton}>
                    <Icon name="share" size={20} color={COLORS.primary} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.activeSharingSection}>
            <View style={styles.activeIndicator}>
              <View style={styles.pulseCircle} />
              <Icon name="location-on" size={32} color={COLORS.primary} />
            </View>
            <Text style={styles.activeTitle}>Location Sharing Active</Text>
            <Text style={styles.activeSubtext}>
              Your location is being shared with {contactName || contactPhone}
            </Text>
            <Text style={styles.activeInfo}>
              Location updates are sent automatically every few minutes
            </Text>

            <TouchableOpacity
              style={styles.stopButton}
              onPress={handleStopSharing}>
              <Text style={styles.stopButtonText}>Stop Sharing</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How it works</Text>
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Icon name="check-circle" size={20} color={COLORS.success} />
              <Text style={styles.infoText}>
                Your real-time location is shared with the selected contact
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="check-circle" size={20} color={COLORS.success} />
              <Text style={styles.infoText}>
                They receive periodic updates with your current location
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="check-circle" size={20} color={COLORS.success} />
              <Text style={styles.infoText}>
                You can stop sharing at any time
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mapContainer: {
    height: 250,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  currentLocationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
  },
  sharingSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    marginTop: 8,
    marginBottom: 24,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  savedContactsSection: {
    marginTop: 8,
  },
  savedContactsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  shareIconButton: {
    padding: 4,
  },
  activeSharingSection: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  activeIndicator: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  pulseCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.text.primary,
    opacity: 0.2,
  },
  activeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  activeSubtext: {
    fontSize: 16,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: 8,
    opacity: 0.9,
  },
  activeInfo: {
    fontSize: 14,
    color: COLORS.text.primary,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 20,
  },
  stopButton: {
    backgroundColor: COLORS.text.primary,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  stopButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  infoSection: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
});

export default ShareLocationScreen;
