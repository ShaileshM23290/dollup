import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
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
  price: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: String, // e.g., "2-3 hours"
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: ''
  },
  features: [{
    type: String,
    trim: true
  }],
  addOns: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    description: {
      type: String,
      trim: true
    }
  }],
  isPopular: {
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
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
serviceSchema.index({ category: 1, isPopular: -1, order: 1, createdAt: -1 });

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service; 