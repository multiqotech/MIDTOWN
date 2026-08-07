import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation {
  id: string;
  name: string;
  mapUrl: string;
}

export interface ICity extends Document {
  id: string; // Keep string ID for frontend compatibility
  name: string;
  imageUrl: string;
  locations: ILocation[];
}

const LocationSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  mapUrl: { type: String, required: true }
});

const CitySchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  locations: [LocationSchema]
});

// Avoid OverwriteModelError during hot reloading
export default mongoose.models.City || mongoose.model<ICity>('City', CitySchema);
