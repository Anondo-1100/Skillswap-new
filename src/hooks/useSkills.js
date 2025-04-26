import { useState } from 'react';
import axios from 'axios';

// Using relative URL for API calls
const API_URL = '/api';

export function useSkills() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addOfferedSkill = async (skillData) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/skills/offer`,
        skillData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add skill');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addWantedSkill = async (skillData) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/skills/want`,
        skillData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add skill');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeOfferedSkill = async (skillId) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${API_URL}/skills/offer/${skillId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove skill');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeWantedSkill = async (skillId) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${API_URL}/skills/want/${skillId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove skill');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchSkills = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/skills/search?skill=${query}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search skills');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    addOfferedSkill,
    addWantedSkill,
    removeOfferedSkill,
    removeWantedSkill,
    searchSkills
  };
}