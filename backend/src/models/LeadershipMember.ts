import mongoose from 'mongoose';

const LeadershipMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  profileImage: { type: String },
  designation: { type: String, required: true },
  shortBiography: { type: String, required: true },
  fullBiography: { type: String },
  education: { type: [String], default: [] },
  experience: { type: [String], default: [] },
  achievements: { type: [String], default: [] },
  leadershipMessage: { type: String },
  displayOrder: { type: Number, default: 0 },
  publishedStatus: { type: String, enum: ['published', 'draft'], default: 'published' }
}, {
  timestamps: true
});

export const LeadershipMember = mongoose.model('LeadershipMember', LeadershipMemberSchema);
