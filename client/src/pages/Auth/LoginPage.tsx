import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
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
      const response = await api.post('/auth/login', { email, password });
      login(response.data.data.token, response.data.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden font-body text-slate-50">
      <div className="gradient-bg"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md rounded-3xl p-8 md:p-10 relative overflow-hidden z-10"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#818cf8]/30 to-transparent"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold font-headline mb-2 text-white">Welcome Back</h1>
          <p className="text-slate-400 font-label text-sm">Continue your journey to mastery</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="flex justify-end pt-2">
              <Link to="/forgot-password" className="text-xs text-[#818cf8] hover:text-[#a855f7] transition-colors font-medium">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-gradient w-full py-4 rounded-xl text-white font-bold text-lg cursor-pointer active:scale-95 transition-transform flex justify-center items-center"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Sign In'}
          </button>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-slate-400 font-bold">OR</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-medium">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJmXzky8kZvnONzQJiRkgxabr-ZS8P1ZHXKbV87j33u4fdRmgTJ5fRfLa0YAEfiQW0cI6dLMc0jN-jgO2VZlF1H2qT2E9hpL9Q6ocdWqApdeRCQ-A0rY4HPbYrLgGMCQRIDqTRVcWKQcL0uuWG7pN1h3_InH0--CNxNVZPlXRxxHC5lijl5fWE8msNYKMm7PZUNBGpxlox8UeRRTPavh8TcwDZ2daPyErBcBdrh4B4svgpG7B3fbDiBNk_Y3UtcbAVd7P9HCx4yECN" alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-medium">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsD8ewDqXkngbTkiQ8qH92ibvWXXB3hBXWIOMqiAUK0Hrv_g2lYPMimXIzgj0o_I8udpyzU3CRbt1Pq95InZ8eYb-mHn1hmxIAoCHrzhcuwJcDSnOq9aZ-4BqKNP5X97_WljdtKsVIcbEH7fAXBqmSjytZtyuInn6S-uRcMh2oVg0nN2bkuz0ej1Bsk3nln_L7QaLHyP4vACWXJ_j_2T_GwFOEy040b3aw3QrRLhGOfUgo9-fylBdFeIzXWnwbwgrzgKyZtxYqno0m" alt="Apple" className="w-5 h-5" />
              Apple
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm font-label">
            Don't have an account? 
            <Link to="/register" className="text-[#818cf8] hover:text-[#a855f7] font-bold transition-all ml-1">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
