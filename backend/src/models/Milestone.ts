import mongoose from 'mongoose';

const MilestoneSchema = new mongoose.Schema({
  yearOrDate: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String },
  category: { type: String, required: true },
  displayOrder: { type: Number, default: 0 },
  publishedStatus: { type: String, enum: ['published', 'draft'], default: 'published' }
}, {
  timestamps: true
});

export const Milestone = mongoose.model('Milestone', MilestoneSchema);
