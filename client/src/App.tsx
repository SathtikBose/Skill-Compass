import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import ProfilePage from './pages/Dashboard/ProfilePage';
import ResumePage from './pages/Dashboard/ResumePage';
import SkillsPage from './pages/Dashboard/SkillsPage';

// Dummy Dashboard for now
const Dashboard = () => (
  <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center flex-col gap-4">
    <h1 className="text-3xl font-bold">Dashboard (Protected)</h1>
    <a href="/profile" className="text-indigo-400 hover:underline">Go to Profile</a>
    <a href="/resumes" className="text-indigo-400 hover:underline">Go to Resumes</a>
    <a href="/skills" className="text-indigo-400 hover:underline">Go to Skills</a>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/resumes" element={<ResumePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            {/* Add more protected routes here later */}
          </Route>
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
