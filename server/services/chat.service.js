const Chat = require('../models/Chat');
const Skill = require('../models/Skill');
const groqService = require('../ai/groq.service');

class ChatService {
  /**
   * Send a message to AI and save history
   */
  static async sendMessage(userId, prompt) {
    if (!prompt || prompt.trim().length === 0) {
      const error = new Error('Prompt is required');
      error.statusCode = 400;
      throw error;
    }

    // Optional: fetch recent history to provide context
    const recentHistory = await Chat.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const formattedHistory = recentHistory.reverse().flatMap(chat => [
      { role: 'user', content: chat.prompt },
      { role: 'assistant', content: chat.response }
    ]);

    // Fetch user skills to provide context
    const userSkillsDoc = await Skill.findOne({ user: userId }).lean();
    let context = '';
    if (userSkillsDoc && userSkillsDoc.skills && userSkillsDoc.skills.length > 0) {
      const skillsStr = userSkillsDoc.skills.map(s => `${s.name} (${s.proficiency})`).join(', ');
      context = `The user has the following skills: ${skillsStr}.`;
    }

    const aiResponse = await groqService.generateChatResponse(prompt, formattedHistory, context);

    const newChat = new Chat({
      user: userId,
      prompt: prompt,
      response: aiResponse
    });

    await newChat.save();
    return newChat;
  }

  /**
   * Get User Chat History
   */
  static async getHistory(userId) {
    return await Chat.find({ user: userId }).sort({ createdAt: 1 });
  }
}

module.exports = ChatService;
