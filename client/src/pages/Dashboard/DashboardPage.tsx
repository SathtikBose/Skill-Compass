import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Loader2, Activity, Target, AlertTriangle, Lightbulb, Play, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../../components/dashboard/StatCard';
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
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  const { profile, skills, latestReport } = data;

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 lg:p-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Welcome back{profile?.name ? `, ${profile.name}` : ''}
            </h1>
            <p className="text-neutral-400 mt-1 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Target Role: <span className="font-semibold text-white ml-1">{profile?.targetRole || 'Not set'}</span>
            </p>
          </div>
          
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-900/20 flex items-center disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2 fill-current" />}
            Generate New Analysis
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Skill Compass Score"
            value={latestReport?.score !== undefined ? `${latestReport.score}/100` : 'N/A'}
            subtitle="Market Readiness"
            icon={Compass}
            colorClass="bg-indigo-500 text-indigo-400"
            delay={0.1}
          />
          <StatCard
            title="Decay Score"
            value={latestReport?.decayScore !== undefined ? `${latestReport.decayScore}%` : 'N/A'}
            subtitle="Outdated tech"
            icon={Activity}
            colorClass="bg-red-500 text-red-400"
            delay={0.2}
          />
          <StatCard
            title="Drift Score"
            value={latestReport?.driftScore !== undefined ? `${latestReport.driftScore}%` : 'N/A'}
            subtitle="Focus deviation"
            icon={AlertTriangle}
            colorClass="bg-amber-500 text-amber-400"
            delay={0.3}
          />
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Skill Distribution</h3>
            <SkillsChart skills={skills} />
          </motion.div>

          {/* Missing Skills & Recs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Missing Skills */}
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                Missing Market Skills
              </h3>
              {latestReport?.missingSkills && latestReport.missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {latestReport.missingSkills.map((skill: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 text-sm">Generate an analysis to see missing skills.</p>
              )}
            </div>

            {/* Recommendations */}
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-indigo-400" />
                Learning Roadmap
              </h3>
              {latestReport?.recommendations && latestReport.recommendations.length > 0 ? (
                <div className="space-y-4">
                  {latestReport.recommendations.map((rec: any, i: number) => (
                    <div key={i} className="p-4 bg-neutral-950/50 border border-neutral-800 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-indigo-300">{rec.title}</h4>
                        <span className="text-xs font-medium px-2 py-1 bg-neutral-800 rounded-md text-neutral-400">{rec.difficulty}</span>
                      </div>
                      <p className="text-sm text-neutral-400 mb-3">{rec.description}</p>
                      <div className="flex items-center text-xs text-neutral-500">
                        <span className="mr-4">Est. Time: {rec.estimatedTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 text-sm">No recommendations available.</p>
              )}
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
