import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { User, Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/register', { name, email, password });
      login(response.data.data.token, response.data.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden font-body text-slate-50 p-4">
      <div className="gradient-bg"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md rounded-3xl p-8 md:p-10 relative overflow-hidden z-10"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#818cf8]/30 to-transparent"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold font-headline mb-2 text-white">Create Account</h1>
          <p className="text-slate-400 font-label text-sm">Join Skill Compass to boost your career</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative floating-label-input">
            <input 
              id="name" 
              name="name" 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              placeholder=" "
              className="block w-full px-4 py-4 bg-[#0f172a]/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#818cf8]/50 focus:border-[#818cf8] outline-none transition-all text-white placeholder-transparent"
            />
            <label 
              htmlFor="name"
              className="absolute left-4 top-4 text-slate-400 pointer-events-none transition-all duration-200 origin-left"
            >
              Full Name
            </label>
            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#818cf8] transition-colors pointer-events-none">
              <User size={18} />
            </button>
          </div>

          <div className="relative floating-label-input">
            <input 
              id="email" 
              name="email" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder=" "
              className="block w-full px-4 py-4 bg-[#0f172a]/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#818cf8]/50 focus:border-[#818cf8] outline-none transition-all text-white placeholder-transparent"
            />
            <label 
              htmlFor="email"
              className="absolute left-4 top-4 text-slate-400 pointer-events-none transition-all duration-200 origin-left"
            >
              Email Address
            </label>
          </div>

          <div className="space-y-1">
            <div className="relative floating-label-input">
              <input 
                id="password" 
                name="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                minLength={8}
                placeholder=" "
                className="block w-full px-4 py-4 bg-[#0f172a]/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#818cf8]/50 focus:border-[#818cf8] outline-none transition-all text-white placeholder-transparent"
              />
              <label 
                htmlFor="password"
                className="absolute left-4 top-4 text-slate-400 pointer-events-none transition-all duration-200 origin-left"
              >
                Password
              </label>
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#818cf8] transition-colors">
                <Lock size={18} />
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-gradient w-full py-4 rounded-xl text-white font-bold text-lg cursor-pointer active:scale-95 transition-transform flex justify-center items-center mt-2"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Sign Up'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm font-label">
            Already have an account? 
            <Link to="/login" className="text-[#818cf8] hover:text-[#a855f7] font-bold transition-all ml-1">
              Sign in instead
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
