// src/components/resume/sections/ProjectsSection.jsx
import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function ProjectsSection() {
  const { resumeData, updateSection } = useResume();
  const [projects, setProjects] = useState(resumeData.projects);
  const [activeProject, setActiveProject] = useState(0);
  const [newTechnology, setNewTechnology] = useState('');

  // Handle input change
  const handleChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setProjects(updatedProjects);
    updateSection('projects', updatedProjects);
  };

  // Add new project
  const handleAddProject = () => {
    const newProject = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      current: false,
      url: '',
      technologies: []
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    updateSection('projects', updatedProjects);
    setActiveProject(updatedProjects.length - 1);
  };

  // Remove project
  const handleRemoveProject = (index) => {
    if (projects.length === 1) {
      toast.error("You must have at least one project entry");
      return;
    }
    
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    updateSection('projects', updatedProjects);
    
    if (activeProject >= updatedProjects.length) {
      setActiveProject(updatedProjects.length - 1);
    }
  };

  // Handle current project checkbox
  const handleCurrentProject = (index, checked) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      current: checked,
      endDate: checked ? '' : updatedProjects[index].endDate
    };
    setProjects(updatedProjects);
    updateSection('projects', updatedProjects);
  };

  // Add technology
  const handleAddTechnology = (projectIndex) => {
    if (!newTechnology.trim()) return;
    
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      technologies: [...updatedProjects[projectIndex].technologies, newTechnology.trim()]
    };
    
    setProjects(updatedProjects);
    updateSection('projects', updatedProjects);
    setNewTechnology('');
  };

  // Remove technology
  const handleRemoveTechnology = (projectIndex, techIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      technologies: updatedProjects[projectIndex].technologies.filter((_, i) => i !== techIndex)
    };
    
    setProjects(updatedProjects);
    updateSection('projects', updatedProjects);
  };

  return (
    <div>
      {/* Project tabs */}
      <div className="mb-4 border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeProject === index
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {project.name || `Project ${index + 1}`}
            </button>
          ))}
          <button
            onClick={handleAddProject}
            className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <FiPlus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Active project form */}
      {projects.map((project, index) => (
        <div key={project.id} className={activeProject === index ? 'block' : 'hidden'}>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Project Details</h3>
              <button
                type="button"
                onClick={() => handleRemoveProject(index)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none"
              >
                <FiTrash2 className="mr-1.5 h-4 w-4" />
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id={`name-${index}`}
                    value={project.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor={`url-${index}`} className="block text-sm font-medium text-gray-700">
                  Project URL (Optional)
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    id={`url-${index}`}
                    value={project.url}
                    onChange={(e) => handleChange(index, 'url', e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Link to GitHub repository, live demo, or any other relevant URL
                </p>
              </div>

              <div className="sm:col-span-3">
                <div className="flex items-center h-full pt-5">
                  <input
                    id={`current-${index}`}
                    name={`current-${index}`}
                    type="checkbox"
                    checked={project.current}
                    onChange={(e) => handleCurrentProject(index, e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`current-${index}`} className="ml-2 block text-sm text-gray-700">
                    This is an ongoing project
                  </label>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <div className="mt-1">
                  <input
                    type="month"
                    id={`startDate-${index}`}
                    value={project.startDate}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <div className="mt-1">
                  <input
                    type="month"
                    id={`endDate-${index}`}
                    value={project.endDate}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                    disabled={project.current}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">
                  Project Description
                </label>
                <div className="mt-1">
                  <textarea
                    id={`description-${index}`}
                    rows={3}
                    value={project.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder="Describe the project, your role, and key accomplishments"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Focus on your contributions, challenges overcome, and the impact of the project
                </p>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies Used
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(index, techIndex)}
                        className="ml-1.5 text-blue-500 hover:text-blue-700 focus:outline-none"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {project.technologies.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No technologies added yet</p>
                  )}
                </div>

                <div className="flex">
                  <input
                    type="text"
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    placeholder="Add a technology..."
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTechnology(index);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTechnology(index)}
                    disabled={!newTechnology.trim()}
                    className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <FiPlus className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Press Enter to add a technology. Include programming languages, frameworks, tools, etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
