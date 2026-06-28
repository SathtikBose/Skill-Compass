import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Loader2, Calendar, TrendingUp, TrendingDown, Activity, AlertTriangle, Compass } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 lg:p-24 overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Analysis History
          </h1>
          <p className="text-neutral-400 mt-2">Track your skill progression and career readiness over time.</p>
        </div>

        {history.length === 0 ? (
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-12 text-center text-neutral-400">
            No analysis reports found. Go to your Dashboard to generate one.
          </div>
        ) : (
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-800 before:to-transparent">
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-500 group-hover:text-indigo-400 group-hover:border-indigo-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl transition-colors z-10">
                    <Calendar className="w-4 h-4" />
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-5 hover:border-neutral-700 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-semibold text-indigo-400">{date}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-center">
                        <Compass className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                        <div className="text-xl font-bold text-white">{report.score}</div>
                        <div className="text-[10px] text-neutral-500 uppercase">Readiness</div>
                      </div>
                      <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-center">
                        <Activity className="w-4 h-4 text-red-400 mx-auto mb-1" />
                        <div className="text-xl font-bold text-white">{report.decayScore}</div>
                        <div className="text-[10px] text-neutral-500 uppercase">Decay</div>
                      </div>
                      <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-center">
                        <AlertTriangle className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                        <div className="text-xl font-bold text-white">{report.driftScore}</div>
                        <div className="text-[10px] text-neutral-500 uppercase">Drift</div>
                      </div>
                    </div>

                    {report.missingSkills && report.missingSkills.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-neutral-800">
                        <p className="text-xs text-neutral-500 mb-2">Key Gaps Identified:</p>
                        <div className="flex flex-wrap gap-1">
                          {report.missingSkills.slice(0, 3).map((skill: string, i: number) => (
                            <span key={i} className="text-[10px] px-2 py-1 bg-neutral-800 text-neutral-300 rounded">
                              {skill}
                            </span>
                          ))}
                          {report.missingSkills.length > 3 && (
                            <span className="text-[10px] px-2 py-1 bg-neutral-800 text-neutral-500 rounded">
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
