const mongoose = require('mongoose');

const skillItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Soft Skill', 'Other'],
    default: 'Other',
  },
  proficiency: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Beginner',
  }
});

const skillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // One skill document per user
  },
  skills: [skillItemSchema]
}, {
  timestamps: true
});

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;
