import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSkills } from '../hooks/useSkills';
import SkillCard from '../components/SkillCard';
import axios from 'axios';

export default function Profile() {
  const { userId } = useParams();
  const { user, refreshUser } = useAuth();
  const { loading, error, addOfferedSkill, addWantedSkill, removeOfferedSkill, removeWantedSkill } = useSkills();
  
  const [profileUser, setProfileUser] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isOwnProfile = !userId || userId === user?._id;

  useEffect(() => {
    if (!isOwnProfile && userId) {
      const fetchUserProfile = async () => {
        setIsLoading(true);
        setFetchError(null);
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfileUser(response.data);
        } catch (err) {
          setFetchError(err.response?.data?.message || 'Failed to load user profile');
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserProfile();
    } else {
      setProfileUser(user);
    }
  }, [userId, user, isOwnProfile]);

  const displayUser = isOwnProfile ? user : profileUser;

  const [newOfferedSkill, setNewOfferedSkill] = useState({
    name: '',
    proficiency: 'Beginner',
    description: ''
  });

  const [newWantedSkill, setNewWantedSkill] = useState({
    name: '',
    description: ''
  });

  const handleAddOfferedSkill = async (e) => {
    e.preventDefault();
    try {
      await addOfferedSkill(newOfferedSkill);
      await refreshUser();
      setNewOfferedSkill({ name: '', proficiency: 'Beginner', description: '' });
    } catch (err) {
      console.error('Failed to add skill:', err);
    }
  };

  const handleAddWantedSkill = async (e) => {
    e.preventDefault();
    try {
      await addWantedSkill(newWantedSkill);
      await refreshUser();
      setNewWantedSkill({ name: '', description: '' });
    } catch (err) {
      console.error('Failed to add skill:', err);
    }
  };

  const handleRemoveOfferedSkill = async (skillId) => {
    try {
      await removeOfferedSkill(skillId);
      await refreshUser();
    } catch (err) {
      console.error('Failed to remove skill:', err);
    }
  };

  const handleRemoveWantedSkill = async (skillId) => {
    try {
      await removeWantedSkill(skillId);
      await refreshUser();
    } catch (err) {
      console.error('Failed to remove skill:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-700">{fetchError}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Info Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {isOwnProfile ? 'My Profile' : `${displayUser?.username}'s Profile`}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <p className="mt-1 text-lg">{displayUser?.username}</p>
                </div>
                {isOwnProfile && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-lg">{displayUser?.email}</p>
                  </div>
                )}
              </div>
            </div>
            {!isOwnProfile && (
              <Link
                to={`/messages?user=${displayUser?._id}`}
                className="btn-primary flex items-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Send Message
              </Link>
            )}
          </div>
        </div>

        {/* Skills They Can Teach Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {isOwnProfile ? 'Skills I Can Teach' : `Skills ${displayUser?.username} Can Teach`}
          </h3>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {displayUser?.skillsOffered?.map((skill) => (
              <SkillCard
                key={skill._id}
                skill={skill}
                type="offered"
                onDelete={isOwnProfile ? handleRemoveOfferedSkill : undefined}
              />
            ))}
          </div>
          {isOwnProfile && (
            <form onSubmit={handleAddOfferedSkill}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={newOfferedSkill.name}
                    onChange={(e) => setNewOfferedSkill({
                      ...newOfferedSkill,
                      name: e.target.value
                    })}
                    className="input-field mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Proficiency Level
                  </label>
                  <select
                    value={newOfferedSkill.proficiency}
                    onChange={(e) => setNewOfferedSkill({
                      ...newOfferedSkill,
                      proficiency: e.target.value
                    })}
                    className="input-field mt-1"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={newOfferedSkill.description}
                    onChange={(e) => setNewOfferedSkill({
                      ...newOfferedSkill,
                      description: e.target.value
                    })}
                    className="input-field mt-1"
                    rows="3"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Adding...' : 'Add Skill'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Skills They Want to Learn Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            {isOwnProfile ? 'Skills I Want to Learn' : `Skills ${displayUser?.username} Wants to Learn`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {displayUser?.skillsWanted?.map((skill) => (
              <SkillCard
                key={skill._id}
                skill={skill}
                type="wanted"
                onDelete={isOwnProfile ? handleRemoveWantedSkill : undefined}
              />
            ))}
          </div>
          {isOwnProfile && (
            <form onSubmit={handleAddWantedSkill}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={newWantedSkill.name}
                    onChange={(e) => setNewWantedSkill({
                      ...newWantedSkill,
                      name: e.target.value
                    })}
                    className="input-field mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={newWantedSkill.description}
                    onChange={(e) => setNewWantedSkill({
                      ...newWantedSkill,
                      description: e.target.value
                    })}
                    className="input-field mt-1"
                    rows="3"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Adding...' : 'Add Skill'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}