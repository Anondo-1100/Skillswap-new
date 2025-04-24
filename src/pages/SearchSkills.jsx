import { useState } from 'react';
import { skillCategories, searchSkills } from '../data/skillsList';
import SkillCard from '../components/SkillCard';

export default function SearchSkills() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    let results = searchSkills(query);
    if (selectedCategory !== 'all') {
      results = results.filter(skill =>
        skillCategories[selectedCategory].includes(skill)
      );
    }
    setSearchResults(results);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="mx-auto px-4 py-8 container">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-bold text-gray-900 text-3xl text-center">
          Discover Skills to Learn
        </h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for skills..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="shadow-sm px-4 py-3 border border-gray-300 focus:border-indigo-500 rounded-lg focus:ring-2 focus:ring-indigo-500 w-full"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-full ${selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            All Categories
          </button>
          {Object.keys(skillCategories).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full ${selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Display */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {searchQuery.trim() === '' ? (
            // Show categories when no search query
            Object.entries(skillCategories).map(([category, skills]) => (
              <div key={category} className="bg-white shadow-md p-6 rounded-lg card">
                <h3 className="mb-4 font-semibold text-gray-900 text-xl">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-indigo-100 px-3 py-1 rounded-full text-indigo-700 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  {skills.length > 6 && (
                    <span className="text-gray-500 text-sm">
                      +{skills.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : searchResults.length > 0 ? (
            // Show search results
            searchResults.map((skill) => (
              <SkillCard
                key={skill}
                skill={skill}
                category={Object.keys(skillCategories).find(cat =>
                  skillCategories[cat].includes(skill)
                )}
              />
            ))
          ) : (
            // No results found
            <div className="col-span-full py-8 text-gray-500 text-center">
              No skills found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}