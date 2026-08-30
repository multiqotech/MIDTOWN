import mongoose from 'mongoose';

const NewsArticleSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'press-release', 'corporate-announcement', 'in-the-news', 'event-gallery'
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  category: { type: String },
  source: { type: String }, // For 'in-the-news'
  sourceUrl: { type: String },
  summary: { type: String },
  content: { type: String },
  image: { type: String },
  galleryImages: { type: [String], default: [] }, // For 'event-gallery'
  displayOrder: { type: Number, default: 0 },
  publishedStatus: { type: String, enum: ['published', 'draft'], default: 'published' }
}, {
  timestamps: true
});

export const NewsArticle = mongoose.model('NewsArticle', NewsArticleSchema);
