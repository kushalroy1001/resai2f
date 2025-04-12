// src/components/resume/sections/HobbiesSection.jsx
import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { FiPlus, FiX } from 'react-icons/fi';

export default function HobbiesSection() {
  const { resumeData, updateSection } = useResume();
  const [hobbies, setHobbies] = useState(resumeData.hobbies);
  const [newHobby, setNewHobby] = useState('');

  // Handle adding a new hobby
  const handleAddHobby = () => {
    if (!newHobby.trim()) return;
    
    const updatedHobbies = [...hobbies, newHobby.trim()];
    setHobbies(updatedHobbies);
    updateSection('hobbies', updatedHobbies);
    setNewHobby('');
  };

  // Handle removing a hobby
  const handleRemoveHobby = (index) => {
    const updatedHobbies = hobbies.filter((_, i) => i !== index);
    setHobbies(updatedHobbies);
    updateSection('hobbies', updatedHobbies);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Hobbies & Interests</h3>
        <p className="text-sm text-gray-500 mb-4">
          Adding personal interests can help create a more well-rounded impression and may serve as conversation starters in interviews.
          Include hobbies that demonstrate valuable skills or qualities relevant to your target role.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 group"
            >
              {hobby}
              <button
                type="button"
                onClick={() => handleRemoveHobby(index)}
                className="ml-1.5 text-green-500 hover:text-green-700 focus:outline-none"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          ))}
          {hobbies.length === 0 && (
            <p className="text-sm text-gray-500 italic">No hobbies added yet</p>
          )}
        </div>

        <div className="flex">
          <input
            type="text"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            placeholder="Add a hobby or interest..."
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddHobby();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddHobby}
            disabled={!newHobby.trim()}
            className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <FiPlus className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Press Enter to add a hobby. Examples: Photography, Hiking, Chess, Volunteering, Playing Guitar
        </p>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Tips for adding hobbies:</h4>
        <ul className="text-xs text-gray-500 space-y-1 list-disc pl-5">
          <li>Include hobbies that demonstrate valuable skills (leadership, creativity, teamwork)</li>
          <li>Consider interests that align with company culture or industry</li>
          <li>Be specific rather than generic (e.g., "Mountain biking" instead of just "Sports")</li>
          <li>Only include genuine interests you can comfortably discuss</li>
          <li>Avoid controversial or potentially divisive topics</li>
        </ul>
      </div>
    </div>
  );
}
