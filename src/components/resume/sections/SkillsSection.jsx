// src/components/resume/sections/SkillsSection.jsx
import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function SkillsSection() {
  const { resumeData, updateSection } = useResume();
  const [skills, setSkills] = useState(resumeData.skills);
  const [activeCategory, setActiveCategory] = useState(0);
  const [newSkill, setNewSkill] = useState('');
  const [newCategory, setNewCategory] = useState('');

  // Handle adding a new skill
  const handleAddSkill = (categoryIndex) => {
    if (!newSkill.trim()) return;
    
    const updatedSkills = [...skills];
    updatedSkills[categoryIndex] = {
      ...updatedSkills[categoryIndex],
      skills: [...updatedSkills[categoryIndex].skills, newSkill.trim()]
    };
    
    setSkills(updatedSkills);
    updateSection('skills', updatedSkills);
    setNewSkill('');
  };

  // Handle removing a skill
  const handleRemoveSkill = (categoryIndex, skillIndex) => {
    const updatedSkills = [...skills];
    updatedSkills[categoryIndex] = {
      ...updatedSkills[categoryIndex],
      skills: updatedSkills[categoryIndex].skills.filter((_, i) => i !== skillIndex)
    };
    
    setSkills(updatedSkills);
    updateSection('skills', updatedSkills);
  };

  // Handle adding a new category
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    
    const newCategoryObj = {
      id: `skill-${Date.now()}`,
      category: newCategory.trim(),
      skills: []
    };
    
    const updatedSkills = [...skills, newCategoryObj];
    setSkills(updatedSkills);
    updateSection('skills', updatedSkills);
    setActiveCategory(updatedSkills.length - 1);
    setNewCategory('');
  };

  // Handle removing a category
  const handleRemoveCategory = (index) => {
    if (skills.length === 1) {
      toast.error("You must have at least one skill category");
      return;
    }
    
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    updateSection('skills', updatedSkills);
    
    if (activeCategory >= updatedSkills.length) {
      setActiveCategory(updatedSkills.length - 1);
    }
  };

  // Handle updating category name
  const handleCategoryNameChange = (index, newName) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      category: newName
    };
    
    setSkills(updatedSkills);
    updateSection('skills', updatedSkills);
  };

  return (
    <div>
      {/* Category tabs */}
      <div className="mb-4 border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {skills.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(index)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeCategory === index
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {category.category}
            </button>
          ))}
          <div className="flex items-center pl-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category..."
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-32 sm:text-sm border-gray-300 rounded-md"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddCategory();
                }
              }}
            />
            <button
              onClick={handleAddCategory}
              disabled={!newCategory.trim()}
              className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active category content */}
      {skills.map((category, categoryIndex) => (
        <div key={category.id} className={activeCategory === categoryIndex ? 'block' : 'hidden'}>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex-1 mr-4">
                <label htmlFor={`category-name-${categoryIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  id={`category-name-${categoryIndex}`}
                  value={category.category}
                  onChange={(e) => handleCategoryNameChange(categoryIndex, e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveCategory(categoryIndex)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none mt-6"
              >
                <FiTrash2 className="mr-1.5 h-4 w-4" />
                Remove Category
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills in this category
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 group"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(categoryIndex, skillIndex)}
                      className="ml-1.5 text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {category.skills.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No skills added yet</p>
                )}
              </div>

              <div className="flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill..."
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddSkill(categoryIndex);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleAddSkill(categoryIndex)}
                  disabled={!newSkill.trim()}
                  className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <FiPlus className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Press Enter to add a skill. Group similar skills in the same category.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Tips for adding skills:</h4>
              <ul className="text-xs text-gray-500 space-y-1 list-disc pl-5">
                <li>Include both technical and soft skills relevant to your target job</li>
                <li>Be specific about technical skills (e.g., "React.js" instead of just "JavaScript")</li>
                <li>Consider organizing skills by proficiency level or category</li>
                <li>Only include skills you're comfortable discussing in an interview</li>
                <li>Review job descriptions for your target roles to identify relevant skills</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
