import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Loader2, Activity, Target, AlertTriangle, Lightbulb, Play, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import SkillsChart from '../../components/dashboard/SkillsChart';

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/dashboard');
      setData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      await api.post('/reports');
      await fetchDashboard();
    } catch (error) {
      console.error('Failed to generate report', error);
      alert('Failed to generate report. Make sure you have skills added.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="gradient-bg"></div>
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  const { profile, skills, latestReport } = data;

  return (
    <div className="min-h-screen text-white p-6 md:p-12 lg:p-24 overflow-x-hidden relative">
      <div className="gradient-bg"></div>
      
      <div className="max-w-7xl mx-auto space-y-8 z-10 relative">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 animate-gradient">
              Welcome back{profile?.name ? `, ${profile.name}` : ''}
            </h1>
            <p className="text-gray-400 mt-2 flex items-center text-lg">
              <Target className="w-5 h-5 mr-2 text-purple-400" />
              Target Role: <span className="font-semibold text-white ml-2 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">{profile?.targetRole || 'Not set'}</span>
            </p>
          </div>
          
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="px-6 py-3 btn-gradient text-white rounded-xl text-sm font-medium flex items-center disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Play className="w-5 h-5 mr-2 fill-current" />}
            Generate New Analysis
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="glass-card rounded-2xl p-6 h-full border-t border-l border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">Skill Compass Score</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{latestReport?.score !== undefined ? `${latestReport.score}/100` : 'N/A'}</h3>
                  <p className="text-xs text-indigo-300 mt-1">Market Readiness</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="glass-card rounded-2xl p-6 h-full border-t border-l border-white/10 relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">Decay Score</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{latestReport?.decayScore !== undefined ? `${latestReport.decayScore}%` : 'N/A'}</h3>
                  <p className="text-xs text-red-300 mt-1">Outdated tech</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="glass-card rounded-2xl p-6 h-full border-t border-l border-white/10 relative overflow-hidden">
               {/* Subtle background glow */}
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">Drift Score</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{latestReport?.driftScore !== undefined ? `${latestReport.driftScore}%` : 'N/A'}</h3>
                  <p className="text-xs text-amber-300 mt-1">Focus deviation</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 glass-card rounded-2xl p-6 border-t border-l border-white/10 flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
              <div className="w-2 h-6 bg-indigo-500 rounded-full mr-3 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
              Skill Distribution
            </h3>
            <div className="flex-1 min-h-[300px]">
               <SkillsChart skills={skills} />
            </div>
          </motion.div>

          {/* Missing Skills & Recs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Missing Skills */}
            <div className="glass-card rounded-2xl p-6 border-t border-l border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              
              <h3 className="text-xl font-semibold mb-5 flex items-center text-white relative z-10">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 mr-3 border border-amber-500/30">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                Missing Market Skills
              </h3>
              
              <div className="relative z-10">
                {latestReport?.missingSkills && latestReport.missingSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {latestReport.missingSkills.map((skill: string, i: number) => (
                      <span key={i} className="px-4 py-2 bg-black/40 backdrop-blur-md border border-amber-500/30 text-gray-200 rounded-xl text-sm font-medium shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:border-amber-400/50 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 border border-dashed border-gray-700 rounded-xl bg-black/20 text-center">
                    <p className="text-gray-400 text-sm">Generate an analysis to see missing skills.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass-card rounded-2xl p-6 border-t border-l border-white/10 relative overflow-hidden">
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4"></div>

              <h3 className="text-xl font-semibold mb-5 flex items-center text-white relative z-10">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 mr-3 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                   <Lightbulb className="w-5 h-5" />
                </div>
                Learning Roadmap
              </h3>
              
              <div className="relative z-10">
                {latestReport?.recommendations && latestReport.recommendations.length > 0 ? (
                  <div className="space-y-4">
                    {latestReport.recommendations.map((rec: any, i: number) => (
                      <div key={i} className="p-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/5 transition-colors group">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-indigo-300 group-hover:text-indigo-200 transition-colors">{rec.title}</h4>
                          <span className="text-xs font-medium px-3 py-1 bg-white/10 rounded-full text-gray-300 border border-white/5">{rec.difficulty}</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">{rec.description}</p>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                          <div className="flex items-center text-xs text-gray-500 font-mono">
                            <span className="text-indigo-400/80 mr-2">Est. Time:</span> {rec.estimatedTime}
                          </div>
                          <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Start Path &rarr;</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 border border-dashed border-gray-700 rounded-xl bg-black/20 text-center flex flex-col items-center justify-center">
                    <Compass className="w-8 h-8 text-gray-600 mb-3" />
                    <p className="text-gray-400 text-sm">No recommendations available.</p>
                  </div>
                )}
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
