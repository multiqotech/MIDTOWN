import mongoose from 'mongoose';

const VisionMissionSchema = new mongoose.Schema({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  heroImage: { type: String, required: true },
  vision: { type: String, required: true },
  mission: { type: String, required: true },
  healthcarePhilosophy: { type: String, required: true },
  missionPillars: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    displayOrder: { type: Number, default: 0 }
  }],
  coreValues: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    displayOrder: { type: Number, default: 0 }
  }]
}, {
  timestamps: true
});

export const VisionMission = mongoose.model('VisionMission', VisionMissionSchema);
