// src/components/resume/sections/EducationSection.jsx
import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function EducationSection() {
  const { resumeData, updateSection } = useResume();
  const [education, setEducation] = useState(resumeData.education);
  const [activeEducation, setActiveEducation] = useState(0);

  // Handle input change
  const handleChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setEducation(updatedEducation);
    updateSection('education', updatedEducation);
  };

  // Add new education
  const handleAddEducation = () => {
    const newEducation = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      gpa: ''
    };
    const updatedEducation = [...education, newEducation];
    setEducation(updatedEducation);
    updateSection('education', updatedEducation);
    setActiveEducation(updatedEducation.length - 1);
  };

  // Remove education
  const handleRemoveEducation = (index) => {
    if (education.length === 1) {
      toast.error("You must have at least one education entry");
      return;
    }
    
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
    updateSection('education', updatedEducation);
    
    if (activeEducation >= updatedEducation.length) {
      setActiveEducation(updatedEducation.length - 1);
    }
  };

  // Handle current education checkbox
  const handleCurrentEducation = (index, checked) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      current: checked,
      endDate: checked ? '' : updatedEducation[index].endDate
    };
    setEducation(updatedEducation);
    updateSection('education', updatedEducation);
  };

  return (
    <div>
      {/* Education tabs */}
      <div className="mb-4 border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {education.map((edu, index) => (
            <button
              key={edu.id}
              onClick={() => setActiveEducation(index)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeEducation === index
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {edu.institution || edu.degree || `Education ${index + 1}`}
            </button>
          ))}
          <button
            onClick={handleAddEducation}
            className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <FiPlus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Active education form */}
      {education.map((edu, index) => (
        <div key={edu.id} className={activeEducation === index ? 'block' : 'hidden'}>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Education Details</h3>
              <button
                type="button"
                onClick={() => handleRemoveEducation(index)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none"
              >
                <FiTrash2 className="mr-1.5 h-4 w-4" />
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor={`institution-${index}`} className="block text-sm font-medium text-gray-700">
                  School / University
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id={`institution-${index}`}
                    value={edu.institution}
                    onChange={(e) => handleChange(index, 'institution', e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id={`location-${index}`}
                    value={edu.location}
                    onChange={(e) => handleChange(index, 'location', e.target.value)}
                    placeholder="City, State, Country"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700">
                  Degree
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id={`degree-${index}`}
                    value={edu.degree}
                    onChange={(e) => handleChange(index, 'degree', e.target.value)}
                    placeholder="Bachelor's, Master's, Ph.D., etc."
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={`field-${index}`} className="block text-sm font-medium text-gray-700">
                  Field of Study
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id={`field-${index}`}
                    value={edu.field}
                    onChange={(e) => handleChange(index, 'field', e.target.value)}
                    placeholder="Computer Science, Business, etc."
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
                    checked={edu.current}
                    onChange={(e) => handleCurrentEducation(index, e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`current-${index}`} className="ml-2 block text-sm text-gray-700">
                    I am currently studying here
                  </label>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <div className="mt-1">
                  <input
                    type="month"
                    id={`startDate-${index}`}
                    value={edu.startDate}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <div className="mt-1">
                  <input
                    type="month"
                    id={`endDate-${index}`}
                    value={edu.endDate}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                    disabled={edu.current}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`gpa-${index}`} className="block text-sm font-medium text-gray-700">
                  GPA (Optional)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id={`gpa-${index}`}
                    value={edu.gpa}
                    onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                    placeholder="3.8/4.0"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">
                  Description (Optional)
                </label>
                <div className="mt-1">
                  <textarea
                    id={`description-${index}`}
                    rows={3}
                    value={edu.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder="Relevant coursework, honors, activities, etc."
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Include relevant coursework, academic achievements, extracurricular activities, or research projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
