import mongoose from 'mongoose';

const AwardSchema = new mongoose.Schema({
  awardName: { type: String, required: true },
  awardingOrganization: { type: String, required: true },
  year: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  certificateImage: { type: String },
  displayOrder: { type: Number, default: 0 },
  publishedStatus: { type: String, enum: ['published', 'draft'], default: 'published' }
}, {
  timestamps: true
});

export const Award = mongoose.model('Award', AwardSchema);
