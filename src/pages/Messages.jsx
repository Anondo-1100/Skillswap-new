import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMessages } from '../hooks/useMessages';
import { useAuth } from '../context/AuthContext';
import { useMessageScroll } from '../hooks/useMessageScroll';
import axios from 'axios';

const REFRESH_INTERVAL = 10000; // 10 seconds

const formatLastActive = (date) => {
  const now = new Date();
  const lastActive = new Date(date);
  const diffMinutes = Math.floor((now - lastActive) / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 5) {
    return 'Online';
  } else if (diffMinutes < 60) {
    return `Active ${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return `Active ${diffHours} hours ago`;
  } else {
    return `Active ${diffDays} days ago`;
  }
};

export default function Messages() {
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const { loading, error, sendMessage, getConversations, getMessages } = useMessages();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { messagesEndRef } = useMessageScroll(messages);

  useEffect(() => {
    loadConversations();
    const queryUserId = searchParams.get('user');
    if (queryUserId) {
      loadUserProfile(queryUserId);
    }

    // Set up auto-refresh intervals
    const conversationsInterval = setInterval(loadConversations, REFRESH_INTERVAL);
    const messagesInterval = setInterval(() => {
      if (selectedUser?._id) {
        loadMessages(selectedUser._id);
      }
    }, REFRESH_INTERVAL);

    // Cleanup intervals
    return () => {
      clearInterval(conversationsInterval);
      clearInterval(messagesInterval);
    };
  }, []);

  useEffect(() => {
    if (selectedUser) {
      loadMessages(selectedUser._id);
    }
  }, [selectedUser]);

  const loadConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (err) {
      console.error('Error loading conversations:', err);
    }
  };

  const loadMessages = async (userId) => {
    setIsLoadingMessages(true);
    try {
      const data = await getMessages(userId);
      setMessages(data);
    } catch (err) {
      console.error('Error loading messages:', err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const loadUserProfile = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedUser(response.data);
      loadMessages(userId);
    } catch (err) {
      console.error('Error loading user profile:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      await sendMessage(selectedUser._id, newMessage);
      setNewMessage('');
      await loadMessages(selectedUser._id);
      await loadConversations(); // Refresh conversation list
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg min-h-[600px]">
          <div className="grid grid-cols-12">
            {/* Conversations List */}
            <div className="col-span-4 border-r">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Messages</h2>
                {loading && (
                  <div className="animate-spin h-5 w-5 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
              </div>
              <div className="overflow-y-auto h-[calc(600px-64px)]">
                {conversations.map((conv) => (
                  <div
                    key={conv.user._id}
                    onClick={() => setSelectedUser(conv.user)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedUser?._id === conv.user._id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{conv.user.username}</h3>
                        <p className="text-sm text-gray-600 truncate">
                          {conv.lastMessage}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(conv.timestamp)}
                      </div>
                    </div>
                    {conv.unread > 0 && (
                      <span className="inline-block bg-indigo-600 text-white text-xs px-2 py-1 rounded-full mt-2">
                        {conv.unread} new
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Messages Area */}
            <div className="col-span-8">
              {selectedUser ? (
                <>
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {selectedUser.username}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatLastActive(selectedUser.lastActive)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        {isLoadingMessages && (
                          <div className="animate-spin h-5 w-5 text-indigo-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        )}
                        <button
                          onClick={() => navigate(`/profile/${selectedUser._id}`)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col h-[calc(600px-144px)]">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message._id}
                          className={`flex ${
                            message.sender._id === user?._id
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.sender._id === user?._id
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100'
                            }`}
                          >
                            <p>{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.sender._id === user?._id
                                  ? 'text-indigo-100'
                                  : 'text-gray-500'
                              }`}
                            >
                              {formatDate(message.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="p-4 border-t">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 input-field"
                        />
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn-primary px-6"
                        >
                          {loading ? 'Sending...' : 'Send'}
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select a conversation to start messaging
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}