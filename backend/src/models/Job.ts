import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: { type: String, required: true },
  experienceRequired: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  requirements: { type: [String], default: [] },
  responsibilities: { type: [String], default: [] },
  applicationLink: { type: String },
  status: { type: String, enum: ['published', 'draft', 'closed'], default: 'published' },
  publishedDate: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const Job = mongoose.model('Job', JobSchema);
