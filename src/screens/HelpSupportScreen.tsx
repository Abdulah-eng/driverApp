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
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const HelpSupportScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');

  const quickHelp = [
    {
      category: 'Account & Payment',
      question: 'How do I add a payment method?',
      icon: 'payment',
    },
    {
      category: 'Rides & Booking',
      question: 'How do I schedule a ride?',
      icon: 'schedule',
    },
    {
      category: 'Safety & Security',
      question: 'How do i share my trip',
      icon: 'security',
    },
  ];

  const faqs = [
    'How do I update my profile?',
    'How do I cancel a ride?',
    'What is the verification code?',
    'How do I report a safety issue?',
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Help & Support"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>Hey, Marcus 👋</Text>

        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={COLORS.text.tertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help..."
            placeholderTextColor={COLORS.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.liveChatButton}
          onPress={() => navigation.navigate('LiveChat')}>
          <Icon name="chat-bubble-outline" size={24} color={COLORS.primary} />
          <View style={styles.liveChatContent}>
            <Text style={styles.liveChatTitle}>Live chat available</Text>
            <Text style={styles.liveChatSubtitle}>
              Our support team is available 24/7 to assist you.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => navigation.navigate('ReportIssue')}>
          <Icon name="report-problem" size={24} color={COLORS.error} />
          <View style={styles.reportContent}>
            <Text style={styles.reportTitle}>Report an issue</Text>
            <Text style={styles.reportSubtitle}>
              Trip problems, safety concerns, lost items.
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Help</Text>
          {quickHelp.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.helpItem}
              onPress={() => navigation.navigate('HelpArticle', {item})}>
              <View style={styles.helpItemLeft}>
                <Icon name={item.icon} size={24} color={COLORS.primary} />
                <View style={styles.helpItemText}>
                  <Text style={styles.helpCategory}>{item.category}</Text>
                  <Text style={styles.helpQuestion}>{item.question}</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq, index) => (
            <TouchableOpacity
              key={index}
              style={styles.faqItem}
              onPress={() => navigation.navigate('HelpArticle', {question: faq})}>
              <Text style={styles.faqText}>{faq}</Text>
              <Icon name="chevron-right" size={24} color={COLORS.text.tertiary} />
            </TouchableOpacity>
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
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  liveChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  liveChatContent: {
    flex: 1,
  },
  liveChatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  liveChatSubtitle: {
    fontSize: 14,
    color: COLORS.text.primary,
    opacity: 0.8,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.error,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  reportContent: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  reportSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  helpItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  helpItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  helpItemText: {
    flex: 1,
  },
  helpCategory: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    marginBottom: 4,
  },
  helpQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  faqText: {
    fontSize: 16,
    color: COLORS.text.primary,
    flex: 1,
  },
});

export default HelpSupportScreen;
