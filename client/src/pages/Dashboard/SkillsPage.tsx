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
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 lg:p-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Skills Profile
          </h1>
          <p className="text-neutral-400 mt-2">Manage your tech stack, tools, and expertise.</p>
        </div>

        <div className="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          <SkillManager skills={skills} onSkillsChange={fetchSkills} />
        </div>
        
      </motion.div>
    </div>
  );
};

export default SkillsPage;
