import React, { useState, useRef } from 'react';
import { Camera, Loader2, Upload } from 'lucide-react';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

interface AvatarUploadProps {
  currentAvatar: string | undefined;
  onUploadSuccess: () => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ currentAvatar, onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');
    setIsUploading(true);

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      await api.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUploadSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload avatar');
    } finally {
      setIsUploading(false);
    }
  };

  const getInitials = (name: string = '') => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500/30 bg-neutral-800 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
          {currentAvatar ? (
            <img src={currentAvatar} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl font-bold text-neutral-400">
              {getInitials(user?.name)}
            </span>
          )}
          
          <div 
            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : (
              <>
                <Camera className="w-8 h-8 text-white mb-1" />
                <span className="text-xs text-white font-medium">Update</span>
              </>
            )}
          </div>
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      
      {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
      
      <button 
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload new avatar
      </button>
    </div>
  );
};

export default AvatarUpload;
