import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  heroImageUrl: string;
}

const SettingsSchema: Schema = new Schema({
  heroImageUrl: { type: String, required: true }
});

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
