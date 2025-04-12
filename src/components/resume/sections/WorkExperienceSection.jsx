// src/components/resume/sections/WorkExperienceSection.jsx
import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { FiPlus, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { generateWorkExperiencePoints, getFallbackWorkPoints } from '../../../services/geminiService';
import { toast } from 'react-toastify';

export default function WorkExperienceSection() {
  const { resumeData, updateSection } = useResume();
  const [workExperience, setWorkExperience] = useState(resumeData.workExperience);
  const [activeExperience, setActiveExperience] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle input change
  const handleChange = (index, field, value) => {
    const updatedExperience = [...workExperience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    setWorkExperience(updatedExperience);
    updateSection('workExperience', updatedExperience);
  };

  // Add new work experience
  const handleAddExperience = () => {
    const newExperience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    };
    const updatedExperience = [...workExperience, newExperience];
    setWorkExperience(updatedExperience);
    updateSection('workExperience', updatedExperience);
    setActiveExperience(updatedExperience.length - 1);
  };

  // Remove work experience
  const handleRemoveExperience = (index) => {
    if (workExperience.length === 1) {
      toast.error("You must have at least one work experience entry");
      return;
    }
    
    const updatedExperience = workExperience.filter((_, i) => i !== index);
    setWorkExperience(updatedExperience);
    updateSection('workExperience', updatedExperience);
    
    if (activeExperience >= updatedExperience.length) {
      setActiveExperience(updatedExperience.length - 1);
    }
  };

  // Handle current job checkbox
  const handleCurrentJob = (index, checked) => {
    const updatedExperience = [...workExperience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      current: checked,
      endDate: checked ? '' : updatedExperience[index].endDate
    };
    setWorkExperience(updatedExperience);
    updateSection('workExperience', updatedExperience);
  };

  // Add achievement
  const handleAddAchievement = (index, achievement) => {
    if (!achievement.trim()) return;
    
    const updatedExperience = [...workExperience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      achievements: [...updatedExperience[index].achievements, achievement]
    };
    setWorkExperience(updatedExperience);
    updateSection('workExperience', updatedExperience);
  };

  // Remove achievement
  const handleRemoveAchievement = (expIndex, achievementIndex) => {
    const updatedExperience = [...workExperience];
    updatedExperience[expIndex] = {
      ...updatedExperience[expIndex],
      achievements: updatedExperience[expIndex].achievements.filter((_, i) => i !== achievementIndex)
    };
    setWorkExperience(updatedExperience);
    updateSection('workExperience', updatedExperience);
  };

  // Generate achievements with AI
  const handleGenerateAchievements = async (index) => {
    const experience = workExperience[index];
    
    // Check if we have enough information to generate achievements
    if (!experience.position || !experience.company) {
      toast.error("Please provide job title and company name first");
      return;
    }
    
    setIsGenerating(true);
    try {
      let achievements = [];
      
      try {
        // Try to use the Gemini API
        achievements = await generateWorkExperiencePoints(experience);
      } catch (error) {
        // Use fallback if API fails
        achievements = getFallbackWorkPoints();
        toast.info('Using sample achievements. API may be unavailable.');
      }
      
      // Update the achievements
      const updatedExperience = [...workExperience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        achievements: achievements
      };
      setWorkExperience(updatedExperience);
      updateSection('workExperience', updatedExperience);
      
      toast.success('Achievements generated!');
    } catch (error) {
      console.error('Error generating achievements:', error);
      toast.error('Failed to generate achievements. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      {/* Experience tabs */}
      <div className="mb-4 border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {workExperience.map((exp, index) => (
            <button
              key={exp.id}
              onClick={() => setActiveExperience(index)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeExperience === index
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {exp.company || exp.position || `Experience ${index + 1}`}
            </button>
          ))}
          <button
            onClick={handleAddExperience}
            className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <FiPlus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Active experience form */}
      {workExperience.map((exp, index) => (
        <div key={exp.id} className={activeExperience === index ? 'block' : 'hidden'}>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Experience Details</h3>
              <button
                type="button"
                onClick={() => handleRemoveExperience(index)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none"
              >
                <FiTrash2 className="mr-1.5 h-4 w-4" />
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id={`company-${index}`}
                    value={exp.company}
                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={`position-${index}`} className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id={`position-${index}`}
                    value={exp.position}
                    onChange={(e) => handleChange(index, 'position', e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id={`location-${index}`}
                    value={exp.location}
                    onChange={(e) => handleChange(index, 'location', e.target.value)}
                    placeholder="City, State, Country"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="flex items-center h-full pt-5">
                  <input
                    id={`current-${index}`}
                    name={`current-${index}`}
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => handleCurrentJob(index, e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`current-${index}`} className="ml-2 block text-sm text-gray-700">
                    I currently work here
                  </label>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <div className="mt-1">
                  <input
                    type="month"
                    id={`startDate-${index}`}
                    value={exp.startDate}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <div className="mt-1">
                  <input
                    type="month"
                    id={`endDate-${index}`}
                    value={exp.endDate}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <div className="mt-1">
                  <textarea
                    id={`description-${index}`}
                    rows={3}
                    value={exp.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder="Describe your role, responsibilities, and the company's business"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Key Achievements</h3>
                <button
                  type="button"
                  onClick={() => handleGenerateAchievements(index)}
                  disabled={isGenerating}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <FiRefreshCw className={`mr-1.5 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  {isGenerating ? 'Generating...' : 'Generate with AI'}
                </button>
              </div>

              <ul className="space-y-2 mb-4">
                {exp.achievements.map((achievement, achievementIndex) => (
                  <li key={achievementIndex} className="flex items-start group">
                    <span className="flex-1 text-sm text-gray-700">{achievement}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(index, achievementIndex)}
                      className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex">
                <input
                  type="text"
                  placeholder="Add a new achievement..."
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddAchievement(index, e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.target.previousSibling;
                    handleAddAchievement(index, input.value);
                    input.value = '';
                  }}
                  className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiPlus className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Press Enter to add an achievement or use the AI button to generate achievements based on your job details.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
