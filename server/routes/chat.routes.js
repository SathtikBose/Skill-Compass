const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chat.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.post('/', ChatController.sendMessage);
router.get('/', ChatController.getHistory);

module.exports = router;
