const SkillService = require('../services/skill.service');

class SkillController {
  /**
   * Get User Skills
   * @route GET /api/v1/skills
   */
  static async getSkills(req, res, next) {
    try {
      const skillDoc = await SkillService.getUserSkills(req.user.id);
      
      res.status(200).json({
        success: true,
        data: { skills: skillDoc.skills },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Add Skill
   * @route POST /api/v1/skills
   */
  static async addSkill(req, res, next) {
    try {
      const { name, category, proficiency } = req.body;
      
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Skill name is required',
        });
      }

      const skillDoc = await SkillService.addSkill(req.user.id, { name, category, proficiency });
      
      res.status(201).json({
        success: true,
        message: 'Skill added successfully',
        data: { skills: skillDoc.skills },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Skill
   * @route PATCH /api/v1/skills/:id
   */
  static async updateSkill(req, res, next) {
    try {
      const skillDoc = await SkillService.updateSkill(req.user.id, req.params.id, req.body);
      
      res.status(200).json({
        success: true,
        message: 'Skill updated successfully',
        data: { skills: skillDoc.skills },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Skill
   * @route DELETE /api/v1/skills/:id
   */
  static async deleteSkill(req, res, next) {
    try {
      const skillDoc = await SkillService.deleteSkill(req.user.id, req.params.id);
      
      res.status(200).json({
        success: true,
        message: 'Skill deleted successfully',
        data: { skills: skillDoc.skills },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SkillController;
