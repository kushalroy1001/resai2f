// src/components/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  FiFileText, FiEdit, FiDownload, FiPlus, FiUser, FiClipboard,
  FiBriefcase, FiTrendingUp, FiAward, FiCheckCircle, FiClock
} from 'react-icons/fi';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Sample data for recent documents
  const recentDocuments = [
    { id: 1, type: 'resume', name: 'Software Developer Resume', lastModified: '2025-04-10' },
    { id: 2, type: 'cover-letter', name: 'Application for Frontend Developer', lastModified: '2025-04-08' },
  ];

  // Sample data for stats
  const stats = [
    { name: 'Resumes Created', value: 3, icon: <FiFileText className="h-6 w-6 text-blue-500" /> },
    { name: 'Cover Letters', value: 2, icon: <FiClipboard className="h-6 w-6 text-green-500" /> },
    { name: 'Downloads', value: 5, icon: <FiDownload className="h-6 w-6 text-purple-500" /> },
  ];

  // Sample job application progress
  const jobProgress = [
    { stage: 'Applications Sent', count: 8, icon: <FiBriefcase className="h-5 w-5 text-blue-500" /> },
    { stage: 'Interviews', count: 3, icon: <FiTrendingUp className="h-5 w-5 text-green-500" /> },
    { stage: 'Offers', count: 1, icon: <FiAward className="h-5 w-5 text-yellow-500" /> },
  ];

  // Sample upcoming events
  const upcomingEvents = [
    { id: 1, title: 'Interview with Tech Solutions Inc.', date: 'April 15, 2025', time: '10:00 AM', type: 'interview' },
    { id: 2, title: 'Follow-up with Creative Agency', date: 'April 17, 2025', time: '2:30 PM', type: 'follow-up' },
  ];

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 animate-pulse">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 space-y-6">
            {/* Skeleton welcome section */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            
            {/* Skeleton stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Skeleton content */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 bg-gray-200 rounded"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome section */}
          <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-4 sm:px-6">
              <h1 className="text-2xl font-bold text-white">
                {greeting}, {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}!
              </h1>
              <p className="mt-1 text-sm text-blue-100">
                Welcome to your Resume & Cover Letter Builder dashboard.
              </p>
            </div>
            <div className="px-4 py-4 sm:px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center">
                <FiCheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-sm text-gray-700">
                  You're successfully logged in and ready to create professional documents for your job search.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-md">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-50 p-3 rounded-full">
                          {stat.icon}
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                          </dd>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Link 
                      to="/resume-builder"
                      className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors duration-300"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <FiFileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900 block">Create Resume</span>
                        <span className="text-xs text-gray-500">Build a professional resume</span>
                      </div>
                    </Link>
                    <Link 
                      to="/cover-letter"
                      className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors duration-300"
                    >
                      <div className="p-2 bg-green-100 rounded-lg mr-3">
                        <FiClipboard className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900 block">Write Cover Letter</span>
                        <span className="text-xs text-gray-500">Craft a compelling cover letter</span>
                      </div>
                    </Link>
                    <Link 
                      to="/profile"
                      className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors duration-300"
                    >
                      <div className="p-2 bg-purple-100 rounded-lg mr-3">
                        <FiUser className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900 block">Update Profile</span>
                        <span className="text-xs text-gray-500">Manage your personal information</span>
                      </div>
                    </Link>
                    <Link 
                      to="/settings"
                      className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-300"
                    >
                      <div className="p-2 bg-gray-100 rounded-lg mr-3">
                        <FiPlus className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900 block">Settings</span>
                        <span className="text-xs text-gray-500">Configure your preferences</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent documents */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Recent Documents</h2>
                </div>
                {recentDocuments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Modified
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentDocuments.map((doc) => (
                          <tr key={doc.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {doc.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${doc.type === 'resume' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                {doc.type === 'resume' ? 'Resume' : 'Cover Letter'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {doc.lastModified}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button className="p-1 rounded-full text-blue-600 hover:bg-blue-50 transition-colors duration-300">
                                  <FiEdit className="h-4 w-4" />
                                </button>
                                <button className="p-1 rounded-full text-green-600 hover:bg-green-50 transition-colors duration-300">
                                  <FiDownload className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 px-4">
                    <FiFileText className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-2 text-sm font-medium text-gray-900">No documents yet</p>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating your first document</p>
                    <div className="mt-6">
                      <Link
                        to="/resume-builder"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors duration-300"
                      >
                        <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                        Create Your First Resume
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Job application progress */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Job Application Progress</h2>
                </div>
                <div className="p-4">
                  {jobProgress.map((item, index) => (
                    <div key={item.stage} className={`flex items-center py-3 ${index < jobProgress.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      <div className="p-2 rounded-full bg-blue-50 mr-4">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.stage}</p>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">{item.count}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming events */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => (
                      <div key={event.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 pt-0.5">
                            <FiClock className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">{event.title}</p>
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <span>{event.date}</span>
                              <span className="mx-1">•</span>
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No upcoming events
                    </div>
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6 text-white">
                  <h2 className="text-lg font-medium">Resume Tips</h2>
                  <p className="mt-2 text-sm text-blue-100">
                    Customize your resume for each job application to highlight relevant skills and experience.
                  </p>
                  <div className="mt-4">
                    <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-xs font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10 focus:outline-none">
                      More Tips
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
