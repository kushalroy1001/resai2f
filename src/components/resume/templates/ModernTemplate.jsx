// src/components/resume/templates/ModernTemplate.jsx
import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiGlobe, FiLinkedin } from 'react-icons/fi';

export default function ModernTemplate({ resumeData }) {
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

  return (
    <div className="bg-white text-gray-800 p-8 max-w-[800px] mx-auto shadow-lg">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-xl text-blue-600 font-medium mb-4">{personalInfo.title}</h2>
        
        {/* Contact Information */}
        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center">
              <FiMail className="mr-1 text-blue-500" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <FiPhone className="mr-1 text-blue-500" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {(personalInfo.city || personalInfo.state) && (
            <div className="flex items-center">
              <FiMapPin className="mr-1 text-blue-500" />
              <span>
                {[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}
              </span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <FiLinkedin className="mr-1 text-blue-500" />
              <a href={personalInfo.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <FiGlobe className="mr-1 text-blue-500" />
              <a href={personalInfo.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-blue-500 pb-1 mb-3">
            Professional Summary
          </h3>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.some(exp => exp.company || exp.position) && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-blue-500 pb-1 mb-3">
            Work Experience
          </h3>
          <div className="space-y-4">
            {workExperience.map((exp, index) => (
              (exp.company || exp.position) && (
                <div key={exp.id || index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{exp.position}</h4>
                      <h5 className="text-blue-600">{exp.company}</h5>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      {exp.location && <div>{exp.location}</div>}
                    </div>
                  </div>
                  {exp.description && <p className="text-sm text-gray-700 mt-2">{exp.description}</p>}
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-2 ml-2 space-y-1">
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

      {/* Education */}
      {education.some(edu => edu.institution || edu.degree) && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-blue-500 pb-1 mb-3">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              (edu.institution || edu.degree) && (
                <div key={edu.id || index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                      <h5 className="text-blue-600">{edu.institution}</h5>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      {edu.location && <div>{edu.location}</div>}
                    </div>
                  </div>
                  {edu.description && <p className="text-sm text-gray-700 mt-2">{edu.description}</p>}
                  {edu.gpa && <p className="text-sm text-gray-700 mt-1">GPA: {edu.gpa}</p>}
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.some(category => category.skills.length > 0) && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-blue-500 pb-1 mb-3">
            Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((category, index) => (
              category.skills.length > 0 && (
                <div key={category.id || index}>
                  <h4 className="font-medium text-gray-900 mb-2">{category.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
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

      {/* Projects */}
      {projects.some(project => project.name) && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-blue-500 pb-1 mb-3">
            Projects
          </h3>
          <div className="space-y-4">
            {projects.map((project, index) => (
              project.name && (
                <div key={project.id || index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {project.name}
                        {project.url && (
                          <a href={project.url} className="ml-2 text-blue-600 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                            (Link)
                          </a>
                        )}
                      </h4>
                    </div>
                    {(project.startDate || project.endDate) && (
                      <div className="text-sm text-gray-500">
                        {formatDate(project.startDate)} - {project.current ? 'Present' : formatDate(project.endDate)}
                      </div>
                    )}
                  </div>
                  {project.description && <p className="text-sm text-gray-700 mt-2">{project.description}</p>}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
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

      {/* Certifications */}
      {certifications.some(cert => cert.name) && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-blue-500 pb-1 mb-3">
            Certifications
          </h3>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              cert.name && (
                <div key={cert.id || index} className="mb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {cert.name}
                        {cert.url && (
                          <a href={cert.url} className="ml-2 text-blue-600 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                            (Verify)
                          </a>
                        )}
                      </h4>
                      <h5 className="text-gray-600">{cert.issuer}</h5>
                    </div>
                    {cert.date && (
                      <div className="text-sm text-gray-500">
                        {formatDate(cert.date)}
                      </div>
                    )}
                  </div>
                  {cert.description && <p className="text-sm text-gray-700 mt-1">{cert.description}</p>}
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Hobbies & Interests */}
      {hobbies.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-blue-500 pb-1 mb-3">
            Hobbies & Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby, index) => (
              <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                {hobby}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
