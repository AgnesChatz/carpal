'use client';

import { useEffect, useState, useCallback } from 'react';
import { client } from '@/lib/appwrite';

export function useRealtimeMessages(channel, onMessage) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!channel) return;

    // Subscribe to realtime updates
    const unsubscribe = client.subscribe(
      `databases.carpal_db.collections.messages.documents`,
      (response) => {
        const { events, payload } = response;
        
        // Check if this message belongs to our channel
        if (payload && onMessage) {
          onMessage(payload, events);
        }
      }
    );

    setIsConnected(true);

    return () => {
      unsubscribe();
      setIsConnected(false);
    };
  }, [channel, onMessage]);

  return { isConnected };
}

// Hook for a specific conversation
export function useConversation(userId, otherUserId) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  // Load initial messages
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      try {
        const { getMessages } = await import('@/lib/db');
        const msgs = await getMessages(userId, otherUserId);
        setMessages(msgs);
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId && otherUserId) {
      loadMessages();
    }
  }, [userId, otherUserId]);

  // Subscribe to realtime updates
  useEffect(() => {
    if (!userId || !otherUserId) return;

    const unsubscribe = client.subscribe(
      'databases.carpal_db.collections.messages.documents',
      (response) => {
        const { events, payload } = response;
        
        // Check if message belongs to this conversation
        const isRelevant = 
          (payload.senderId === userId && payload.receiverId === otherUserId) ||
          (payload.senderId === otherUserId && payload.receiverId === userId);

        if (!isRelevant) return;

        if (events.includes('databases.*.collections.*.documents.*.create')) {
          setMessages(prev => [...prev, payload]);
        } else if (events.includes('databases.*.collections.*.documents.*.update')) {
          setMessages(prev => prev.map(m => m.id === payload.id ? payload : m));
        } else if (events.includes('databases.*.collections.*.documents.*.delete')) {
          setMessages(prev => prev.filter(m => m.id !== payload.id));
        }
      }
    );

    setIsConnected(true);

    return () => {
      unsubscribe();
      setIsConnected(false);
    };
  }, [userId, otherUserId]);

  const sendMessage = useCallback(async (text) => {
    try {
      const { sendMessage: sendMsg } = await import('@/lib/db');
      const newMessage = await sendMsg({
        senderId: userId,
        receiverId: otherUserId,
        text,
        createdAt: new Date().toISOString()
      });
      
      // Optimistically add to list
      setMessages(prev => [...prev, newMessage]);
      return newMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }, [userId, otherUserId]);

  const markAsRead = useCallback(async (messageId) => {
    try {
      const { updateMessage } = await import('@/lib/db');
      await updateMessage(messageId, { read: true });
      
      setMessages(prev => prev.map(m => 
        m.id === messageId ? { ...m, read: true } : m
      ));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  }, []);

  return {
    messages,
    isLoading,
    isConnected,
    sendMessage,
    markAsRead
  };
}
