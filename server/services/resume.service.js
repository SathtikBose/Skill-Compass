const Resume = require('../models/Resume');
const { uploadRawToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

class ResumeService {
  /**
   * Upload and save a new resume
   */
  static async uploadResume(userId, file, originalName) {
    // Upload to Cloudinary
    const result = await uploadRawToCloudinary(file.buffer);

    // Save to database
    const resume = new Resume({
      user: userId,
      fileUrl: result.secure_url,
      publicId: result.public_id,
      originalName: originalName,
      fileSize: file.size,
      status: 'pending',
    });

    await resume.save();
    return resume;
  }

  /**
   * Get all resumes for a user
   */
  static async getUserResumes(userId) {
    const resumes = await Resume.find({ user: userId }).sort({ createdAt: -1 });
    return resumes;
  }

  /**
   * Delete a resume
   */
  static async deleteResume(userId, resumeId) {
    const resume = await Resume.findOne({ _id: resumeId, user: userId });
    
    if (!resume) {
      const error = new Error('Resume not found');
      error.statusCode = 404;
      throw error;
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(resume.publicId);

    // Delete from DB
    await Resume.deleteOne({ _id: resumeId });
    
    return true;
  }
}

module.exports = ResumeService;
