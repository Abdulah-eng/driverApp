import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VehicleManagementScreen = ({navigation}: any) => {
  const [vehicles] = useState([
    {
      id: '1',
      model: 'Toyota Camry 2020',
      plate: 'ABC-1234',
      color: 'White',
      isActive: true,
    },
  ]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Vehicles</Text>
        <TouchableOpacity>
          <Icon name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {vehicles.map((vehicle, index) => (
          <TouchableOpacity
            key={vehicle.id}
            style={[styles.vehicleCard, index === vehicles.length - 1 && styles.lastCard]}>
            <View style={styles.vehicleIcon}>
              <Icon name="directions-car" size={32} color="#007AFF" />
            </View>
            <View style={styles.vehicleInfo}>
              <View style={styles.vehicleHeader}>
                <Text style={styles.vehicleModel}>{vehicle.model}</Text>
                {vehicle.isActive && (
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeText}>Active</Text>
                  </View>
                )}
              </View>
              <Text style={styles.vehiclePlate}>License: {vehicle.plate}</Text>
              <Text style={styles.vehicleColor}>Color: {vehicle.color}</Text>
            </View>
            <TouchableOpacity>
              <Icon name="chevron-right" size={24} color="#C0C0C0" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.addButton}>
          <Icon name="add-circle-outline" size={24} color="#007AFF" />
          <Text style={styles.addButtonText}>Add Vehicle</Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Icon name="info-outline" size={20} color="#666666" />
          <Text style={styles.infoText}>
            You can add multiple vehicles to your account. Only one vehicle can be
            active at a time.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastCard: {
    borderBottomWidth: 0,
    marginBottom: 16,
  },
  vehicleIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  vehicleModel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  activeBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4CAF50',
  },
  vehiclePlate: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  vehicleColor: {
    fontSize: 14,
    color: '#666666',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
  infoSection: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E6',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default VehicleManagementScreen;
