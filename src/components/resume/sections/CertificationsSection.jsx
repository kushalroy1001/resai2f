// src/components/resume/sections/CertificationsSection.jsx
import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function CertificationsSection() {
  const { resumeData, updateSection } = useResume();
  const [certifications, setCertifications] = useState(resumeData.certifications);
  const [activeCertification, setActiveCertification] = useState(0);

  // Handle input change
  const handleChange = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value
    };
    setCertifications(updatedCertifications);
    updateSection('certifications', updatedCertifications);
  };

  // Add new certification
  const handleAddCertification = () => {
    const newCertification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      url: '',
      description: ''
    };
    const updatedCertifications = [...certifications, newCertification];
    setCertifications(updatedCertifications);
    updateSection('certifications', updatedCertifications);
    setActiveCertification(updatedCertifications.length - 1);
  };

  // Remove certification
  const handleRemoveCertification = (index) => {
    if (certifications.length === 1) {
      toast.error("You must have at least one certification entry");
      return;
    }
    
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
    updateSection('certifications', updatedCertifications);
    
    if (activeCertification >= updatedCertifications.length) {
      setActiveCertification(updatedCertifications.length - 1);
    }
  };

  return (
    <div>
      {/* Certification tabs */}
      <div className="mb-4 border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {certifications.map((cert, index) => (
            <button
              key={cert.id}
              onClick={() => setActiveCertification(index)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeCertification === index
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {cert.name || `Certification ${index + 1}`}
            </button>
          ))}
          <button
            onClick={handleAddCertification}
            className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <FiPlus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Active certification form */}
      {certifications.map((cert, index) => (
        <div key={cert.id} className={activeCertification === index ? 'block' : 'hidden'}>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Certification Details</h3>
              <button
                type="button"
                onClick={() => handleRemoveCertification(index)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none"
              >
                <FiTrash2 className="mr-1.5 h-4 w-4" />
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700">
                  Certification Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id={`name-${index}`}
                    value={cert.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    placeholder="e.g., AWS Certified Solutions Architect"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor={`issuer-${index}`} className="block text-sm font-medium text-gray-700">
                  Issuing Organization
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id={`issuer-${index}`}
                    value={cert.issuer}
                    onChange={(e) => handleChange(index, 'issuer', e.target.value)}
                    placeholder="e.g., Amazon Web Services"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`date-${index}`} className="block text-sm font-medium text-gray-700">
                  Issue Date
                </label>
                <div className="mt-1">
                  <input
                    type="month"
                    id={`date-${index}`}
                    value={cert.date}
                    onChange={(e) => handleChange(index, 'date', e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor={`url-${index}`} className="block text-sm font-medium text-gray-700">
                  Credential URL (Optional)
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    id={`url-${index}`}
                    value={cert.url}
                    onChange={(e) => handleChange(index, 'url', e.target.value)}
                    placeholder="https://www.credential.net/..."
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Link to verify your credential online (if available)
                </p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">
                  Description (Optional)
                </label>
                <div className="mt-1">
                  <textarea
                    id={`description-${index}`}
                    rows={3}
                    value={cert.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder="Brief description of the certification, skills acquired, or relevant details"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
