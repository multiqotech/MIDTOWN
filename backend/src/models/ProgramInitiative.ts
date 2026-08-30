import mongoose from 'mongoose';

const ProgramInitiativeSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'fellowship', 'health-camp', 'wellness-program', 'clinical-trial', 'csr-initiative', 'environmental-initiative', 'waste-management', 'green-hospital', 'research-institute', 'board-committee', 'corporate-tie-up', 'insurance-partner'
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String }, // Specialty / Area
  description: { type: String, required: true },
  eligibility: { type: String }, // For fellowships/trials
  durationOrDate: { type: String }, // Duration or specific date
  location: { type: String },
  status: { type: String }, // Recruiting, Completed, Active
  image: { type: String },
  contactInfo: { type: String },
  statistics: { type: [{ label: String, value: String }], default: [] }, // Impact metrics
  displayOrder: { type: Number, default: 0 },
  publishedStatus: { type: String, enum: ['published', 'draft'], default: 'published' }
}, {
  timestamps: true
});

export const ProgramInitiative = mongoose.model('ProgramInitiative', ProgramInitiativeSchema);
