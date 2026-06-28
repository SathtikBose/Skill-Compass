const express = require('express');
const router = express.Router();
const ResumeController = require('../controllers/resume.controller');
const { protect } = require('../middleware/auth.middleware');
const { uploadPdf } = require('../middleware/upload.middleware');

router.use(protect);

router.post('/', uploadPdf.single('resume'), ResumeController.uploadResume);
router.post('/:id/extract', ResumeController.extractSkills);
router.get('/', ResumeController.getResumes);
router.delete('/:id', ResumeController.deleteResume);

module.exports = router;
