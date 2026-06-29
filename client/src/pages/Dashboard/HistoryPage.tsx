import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Loader2, Calendar, Activity, AlertTriangle, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/reports/history');
        setHistory(response.data.data.history);
      } catch (error) {
        console.error('Failed to fetch history', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
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
    <div className="min-h-screen text-white p-6 md:p-12 lg:p-24 overflow-x-hidden relative">
      <div className="gradient-bg"></div>
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 animate-gradient">
            Analysis History
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Track your skill progression and career readiness over time.</p>
        </div>

        {history.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center text-gray-400 border-t border-l border-white/10">
            No analysis reports found. Go to your Dashboard to generate one.
          </div>
        ) : (
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {history.map((report, index) => {
              const date = new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={report._id} 
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-gray-500 group-hover:text-indigo-400 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl transition-all z-10">
                    <Calendar className="w-4 h-4" />
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card border-t border-l border-white/10 rounded-2xl p-5 hover:border-indigo-400/30 transition-colors relative overflow-hidden group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="flex justify-between items-center mb-4 relative z-10">
                      <span className="text-sm font-semibold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">{date}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 relative z-10">
                      <div className="bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/5 text-center hover:border-white/10 transition-colors shadow-inner">
                        <Compass className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                        <div className="text-xl font-bold text-white">{report.score}</div>
                        <div className="text-[10px] text-gray-500 uppercase font-medium mt-1 tracking-wider">Readiness</div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/5 text-center hover:border-white/10 transition-colors shadow-inner">
                        <Activity className="w-4 h-4 text-red-400 mx-auto mb-1" />
                        <div className="text-xl font-bold text-white">{report.decayScore}</div>
                        <div className="text-[10px] text-gray-500 uppercase font-medium mt-1 tracking-wider">Decay</div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/5 text-center hover:border-white/10 transition-colors shadow-inner">
                        <AlertTriangle className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                        <div className="text-xl font-bold text-white">{report.driftScore}</div>
                        <div className="text-[10px] text-gray-500 uppercase font-medium mt-1 tracking-wider">Drift</div>
                      </div>
                    </div>

                    {report.missingSkills && report.missingSkills.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/5 relative z-10">
                        <p className="text-xs text-gray-400 mb-3 font-medium">Key Gaps Identified:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {report.missingSkills.slice(0, 3).map((skill: string, i: number) => (
                            <span key={i} className="text-[10px] px-2.5 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-md shadow-sm">
                              {skill}
                            </span>
                          ))}
                          {report.missingSkills.length > 3 && (
                            <span className="text-[10px] px-2.5 py-1 bg-white/5 border border-white/10 text-gray-500 rounded-md shadow-sm">
                              +{report.missingSkills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
