import mongoose from 'mongoose';

const GroupBrandSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  websiteUrl: { type: String },
  displayOrder: { type: Number, default: 0 },
  publishedStatus: { type: String, enum: ['published', 'draft'], default: 'published' }
}, {
  timestamps: true
});

export const GroupBrand = mongoose.model('GroupBrand', GroupBrandSchema);
