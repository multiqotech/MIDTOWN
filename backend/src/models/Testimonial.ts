import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  text: string;
  rating: number;
  image: string;
  isVideo: boolean;
}

const TestimonialSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    image: { type: String, required: true },
    isVideo: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
