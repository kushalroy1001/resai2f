// src/components/resume/sections/PersonalInfoSection.jsx
import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { FiRefreshCw } from 'react-icons/fi';
import { generateResumeSummary, getFallbackSummary } from '../../../services/geminiService';
import { toast } from 'react-toastify';

export default function PersonalInfoSection() {
  const { resumeData, updateSection } = useResume();
  const [personalInfo, setPersonalInfo] = useState(resumeData.personalInfo);
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedInfo = { ...personalInfo, [name]: value };
    setPersonalInfo(updatedInfo);
    updateSection('personalInfo', updatedInfo);
  };

  // Generate summary with AI
  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      // Check if we have enough data to generate a meaningful summary
      const hasWorkExperience = resumeData.workExperience.some(exp => exp.position && exp.company);
      const hasSkills = resumeData.skills.some(category => category.skills.length > 0);
      
      let summary = '';
      
      if (hasWorkExperience || hasSkills) {
        // Use the Gemini API to generate a summary
        summary = await generateResumeSummary(resumeData);
      } else {
        // Use fallback if not enough data
        summary = getFallbackSummary();
        toast.info('Using sample summary. Add work experience and skills for a personalized AI summary.');
      }
      
      // Update the summary
      const updatedInfo = { ...personalInfo, summary };
      setPersonalInfo(updatedInfo);
      updateSection('personalInfo', updatedInfo);
      
      toast.success('Professional summary generated!');
    } catch (error) {
      console.error('Error generating summary:', error);
      toast.error('Failed to generate summary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={personalInfo.firstName}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={personalInfo.lastName}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                value={personalInfo.email}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={personalInfo.phone}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Professional Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                value={personalInfo.title}
                onChange={handleChange}
                placeholder="e.g., Software Engineer, Marketing Specialist, Project Manager"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="address"
                id="address"
                value={personalInfo.address}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="city"
                id="city"
                value={personalInfo.city}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State / Province
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="state"
                id="state"
                value={personalInfo.state}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              ZIP / Postal Code
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                value={personalInfo.zipCode}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="country"
                id="country"
                value={personalInfo.country}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Online Presence */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Online Presence</h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
              LinkedIn URL
            </label>
            <div className="mt-1">
              <input
                type="url"
                name="linkedin"
                id="linkedin"
                value={personalInfo.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Personal Website
            </label>
            <div className="mt-1">
              <input
                type="url"
                name="website"
                id="website"
                value={personalInfo.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Professional Summary</h3>
          <button
            type="button"
            onClick={handleGenerateSummary}
            disabled={isGenerating}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <FiRefreshCw className={`mr-1.5 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate with AI'}
          </button>
        </div>
        <div className="mt-1">
          <textarea
            name="summary"
            id="summary"
            rows={4}
            value={personalInfo.summary}
            onChange={handleChange}
            placeholder="Write a brief summary of your professional background, skills, and career goals."
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          A compelling summary helps employers quickly understand your value proposition. Keep it concise (3-4 sentences).
        </p>
      </div>
    </div>
  );
}
