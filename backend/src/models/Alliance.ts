import mongoose from 'mongoose';

const AllianceSchema = new mongoose.Schema({
  partnerName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  partnerLogo: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  websiteUrl: { type: String },
  displayOrder: { type: Number, default: 0 },
  publishedStatus: { type: String, enum: ['published', 'draft'], default: 'published' }
}, {
  timestamps: true
});

export const Alliance = mongoose.model('Alliance', AllianceSchema);
