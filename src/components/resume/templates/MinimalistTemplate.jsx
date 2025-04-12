// src/components/resume/templates/MinimalistTemplate.jsx
import React from 'react';

export default function MinimalistTemplate({ resumeData }) {
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
      <header className="mb-8">
        <h1 className="text-2xl font-normal text-gray-900 mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-gray-500 text-sm mb-3">{personalInfo.title}</p>
        
        {/* Contact Information */}
        <div className="text-sm text-gray-500 space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {(personalInfo.city || personalInfo.state) && (
            <div>{[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</div>
          )}
          {personalInfo.linkedin && (
            <div>
              <a href={personalInfo.linkedin} className="text-gray-500 hover:text-gray-700" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          )}
          {personalInfo.website && (
            <div>
              <a href={personalInfo.website} className="text-gray-500 hover:text-gray-700" target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">
            About
          </h3>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.some(exp => exp.company || exp.position) && (
        <section className="mb-8">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">
            Experience
          </h3>
          <div className="space-y-6">
            {workExperience.map((exp, index) => (
              (exp.company || exp.position) && (
                <div key={exp.id || index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-medium text-gray-900">{exp.position}</h4>
                    <div className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h5 className="text-gray-700">{exp.company}</h5>
                    {exp.location && <div className="text-sm text-gray-500">{exp.location}</div>}
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
        <section className="mb-8">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              (edu.institution || edu.degree) && (
                <div key={edu.id || index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-medium text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                    <div className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} — {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h5 className="text-gray-700">{edu.institution}</h5>
                    {edu.location && <div className="text-sm text-gray-500">{edu.location}</div>}
                  </div>
                  {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
                  {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.some(category => category.skills.length > 0) && (
        <section className="mb-8">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">
            Skills
          </h3>
          <div className="space-y-3">
            {skills.map((category, index) => (
              category.skills.length > 0 && (
                <div key={category.id || index}>
                  <h4 className="text-gray-700 mb-1">{category.category}</h4>
                  <p className="text-sm text-gray-600">
                    {category.skills.join(' · ')}
                  </p>
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.some(project => project.name) && (
        <section className="mb-8">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">
            Projects
          </h3>
          <div className="space-y-4">
            {projects.map((project, index) => (
              project.name && (
                <div key={project.id || index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-medium text-gray-900">
                      {project.name}
                      {project.url && (
                        <a href={project.url} className="ml-2 text-gray-500 hover:text-gray-700 text-sm font-normal" target="_blank" rel="noopener noreferrer">
                          ↗
                        </a>
                      )}
                    </h4>
                    {(project.startDate || project.endDate) && (
                      <div className="text-sm text-gray-500">
                        {formatDate(project.startDate)} — {project.current ? 'Present' : formatDate(project.endDate)}
                      </div>
                    )}
                  </div>
                  {project.description && <p className="text-sm text-gray-700 mb-1">{project.description}</p>}
                  {project.technologies.length > 0 && (
                    <p className="text-xs text-gray-500">
                      {project.technologies.join(' · ')}
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
        <section className="mb-8">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">
            Certifications
          </h3>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              cert.name && (
                <div key={cert.id || index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-medium text-gray-900">
                      {cert.name}
                      {cert.url && (
                        <a href={cert.url} className="ml-2 text-gray-500 hover:text-gray-700 text-sm font-normal" target="_blank" rel="noopener noreferrer">
                          ↗
                        </a>
                      )}
                    </h4>
                    {cert.date && (
                      <div className="text-sm text-gray-500">
                        {formatDate(cert.date)}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">{cert.issuer}</p>
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Hobbies & Interests */}
      {hobbies.length > 0 && (
        <section>
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">
            Interests
          </h3>
          <p className="text-sm text-gray-700">
            {hobbies.join(' · ')}
          </p>
        </section>
      )}
    </div>
  );
}
