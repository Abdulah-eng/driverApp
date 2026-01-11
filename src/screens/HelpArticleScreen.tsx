import React from 'react';
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

const HelpArticleScreen = ({navigation, route}: any) => {
  const article = route?.params?.item || {
    question: 'How do I add a payment method?',
    answer: 'Go to your profile, select "Payment methods", and tap "Add payment method". Enter your card details and save.',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Help article"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.question}>{article.question}</Text>

        <View style={styles.stepSection}>
          <Text style={styles.stepTitle}>Step by Step</Text>
          <Text style={styles.stepText}>{article.answer}</Text>
        </View>

        <Text style={styles.content}>
          Figma ipsum object share opacity pixel fill object plugin shadow edit
          export overflow figjam outline pen content flows subtract variant
          background layer flows frame outline outline share rectangle blur
          rotate connection layer scale arrow project mask stroke mask variant
          shadow bullet rectangle share flatten pencil flows figma polygon link
          thumbnail reesizing list slice edit overflow thumbnail pencil invite
          asset group select overflow selection project share team main effect
          boolean auto boolean follower vertical community rectangle style ipsum
          team italic selection layout comment link edit horizontal share arrange
          union community inspect style group export subtract hand vertical figma
          bullet inspect content auto image image pixel arrow strikethrough team
          figma hand image scrolling hand mask move line pencil share library
          select project ipsum background device select layout content rotate
          export font image style prototype style undo strikethrough pencil
          horizontal flows frame variant align pen strikethrough object pen
          bullet layout group group bullet slice share main clip arrange
          underline arrow team arrange figma library figjam auto subtract text
          plugin reesizing content link undo prototype boolean community
          rectangle cw duplicate arrow horizontal edit editor polygon boolean
          move italic edit editor polygon boolean move italic.
        </Text>

        <View style={styles.helpfulSection}>
          <Text style={styles.helpfulTitle}>Was this helpful?</Text>
          <View style={styles.helpfulButtons}>
            <TouchableOpacity style={styles.helpfulButton}>
              <Icon name="thumb-up" size={20} color={COLORS.text.primary} />
              <Text style={styles.helpfulButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpfulButton}>
              <Icon name="thumb-down" size={20} color={COLORS.text.primary} />
              <Text style={styles.helpfulButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => navigation.navigate('LiveChat')}>
          <Text style={styles.contactButtonText}>Contact Support</Text>
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
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 24,
  },
  stepSection: {
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  stepText: {
    fontSize: 16,
    color: COLORS.text.secondary,
    lineHeight: 24,
  },
  content: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 22,
    marginBottom: 32,
  },
  helpfulSection: {
    marginBottom: 32,
  },
  helpfulTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  helpfulButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  helpfulButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  helpfulButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  contactButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
});

export default HelpArticleScreen;
