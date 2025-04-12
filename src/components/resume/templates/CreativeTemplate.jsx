// src/components/resume/templates/CreativeTemplate.jsx
import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiGlobe, FiLinkedin, FiStar, FiAward, FiBriefcase, FiBook } from 'react-icons/fi';

export default function CreativeTemplate({ resumeData }) {
  const { personalInfo, workExperience, education, skills, projects, certifications, hobbies } = resumeData;
  
  // Format date (YYYY-MM to Month YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const [year, month] = dateString.split('-');
      const date = new Date(year, month - 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (error) {
      return dateString;
    }
  };

  // Get initials for avatar
  const getInitials = () => {
    const firstName = personalInfo.firstName || '';
    const lastName = personalInfo.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  return (
    <div className="bg-white text-gray-800 p-8 max-w-[800px] mx-auto shadow-lg">
      {/* Header with gradient */}
      <header className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg -z-10"></div>
        <div className="bg-white m-1 p-6 rounded-lg shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {getInitials()}
            </div>
          </div>
          
          {/* Name and title */}
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <h2 className="text-xl text-gray-700 mb-4">{personalInfo.title}</h2>
            
            {/* Contact Information */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              {personalInfo.email && (
                <div className="flex items-center">
                  <FiMail className="mr-1 text-purple-500" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center">
                  <FiPhone className="mr-1 text-purple-500" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {(personalInfo.city || personalInfo.state) && (
                <div className="flex items-center">
                  <FiMapPin className="mr-1 text-purple-500" />
                  <span>
                    {[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}
                  </span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center">
                  <FiLinkedin className="mr-1 text-purple-500" />
                  <a href={personalInfo.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center">
                  <FiGlobe className="mr-1 text-purple-500" />
                  <a href={personalInfo.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    Portfolio
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="md:col-span-1 space-y-6">
          {/* Skills */}
          {skills.some(category => category.skills.length > 0) && (
            <section className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <FiStar className="mr-2 text-purple-500" />
                Skills
              </h3>
              <div className="space-y-4">
                {skills.map((category, index) => (
                  category.skills.length > 0 && (
                    <div key={category.id || index}>
                      <h4 className="font-medium text-gray-900 mb-2">{category.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, i) => (
                          <span key={i} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.some(edu => edu.institution || edu.degree) && (
            <section className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <FiBook className="mr-2 text-purple-500" />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  (edu.institution || edu.degree) && (
                    <div key={edu.id || index} className="border-l-2 border-purple-300 pl-3 py-1">
                      <h4 className="font-medium text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                      <h5 className="text-purple-600">{edu.institution}</h5>
                      <div className="text-sm text-gray-500 mt-1">
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </div>
                      {edu.location && <div className="text-sm text-gray-500">{edu.location}</div>}
                      {edu.gpa && <div className="text-sm text-gray-700 mt-1">GPA: {edu.gpa}</div>}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.some(cert => cert.name) && (
            <section className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <FiAward className="mr-2 text-purple-500" />
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  cert.name && (
                    <div key={cert.id || index} className="border-l-2 border-purple-300 pl-3 py-1">
                      <h4 className="font-medium text-gray-900">
                        {cert.name}
                        {cert.url && (
                          <a href={cert.url} className="ml-2 text-blue-600 hover:underline text-xs" target="_blank" rel="noopener noreferrer">
                            (Verify)
                          </a>
                        )}
                      </h4>
                      <h5 className="text-purple-600">{cert.issuer}</h5>
                      {cert.date && (
                        <div className="text-sm text-gray-500 mt-1">
                          {formatDate(cert.date)}
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Hobbies & Interests */}
          {hobbies.length > 0 && (
            <section className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {hobby}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right column */}
        <div className="md:col-span-2 space-y-6">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About Me</h3>
              <p className="text-gray-700">{personalInfo.summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {workExperience.some(exp => exp.company || exp.position) && (
            <section className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <FiBriefcase className="mr-2 text-purple-500" />
                Work Experience
              </h3>
              <div className="space-y-6">
                {workExperience.map((exp, index) => (
                  (exp.company || exp.position) && (
                    <div key={exp.id || index} className="relative pl-6 pb-6 border-l-2 border-purple-300 last:border-0 last:pb-0">
                      <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-purple-500"></div>
                      <div className="mb-1">
                        <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                        <div className="flex justify-between">
                          <h5 className="text-purple-600">{exp.company}</h5>
                          <div className="text-sm text-gray-500">
                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                          </div>
                        </div>
                        {exp.location && <div className="text-sm text-gray-500">{exp.location}</div>}
                      </div>
                      {exp.description && <p className="text-sm text-gray-700 mt-2 mb-2">{exp.description}</p>}
                      {exp.achievements.length > 0 && (
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.some(project => project.name) && (
            <section className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects</h3>
              <div className="space-y-5">
                {projects.map((project, index) => (
                  project.name && (
                    <div key={project.id || index} className="border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900">
                          {project.name}
                          {project.url && (
                            <a href={project.url} className="ml-2 text-blue-600 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                              (View Project)
                            </a>
                          )}
                        </h4>
                        {(project.startDate || project.endDate) && (
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {formatDate(project.startDate)} - {project.current ? 'Present' : formatDate(project.endDate)}
                          </div>
                        )}
                      </div>
                      {project.description && <p className="text-sm text-gray-700 mt-2">{project.description}</p>}
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
