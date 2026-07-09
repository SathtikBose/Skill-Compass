import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { User, Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';
import ThemeToggle from '../../components/layout/ThemeToggle';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

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

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        setError('');
        const res = await api.post('/auth/google', { token: tokenResponse.access_token });
        login(res.data.data.token, res.data.data.user);
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Google sign up failed.');
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setError('Google Sign Up failed');
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center app-surface relative overflow-hidden font-body p-4">
      <div className="gradient-bg"></div>
      <div className="absolute right-5 top-5 z-20">
        <ThemeToggle />
      </div>
      
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
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-slate-400 font-bold">OR</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button onClick={() => googleLogin()} type="button" className="flex items-center justify-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Sign up with Google
            </button>
          </div>
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
