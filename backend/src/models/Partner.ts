import mongoose, { Schema, Document } from 'mongoose';

export interface IPartner extends Document {
  name: string;
  logo: string;
}

const PartnerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IPartner>('Partner', PartnerSchema);
