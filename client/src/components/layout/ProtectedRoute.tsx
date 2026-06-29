import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white relative">
        <div className="gradient-bg"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 relative z-10"></div>
      </div>
    );
  }

  return user ? (
    <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden flex flex-col">
      <div className="gradient-bg"></div>
      <Navbar />
      <main className="flex-1 pt-16 relative z-10">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
