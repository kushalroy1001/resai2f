import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { ResumeProvider } from './context/ResumeContext.jsx';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';
import ResumeBuilder from './components/resume/ResumeBuilder';
import CoverLetter from './components/pages/CoverLetter';
import Profile from './components/pages/Profile';
import Settings from './components/pages/Settings';
import Navbar from './components/navigation/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ResumeProvider>
          <ToastContainer position="top-center" />
          <div className="flex flex-col min-h-screen">
            {/* Navbar is always displayed */}
            <Navbar />
            <div className="flex-grow pt-16"> {/* Add padding-top to account for fixed navbar */}
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Protected routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/resume-builder" element={
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                } />
                <Route path="/cover-letter" element={
                  <ProtectedRoute>
                    <CoverLetter />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                
                {/* Catch-all route */}
                <Route path="*" element={
                  <Navigate to="/login" replace />
                } />
              </Routes>
            </div>
          </div>
        </ResumeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
