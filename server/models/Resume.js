const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'parsed', 'failed'],
    default: 'pending',
  },
  parsedData: {
    type: Object,
    default: null,
  }
}, {
  timestamps: true
});

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;
