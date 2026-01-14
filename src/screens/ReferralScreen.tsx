import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Share,
  Alert,
  Platform,
  Clipboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const ReferralScreen = ({navigation}: any) => {
  const [promoCode, setPromoCode] = useState('');

  const referralCode = 'JOHN2024';
  const rewardsValue = 45.24;
  const totalPoints = 2548;
  const successfulReferrals = 24;

  const promotions = [
    {
      id: '1',
      title: '$5 off your ride',
      description: 'Valid on rides over $15',
      expires: '31/12/2024',
      code: 'SAVE5',
    },
    {
      id: '2',
      title: '$5 off your ride',
      description: 'Valid on rides over $15',
      expires: '31/12/2024',
      code: 'SAVE5',
    },
    {
      id: '3',
      title: '$5 off your ride',
      description: 'Valid on rides over $15',
      expires: '31/12/2024',
      code: 'SAVE5',
    },
  ];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Use my MOVO referral code ${referralCode} and we both get $10 credit!`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopy = (code: string = referralCode) => {
    try {
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        Clipboard.setString(code);
        Alert.alert('Copied!', `${code} has been copied to clipboard`);
      } else {
        // Fallback for web or other platforms
        Share.share({
          message: code,
        });
      }
    } catch (err) {
      // Fallback to share if clipboard fails
      Share.share({
        message: code,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Promotions"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.rewardsSection}>
          <Text style={styles.rewardsLabel}>Current rewards value</Text>
          <Text style={styles.rewardsValue}>${rewardsValue}</Text>
          <Text style={styles.pointsLabel}>Total Points</Text>
          <Text style={styles.pointsValue}>{totalPoints} Earned</Text>
        </View>

        <View style={styles.referralSection}>
          <Text style={styles.sectionTitle}>Refer a friend</Text>
          <Text style={styles.referralDescription}>
            Give $10, get $10. Share your code and you'll both receive a credit
            when they take their first ride.
          </Text>

          <View style={styles.referralCard}>
            <View style={styles.referralLeft}>
              <Text style={styles.referralCodeLabel}>Your referral code</Text>
              <View style={styles.referralCodeContainer}>
                <Text style={styles.referralCode}>{referralCode}</Text>
                <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
                  <Icon name="content-copy" size={20} color={COLORS.text.primary} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Icon name="share" size={20} color={COLORS.text.primary} />
                <Text style={styles.shareButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.referralRight}>
              <Text style={styles.successfulLabel}>Successful referrals</Text>
              <Text style={styles.successfulValue}>{successfulReferrals}</Text>
            </View>
          </View>
        </View>

        <View style={styles.promotionsSection}>
          <Text style={styles.sectionTitle}>Your promotions</Text>
          <View style={styles.promoInputContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Promo code"
              placeholderTextColor={COLORS.text.tertiary}
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>

          {promotions.map(promo => (
            <View key={promo.id} style={styles.promotionCard}>
              <View style={styles.promotionLeft}>
                <Text style={styles.promotionTitle}>{promo.title}</Text>
                <Text style={styles.promotionDescription}>{promo.description}</Text>
                <View style={styles.promotionExpiry}>
                  <Text style={styles.expiryLabel}>Promotions Expire</Text>
                  <Text style={styles.expiryDate}>{promo.expires}</Text>
                </View>
              </View>
              <View style={styles.promotionRight}>
                <View style={styles.promoCodeContainer}>
                  <Icon name="local-offer" size={20} color={COLORS.primary} />
                  <Text style={styles.promoCode}>{promo.code}</Text>
                  <TouchableOpacity onPress={() => handleCopy(promo.code)}>
                    <Icon
                      name="content-copy"
                      size={16}
                      color={COLORS.text.tertiary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  rewardsSection: {
    marginBottom: 24,
  },
  rewardsLabel: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    marginBottom: 4,
  },
  rewardsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  pointsLabel: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  referralSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  referralDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  referralCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    gap: 20,
  },
  referralLeft: {
    flex: 1,
  },
  referralCodeLabel: {
    fontSize: 12,
    color: COLORS.text.primary,
    opacity: 0.8,
    marginBottom: 8,
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  referralCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  copyButton: {
    padding: 4,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.text.primary,
    borderRadius: 8,
    padding: 12,
    gap: 8,
    alignSelf: 'flex-start',
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.background,
  },
  referralRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  successfulLabel: {
    fontSize: 12,
    color: COLORS.text.primary,
    opacity: 0.8,
    marginBottom: 4,
  },
  successfulValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  promotionsSection: {
    marginBottom: 24,
  },
  promoInputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  promoInput: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  promotionCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  promotionLeft: {
    flex: 1,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  promotionDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  promotionExpiry: {
    flexDirection: 'row',
    gap: 8,
  },
  expiryLabel: {
    fontSize: 12,
    color: COLORS.text.tertiary,
  },
  expiryDate: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    fontWeight: '500',
  },
  promotionRight: {
    justifyContent: 'center',
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  promoCode: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default ReferralScreen;
