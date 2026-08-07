import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  specialist: string;
  qualification: string;
  extra?: string;
  description: string;
  imageUrl: string;
}

const DoctorSchema: Schema = new Schema({
  name: { type: String, required: true },
  specialist: { type: String, required: true },
  qualification: { type: String, required: true },
  extra: { type: String },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IDoctor>('Doctor', DoctorSchema);
