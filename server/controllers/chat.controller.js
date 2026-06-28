const ChatService = require('../services/chat.service');

class ChatController {
  /**
   * Send a message to AI
   * @route POST /api/v1/chat
   */
  static async sendMessage(req, res, next) {
    try {
      const { prompt } = req.body;
      const chat = await ChatService.sendMessage(req.user.id, prompt);
      
      res.status(200).json({
        success: true,
        data: { chat },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get User Chat History
   * @route GET /api/v1/chat
   */
  static async getHistory(req, res, next) {
    try {
      const history = await ChatService.getHistory(req.user.id);
      
      res.status(200).json({
        success: true,
        data: { history },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ChatController;
