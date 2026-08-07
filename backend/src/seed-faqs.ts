import mongoose from 'mongoose';
import Faq from './models/Faq.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'src', '.env') });

const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/midtown';

const seedFaqs = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    await Faq.deleteMany({});
    console.log('Cleared existing FAQs');

    const faqs = [
      {
        question: 'What are the visiting hours for the hospital?',
        answer: 'Our general visiting hours are from 10:00 AM to 8:00 PM daily. However, intensive care units (ICU) and maternity wards may have restricted visiting hours. Please check with the specific department.'
      },
      {
        question: 'How do I book an appointment with a specialist?',
        answer: 'You can book an appointment online through our "Book Appointment" portal, call our helpline at 1-800-MIDTOWN, or visit the hospital reception in person.'
      },
      {
        question: 'Do you accept my health insurance?',
        answer: 'We accept most major health insurance plans. Please visit our "Insurance & Billing" page or contact our billing department with your insurance details to verify coverage before your visit.'
      },
      {
        question: 'What should I bring for my first appointment?',
        answer: 'Please bring a valid photo ID, your insurance card, a list of current medications, any past medical records or test results relevant to your visit, and a referral letter if required by your insurance.'
      },
      {
        question: 'Is parking available at the hospital?',
        answer: 'Yes, we have a multi-level parking garage available for patients and visitors. Valet parking services are also available at the main entrance.'
      }
    ];

    await Faq.insertMany(faqs);
    console.log(`Successfully seeded ${faqs.length} FAQs`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding FAQs:', error);
    process.exit(1);
  }
};

seedFaqs();
