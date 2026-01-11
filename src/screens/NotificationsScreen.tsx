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

const NotificationsScreen = ({navigation}: any) => {
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');

  const notifications = [
    {
      id: '1',
      type: 'trip',
      title: 'Trip completed',
      message: 'Thanks for riding with Michael! Rate your experience.',
      time: '2 hours ago',
      read: false,
      icon: 'location-on',
    },
    {
      id: '2',
      type: 'promo',
      title: 'Weekend special!',
      message: '20% off all rides this Saturday and Sunday. Use code WEEKEND20',
      time: '2 hours ago',
      read: false,
      icon: 'card-giftcard',
    },
    {
      id: '3',
      type: 'receipt',
      title: 'Receipt ready',
      message: 'Your receipt for the trip to Times Square is ready to download',
      time: '3 hours ago',
      read: true,
      icon: 'location-on',
    },
    {
      id: '4',
      type: 'feature',
      title: 'New feature: Multi...',
      message: 'Your receipt for the trip to Times Square is ready to download',
      time: '1 day ago',
      read: true,
      icon: 'help-outline',
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications =
    filter === 'All'
      ? notifications
      : notifications.filter(n => !n.read);

  const markAsRead = (id: string) => {
    // TODO: Implement mark as read
  };

  const markAllAsRead = () => {
    // TODO: Implement mark all as read
  };

  if (filter === 'Unread' && filteredNotifications.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header
          title="Notification"
          showMenu={false}
          showBell={false}
          showBack={true}
          onBack={() => navigation.goBack()}
        />
        <View style={styles.emptyContainer}>
          <Icon name="notifications-off" size={64} color={COLORS.text.tertiary} />
          <Text style={styles.emptyTitle}>No unread notifications</Text>
          <Text style={styles.emptySubtitle}>You're all caught up!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Notification</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markAllText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'All' && styles.filterButtonActive]}
          onPress={() => setFilter('All')}>
          <Text
            style={[
              styles.filterButtonText,
              filter === 'All' && styles.filterButtonTextActive,
            ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'Unread' && styles.filterButtonActive,
          ]}
          onPress={() => setFilter('Unread')}>
          <Text
            style={[
              styles.filterButtonText,
              filter === 'Unread' && styles.filterButtonTextActive,
            ]}>
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {filteredNotifications.map(notification => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationItem,
              !notification.read && styles.notificationItemUnread,
            ]}
            onPress={() => markAsRead(notification.id)}>
            <View style={styles.notificationIcon}>
              <Icon
                name={notification.icon}
                size={24}
                color={COLORS.primary}
              />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>
                {notification.message}
              </Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
            {!notification.read && (
              <TouchableOpacity
                style={styles.markReadButton}
                onPress={() => markAsRead(notification.id)}>
                <Text style={styles.markReadText}>Mark as read</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  markAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  filters: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: COLORS.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  notificationItemUnread: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: COLORS.text.tertiary,
  },
  markReadButton: {
    padding: 4,
  },
  markReadText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.text.tertiary,
  },
});

export default NotificationsScreen;
