// src/components/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { FiUser, FiMail, FiSave, FiCamera } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Profile() {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    photoURL: '',
    phone: '',
    location: '',
    profession: '',
    bio: ''
  });

  useEffect(() => {
    // Initialize form with current user data
    if (currentUser) {
      setProfileData({
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
        photoURL: currentUser.photoURL || '',
        phone: '',
        location: '',
        profession: '',
        bio: ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would update the user profile in Firebase
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Profile header */}
            <div className="bg-blue-600 h-32 relative">
              <div className="absolute -bottom-16 left-6">
                <div className="h-32 w-32 rounded-full bg-white p-1 shadow-lg">
                  {profileData.photoURL ? (
                    <img 
                      src={profileData.photoURL} 
                      alt="Profile" 
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center">
                      <FiUser className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700">
                      <FiCamera className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Profile content */}
            <div className="pt-20 pb-8 px-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profileData.displayName || 'Your Name'}
                  </h2>
                  <p className="text-gray-600 flex items-center mt-1">
                    <FiMail className="mr-2" />
                    {profileData.email}
                  </p>
                  {!isEditing && profileData.profession && (
                    <p className="text-gray-700 mt-2">{profileData.profession}</p>
                  )}
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="displayName"
                        name="displayName"
                        value={profileData.displayName}
                        onChange={handleChange}
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
                        name="email"
                        value={profileData.email}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
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
                        name="location"
                        value={profileData.location}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
                        Profession
                      </label>
                      <input
                        type="text"
                        id="profession"
                        name="profession"
                        value={profileData.profession}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="e.g. Software Engineer"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={profileData.bio}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <FiSave className="mr-2" />
                      Save Profile
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {profileData.bio ? (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
                      <p className="text-gray-700">{profileData.bio}</p>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                      <p className="text-gray-500">
                        Your profile is quite empty. Click "Edit Profile" to add more information about yourself.
                      </p>
                    </div>
                  )}

                  {profileData.location && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Location</h3>
                      <p className="text-gray-700">{profileData.location}</p>
                    </div>
                  )}

                  {profileData.phone && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Contact</h3>
                      <p className="text-gray-700">{profileData.phone}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
