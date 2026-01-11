import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const SafetyTipsScreen = ({navigation}: any) => {
  const tips = [
    {
      number: '1',
      title: 'Stay Aware at Pickup',
      description:
        'Confirm the passenger\'s name and destination before starting.',
    },
    {
      number: '2',
      title: 'Keep the Car Ready',
      description:
        'Ensure your vehicle is clean, safe, and comfortable for every trip.',
    },
    {
      number: '3',
      title: 'Follow Traffic Rules',
      description:
        'Help keep roads safe by following local laws and speed limits.',
    },
    {
      number: '4',
      title: 'Trust Your Instincts',
      description:
        'If something feels wrong, pause the trip or contact support.',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Safety Tips"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipCard}>
            <View style={styles.tipNumber}>
              <Text style={styles.tipNumberText}>{tip.number}</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipDescription}>{tip.description}</Text>
            </View>
          </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 16,
  },
  tipNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
});

export default SafetyTipsScreen;
