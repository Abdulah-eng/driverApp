import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';
import {useAuth} from '../context/AuthContext';
import {databaseService} from '../services/databaseService';

const ProfileScreen = ({navigation}: any) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const {user: authUser, signOut} = useAuth();
  const [user, setUser] = useState({
    name: authUser?.full_name || 'User',
    trips: 0,
    phone: authUser?.phone || '',
    email: authUser?.email || '',
  });

  useEffect(() => {
    loadUserProfile();
  }, [authUser]);

  const loadUserProfile = async () => {
    if (!authUser?.id) {
      setLoading(false);
      return;
    }

    try {
      const profile = await databaseService.getUserProfile(authUser.id);
      if (profile) {
        setUser({
          name: profile.name,
          trips: profile.totalTrips,
          phone: profile.phone,
          email: profile.email || '',
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await signOut();
    navigation.reset({
      index: 0,
      routes: [{name: 'Onboarding'}],
    });
  };

  const savedPlaces = [
    {id: '1', label: 'Home', address: '456 Oak Ave, Brooklyn, NY', icon: 'home'},
    {id: '2', label: 'Work', address: '789 Broadway, Manhattan, NY', icon: 'work'},
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Profile"
        showMenu={true}
        showBell={false}
        onMenuPress={() => navigation.openDrawer()}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{user.name}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('EditProfile')}>
              <Text style={styles.editText}>Edit</Text>
              <Icon name="edit" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.tripCount}>{user.trips} trips</Text>
          <Text style={styles.phone}>{user.phone}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved places</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SavedPlaces')}>
              <Text style={styles.manageText}>Manage</Text>
            </TouchableOpacity>
          </View>
          {savedPlaces.map(place => (
            <TouchableOpacity
              key={place.id}
              style={styles.savedPlaceItem}
              onPress={() => navigation.navigate('EditSavedPlace', {place})}>
              <Icon name={place.icon} size={20} color={COLORS.primary} />
              <View style={styles.savedPlaceText}>
                <Text style={styles.savedPlaceLabel}>{place.label}</Text>
                <Text style={styles.savedPlaceAddress}>{place.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.addPlaceButton}
            onPress={() => navigation.navigate('AddSavedPlace')}>
            <Text style={styles.addPlaceText}>+ Add saved place</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Trips')}>
            <Text style={styles.menuItemText}>History</Text>
            <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('PaymentMethods')}>
            <Text style={styles.menuItemText}>Payment methods</Text>
            <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Referral')}>
            <Text style={styles.menuItemText}>Promotions</Text>
            <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('SafetyCenter')}>
            <Text style={styles.menuItemText}>Safety</Text>
            <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.menuItemText}>Settings</Text>
            <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
          </TouchableOpacity>
        </View>

        <View style={styles.supportSection}>
          <TouchableOpacity
            style={styles.supportButton}
            onPress={() => navigation.navigate('HelpSupport')}>
            <Text style={styles.supportText}>Need help? Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setShowLogoutModal(true)}>
            <Text style={styles.logoutText}>Logout</Text>
            <Icon name="arrow-forward" size={20} color={COLORS.error} />
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>Version 2.45.2</Text>
      </ScrollView>

      {showLogoutModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              You'll need to sign in again to access your account.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowLogoutModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logoutConfirmButton}
                onPress={handleLogout}>
                <Text style={styles.logoutConfirmText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
        </ScrollView>
      )}
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
  profileSection: {
    marginBottom: 24,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  tripCount: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  phone: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  manageText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  savedPlaceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  savedPlaceText: {
    flex: 1,
  },
  savedPlaceLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  savedPlaceAddress: {
    fontSize: 14,
    color: COLORS.text.tertiary,
  },
  addPlaceButton: {
    paddingVertical: 12,
  },
  addPlaceText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  menuSection: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.text.primary,
  },
  supportSection: {
    marginBottom: 24,
  },
  supportButton: {
    paddingVertical: 16,
    marginBottom: 12,
  },
  supportText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  logoutText: {
    fontSize: 16,
    color: COLORS.error,
    fontWeight: '500',
  },
  versionText: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    textAlign: 'center',
    marginTop: 16,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  logoutConfirmButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.error,
    alignItems: 'center',
  },
  logoutConfirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
