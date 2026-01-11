import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const TripCompletionScreen = ({navigation, route}: any) => {
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tipPercentage, setTipPercentage] = useState<number | null>(null);

  const fare = route?.params?.fare || 12.54;
  const paymentMethod = route?.params?.paymentMethod || 'Card.... 9321';

  const feedbackTags = [
    'Late arrival',
    'Driver Issue',
    'Route Issue',
    'Payment issue',
    'Great music',
    'Everything was fine',
  ];

  const tipOptions = [10, 15, 20];

  const toggleTag = (tag: string) => {
    if (tag === 'Everything was fine') {
      setSelectedTags(['Everything was fine']);
    } else {
      setSelectedTags(prev =>
        prev.includes('Everything was fine')
          ? [tag]
          : prev.includes(tag)
          ? prev.filter(t => t !== tag)
          : [...prev, tag],
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        showMenu={false}
        showBell={false}
        showBack={false}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.completionContainer}>
          <View style={styles.checkmarkCircle}>
            <Icon name="check" size={48} color={COLORS.success} />
          </View>
          <Text style={styles.completionText}>Ride completed</Text>
        </View>

        <View style={styles.fareContainer}>
          <Text style={styles.fareAmount}>${fare}</Text>
          <Text style={styles.paymentMethod}>Paid with {paymentMethod}</Text>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>How was your ride?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={styles.starButton}>
                <Icon
                  name="star"
                  size={40}
                  color={star <= rating ? '#FFD700' : COLORS.border}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>Did everything go as expected?</Text>
          <View style={styles.tagsContainer}>
            {feedbackTags.map(tag => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tag,
                  selectedTags.includes(tag) && styles.tagSelected,
                ]}
                onPress={() => toggleTag(tag)}>
                <Text
                  style={[
                    styles.tagText,
                    selectedTags.includes(tag) && styles.tagTextSelected,
                  ]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>Add a tip</Text>
          <Text style={styles.tipSubtitle}>Support your driver</Text>
          <View style={styles.tipOptions}>
            {tipOptions.map(percent => (
              <TouchableOpacity
                key={percent}
                style={[
                  styles.tipButton,
                  tipPercentage === percent && styles.tipButtonSelected,
                ]}
                onPress={() => setTipPercentage(percent)}>
                <Text
                  style={[
                    styles.tipButtonText,
                    tipPercentage === percent && styles.tipButtonTextSelected,
                  ]}>
                  {percent}%
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[
                styles.tipButton,
                tipPercentage === 0 && styles.tipButtonSelected,
              ]}
              onPress={() => setTipPercentage(0)}>
              <Text
                style={[
                  styles.tipButtonText,
                  tipPercentage === 0 && styles.tipButtonTextSelected,
                ]}>
                Custom
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('TripReceipt', {fare, tipPercentage})}>
          <Text style={styles.continueButtonText}>Continue</Text>
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
    padding: 24,
  },
  completionContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  completionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  fareContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  fareAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  paymentMethod: {
    fontSize: 14,
    color: COLORS.text.tertiary,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  starButton: {
    padding: 4,
  },
  feedbackContainer: {
    marginBottom: 32,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  tagSelected: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success + '20',
  },
  tagText: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  tagTextSelected: {
    color: COLORS.success,
    fontWeight: '600',
  },
  tipContainer: {
    marginBottom: 32,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  tipSubtitle: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    marginBottom: 16,
  },
  tipOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  tipButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  tipButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '20',
  },
  tipButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
  tipButtonTextSelected: {
    color: COLORS.primary,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
});

export default TripCompletionScreen;
