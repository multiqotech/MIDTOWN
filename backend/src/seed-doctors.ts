import mongoose from 'mongoose';
import Doctor from './models/Doctor.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'src', '.env') });

const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/midtown';

const seedDoctors = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    await Doctor.deleteMany({});
    console.log('Cleared existing doctors');

    const doctors = [
      {
        name: 'Dr. Fiona Wood',
        specialist: 'Cardiology',
        qualification: 'MBBS, MD',
        extra: '15 Years Experience',
        description: 'Dr. Fiona Wood is a leading cardiologist with over 15 years of experience in diagnosing and treating cardiovascular diseases. She specializes in preventive cardiology and heart failure management.',
        imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop'
      },
      {
        name: 'Dr. Charlie Teo',
        specialist: 'Neurology',
        qualification: 'MBBS, MS',
        extra: '20 Years Experience',
        description: 'Dr. Charlie Teo is an internationally renowned neurosurgeon. He is highly sought after for his expertise in minimally invasive neurosurgery and the treatment of complex brain tumors.',
        imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop'
      },
      {
        name: 'Dr. Sarah Connor',
        specialist: 'Pediatrics',
        qualification: 'MD, Pediatrics',
        extra: '10 Years Experience',
        description: 'Dr. Sarah Connor is dedicated to providing compassionate and comprehensive medical care to infants, children, and adolescents. She believes in working closely with parents for optimal child health.',
        imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop'
      },
      {
        name: 'Dr. James Smith',
        specialist: 'Dentistry',
        qualification: 'BDS, MDS',
        extra: '8 Years Experience',
        description: 'Dr. James Smith provides state-of-the-art dental care with a focus on cosmetic dentistry and advanced restorative procedures, ensuring a comfortable experience for every patient.',
        imageUrl: 'https://images.unsplash.com/photo-1594824432258-f7b579048a1c?q=80&w=400&auto=format&fit=crop'
      },
      {
        name: 'Dr. Emily Chen',
        specialist: 'Dermatology',
        qualification: 'MD, FAAD',
        extra: '12 Years Experience',
        description: 'Dr. Emily Chen is a board-certified dermatologist specializing in medical and cosmetic dermatology. She provides personalized treatments for acne, eczema, and skin cancer prevention.',
        imageUrl: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=400&auto=format&fit=crop'
      }
    ];

    await Doctor.insertMany(doctors);
    console.log('Successfully seeded 5 doctors');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding doctors:', error);
    process.exit(1);
  }
};

seedDoctors();
