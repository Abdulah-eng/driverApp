import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../utils/constants';

interface HeaderProps {
  title?: string;
  showMenu?: boolean;
  showBell?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  onMenuPress?: () => void;
  onBellPress?: () => void;
  location?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showMenu = true,
  showBell = true,
  showBack = false,
  onBack,
  onMenuPress,
  onBellPress,
  location = 'ZVELI NADZALADEVI',
}) => {
  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity onPress={onBack} style={styles.iconButton}>
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      ) : showMenu ? (
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Icon name="menu" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconButton} />
      )}

      <View style={styles.logoContainer}>
        <Text style={styles.logo}>MOVO</Text>
        {!title && <Text style={styles.location}>{location}</Text>}
        {title && <Text style={styles.headerTitle}>{title}</Text>}
      </View>

      {showBell ? (
        <TouchableOpacity onPress={onBellPress} style={styles.iconButton}>
          <Icon name="notifications" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconButton} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  location: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    marginTop: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginTop: 2,
  },
});

export default Header;
