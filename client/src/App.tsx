import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import ProfilePage from './pages/Dashboard/ProfilePage';
import ResumePage from './pages/Dashboard/ResumePage';
import SkillsPage from './pages/Dashboard/SkillsPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import HistoryPage from './pages/Dashboard/HistoryPage';
import ChatPage from './pages/Dashboard/ChatPage';

const App: React.FC = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/resumes" element={<ResumePage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/chat" element={<ChatPage />} />
              {/* Add more protected routes here later */}
            </Route>
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
