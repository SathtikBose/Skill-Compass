const Skill = require('../models/Skill');

class SkillService {
  /**
   * Get all skills for a user
   */
  static async getUserSkills(userId) {
    let skillDoc = await Skill.findOne({ user: userId });
    
    // If not found, return empty structure instead of error
    if (!skillDoc) {
      skillDoc = await Skill.create({ user: userId, skills: [] });
    }
    
    return skillDoc;
  }

  /**
   * Add a new skill
   */
  static async addSkill(userId, skillData) {
    let skillDoc = await Skill.findOne({ user: userId });
    
    if (!skillDoc) {
      skillDoc = new Skill({ user: userId, skills: [] });
    }

    // Check if skill already exists (case-insensitive)
    const exists = skillDoc.skills.some(
      s => s.name.toLowerCase() === skillData.name.toLowerCase()
    );

    if (exists) {
      const error = new Error('Skill already exists');
      error.statusCode = 400;
      throw error;
    }

    skillDoc.skills.push(skillData);
    await skillDoc.save();
    
    return skillDoc;
  }

  /**
   * Update an existing skill
   */
  static async updateSkill(userId, skillId, updateData) {
    const skillDoc = await Skill.findOne({ user: userId });
    
    if (!skillDoc) {
      const error = new Error('Skill document not found');
      error.statusCode = 404;
      throw error;
    }

    const skillItem = skillDoc.skills.id(skillId);
    if (!skillItem) {
      const error = new Error('Skill not found');
      error.statusCode = 404;
      throw error;
    }

    if (updateData.name) skillItem.name = updateData.name;
    if (updateData.category) skillItem.category = updateData.category;
    if (updateData.proficiency) skillItem.proficiency = updateData.proficiency;

    await skillDoc.save();
    return skillDoc;
  }

  /**
   * Delete a skill
   */
  static async deleteSkill(userId, skillId) {
    const skillDoc = await Skill.findOne({ user: userId });
    
    if (!skillDoc) {
      const error = new Error('Skill document not found');
      error.statusCode = 404;
      throw error;
    }

    skillDoc.skills.pull(skillId);
    await skillDoc.save();
    
    return skillDoc;
  }
}

module.exports = SkillService;
