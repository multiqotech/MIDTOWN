import mongoose from 'mongoose';

const LeadershipMemberSchema = new mongoose.Schema({
  // Unified fields
  type: { type: String, enum: ['board', 'executive', 'medical-council'], required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  profileImage: { type: String },
  designation: { type: String, required: true }, // Board Position / Executive Title / Council Position
  shortBiography: { type: String, required: true },
  fullBiography: { type: String },
  education: { type: [String], default: [] },
  experience: { type: [String], default: [] }, // Professional or Clinical Experience
  areasOfExpertise: { type: [String], default: [] },
  responsibilities: { type: [String], default: [] }, // Board/Key/Council Responsibilities
  achievements: { type: [String], default: [] }, // Can act as Awards
  leadershipMessage: { type: String },
  
  // Specific fields
  department: { type: String }, // Executive Area / Department
  specialty: { type: String }, // Medical Council
  medicalQualifications: { type: [String], default: [] }, // Medical Council
  researchInterests: { type: [String], default: [] }, // Medical Council
  publications: { type: [String], default: [] }, // Medical Council
  awards: { type: [String], default: [] }, // Alternate to achievements, explicitly for Medical Council Awards

  displayOrder: { type: Number, default: 0 },
  publishedStatus: { type: String, enum: ['published', 'draft'], default: 'published' }
}, {
  timestamps: true
});

export const LeadershipMember = mongoose.model('LeadershipMember', LeadershipMemberSchema);
