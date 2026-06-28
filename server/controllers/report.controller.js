const ReportService = require('../services/report.service');

class ReportController {
  /**
   * Generate a new Report
   * @route POST /api/v1/reports
   */
  static async generateReport(req, res, next) {
    try {
      const report = await ReportService.generateReport(req.user.id);
      
      res.status(201).json({
        success: true,
        message: 'Analysis generated successfully',
        data: { report },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Report History
   * @route GET /api/v1/reports/history
   */
  static async getReportHistory(req, res, next) {
    try {
      const history = await ReportService.getReportHistory(req.user.id);
      
      res.status(200).json({
        success: true,
        data: { history },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportController;
