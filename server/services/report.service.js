const Report = require('../models/Report');
const Profile = require('../models/Profile');
const SkillService = require('./skill.service');
const geminiService = require('../ai/gemini.service');

class ReportService {
  /**
   * Generate a new Analysis Report
   */
  static async generateReport(userId) {
    const profile = await Profile.findOne({ user: userId });
    const targetRole = profile?.targetRole || 'Software Engineer';
    
    const skillDoc = await SkillService.getUserSkills(userId);
    const currentSkills = skillDoc.skills;

    if (!currentSkills || currentSkills.length === 0) {
      const error = new Error('No skills found. Please add skills before generating a report.');
      error.statusCode = 400;
      throw error;
    }

    // Call Gemini API to generate the analysis
    const analysisData = await geminiService.generateAnalysis(targetRole, currentSkills);

    // Save to Database
    const report = new Report({
      user: userId,
      score: analysisData.score,
      decayScore: analysisData.decayScore,
      driftScore: analysisData.driftScore,
      missingSkills: analysisData.missingSkills,
      recommendations: analysisData.recommendations,
      evidence: analysisData.evidence,
    });

    await report.save();
    return report;
  }

  /**
   * Get Report History for a user
   */
  static async getReportHistory(userId) {
    return await Report.find({ user: userId }).sort({ createdAt: -1 });
  }

  /**
   * Get latest report
   */
  static async getLatestReport(userId) {
    return await Report.findOne({ user: userId }).sort({ createdAt: -1 });
  }
}

module.exports = ReportService;
