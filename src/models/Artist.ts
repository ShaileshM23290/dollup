import mongoose, { Schema, Document } from 'mongoose';

export interface IArtist extends Document {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  password: string;
  role: 'artist';
  isActive: boolean;
  isApproved: boolean;
  profileImage?: string;
  bio?: string;
  experience?: number;
  specializations: string[];
  location?: string;
  portfolio: {
    imageUrl: string;
    title: string;
    description?: string;
  }[];
  services: {
    name: string;
    price: number;
    duration: string;
    description?: string;
  }[];
  availability: {
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
  ratings: {
    customerId: mongoose.Types.ObjectId;
    rating: number;
    review?: string;
    createdAt: Date;
  }[];
  averageRating: number;
  totalBookings: number;
  totalEarnings: number;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ArtistSchema = new Schema<IArtist>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    default: 'artist',
    enum: ['artist']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  profileImage: {
    type: String
  },
  bio: {
    type: String,
    maxlength: 1000
  },
  experience: {
    type: Number,
    min: 0,
    max: 50
  },
  specializations: [{
    type: String,
    enum: ['bridal', 'party', 'editorial', 'natural', 'special-events', 'photoshoot', 'fashion', 'sfx']
  }],
  location: {
    type: String,
    trim: true
  },
  portfolio: [{
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: String
  }],
  services: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    duration: {
      type: String,
      required: true
    },
    description: String
  }],
  availability: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
  ratings: [{
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    review: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalBookings: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for efficient queries
ArtistSchema.index({ email: 1 });
ArtistSchema.index({ isActive: 1, isApproved: 1 });
ArtistSchema.index({ specializations: 1 });
ArtistSchema.index({ averageRating: -1 });
ArtistSchema.index({ location: 1 });

// Calculate average rating before saving
ArtistSchema.pre('save', function(next) {
  if (this.ratings && this.ratings.length > 0) {
    const totalRating = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    this.averageRating = totalRating / this.ratings.length;
  } else {
    this.averageRating = 0;
  }
  next();
});

// Create the model
const ArtistModel = mongoose.models.Artist || mongoose.model<IArtist>('Artist', ArtistSchema);

// Export both default and named exports
export default ArtistModel;
export const Artist = ArtistModel; 