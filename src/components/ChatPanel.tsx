import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useChat } from '../hooks/useChat';
import { sendMessage, ChatMessage } from '../lib/chat'; 
import { askNotificationPermission } from '../lib/notifications';

type ChatPanelProps = {
  eventId: number;
  eventTitle: string;
};

export function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState('');

  useEffect(() => {
    askNotificationPermission();
  }, []);

  const handleSend = () => {
    const trimmed = text.trim();
    if (trimmed) {
      sendMessage(eventId, trimmed);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live chat</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a message"
        maxLength={200}
        value={text}
        onChangeText={setText}
      />
      <Pressable
        style={({ pressed }) => [
          styles.sendButton,
          pressed && styles.sendButtonPressed,
          !text.trim() && styles.sendButtonDisabled,
        ]}
        onPress={handleSend}
        disabled={!text.trim()}
      >
        <Text style={styles.sendButtonText}>Send</Text>
      </Pressable>

      {status === 'connecting' && <Text style={styles.statusText}>Connecting</Text>}
      {status === 'error' && <Text style={styles.errorText}>Chat unavailable</Text>}
      {status === 'live' && messages.length === 0 && (
        <Text style={styles.statusText}>No messages yet</Text>
      )}

      {messages.map((msg: ChatMessage) => ( 
        <Text key={msg.id} style={styles.message}>
          {msg.author}: {msg.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
      marginTop: 20, 
      width: '100%', 
      paddingHorizontal: 16 
    },
    heading: { 
      fontSize: 18, 
      fontWeight: 'bold', 
      marginBottom: 10, 
      color: '#333' 
    },
    input: { 
      backgroundColor: '#fff', 
      padding: 10, 
      borderRadius: 8, 
      marginBottom: 8, 
      borderWidth: 1, 
      borderColor: '#ccc' 
    },
    sendButton: { 
      backgroundColor: '#F977B4', 
      paddingVertical: 12, 
      borderRadius: 8, 
      minHeight: 44, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    sendButtonPressed: { 
      opacity: 0.8 
    },
    sendButtonDisabled: { 
      opacity: 0.5 
    },
    sendButtonText: { 
      color: '#fff', 
      fontWeight: 'bold', 
      fontSize: 16 
    },
    statusText: { 
      fontSize: 14, 
      color: '#666', 
      marginTop: 10 
    },
    errorText: { 
      fontSize: 14, 
      color: '#dc2626', 
      marginTop: 10 
    },
    message: { 
      fontSize: 14, 
      color: '#333', 
      marginTop: 6 
    },
  });