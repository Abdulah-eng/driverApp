import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const ScheduleRideScreen = ({navigation}: any) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = [
    {label: 'Today', date: 'Nov 11', fullDate: '2024-11-11'},
    {label: 'Tomorrow', date: 'Nov 12', fullDate: '2024-11-12'},
    {label: 'Thu', date: 'Nov 13', fullDate: '2024-11-13'},
    {label: 'Fri', date: 'Nov 14', fullDate: '2024-11-14'},
    {label: 'Sat', date: 'Nov 15', fullDate: '2024-11-15'},
    {label: 'Sun', date: 'Nov 16', fullDate: '2024-11-16'},
    {label: 'Mon', date: 'Nov 17', fullDate: '2024-11-17'},
  ];

  const times = [
    '6:00 AM',
    '6:30 AM',
    '7:00 AM',
    '7:30 AM',
    '8:00 AM',
    '8:30 AM',
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
  ];

  const pickup = '456 Oak Ave, Brooklyn, NY';
  const destination = '456 Oak Ave, Brooklyn, NY';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Schedule ride"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.infoText}>
          Your driver will arrive within 10 minutes of your scheduled time.
          You'll receive a reminder notification 30 minutes before.
        </Text>

        <View style={styles.routeInfo}>
          <View style={styles.routeItem}>
            <Icon name="location-on" size={20} color={COLORS.primary} />
            <View style={styles.routeDots}>
              <View style={styles.dot} />
              <View style={styles.dotLine} />
              <View style={[styles.dot, styles.dotDestination]} />
            </View>
            <View style={styles.routeText}>
              <Text style={styles.routeLabel}>Pickup</Text>
              <Text style={styles.routeAddress}>{pickup}</Text>
            </View>
          </View>
          <View style={styles.routeItem}>
            <Icon name="place" size={20} color={COLORS.error} />
            <View style={styles.routeDots}>
              <View style={styles.dotPlaceholder} />
              <View style={styles.dotPlaceholder} />
              <View style={styles.dotPlaceholder} />
            </View>
            <View style={styles.routeText}>
              <Text style={styles.routeLabel}>Destination</Text>
              <Text style={styles.routeAddress}>{destination}</Text>
            </View>
          </View>
        </View>

        <View style={styles.dateSection}>
          <View style={styles.sectionHeader}>
            <Icon name="calendar-today" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Select date</Text>
          </View>
          <View style={styles.dateGrid}>
            {dates.map(date => (
              <TouchableOpacity
                key={date.fullDate}
                style={[
                  styles.dateButton,
                  selectedDate === date.fullDate && styles.dateButtonSelected,
                ]}
                onPress={() => setSelectedDate(date.fullDate)}>
                <Text
                  style={[
                    styles.dateLabel,
                    selectedDate === date.fullDate && styles.dateLabelSelected,
                  ]}>
                  {date.label}
                </Text>
                <Text
                  style={[
                    styles.dateValue,
                    selectedDate === date.fullDate && styles.dateValueSelected,
                  ]}>
                  {date.date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.timeSection}>
          <Text style={styles.sectionTitle}>Select time</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.timeScroll}>
            {times.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeButton,
                  selectedTime === time && styles.timeButtonSelected,
                ]}
                onPress={() => setSelectedTime(time)}>
                <Text
                  style={[
                    styles.timeButtonText,
                    selectedTime === time && styles.timeButtonTextSelected,
                  ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[
            styles.scheduleButton,
            selectedDate && selectedTime && styles.scheduleButtonActive,
          ]}
          disabled={!selectedDate || !selectedTime}
          onPress={() => {
            navigation.navigate('RideSelection', {
              scheduled: true,
              date: selectedDate,
              time: selectedTime,
            });
          }}>
          <Text
            style={[
              styles.scheduleButtonText,
              selectedDate &&
                selectedTime &&
                styles.scheduleButtonTextActive,
            ]}>
            Schedule ride
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
  infoText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginBottom: 24,
  },
  routeInfo: {
    marginBottom: 32,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  routeDots: {
    alignItems: 'center',
    width: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  dotLine: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.primary,
    marginVertical: 4,
  },
  dotDestination: {
    backgroundColor: COLORS.error,
  },
  dotPlaceholder: {
    width: 8,
    height: 8,
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
  dateSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dateButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    minWidth: 100,
    alignItems: 'center',
  },
  dateButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dateLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  dateLabelSelected: {
    color: COLORS.text.primary,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  dateValueSelected: {
    color: COLORS.text.primary,
  },
  timeSection: {
    marginBottom: 32,
  },
  timeScroll: {
    marginTop: 16,
  },
  timeButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    marginRight: 12,
  },
  timeButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeButtonText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  timeButtonTextSelected: {
    color: COLORS.text.primary,
  },
  scheduleButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  scheduleButtonActive: {
    backgroundColor: COLORS.primary,
  },
  scheduleButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.tertiary,
  },
  scheduleButtonTextActive: {
    color: COLORS.text.primary,
  },
});

export default ScheduleRideScreen;
