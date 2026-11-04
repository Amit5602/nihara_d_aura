const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
  categorySlug: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  subcategory: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  images: [{
    type: String,
  }],
  description: {
    type: String,
    default: '',
  },
  variants: [{
    type: String,
  }],
  sizes: [{
    type: String,
  }],
  features: [{
    type: String,
  }],
  stock: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isBestseller: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
