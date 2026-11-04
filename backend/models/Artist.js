const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true,
  },
  role: {
    type: String,
    default: 'Senior Stylist',
    trim: true,
  },
  experience: {
    type: String,
    default: '5+ Years',
  },
  rating: {
    type: Number,
    default: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  specialties: [{
    type: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema);
