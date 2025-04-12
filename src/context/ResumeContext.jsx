// src/context/ResumeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';

const ResumeContext = createContext();

const useResume = () => {
  return useContext(ResumeContext);
};

const ResumeProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      title: '',
      summary: '',
      linkedin: '',
      website: '',
    },
    workExperience: [
      {
        id: 'exp-1',
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [],
      },
    ],
    education: [
      {
        id: 'edu-1',
        institution: '',
        degree: '',
        field: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        gpa: '',
      },
    ],
    skills: [
      {
        id: 'skill-1',
        category: 'Technical Skills',
        skills: [],
      },
      {
        id: 'skill-2',
        category: 'Soft Skills',
        skills: [],
      },
    ],
    projects: [
      {
        id: 'proj-1',
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        current: false,
        url: '',
        technologies: [],
      },
    ],
    certifications: [
      {
        id: 'cert-1',
        name: '',
        issuer: '',
        date: '',
        url: '',
        description: '',
      },
    ],
    hobbies: [],
  });

  // Load resume data from localStorage on component mount
  useEffect(() => {
    if (currentUser) {
      const savedData = localStorage.getItem(`resume_${currentUser.uid}`);
      const savedTemplate = localStorage.getItem(`template_${currentUser.uid}`);
      
      if (savedData) {
        setResumeData(JSON.parse(savedData));
      }
      
      if (savedTemplate) {
        setActiveTemplate(savedTemplate);
      }
    }
  }, [currentUser]);

  // Save resume data to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`resume_${currentUser.uid}`, JSON.stringify(resumeData));
      localStorage.setItem(`template_${currentUser.uid}`, activeTemplate);
    }
  }, [resumeData, activeTemplate, currentUser]);

  // Update a specific section of the resume
  const updateSection = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  // Add a new item to an array section (work experience, education, etc.)
  const addItem = (section, item) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], item],
    }));
  };

  // Update an existing item in an array section
  const updateItem = (section, id, updatedItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    }));
  };

  // Remove an item from an array section
  const removeItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id),
    }));
  };

  // Reset the entire resume to default values
  const resetResume = () => {
    setResumeData({
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        title: '',
        summary: '',
        linkedin: '',
        website: '',
      },
      workExperience: [
        {
          id: 'exp-1',
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          achievements: [],
        },
      ],
      education: [
        {
          id: 'edu-1',
          institution: '',
          degree: '',
          field: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          gpa: '',
        },
      ],
      skills: [
        {
          id: 'skill-1',
          category: 'Technical Skills',
          skills: [],
        },
        {
          id: 'skill-2',
          category: 'Soft Skills',
          skills: [],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          name: '',
          description: '',
          startDate: '',
          endDate: '',
          current: false,
          url: '',
          technologies: [],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: '',
          issuer: '',
          date: '',
          url: '',
          description: '',
        },
      ],
      hobbies: [],
    });
  };

  const value = {
    resumeData,
    activeTemplate,
    setActiveTemplate,
    updateSection,
    addItem,
    updateItem,
    removeItem,
    resetResume,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export { useResume, ResumeProvider };
