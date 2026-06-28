const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const { upload } = require('../middleware/upload.middleware');

// All user routes require authentication
router.use(protect);

router.get('/profile', UserController.getProfile);
router.put('/profile', UserController.updateProfile);
router.post('/avatar', upload.single('avatar'), UserController.uploadAvatar);

module.exports = router;
