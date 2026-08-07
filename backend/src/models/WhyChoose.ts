import mongoose, { Schema, Document } from 'mongoose';

export interface IFeature {
  title: string;
  description: string;
  imageUrl: string;
}

export interface IWhyChoose extends Document {
  description: string;
  heroFeature: IFeature;
  features: IFeature[];
}

const FeatureSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, { _id: false });

const WhyChooseSchema = new Schema({
  description: { type: String, required: true },
  heroFeature: { type: FeatureSchema, required: true },
  features: { type: [FeatureSchema], required: true }
}, { timestamps: true });

export default mongoose.models.WhyChoose || mongoose.model<IWhyChoose>('WhyChoose', WhyChooseSchema);
