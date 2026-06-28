const { GoogleGenerativeAI } = require('@google/generative-ai');
const { RESUME_PARSING_PROMPT } = require('./prompts/resume.prompt');

class GeminiService {
  constructor() {
    // Initialize the SDK. Requires GEMINI_API_KEY in .env
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key_if_not_set');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  /**
   * Extracts skills from raw resume text using Gemini
   * @param {string} resumeText 
   * @returns {Promise<Array>} Array of skill objects
   */
  async extractSkills(resumeText) {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set. Returning mock data.');
      // Return mock data for development if no key is present to prevent breaking the flow
      return [
        { name: 'JavaScript', category: 'Frontend', proficiency: 'Advanced' },
        { name: 'Node.js', category: 'Backend', proficiency: 'Intermediate' },
        { name: 'MongoDB', category: 'Database', proficiency: 'Intermediate' }
      ];
    }

    try {
      const fullPrompt = \`\${RESUME_PARSING_PROMPT}\n\nRESUME TEXT:\n\${resumeText}\`;
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      let text = response.text();
      
      // Clean up potential markdown formatting from the response
      text = text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
      
      const skills = JSON.parse(text);
      
      if (!Array.isArray(skills)) {
        throw new Error('Gemini response is not a valid JSON array');
      }

      return skills;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to extract skills from resume');
    }
  }
}

module.exports = new GeminiService();
