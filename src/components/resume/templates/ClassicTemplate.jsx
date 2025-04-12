// src/components/resume/templates/ClassicTemplate.jsx
import React from 'react';

export default function ClassicTemplate({ resumeData }) {
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
    <div className="bg-white text-gray-800 p-8 max-w-[800px] mx-auto shadow-lg border border-gray-200">
      {/* Header */}
      <header className="text-center mb-6 pb-4 border-b-2 border-gray-300">
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wider mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-xl text-gray-700 mb-3">{personalInfo.title}</h2>
        
        {/* Contact Information */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {personalInfo.email && (
            <div>
              <span className="font-semibold">Email:</span> {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div>
              <span className="font-semibold">Phone:</span> {personalInfo.phone}
            </div>
          )}
          {(personalInfo.city || personalInfo.state) && (
            <div>
              <span className="font-semibold">Location:</span>{' '}
              {[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}
            </div>
          )}
          {personalInfo.linkedin && (
            <div>
              <span className="font-semibold">LinkedIn:</span>{' '}
              <a href={personalInfo.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </a>
            </div>
          )}
          {personalInfo.website && (
            <div>
              <span className="font-semibold">Website:</span>{' '}
              <a href={personalInfo.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Professional Summary
          </h3>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.some(exp => exp.company || exp.position) && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Work Experience
          </h3>
          <div className="space-y-4">
            {workExperience.map((exp, index) => (
              (exp.company || exp.position) && (
                <div key={exp.id || index} className="mb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                    <h4 className="font-bold text-gray-900">{exp.position}</h4>
                    <div className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <h5 className="font-medium text-gray-700">{exp.company}</h5>
                    {exp.location && <div className="text-sm text-gray-600">{exp.location}</div>}
                  </div>
                  {exp.description && <p className="text-sm text-gray-700 mb-2">{exp.description}</p>}
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-outside text-sm text-gray-700 ml-5 space-y-1">
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
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              (edu.institution || edu.degree) && (
                <div key={edu.id || index} className="mb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                    <h4 className="font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                    <div className="text-sm text-gray-600">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <h5 className="font-medium text-gray-700">{edu.institution}</h5>
                    {edu.location && <div className="text-sm text-gray-600">{edu.location}</div>}
                  </div>
                  {edu.description && <p className="text-sm text-gray-700 mb-1">{edu.description}</p>}
                  {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.some(category => category.skills.length > 0) && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Skills
          </h3>
          <div className="space-y-3">
            {skills.map((category, index) => (
              category.skills.length > 0 && (
                <div key={category.id || index} className="mb-2">
                  <h4 className="font-medium text-gray-900 mb-1">{category.category}:</h4>
                  <p className="text-gray-700">
                    {category.skills.join(', ')}
                  </p>
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.some(project => project.name) && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Projects
          </h3>
          <div className="space-y-4">
            {projects.map((project, index) => (
              project.name && (
                <div key={project.id || index} className="mb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                    <h4 className="font-bold text-gray-900">
                      {project.name}
                      {project.url && (
                        <a href={project.url} className="ml-2 text-blue-600 hover:underline text-sm font-normal" target="_blank" rel="noopener noreferrer">
                          (Link)
                        </a>
                      )}
                    </h4>
                    {(project.startDate || project.endDate) && (
                      <div className="text-sm text-gray-600">
                        {formatDate(project.startDate)} - {project.current ? 'Present' : formatDate(project.endDate)}
                      </div>
                    )}
                  </div>
                  {project.description && <p className="text-sm text-gray-700 mb-2">{project.description}</p>}
                  {project.technologies.length > 0 && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                    </p>
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
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Certifications
          </h3>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              cert.name && (
                <div key={cert.id || index} className="mb-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                    <h4 className="font-medium text-gray-900">
                      {cert.name}
                      {cert.url && (
                        <a href={cert.url} className="ml-2 text-blue-600 hover:underline text-sm font-normal" target="_blank" rel="noopener noreferrer">
                          (Verify)
                        </a>
                      )}
                    </h4>
                    {cert.date && (
                      <div className="text-sm text-gray-600">
                        {formatDate(cert.date)}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">{cert.issuer}</p>
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
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Hobbies & Interests
          </h3>
          <p className="text-gray-700">
            {hobbies.join(', ')}
          </p>
        </section>
      )}
    </div>
  );
}
