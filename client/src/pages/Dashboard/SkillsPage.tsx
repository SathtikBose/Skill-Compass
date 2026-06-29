import React, { useState, useEffect } from 'react';
import SkillManager from '../../components/skills/SkillManager';
import type { Skill } from '../../components/skills/SkillManager';
import api from '../../services/api';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSkills = async () => {
    try {
      const response = await api.get('/skills');
      setSkills(response.data.data.skills);
    } catch (error) {
      console.error('Failed to fetch skills', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="gradient-bg"></div>
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6 md:p-12 lg:p-24 relative overflow-x-hidden">
      <div className="gradient-bg"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-8 relative z-10"
      >
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 animate-gradient">
            Skills Profile
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Manage your tech stack, tools, and expertise.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 border-t border-l border-white/10 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <SkillManager skills={skills} onSkillsChange={fetchSkills} />
        </div>
        
      </motion.div>
    </div>
  );
};

export default SkillsPage;
