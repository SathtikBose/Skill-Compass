import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

interface ResumeUploaderProps {
  onUploadSuccess: () => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setErrorMessage('Only PDF files are allowed.');
      setStatus('error');
      return false;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMessage('File size must be less than 5MB.');
      setStatus('error');
      return false;
    }
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setStatus('idle');
        setErrorMessage('');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setStatus('idle');
        setErrorMessage('');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus('uploading');
    const formData = new FormData();
    formData.append('resume', file);

    try {
      await api.post('/resumes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setStatus('success');
      setFile(null);
      onUploadSuccess();
      
      // Reset success state after 3s
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
      
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.response?.data?.message || 'Upload failed. Please try again.');
    }
  };

  const removeFile = () => {
    setFile(null);
    setStatus('idle');
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 ease-in-out text-center flex flex-col items-center justify-center min-h-[250px] ${
          isDragging 
            ? 'border-indigo-500 bg-indigo-500/10' 
            : 'border-neutral-700 bg-neutral-900/30 hover:border-neutral-500 hover:bg-neutral-800/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="application/pdf" 
          className="hidden" 
        />
        
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div 
              key="upload-prompt"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mb-4 text-indigo-400 shadow-lg">
                <UploadCloud size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Upload your Resume</h3>
              <p className="text-neutral-400 mb-6 max-w-sm">
                Drag and drop your PDF resume here, or click the button below to browse. Max size 5MB.
              </p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white rounded-xl transition-colors font-medium shadow-sm"
              >
                Browse Files
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="file-selected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center w-full max-w-md"
            >
              <div className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-4 flex items-center justify-between mb-6 shadow-lg">
                <div className="flex items-center space-x-4 overflow-hidden">
                  <div className="bg-red-500/20 p-2 rounded-lg text-red-400">
                    <FileText size={24} />
                  </div>
                  <div className="text-left truncate">
                    <p className="text-sm font-medium text-white truncate w-48">{file.name}</p>
                    <p className="text-xs text-neutral-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                
                {status !== 'uploading' && (
                  <button 
                    onClick={removeFile}
                    className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <button 
                onClick={handleUpload}
                disabled={status === 'uploading'}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium flex items-center justify-center transition-colors shadow-lg disabled:opacity-70"
              >
                {status === 'uploading' ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Upload Resume'
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error/Success Messages */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center text-red-400 text-sm font-medium"
          >
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            {errorMessage}
          </motion.div>
        )}
        
        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center text-green-400 text-sm font-medium"
          >
            <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
            Resume uploaded successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeUploader;
