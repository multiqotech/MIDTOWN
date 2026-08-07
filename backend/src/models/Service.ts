import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    required: true,
  },
  keyPoints: {
    type: [String],
    default: [],
  },
  suggestions: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);
