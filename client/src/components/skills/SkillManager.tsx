import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Loader2 } from 'lucide-react';
import api from '../../../services/api';
import { motion, AnimatePresence } from 'framer-motion';

export interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: string;
}

interface SkillManagerProps {
  skills: Skill[];
  onSkillsChange: () => void;
}

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Soft Skill', 'Other'];
const PROFICIENCIES = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const SkillManager: React.FC<SkillManagerProps> = ({ skills, onSkillsChange }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: 'Other',
    proficiency: 'Beginner'
  });

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await api.post('/skills', formData);
      setFormData({ name: '', category: 'Other', proficiency: 'Beginner' });
      setIsAdding(false);
      onSkillsChange();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add skill');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (id: string, currentData: any) => {
    setIsLoading(true);
    setError('');

    try {
      await api.patch(`/skills/${id}`, currentData);
      setEditingId(null);
      onSkillsChange();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update skill');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    
    setIsLoading(true);
    try {
      await api.delete(`/skills/${id}`);
      onSkillsChange();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete skill');
    } finally {
      setIsLoading(false);
    }
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getProficiencyColor = (level: string) => {
    switch(level) {
      case 'Expert': return 'bg-emerald-500 text-emerald-950';
      case 'Advanced': return 'bg-indigo-400 text-indigo-950';
      case 'Intermediate': return 'bg-amber-400 text-amber-950';
      default: return 'bg-neutral-500 text-neutral-100';
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Your Skills</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center"
        >
          {isAdding ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {isAdding ? 'Cancel' : 'Add Skill'}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddSubmit} 
            className="bg-neutral-900/80 border border-indigo-500/30 rounded-xl p-5 space-y-4 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Skill Name (e.g. React)"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 text-sm"
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 text-sm appearance-none"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select
                value={formData.proficiency}
                onChange={(e) => setFormData({...formData, proficiency: e.target.value})}
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 text-sm appearance-none"
              >
                {PROFICIENCIES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !formData.name.trim()}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                Save Skill
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {skills.length === 0 && !isAdding ? (
        <div className="text-center py-12 border border-neutral-800 rounded-xl bg-neutral-900/30 text-neutral-400">
          No skills added yet. Click "Add Skill" to start building your profile.
        </div>
      ) : (
        <div className="space-y-8 mt-6">
          {Object.keys(groupedSkills).sort().map(category => (
            <div key={category} className="space-y-4">
              <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedSkills[category].map(skill => (
                  <div key={skill._id} className="group bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 rounded-xl p-4 transition-all relative overflow-hidden">
                    {editingId === skill._id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          defaultValue={skill.name}
                          onChange={(e) => skill.name = e.target.value}
                          className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded text-white text-sm"
                        />
                        <select
                          defaultValue={skill.category}
                          onChange={(e) => skill.category = e.target.value}
                          className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded text-white text-sm"
                        >
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select
                          defaultValue={skill.proficiency}
                          onChange={(e) => skill.proficiency = e.target.value}
                          className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded text-white text-sm"
                        >
                          {PROFICIENCIES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => setEditingId(null)} className="text-neutral-400 hover:text-white p-1"><X size={16}/></button>
                          <button onClick={() => handleEditSubmit(skill._id, skill)} className="text-green-400 hover:text-green-300 p-1"><Check size={16}/></button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-base font-medium text-white">{skill.name}</h4>
                          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setEditingId(skill._id)} className="p-1.5 text-neutral-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded"><Edit2 size={14} /></button>
                            <button onClick={() => handleDelete(skill._id)} className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded"><Trash2 size={14} /></button>
                          </div>
                        </div>
                        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-md ${getProficiencyColor(skill.proficiency)}`}>
                          {skill.proficiency}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillManager;
