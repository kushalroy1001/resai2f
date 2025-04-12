// src/components/pages/ResumeBuilder.jsx
import { useState } from 'react';
import { FiSave, FiDownload, FiPlus } from 'react-icons/fi';

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState('personal');

  // Sample sections for a resume
  const sections = [
    { id: 'personal', name: 'Personal Information' },
    { id: 'summary', name: 'Professional Summary' },
    { id: 'experience', name: 'Work Experience' },
    { id: 'education', name: 'Education' },
    { id: 'skills', name: 'Skills' },
    { id: 'certifications', name: 'Certifications' },
    { id: 'projects', name: 'Projects' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <div className="flex space-x-2">
              <button className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <FiSave className="mr-2" />
                Save
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <FiDownload className="mr-2" />
                Export
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar with sections */}
            <div className="w-full md:w-1/4">
              <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Sections</h2>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                          activeSection === section.id
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {section.name}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <FiPlus className="mr-2" />
                      Add Section
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main content area */}
            <div className="w-full md:w-3/4">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {sections.find((s) => s.id === activeSection)?.name}
                </h2>
                
                {/* Personal Information Form */}
                {activeSection === 'personal' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                        Job Title
                      </label>
                      <input
                        type="text"
                        id="jobTitle"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                )}

                {/* Placeholder for other sections */}
                {activeSection !== 'personal' && (
                  <div className="border-2 border-dashed border-gray-200 rounded-lg h-64 flex items-center justify-center">
                    <p className="text-gray-500">
                      Content for {sections.find((s) => s.id === activeSection)?.name} will be implemented here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
