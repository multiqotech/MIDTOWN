import mongoose from 'mongoose';

const DiscoverOverviewSchema = new mongoose.Schema({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  heroImage: { type: String, required: true },
  introduction: { type: String, required: true },
  whoWeAreContent: { type: String, required: true },
  statistics: [{
    label: { type: String, required: true },
    value: { type: String, required: true }
  }],
  features: [{
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
  specialtyHighlights: [{
    name: { type: String, required: true },
    description: { type: String, required: true }
  }],
  ctaText: { type: String, required: true },
  ctaLink: { type: String, required: true }
}, {
  timestamps: true
});

export const DiscoverOverview = mongoose.model('DiscoverOverview', DiscoverOverviewSchema);
