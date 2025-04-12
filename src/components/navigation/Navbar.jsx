// src/components/navigation/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { 
  FiMenu, FiX, FiUser, FiLogOut, FiFileText, 
  FiHome, FiSettings, FiFilePlus, FiClipboard, 
  FiChevronDown, FiMoon, FiSun 
} from 'react-icons/fi';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Here you would implement actual dark mode toggling
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  // Navigation links - only shown when user is logged in
  const navLinks = [
    { path: '/dashboard', name: 'Dashboard', icon: <FiHome className="h-5 w-5" /> },
    { path: '/resume-builder', name: 'Resume Builder', icon: <FiFileText className="h-5 w-5" /> },
    { path: '/cover-letter', name: 'Cover Letter', icon: <FiClipboard className="h-5 w-5" /> },
    { path: '/profile', name: 'Profile', icon: <FiUser className="h-5 w-5" /> },
    { path: '/settings', name: 'Settings', icon: <FiSettings className="h-5 w-5" /> },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <FiFilePlus className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ResumeAI
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop navigation */}
          {currentUser && (
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1.5 transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className={isActive(link.path) ? 'text-blue-600' : 'text-gray-500'}>
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </Link>
              ))}
              
              {/* Dark mode toggle */}
              <button 
                onClick={toggleDarkMode}
                className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <FiSun className="h-5 w-5 text-amber-500" />
                ) : (
                  <FiMoon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          )}

          {/* User menu */}
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center">
                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={toggleProfileMenu}
                      className="flex items-center space-x-2 bg-white p-1 rounded-full text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium uppercase">
                        {currentUser.email?.charAt(0) || 'U'}
                      </div>
                      <span className="hidden md:flex items-center">
                        <span className="text-sm font-medium">
                          {currentUser.displayName || currentUser.email?.split('@')[0] || 'User'}
                        </span>
                        <FiChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isProfileOpen ? 'transform rotate-180' : ''}`} />
                      </span>
                    </button>
                  </div>
                  {isProfileOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Link
                        to="/profile"
                        onClick={closeMenu}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={closeMenu}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Mobile menu button */}
                <div className="md:hidden flex items-center ml-3">
                  <button
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? (
                      <FiX className="block h-6 w-6" />
                    ) : (
                      <FiMenu className="block h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && currentUser && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3 ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={closeMenu}
              >
                <span className={isActive(link.path) ? 'text-blue-600' : 'text-gray-500'}>
                  {link.icon}
                </span>
                <span>{link.name}</span>
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium uppercase">
                  {currentUser.email?.charAt(0) || 'U'}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {currentUser.displayName || currentUser.email?.split('@')[0] || 'User'}
                  </div>
                  <div className="text-sm font-medium text-gray-500">{currentUser.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <button
                  onClick={toggleDarkMode}
                  className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  {isDarkMode ? (
                    <>
                      <FiSun className="h-5 w-5 text-amber-500 mr-3" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <FiMoon className="h-5 w-5 text-gray-500 mr-3" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  <FiLogOut className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
