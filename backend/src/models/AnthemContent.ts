import mongoose from 'mongoose';

const AnthemContentSchema = new mongoose.Schema({
  pageTitle: { type: String, required: true },
  introduction: { type: String, required: true },
  anthemStory: { type: String, required: true },
  audioFileUrl: { type: String },
  videoUrl: { type: String },
  coverImage: { type: String },
  credits: { type: String },
  lyrics: { type: String }
}, {
  timestamps: true
});

export const AnthemContent = mongoose.model('AnthemContent', AnthemContentSchema);
