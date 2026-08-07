import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  phone: string;
  speciality: string;
  description?: string;
  status: string; // e.g. "New", "Contacted", "Resolved"
}

const EnquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    speciality: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'New', enum: ['New', 'Contacted', 'Resolved'] },
  },
  { timestamps: true }
);

export default mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
