import mongoose from 'mongoose';

const ContentBlockSchema = new mongoose.Schema({
  title: { type: String },
  text: { type: String, required: true },
  image: { type: String },
  displayOrder: { type: Number, default: 0 }
});

const DiscoverPageContentSchema = new mongoose.Schema({
  pageType: { type: String, required: true, unique: true }, // e.g., 'medical-education', 'nursing-education', 'patient-safety'
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String },
  heroImage: { type: String },
  contentBlocks: { type: [ContentBlockSchema], default: [] },
  statistics: { type: [{ label: String, value: String }], default: [] },
  publishedStatus: { type: String, enum: ['published', 'draft'], default: 'published' }
}, {
  timestamps: true
});

export const DiscoverPageContent = mongoose.model('DiscoverPageContent', DiscoverPageContentSchema);
