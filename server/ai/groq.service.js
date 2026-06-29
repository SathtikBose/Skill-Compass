const Groq = require('groq-sdk');

class GroqService {
  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY || 'dummy_key',
    });
    this.model = 'llama-3.1-8b-instant'; // Updated to active model
  }

  /**
   * Generates a response from the AI Career Assistant
   * @param {string} prompt 
   * @param {Array} history context of previous messages
   */
  async generateChatResponse(prompt, history = []) {
    if (!process.env.GROQ_API_KEY) {
      console.warn('GROQ_API_KEY is not set. Returning mock chat data.');
      return "I am a mock AI assistant. Please configure the GROQ_API_KEY to enable real AI responses. You asked: " + prompt;
    }

    try {
      const messages = [
        {
          role: 'system',
          content: 'You are an expert Technical Career Coach for Skill Compass. You help developers and tech professionals upskill, prepare for interviews, and understand market trends. Keep your answers concise, actionable, and formatted nicely.'
        },
        ...history,
        {
          role: 'user',
          content: prompt
        }
      ];

      const chatCompletion = await this.groq.chat.completions.create({
        messages: messages,
        model: this.model,
        temperature: 0.7,
        max_tokens: 1024,
      });

      return chatCompletion.choices[0]?.message?.content || 'I could not generate a response.';
    } catch (error) {
      console.error('Groq API Error:', error);
      throw new Error('Failed to generate chat response from AI.');
    }
  }
}

module.exports = new GroqService();
