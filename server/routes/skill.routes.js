const express = require('express');
const router = express.Router();
const SkillController = require('../controllers/skill.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.get('/', SkillController.getSkills);
router.post('/', SkillController.addSkill);
router.patch('/:id', SkillController.updateSkill);
router.delete('/:id', SkillController.deleteSkill);

module.exports = router;
