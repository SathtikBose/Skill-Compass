import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, FileText, Code2, Activity, MessageSquare, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Compass className="w-4 h-4 mr-2" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-4 h-4 mr-2" /> },
    { name: 'Resumes', path: '/resumes', icon: <FileText className="w-4 h-4 mr-2" /> },
    { name: 'Skills', path: '/skills', icon: <Code2 className="w-4 h-4 mr-2" /> },
    { name: 'History', path: '/history', icon: <Activity className="w-4 h-4 mr-2" /> },
    { name: 'Assistant', path: '/chat', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/10 px-6 py-4 flex justify-between items-center backdrop-blur-md">
      <div className="flex items-center space-x-8">
        <Link to="/dashboard" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center">
          <Compass className="w-6 h-6 mr-2 text-indigo-400" />
          Skill Compass
        </Link>
        <div className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:block text-sm text-gray-400 mr-2">
          {user?.name}
        </div>
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all border border-red-500/20"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
