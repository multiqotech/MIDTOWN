import mongoose from 'mongoose';

const DocumentResourceSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'publication', 'policy', 'financial-result', 'annual-report', 'media-kit', 'brand-guideline', 'clinical-indicator'
  title: { type: String, required: true },
  category: { type: String }, // Specialty / Report Type
  yearOrDate: { type: String },
  summary: { type: String },
  fileUrl: { type: String }, // Link to PDF or external resource
  coverImage: { type: String },
  authors: { type: [String], default: [] }, // For publications
  value: { type: String }, // For clinical indicators
  unit: { type: String }, // For clinical indicators
  displayOrder: { type: Number, default: 0 },
  publishedStatus: { type: String, enum: ['published', 'draft'], default: 'published' }
}, {
  timestamps: true
});

export const DocumentResource = mongoose.model('DocumentResource', DocumentResourceSchema);
