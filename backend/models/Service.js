const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  durationMinutes: {
    type: Number,
    default: 60,
  },
  rating: {
    type: Number,
    default: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  inclusions: [{
    type: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
