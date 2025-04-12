// src/components/resume/ResumeBuilder.jsx
import { useState, useEffect, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { toast } from 'react-toastify';
import { FiSave, FiDownload, FiEye, FiRefreshCw, FiLayout, FiInfo } from 'react-icons/fi';
import GeminiApiKeyInput from './GeminiApiKeyInput';
import { downloadResumePDF } from '../../services/pdfService';

// Import resume sections
import PersonalInfoSection from './sections/PersonalInfoSection';
import WorkExperienceSection from './sections/WorkExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import CertificationsSection from './sections/CertificationsSection';
import HobbiesSection from './sections/HobbiesSection';

// Import resume templates
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

export default function ResumeBuilder() {
  const { resumeData, activeTemplate, setActiveTemplate } = useResume();
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [previewMode, setPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [showApiKeyInfo, setShowApiKeyInfo] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const resumeTemplateRef = useRef(null);

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setPreviewMode(false);
  };

  // Handle template change
  const handleTemplateChange = (template) => {
    setActiveTemplate(template);
    toast.success(`Template changed to ${template.charAt(0).toUpperCase() + template.slice(1)}`);
  };

  // Toggle preview mode
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  // Save resume
  const saveResume = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success('Resume saved successfully!');
      setIsLoading(false);
    }, 1000);
  };

  // Download resume as PDF
  const downloadResume = async () => {
    // Switch to preview mode if not already in it
    if (!previewMode) {
      setPreviewMode(true);
      // Wait for the DOM to update with the preview
      setTimeout(() => handleDownload(), 300);
    } else {
      handleDownload();
    }
  };

  // Handle the actual PDF download
  const handleDownload = async () => {
    try {
      setDownloadLoading(true);
      
      // Get the resume template container
      const templateContainer = document.getElementById('resume-template-container');
      
      if (!templateContainer) {
        throw new Error('Resume template container not found');
      }
      
      // Generate a filename based on user's name and current date
      const firstName = resumeData.personalInfo.firstName || 'Resume';
      const lastName = resumeData.personalInfo.lastName || '';
      const fileName = `${firstName}${lastName ? '_' + lastName : ''}_Resume_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Download the PDF
      const success = await downloadResumePDF('resume-template-container', fileName);
      
      if (success) {
        toast.success('Resume downloaded as PDF!');
      } else {
        toast.error('Failed to download resume. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error('Failed to download resume: ' + error.message);
    } finally {
      setDownloadLoading(false);
    }
  };

  // Render the active template
  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />;
      case 'classic':
        return <ClassicTemplate resumeData={resumeData} />;
      case 'minimalist':
        return <MinimalistTemplate resumeData={resumeData} />;
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} />;
      default:
        return <ModernTemplate resumeData={resumeData} />;
    }
  };

  // Render the active section
  const renderSection = () => {
    switch (activeSection) {
      case 'personalInfo':
        return <PersonalInfoSection />;
      case 'workExperience':
        return <WorkExperienceSection />;
      case 'education':
        return <EducationSection />;
      case 'skills':
        return <SkillsSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'certifications':
        return <CertificationsSection />;
      case 'hobbies':
        return <HobbiesSection />;
      default:
        return <PersonalInfoSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
          <p className="mt-1 text-sm text-gray-600">
            Create a professional resume with customizable sections and templates
          </p>
          
          {/* API Key Info Button */}
          <div className="mt-2 flex items-center">
            <button 
              onClick={() => setShowApiKeyInfo(!showApiKeyInfo)}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <FiInfo className="mr-1 h-4 w-4" />
              {isApiKeySet ? 'AI features enabled' : 'Enable AI features'}
            </button>
          </div>
        </div>
        
        {/* Gemini API Key Input */}
        {showApiKeyInfo && (
          <GeminiApiKeyInput onApiKeySet={setIsApiKeySet} />
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={saveResume}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <FiSave className="mr-2 -ml-1 h-4 w-4" />
              Save
            </button>
            <button
              onClick={downloadResume}
              disabled={isLoading || downloadLoading}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {downloadLoading ? (
                <>
                  <svg className="animate-spin mr-2 -ml-1 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Downloading...
                </>
              ) : (
                <>
                  <FiDownload className="mr-2 -ml-1 h-4 w-4" />
                  Download PDF
                </>
              )}
            </button>
          </div>

          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              id="template-menu"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <FiLayout className="mr-2 -ml-1 h-4 w-4" />
              Templates
            </button>
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="template-menu">
                <button
                  onClick={() => handleTemplateChange('modern')}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    activeTemplate === 'modern' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } hover:bg-gray-100`}
                  role="menuitem"
                >
                  Modern
                </button>
                <button
                  onClick={() => handleTemplateChange('classic')}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    activeTemplate === 'classic' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } hover:bg-gray-100`}
                  role="menuitem"
                >
                  Classic
                </button>
                <button
                  onClick={() => handleTemplateChange('minimalist')}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    activeTemplate === 'minimalist' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } hover:bg-gray-100`}
                  role="menuitem"
                >
                  Minimalist
                </button>
                <button
                  onClick={() => handleTemplateChange('creative')}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    activeTemplate === 'creative' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } hover:bg-gray-100`}
                  role="menuitem"
                >
                  Creative
                </button>
              </div>
            </div>
          </div>
        </div>

        {previewMode ? (
          // Preview mode - show full resume
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="max-w-[800px] mx-auto" id="resume-template-container" ref={resumeTemplateRef}>
              {renderTemplate()}
            </div>
          </div>
        ) : (
          // Edit mode - show sections and form
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Section navigation */}
            <div className="md:col-span-3">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Resume Sections</h3>
                </div>
                <nav className="flex flex-col">
                  <button
                    onClick={() => handleSectionChange('personalInfo')}
                    className={`px-4 py-3 text-sm font-medium text-left border-l-4 ${
                      activeSection === 'personalInfo'
                        ? 'border-blue-500 text-blue-700 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    Personal Information
                  </button>
                  <button
                    onClick={() => handleSectionChange('workExperience')}
                    className={`px-4 py-3 text-sm font-medium text-left border-l-4 ${
                      activeSection === 'workExperience'
                        ? 'border-blue-500 text-blue-700 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    Work Experience
                  </button>
                  <button
                    onClick={() => handleSectionChange('education')}
                    className={`px-4 py-3 text-sm font-medium text-left border-l-4 ${
                      activeSection === 'education'
                        ? 'border-blue-500 text-blue-700 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    Education
                  </button>
                  <button
                    onClick={() => handleSectionChange('skills')}
                    className={`px-4 py-3 text-sm font-medium text-left border-l-4 ${
                      activeSection === 'skills'
                        ? 'border-blue-500 text-blue-700 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => handleSectionChange('projects')}
                    className={`px-4 py-3 text-sm font-medium text-left border-l-4 ${
                      activeSection === 'projects'
                        ? 'border-blue-500 text-blue-700 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => handleSectionChange('certifications')}
                    className={`px-4 py-3 text-sm font-medium text-left border-l-4 ${
                      activeSection === 'certifications'
                        ? 'border-blue-500 text-blue-700 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    Certifications
                  </button>
                  <button
                    onClick={() => handleSectionChange('hobbies')}
                    className={`px-4 py-3 text-sm font-medium text-left border-l-4 ${
                      activeSection === 'hobbies'
                        ? 'border-blue-500 text-blue-700 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    Hobbies & Interests
                  </button>
                </nav>
              </div>
            </div>

            {/* Section content */}
            <div className="md:col-span-9">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    {activeSection === 'personalInfo' && 'Personal Information'}
                    {activeSection === 'workExperience' && 'Work Experience'}
                    {activeSection === 'education' && 'Education'}
                    {activeSection === 'skills' && 'Skills'}
                    {activeSection === 'projects' && 'Projects'}
                    {activeSection === 'certifications' && 'Certifications'}
                    {activeSection === 'hobbies' && 'Hobbies & Interests'}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {activeSection === 'personalInfo' && 'Add your contact information and professional summary'}
                    {activeSection === 'workExperience' && 'Add your work history and professional achievements'}
                    {activeSection === 'education' && 'Add your educational background and qualifications'}
                    {activeSection === 'skills' && 'Add technical and soft skills relevant to your career'}
                    {activeSection === 'projects' && 'Add notable projects you have worked on'}
                    {activeSection === 'certifications' && 'Add professional certifications and licenses'}
                    {activeSection === 'hobbies' && 'Add personal interests and activities'}
                  </p>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  {renderSection()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
