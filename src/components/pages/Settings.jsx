// src/components/pages/Settings.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { FiSave, FiLock, FiMoon, FiSun, FiBell } from 'react-icons/fi';

export default function Settings() {
  const { currentUser, resetPassword } = useAuth();
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    emailUpdates: false,
    autoSave: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(currentUser.email);
      toast.success('Password reset email sent. Check your inbox.');
    } catch (error) {
      toast.error('Failed to send password reset email.');
    }
  };

  const handleSaveSettings = () => {
    // Here you would save the settings to Firebase
    toast.success('Settings saved successfully');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    
    // Here you would update the password in Firebase
    toast.success('Password changed successfully');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Application Settings */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {settings.theme === 'dark' ? (
                      <FiMoon className="mr-3 text-gray-700" />
                    ) : (
                      <FiSun className="mr-3 text-yellow-500" />
                    )}
                    <span className="text-sm font-medium text-gray-700">Theme</span>
                  </div>
                  <select
                    name="theme"
                    value={settings.theme}
                    onChange={handleSettingChange}
                    className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System Default</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiBell className="mr-3 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">Notifications</span>
                  </div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={settings.notifications}
                      onChange={handleSettingChange}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Email Updates</span>
                    <p className="text-xs text-gray-500">Receive emails about new features and tips</p>
                  </div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="emailUpdates"
                      checked={settings.emailUpdates}
                      onChange={handleSettingChange}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Auto Save</span>
                    <p className="text-xs text-gray-500">Automatically save your work every 5 minutes</p>
                  </div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="autoSave"
                      checked={settings.autoSave}
                      onChange={handleSettingChange}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleSaveSettings}
                    className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <FiSave className="mr-2" />
                    Save Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Security</h2>
              
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row sm:justify-between gap-3">
                  <button
                    type="submit"
                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <FiLock className="mr-2" />
                    Change Password
                  </button>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Reset Password via Email
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Account Information</h3>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {currentUser?.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Account Created:</strong> {currentUser?.metadata?.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
