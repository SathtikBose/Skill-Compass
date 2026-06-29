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
      const fullPrompt = `${RESUME_PARSING_PROMPT}\n\nRESUME TEXT:\n${resumeText}`;
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      let text = response.text();
      
      // Clean up potential markdown formatting from the response
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
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

  /**
   * Generates a skill analysis report
   * @param {string} targetRole 
   * @param {Array} currentSkills 
   * @returns {Promise<Object>} Analysis JSON object
   */
  async generateAnalysis(targetRole, currentSkills) {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set. Returning mock analysis data.');
      return {
        score: 75,
        decayScore: 20,
        driftScore: 10,
        missingSkills: ['TypeScript', 'GraphQL'],
        recommendations: [
          {
            title: 'Learn TypeScript',
            description: 'Essential for modern frontend development.',
            difficulty: 'Intermediate',
            estimatedTime: '3 weeks',
            resources: ['Official Docs', 'FrontendMasters']
          }
        ],
        evidence: [
          {
            source: 'Market Trend 2024',
            jobTitle: targetRole || 'Software Engineer',
            company: 'Industry Standard',
            matchingSentence: 'TypeScript is required in 80% of new roles.',
            date: new Date().toISOString(),
            confidence: 90
          }
        ]
      };
    }

    try {
      const skillsText = JSON.stringify(currentSkills, null, 2);
      const fullPrompt = `${require('./prompts/analysis.prompt').ANALYSIS_PROMPT}\n\nTARGET ROLE:\n${targetRole || 'Software Engineer'}\n\nCURRENT SKILLS:\n${skillsText}`;
      
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      let text = response.text();
      
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(text);
    } catch (error) {
      console.error('Gemini API Error (Analysis):', error);
      throw new Error('Failed to generate analysis');
    }
  }
}

module.exports = new GeminiService();
