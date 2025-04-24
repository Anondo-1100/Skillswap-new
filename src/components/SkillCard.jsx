export default function SkillCard({ skill, type = 'offered', onDelete }) {
  const proficiencyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-blue-100 text-blue-800',
    Advanced: 'bg-purple-100 text-purple-800',
    Expert: 'bg-pink-100 text-pink-800'
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 relative hover:shadow-md transition-shadow">
      <button
        onClick={() => onDelete(skill._id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
        aria-label="Delete skill"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <h4 className="font-semibold text-lg mb-2">{skill.name}</h4>
      {type === 'offered' && skill.proficiency && (
        <span className={`inline-block px-2 py-1 text-sm rounded-full ${proficiencyColors[skill.proficiency]}`}>
          {skill.proficiency}
        </span>
      )}
      {skill.description && (
        <p className="text-gray-600 mt-2 text-sm">{skill.description}</p>
      )}
    </div>
  );
}