const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  decayScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  driftScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  missingSkills: [{
    type: String,
  }],
  recommendations: [{
    title: String,
    description: String,
    difficulty: String,
    estimatedTime: String,
    resources: [String],
  }],
  evidence: [{
    source: String,
    jobTitle: String,
    company: String,
    matchingSentence: String,
    date: Date,
    confidence: Number,
  }]
}, {
  timestamps: true
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
