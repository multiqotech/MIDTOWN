import mongoose from 'mongoose';
import Testimonial from './models/Testimonial.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'src', '.env') });

const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/midtown';

const seedTestimonials = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    await Testimonial.deleteMany({});
    console.log('Cleared existing testimonials');

    const testimonials = [
      {
        name: 'Sarah M.',
        text: '"The doctors and staff at Midtown Hospital were incredibly supportive during my treatment. Highly recommended!"',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop',
        isVideo: true,
      },
      {
        name: 'Emily R.',
        text: 'A wonderful experience. The facilities are top notch and the care is very personalized.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop',
        isVideo: true,
      },
      {
        name: 'David K.',
        text: 'I felt so well taken care of during my entire stay. Thank you Midtown team.',
        rating: 4,
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop',
        isVideo: true,
      },
      {
        name: 'Michael T.',
        text: 'The best hospital in the city. Expert doctors and great technology.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop',
        isVideo: true,
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log('Successfully seeded 4 testimonials');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding testimonials:', error);
    process.exit(1);
  }
};

seedTestimonials();
