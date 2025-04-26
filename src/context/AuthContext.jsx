import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../components/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import axios from 'axios';

const AuthContext = createContext({});
const API_URL = '/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get token from Firebase
        const token = await firebaseUser.getIdToken();
        // Store token
        localStorage.setItem('token', token);

        try {
          // Get additional user data from your backend
          const response = await axios.get(`${API_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser({ ...firebaseUser, ...response.data });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { email, password, username } = userData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);

      // Create user profile in your backend
      await axios.post(`${API_URL}/users/profile`,
        { username },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const refreshUser = async () => {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken(true);
      localStorage.setItem('token', token);
      try {
        const response = await axios.get(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser({ ...auth.currentUser, ...response.data });
      } catch (error) {
        console.error('Error refreshing user:', error);
      }
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};