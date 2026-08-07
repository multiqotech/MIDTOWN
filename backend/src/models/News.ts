import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  keyPoints: [{ type: String }],
  imageUrl: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.News || mongoose.model('News', NewsSchema);
