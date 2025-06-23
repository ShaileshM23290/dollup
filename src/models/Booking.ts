import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  eventDate: Date;
  eventTime?: string;
  serviceType: string;
  eventType?: string;
  location?: string;
  numberOfPeople: number;
  additionalServices: string[];
  specialRequests?: string;
  howDidYouHear?: string;
  budget?: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventTime: {
    type: String
  },
  serviceType: {
    type: String,
    required: true
  },
  eventType: {
    type: String
  },
  location: {
    type: String
  },
  numberOfPeople: {
    type: Number,
    default: 1
  },
  additionalServices: [{
    type: String
  }],
  specialRequests: {
    type: String
  },
  howDidYouHear: {
    type: String
  },
  budget: {
    type: Number
  },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
    default: 'PENDING'
  }
}, {
  timestamps: true
});

// Prevent re-compilation during development
export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema); 