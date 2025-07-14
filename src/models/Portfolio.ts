import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['bridal', 'party', 'editorial', 'natural', 'special-events'],
    index: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: ''
  },
  tags: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  order: {
    type: Number,
    default: 0,
    index: true
  },
  metadata: {
    client: String,
    location: String,
    photographer: String,
    date: Date
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
portfolioSchema.index({ category: 1, featured: -1, order: 1, createdAt: -1 });

const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);

export default Portfolio; 