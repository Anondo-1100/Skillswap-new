import { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api'
  : 'http://localhost:5000/api';

export function useMessages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (recipientId, content) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/messages`,
        { recipientId, content },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getConversations = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/messages/conversations`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get conversations');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getMessages = async (userId) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/messages/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get messages');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      await axios.delete(
        `${API_URL}/messages/${messageId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete message');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    sendMessage,
    getConversations,
    getMessages,
    deleteMessage
  };
}