import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SkillCard = ({ skill, category }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-shadow duration-200">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="mb-2 font-semibold text-gray-900 text-xl">{skill}</h3>
            <span className="inline-block bg-indigo-100 px-3 py-1 rounded-full text-indigo-700 text-sm">
              {category}
            </span>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-4">
          <Link
            to={`/search?skill=${encodeURIComponent(skill)}`}
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 shadow-sm px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-white text-sm"
          >
            Find Teachers
          </Link>
          <Link
            to={`/search?skill=${encodeURIComponent(skill)}&mode=learn`}
            className="inline-flex items-center bg-white hover:bg-indigo-50 shadow-sm px-4 py-2 border border-indigo-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-indigo-600 text-sm"
          >
            Learn This
          </Link>
        </div>
      </div>
    </div>
  );
};

SkillCard.propTypes = {
  skill: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
};

export default SkillCard;