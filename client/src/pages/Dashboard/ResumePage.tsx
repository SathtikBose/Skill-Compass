import React, { useState, useEffect } from 'react';
import ResumeUploader from '../../components/resume/ResumeUploader';
import api from '../../services/api';
import { Loader2, FileText, Trash2, Calendar, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Resume {
  _id: string;
  originalName: string;
  fileSize: number;
  status: 'pending' | 'parsed' | 'failed';
  createdAt: string;
}

const ResumePage: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      const response = await api.get('/resumes');
      setResumes(response.data.data.resumes);
    } catch (error) {
      console.error('Failed to fetch resumes', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    
    try {
      await api.delete(`/resumes/${id}`);
      setResumes(resumes.filter(r => r._id !== id));
    } catch (error) {
      console.error('Failed to delete resume', error);
      alert('Failed to delete resume.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'parsed':
        return <span className="flex items-center text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-md"><CheckCircle2 className="w-3 h-3 mr-1"/> Parsed</span>;
      case 'pending':
        return <span className="flex items-center text-xs font-medium text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md"><Clock className="w-3 h-3 mr-1"/> Pending</span>;
      case 'failed':
        return <span className="flex items-center text-xs font-medium text-red-400 bg-red-400/10 px-2 py-1 rounded-md"><AlertTriangle className="w-3 h-3 mr-1"/> Failed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 lg:p-24">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Resume Management
          </h1>
          <p className="text-neutral-400 mt-2">Upload your latest resume for AI analysis and skill extraction.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Uploader Section */}
          <div className="lg:col-span-1">
            <ResumeUploader onUploadSuccess={fetchResumes} />
          </div>

          {/* Resumes List Section */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Your Resumes</h2>
            
            {isLoading ? (
              <div className="flex justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
              </div>
            ) : resumes.length === 0 ? (
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 text-center text-neutral-400">
                You haven't uploaded any resumes yet.
              </div>
            ) : (
              <div className="space-y-4">
                {resumes.map((resume, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={resume._id} 
                    className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-5 flex items-center justify-between group hover:border-indigo-500/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-red-500/20 p-3 rounded-xl text-red-400">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-white truncate max-w-[200px] md:max-w-xs" title={resume.originalName}>
                          {resume.originalName}
                        </h3>
                        <div className="flex items-center text-xs text-neutral-400 mt-1 space-x-4">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(resume.createdAt)}
                          </span>
                          <span>{(resume.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(resume.status)}
                      <button 
                        onClick={() => handleDelete(resume._id)}
                        className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Resume"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
