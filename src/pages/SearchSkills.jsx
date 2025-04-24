import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSkills } from '../hooks/useSkills';
import { useAuth } from '../context/AuthContext';

export default function SearchSkills() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { loading, error, searchSkills } = useSkills();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const results = await searchSkills(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleMessage = (userId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/messages?user=${userId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Find Skills to Learn</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for skills..."
              className="input-field flex-1"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-8"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((result) => (
            <div key={result._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg">{result.username}</h3>
                {user && user._id !== result._id && (
                  <button
                    onClick={() => handleMessage(result._id)}
                    className="text-indigo-600 hover:text-indigo-800"
                    title="Send message"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {result.skillsOffered?.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-2 rounded flex items-center justify-between"
                  >
                    <span>{skill.name}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      skill.proficiency === 'Beginner' ? 'bg-green-100 text-green-800' :
                      skill.proficiency === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                      skill.proficiency === 'Advanced' ? 'bg-purple-100 text-purple-800' :
                      'bg-pink-100 text-pink-800'
                    }`}>
                      {skill.proficiency}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={`/profile/${result._id}`}
                  className="btn-secondary"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

        {searchResults.length === 0 && searchQuery && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">No users found with matching skills.</p>
          </div>
        )}
      </div>
    </div>
  );
}