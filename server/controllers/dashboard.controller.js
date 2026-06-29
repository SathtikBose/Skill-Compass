const User = require('../models/User');
const SkillService = require('../services/skill.service');
const ReportService = require('../services/report.service');

class DashboardController {
  /**
   * Get Dashboard Data
   * @route GET /api/v1/dashboard
   */
  static async getDashboard(req, res, next) {
    try {
      const userId = req.user.id;

      // Fetch User, Skills, and Latest Report in parallel
      const [user, skillDoc, latestReport] = await Promise.all([
        User.findById(userId),
        SkillService.getUserSkills(userId),
        ReportService.getLatestReport(userId)
      ]);

      const profile = user ? {
        name: user.name,
        targetRole: user.jobTitle
      } : null;

      res.status(200).json({
        success: true,
        data: {
          profile: profile,
          skills: skillDoc.skills || [],
          latestReport: latestReport || null
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DashboardController;
