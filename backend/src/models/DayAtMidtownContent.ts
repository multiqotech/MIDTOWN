import mongoose from 'mongoose';

const DayAtMidtownContentSchema = new mongoose.Schema({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  heroImage: { type: String, required: true },
  introduction: { type: String, required: true },
  journeySteps: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    displayOrder: { type: Number, default: 0 }
  }],
  timelineItems: [{
    time: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    displayOrder: { type: Number, default: 0 }
  }],
  hospitalExperienceSections: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }
  }],
  ctaText: { type: String, required: true },
  ctaLink: { type: String, required: true }
}, {
  timestamps: true
});

export const DayAtMidtownContent = mongoose.model('DayAtMidtownContent', DayAtMidtownContentSchema);
