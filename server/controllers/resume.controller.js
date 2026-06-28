const ResumeService = require('../services/resume.service');

class ResumeController {
  /**
   * Upload Resume
   * @route POST /api/v1/resumes
   */
  static async uploadResume(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No PDF file provided',
        });
      }

      const resume = await ResumeService.uploadResume(req.user.id, req.file, req.file.originalname);
      
      res.status(201).json({
        success: true,
        message: 'Resume uploaded successfully',
        data: { resume },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get User Resumes
   * @route GET /api/v1/resumes
   */
  static async getResumes(req, res, next) {
    try {
      const resumes = await ResumeService.getUserResumes(req.user.id);
      
      res.status(200).json({
        success: true,
        data: { resumes },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Resume
   * @route DELETE /api/v1/resumes/:id
   */
  static async deleteResume(req, res, next) {
    try {
      await ResumeService.deleteResume(req.user.id, req.params.id);
      
      res.status(200).json({
        success: true,
        message: 'Resume deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ResumeController;
