import mongoose from 'mongoose';

const RecognitionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'doctor-award', 'employee-spotlight', 'quality-certification'
  title: { type: String, required: true }, // Name of person or certification
  issuerOrRole: { type: String }, // Department / Awarding Body
  year: { type: String },
  description: { type: String },
  image: { type: String },
  quote: { type: String }, // For employee spotlight
  status: { type: String }, // Status of certification (Active, etc)
  displayOrder: { type: Number, default: 0 },
  publishedStatus: { type: String, enum: ['published', 'draft'], default: 'published' }
}, {
  timestamps: true
});

export const Recognition = mongoose.model('Recognition', RecognitionSchema);
