const Profile = require('../models/Profile');
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

      // Fetch Profile, Skills, and Latest Report in parallel
      const [profile, skillDoc, latestReport] = await Promise.all([
        Profile.findOne({ user: userId }),
        SkillService.getUserSkills(userId),
        ReportService.getLatestReport(userId)
      ]);

      res.status(200).json({
        success: true,
        data: {
          profile: profile || null,
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
