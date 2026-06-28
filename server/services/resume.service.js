const Resume = require('../models/Resume');
const { uploadRawToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');
const axios = require('axios');
const pdfParse = require('pdf-parse');
const geminiService = require('../ai/gemini.service');
const SkillService = require('./skill.service');

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
   * Extract skills from a resume using AI
   */
  static async extractSkills(userId, resumeId) {
    const resume = await Resume.findOne({ _id: resumeId, user: userId });
    
    if (!resume) {
      const error = new Error('Resume not found');
      error.statusCode = 404;
      throw error;
    }

    if (resume.status === 'parsed') {
      const error = new Error('Resume is already parsed');
      error.statusCode = 400;
      throw error;
    }

    try {
      // 1. Download PDF from Cloudinary
      const response = await axios.get(resume.fileUrl, { responseType: 'arraybuffer' });
      const pdfBuffer = Buffer.from(response.data);

      // 2. Parse PDF text
      const pdfData = await pdfParse(pdfBuffer);
      const text = pdfData.text;

      if (!text || text.trim().length === 0) {
        throw new Error('No readable text found in PDF');
      }

      // 3. Send text to Gemini to extract skills
      const extractedSkills = await geminiService.extractSkills(text);

      // 4. Update Resume document
      resume.status = 'parsed';
      resume.parsedData = { skills: extractedSkills };
      await resume.save();

      // 5. Add extracted skills to User's Skill profile
      // To avoid failing on duplicate skills, we'll try adding them individually or safely
      for (const skill of extractedSkills) {
        try {
          await SkillService.addSkill(userId, skill);
        } catch (err) {
          // Ignore "Skill already exists" errors during batch extraction
          if (err.message !== 'Skill already exists') {
            console.error('Error saving extracted skill:', err);
          }
        }
      }

      return resume;
    } catch (err) {
      console.error('Resume Extraction Error:', err);
      resume.status = 'failed';
      await resume.save();
      const error = new Error('Failed to parse resume');
      error.statusCode = 500;
      throw error;
    }
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
