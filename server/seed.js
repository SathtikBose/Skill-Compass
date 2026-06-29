require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Skill = require('./models/Skill');
const Report = require('./models/Report');
const Resume = require('./models/Resume');
const Chat = require('./models/Chat');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillcompass');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Skill.deleteMany({}),
      Report.deleteMany({}),
      Resume.deleteMany({}),
      Chat.deleteMany({})
    ]);

    console.log('Database cleared.');

    // 1. Create User
    const user = new User({
      name: 'Sathtik Bose',
      email: 'sathtikbose@gmail.com',
      password: '12345678', // will be hashed by pre-save hook
      jobTitle: 'Senior Frontend Engineer',
      bio: 'Passionate frontend developer focused on crafting beautiful, responsive UIs.',
      linkedIn: 'https://linkedin.com/in/sathtikbose',
      github: 'https://github.com/sathtikbose',
    });
    await user.save();
    console.log('User created:', user.email);

    // 2. Create Skills
    const skillCategories = [
      { name: 'React', category: 'Frontend', proficiency: 'Advanced' },
      { name: 'TypeScript', category: 'Other', proficiency: 'Advanced' },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Advanced' },
      { name: 'Next.js', category: 'Frontend', proficiency: 'Intermediate' },
      { name: 'Node.js', category: 'Backend', proficiency: 'Intermediate' },
      { name: 'GraphQL', category: 'Backend', proficiency: 'Beginner' },
      { name: 'Framer Motion', category: 'Frontend', proficiency: 'Advanced' },
      { name: 'MongoDB', category: 'Database', proficiency: 'Intermediate' },
      { name: 'Docker', category: 'DevOps', proficiency: 'Beginner' }
    ];

    const skillDoc = new Skill({
      user: user._id,
      skills: skillCategories
    });
    await skillDoc.save();
    console.log('Skills created.');

    // 3. Create Resumes
    const resume = new Resume({
      user: user._id,
      originalName: 'Jane_Doe_Resume_2024.pdf',
      fileUrl: 'https://cloudinary.com/mock-resume',
      publicId: 'mock-resume-id',
      fileSize: 1024500, // 1MB
      status: 'parsed',
      extractedSkills: skillCategories.map(s => s.name),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
    });
    
    const resume2 = new Resume({
      user: user._id,
      originalName: 'Jane_Doe_Resume_2023.pdf',
      fileUrl: 'https://cloudinary.com/mock-resume-2',
      publicId: 'mock-resume-id-2',
      fileSize: 1524500, // 1.5MB
      status: 'parsed',
      extractedSkills: ['React', 'JavaScript', 'CSS', 'HTML'],
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) // 90 days ago
    });

    await resume.save();
    await resume2.save();
    console.log('Resumes created.');

    // 4. Create History Reports
    const report1 = new Report({
      user: user._id,
      score: 65,
      decayScore: 35,
      driftScore: 20,
      missingSkills: ['TypeScript', 'Next.js', 'GraphQL'],
      recommendations: [
        {
          title: 'Learn TypeScript',
          description: 'Essential for modern scalable React applications.',
          difficulty: 'Intermediate',
          estimatedTime: '3 weeks',
          resources: ['TypeScript Docs']
        }
      ],
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) // 60 days ago
    });

    const report2 = new Report({
      user: user._id,
      score: 75,
      decayScore: 25,
      driftScore: 15,
      missingSkills: ['GraphQL', 'Docker'],
      recommendations: [
        {
          title: 'Master Next.js',
          description: 'Improve server-side rendering knowledge.',
          difficulty: 'Advanced',
          estimatedTime: '2 weeks',
          resources: ['Next.js Learn']
        }
      ],
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
    });

    const report3 = new Report({
      user: user._id,
      score: 88,
      decayScore: 12,
      driftScore: 5,
      missingSkills: ['GraphQL', 'Docker'],
      recommendations: [
        {
          title: 'Dive into GraphQL',
          description: 'A critical skill for modern data fetching and API design.',
          difficulty: 'Intermediate',
          estimatedTime: '2 weeks',
          resources: ['GraphQL.org', 'Apollo Docs']
        },
        {
          title: 'Containerization basics',
          description: 'Learn Docker to easily deploy and share environments.',
          difficulty: 'Beginner',
          estimatedTime: '1 week',
          resources: ['Docker 101']
        }
      ],
      createdAt: new Date() // Today
    });

    await report1.save();
    await report2.save();
    await report3.save();
    console.log('Reports created.');

    // 5. Create Chat History
    const chat1 = new Chat({
      user: user._id,
      prompt: 'What should I focus on to become a Senior Frontend Engineer?',
      response: 'To transition to a Senior Frontend Engineer role, focus on system architecture, performance optimization, mentoring, and mastering a modern stack like React with TypeScript and Next.js. You already have a great foundation in React and Tailwind CSS.',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    });

    const chat2 = new Chat({
      user: user._id,
      prompt: 'How long will it take to learn GraphQL?',
      response: 'Given your background in React and Node.js, you can pick up the basics of GraphQL in about 1-2 weeks. Focus on querying, mutations, and setting up an Apollo client.',
      createdAt: new Date()
    });

    await chat1.save();
    await chat2.save();
    console.log('Chats created.');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
