import { useEffect, useRef } from 'react';

export function useMessageScroll(messages) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return {
    messagesEndRef,
    scrollToBottom
  };
}