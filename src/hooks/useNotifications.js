import { useState, useEffect } from 'react';
import { useMessages } from './useMessages';

export function useNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);
  const { getConversations } = useMessages();

  const checkUnreadMessages = async () => {
    try {
      const conversations = await getConversations();
      const count = conversations.reduce((total, conv) => total + conv.unread, 0);
      setUnreadCount(count);
      
      // Update browser tab title
      document.title = count > 0 ? `(${count}) SkillSwap` : 'SkillSwap';
    } catch (err) {
      console.error('Failed to check unread messages:', err);
    }
  };

  useEffect(() => {
    checkUnreadMessages();
    const interval = setInterval(checkUnreadMessages, 30000); // Check every 30 seconds

    return () => {
      clearInterval(interval);
      document.title = 'SkillSwap'; // Reset title on unmount
    };
  }, []);

  return {
    unreadCount,
    checkUnreadMessages
  };
}