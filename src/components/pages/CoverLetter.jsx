// src/components/pages/CoverLetter.jsx
import { useState } from 'react';
import { FiSave, FiDownload, FiRefreshCw, FiInfo } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useResume } from '../../context/ResumeContext';
import { generateCoverLetter } from '../../services/geminiService';

export default function CoverLetter() {
  const { resumeData } = useResume();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: '',
    companyName: '',
    jobTitle: '',
    yourName: resumeData?.personalInfo?.firstName + ' ' + resumeData?.personalInfo?.lastName || '',
    yourEmail: resumeData?.personalInfo?.email || '',
    yourPhone: resumeData?.personalInfo?.phone || '',
    jobDescription: '',
    coverLetterContent: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would save the cover letter data
    console.log('Cover letter data:', formData);
  };

  const generateAIContent = async () => {
    if (!formData.companyName || !formData.jobTitle) {
      toast.warning('Please enter company name and job title for better results');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Prepare job description
      const jobDescription = formData.jobDescription || 
        `A ${formData.jobTitle} position at ${formData.companyName}`;
      
      // Generate cover letter using Gemini AI
      const generatedContent = await generateCoverLetter(
        resumeData, 
        jobDescription,
        formData.companyName
      );
      
      // Update the form with generated content
      setFormData(prev => ({
        ...prev,
        coverLetterContent: generatedContent
      }));
      
      toast.success('Cover letter generated successfully!');
    } catch (error) {
      console.error('Error generating cover letter:', error);
      toast.error('Failed to generate cover letter. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Cover Letter Builder</h1>
            <div className="flex space-x-2">
              <button 
                onClick={handleSubmit}
                className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <FiSave className="mr-2" />
                Save
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <FiDownload className="mr-2" />
                Export
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    id="recipientName"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Hiring Manager's Name"
                  />
                </div>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Company Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Position you're applying for"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="yourName" className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="yourName"
                    name="yourName"
                    value={formData.yourName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="yourEmail" className="block text-sm font-medium text-gray-700">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="yourEmail"
                    name="yourEmail"
                    value={formData.yourEmail}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="yourPhone" className="block text-sm font-medium text-gray-700">
                    Your Phone
                  </label>
                  <input
                    type="tel"
                    id="yourPhone"
                    name="yourPhone"
                    value={formData.yourPhone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                  Job Description (Optional)
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  rows={4}
                  value={formData.jobDescription}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Paste the job description here for a more tailored cover letter..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  Adding a job description helps the AI generate a more targeted cover letter
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="coverLetterContent" className="block text-sm font-medium text-gray-700">
                    Cover Letter Content
                  </label>
                  <button
                    type="button"
                    onClick={generateAIContent}
                    disabled={isLoading || !formData.companyName || !formData.jobTitle}
                    className="flex items-center px-3 py-1 text-xs border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <FiRefreshCw className="mr-1" />
                        Generate with AI
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  id="coverLetterContent"
                  name="coverLetterContent"
                  rows={12}
                  value={formData.coverLetterContent}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Write your cover letter here or use the AI generator..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save Cover Letter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
