import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {COLORS} from '../utils/constants';

const LiveChatScreen = ({navigation}: any) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hi! How can we help you today?',
      sender: 'agent',
      time: '4:23',
    },
    {
      id: '2',
      text: 'Payment not received',
      sender: 'user',
      time: '4:24',
    },
  ]);

  const suggestedActions = [
    'Trip issue',
    'Report passenger',
    'Document question',
  ];

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: message,
          sender: 'user',
          time: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          }),
        },
      ]);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Live Chat Support 24/7"
        showMenu={false}
        showBell={false}
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Start a Conversation</Text>
          <Text style={styles.subtitle}>
            Agent typically replies in 1-2 minutes.
          </Text>
        </View>

        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}>
          {messages.map(msg => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.sender === 'user' ? styles.userMessage : styles.agentMessage,
              ]}>
              <Text
                style={[
                  styles.messageText,
                  msg.sender === 'user' && styles.userMessageText,
                ]}>
                {msg.text}
              </Text>
              <Text
                style={[
                  styles.messageTime,
                  msg.sender === 'user' && styles.userMessageTime,
                ]}>
                {msg.time}
              </Text>
            </View>
          ))}
        </ScrollView>

        {messages.length === 2 && (
          <View style={styles.suggestedActions}>
            {suggestedActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestedButton}
                onPress={() => setMessage(action)}>
                <Text style={styles.suggestedButtonText}>{action}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor={COLORS.text.tertiary}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={!message.trim()}>
            <Icon
              name="send"
              size={20}
              color={message.trim() ? COLORS.primary : COLORS.text.tertiary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  agentMessage: {
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: COLORS.success,
    borderTopRightRadius: 4,
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  userMessageText: {
    color: COLORS.text.primary,
  },
  messageTime: {
    fontSize: 12,
    color: COLORS.text.primary,
    opacity: 0.7,
  },
  userMessageTime: {
    color: COLORS.text.primary,
    opacity: 0.7,
  },
  suggestedActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  suggestedButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  suggestedButtonText: {
    fontSize: 14,
    color: COLORS.text.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.text.primary,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.background,
    maxHeight: 100,
  },
  sendButton: {
    padding: 4,
  },
});

export default LiveChatScreen;
