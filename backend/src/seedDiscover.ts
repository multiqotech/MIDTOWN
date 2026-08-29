import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import { Job } from './models/Job.js';
import { LeadershipMember } from './models/LeadershipMember.js';
import { GroupBrand } from './models/GroupBrand.js';
import { Award } from './models/Award.js';
import { Alliance } from './models/Alliance.js';
import { Milestone } from './models/Milestone.js';
import { DiscoverOverview } from './models/DiscoverOverview.js';
import { DayAtMidtownContent } from './models/DayAtMidtownContent.js';
import { VisionMission } from './models/VisionMission.js';
import { AnthemContent } from './models/AnthemContent.js';

dotenv.config({ path: path.join(import.meta.dirname, '.env') });

const seedData = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL is not defined in .env');
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully for seeding');

    // Seed Singletons
    console.log('Seeding Discover Overview...');
    await DiscoverOverview.deleteMany({});
    await DiscoverOverview.create({
      heroTitle: 'Welcome to Midtown Hospital',
      heroSubtitle: 'Where Healthcare Meets Compassion and Innovation',
      heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop',
      introduction: 'For over two decades, Midtown Hospital has been a beacon of hope and healing in our community. Our commitment to clinical excellence ensures every patient receives world-class medical care.',
      whoWeAreContent: 'We are a network of passionate medical professionals, state-of-the-art facilities, and community-driven healthcare programs dedicated to improving the health and well-being of those we serve.',
      statistics: [
        { label: 'Beds', value: '500+' },
        { label: 'Doctors', value: '250+' },
        { label: 'Patients Yearly', value: '1M+' },
        { label: 'Awards', value: '50+' }
      ],
      features: [
        { title: '24/7 Emergency', description: 'Round-the-clock critical care unit ready for any medical emergency.' },
        { title: 'Advanced Technology', description: 'Equipped with the latest robotic surgery and diagnostic imaging tech.' },
        { title: 'Patient-First Care', description: 'Personalized treatment plans ensuring comfort and speedy recovery.' }
      ],
      specialtyHighlights: [
        { name: 'Cardiology', description: 'Award-winning heart institute with comprehensive care programs.' },
        { name: 'Neurology', description: 'Expert neurosurgeons treating complex brain and spine conditions.' }
      ],
      ctaText: 'Experience World-Class Healthcare',
      ctaLink: '/contact'
    });

    console.log('Seeding Day At Midtown...');
    await DayAtMidtownContent.deleteMany({});
    await DayAtMidtownContent.create({
      heroTitle: 'A Day in the Life',
      heroSubtitle: 'Experience the flow of care at Midtown Hospital.',
      heroImage: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?q=80&w=2000&auto=format&fit=crop',
      introduction: 'From the moment you walk through our doors, every process is optimized to provide you with a smooth, stress-free, and healing experience.',
      timelineItems: [
        { time: '08:00 AM', title: 'Arrival & Registration', description: 'Patients are greeted warmly by our concierges and checked in efficiently via our automated digital kiosks.', displayOrder: 1 },
        { time: '09:30 AM', title: 'Specialist Consultation', description: 'Thorough, unhurried consultations with our leading medical experts focusing on accurate diagnosis.', displayOrder: 2 },
        { time: '11:00 AM', title: 'Diagnostics & Imaging', description: 'Swift transition to our high-tech radiology and pathology labs for immediate testing.', displayOrder: 3 },
        { time: '02:00 PM', title: 'Treatment & Recovery', description: 'Customized therapeutic interventions in our advanced, serene inpatient wards.', displayOrder: 4 },
        { time: '05:00 PM', title: 'Discharge & Follow-up', description: 'Comprehensive discharge planning, medication counseling, and follow-up scheduling.', displayOrder: 5 }
      ],
      ctaText: 'Plan Your Visit Today',
      ctaLink: '/doctors'
    });

    console.log('Seeding Vision & Mission...');
    await VisionMission.deleteMany({});
    await VisionMission.create({
      heroTitle: 'Our Guiding Light',
      heroSubtitle: 'The vision that drives us, the mission that unites us.',
      heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop',
      vision: 'To be the most trusted and preferred healthcare partner, globally recognized for delivering exceptional clinical outcomes through compassion and continuous innovation.',
      mission: 'To improve the health and well-being of the communities we serve by providing highly accessible, deeply compassionate, and top-tier medical care.',
      healthcarePhilosophy: 'We believe that healthcare goes beyond treating illnesses; it is about holistic healing and empowering individuals to lead healthier lives.',
      missionPillars: [
        { title: 'Clinical Excellence', description: 'Relentless pursuit of the highest standards in evidence-based medical care.', displayOrder: 1 },
        { title: 'Patient-Centric Approach', description: 'Placing the patient and their family at the core of all decisions and designs.', displayOrder: 2 },
        { title: 'Technological Innovation', description: 'Harnessing the power of advanced technology to enhance diagnostic precision and treatment efficacy.', displayOrder: 3 }
      ],
      coreValues: [
        { title: 'Compassion', description: 'We treat every individual with empathy, dignity, and kindness.', displayOrder: 1 },
        { title: 'Integrity', description: 'We uphold absolute honesty and transparency in all our actions.', displayOrder: 2 },
        { title: 'Collaboration', description: 'We believe in the power of teamwork to achieve the best medical outcomes.', displayOrder: 3 },
        { title: 'Excellence', description: 'We continuously strive to exceed expectations and raise the bar in healthcare.', displayOrder: 4 }
      ]
    });

    console.log('Seeding Anthem...');
    await AnthemContent.deleteMany({});
    await AnthemContent.create({
      pageTitle: 'The Midtown Anthem',
      introduction: 'The musical heartbeat of our hospital.',
      anthemStory: 'Composed during our 10th anniversary, the Midtown Anthem was created by local artists in collaboration with our nursing staff. It captures the resilient spirit of our patients, the tireless dedication of our healthcare workers, and the hope that fills our corridors every single day.',
      audioFileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Sample audio
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&auto=format&fit=crop',
      credits: 'Music & Lyrics: John Doe | Vocals: The Midtown Choir | Produced by: Symphony Studios',
      lyrics: 'In the breaking of the dawn\nWe stand together, strong and calm\nHealing hands and hopeful hearts\nA new beginning, a brand new start\n\nMidtown, Midtown, shining bright\nGuiding you through the darkest night\nWith compassion and with care\nMidtown, Midtown, we are always there'
    });

    // Seed Collections
    console.log('Seeding Jobs...');
    await Job.deleteMany({});
    await Job.insertMany([
      { title: 'Senior Cardiac Surgeon', slug: 'senior-cardiac-surgeon', department: 'Cardiology', location: 'Main Campus, Midtown', employmentType: 'Full-time', experienceRequired: '10+ Years', shortDescription: 'Looking for an experienced cardiac surgeon to lead our heart transplant program.', fullDescription: 'Detailed description about the Senior Cardiac Surgeon role...', applicationLink: 'mailto:hr@midtown.com', status: 'published' },
      { title: 'Registered ICU Nurse', slug: 'registered-icu-nurse', department: 'Nursing', location: 'North Wing, Midtown', employmentType: 'Full-time', experienceRequired: '3-5 Years', shortDescription: 'Join our critical care team providing round-the-clock monitoring and support.', fullDescription: 'Detailed description about the Registered ICU Nurse role...', applicationLink: 'mailto:hr@midtown.com', status: 'published' },
      { title: 'Medical Billing Specialist', slug: 'medical-billing-specialist', department: 'Administration', location: 'Corporate Office', employmentType: 'Part-time', experienceRequired: '1-3 Years', shortDescription: 'Handle patient billing, insurance claims, and financial counseling.', fullDescription: 'Detailed description about the Medical Billing Specialist role...', applicationLink: 'mailto:hr@midtown.com', status: 'published' }
    ]);

    console.log('Seeding Leadership...');
    await LeadershipMember.deleteMany({});
    await LeadershipMember.insertMany([
      { name: 'Dr. Sarah Jenkins', slug: 'sarah-jenkins', profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format&fit=crop', designation: 'Chief Executive Officer', shortBiography: 'Visionary leader with 25 years of healthcare management experience.', fullBiography: 'Dr. Sarah Jenkins has been the driving force behind Midtown Hospital\'s expansion. Before becoming CEO, she served as the Chief Medical Officer at National General Hospital.', education: ['MD, Harvard Medical School', 'MBA, Wharton School of Business'], experience: ['CEO, Midtown Hospital (2015-Present)', 'CMO, National General (2005-2015)'], achievements: ['Top 50 Healthcare Leaders 2023', 'Innovator in Health Administration Award'], leadershipMessage: 'Our goal is not just to treat patients, but to elevate the standard of healthcare for the entire region.', displayOrder: 1, publishedStatus: 'published' },
      { name: 'Dr. Marcus Webb', slug: 'marcus-webb', profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500&auto=format&fit=crop', designation: 'Chief Medical Officer', shortBiography: 'Renowned neurosurgeon ensuring clinical excellence across all departments.', fullBiography: 'Dr. Marcus Webb oversees all clinical operations, ensuring that the highest standards of patient care and safety are maintained.', education: ['MD, Johns Hopkins University'], experience: ['Head of Neurosurgery (2010-2018)'], achievements: ['Pioneered minimally invasive spinal surgery techniques'], leadershipMessage: 'Clinical excellence is the foundation of patient trust.', displayOrder: 2, publishedStatus: 'published' }
    ]);

    console.log('Seeding Group Brands...');
    await GroupBrand.deleteMany({});
    await GroupBrand.insertMany([
      { brandName: 'Midtown Pharmacy', slug: 'midtown-pharmacy', logo: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=500&auto=format&fit=crop', description: 'A trusted network of 24/7 retail pharmacies providing genuine medicines at affordable prices.', category: 'Retail', websiteUrl: 'https://midtownpharmacy.com', displayOrder: 1, publishedStatus: 'published' },
      { brandName: 'Midtown Diagnostics', slug: 'midtown-diagnostics', logo: 'https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?q=80&w=500&auto=format&fit=crop', description: 'Advanced pathology and imaging centers ensuring quick and accurate test results.', category: 'Pathology & Radiology', websiteUrl: 'https://midtowndiagnostics.com', displayOrder: 2, publishedStatus: 'published' }
    ]);

    console.log('Seeding Awards...');
    await Award.deleteMany({});
    await Award.insertMany([
      { awardName: 'Best Multispecialty Hospital', awardingOrganization: 'National Health Awards', year: '2025', category: 'Clinical Excellence', description: 'Awarded for maintaining the highest standards of clinical care across 20+ specialties.', certificateImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=500&auto=format&fit=crop', displayOrder: 1, publishedStatus: 'published' },
      { awardName: 'Green Hospital of the Year', awardingOrganization: 'EcoHealth Foundation', year: '2024', category: 'Sustainability', description: 'Recognized for our zero-carbon footprint initiative and sustainable waste management.', certificateImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=500&auto=format&fit=crop', displayOrder: 2, publishedStatus: 'published' }
    ]);

    console.log('Seeding Alliances...');
    await Alliance.deleteMany({});
    await Alliance.insertMany([
      { partnerName: 'Global MedTech Solutions', slug: 'global-medtech', partnerLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=500&auto=format&fit=crop', description: 'Our primary technology partner for implementing AI-driven robotic surgical systems.', category: 'Technology Partner', websiteUrl: 'https://example.com', displayOrder: 1, publishedStatus: 'published' },
      { partnerName: 'State Medical University', slug: 'state-medical', partnerLogo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=500&auto=format&fit=crop', description: 'Strategic academic alliance for joint research programs and medical student residencies.', category: 'Academic Partner', websiteUrl: 'https://example.com', displayOrder: 2, publishedStatus: 'published' }
    ]);

    console.log('Seeding Milestones...');
    await Milestone.deleteMany({});
    await Milestone.insertMany([
      { yearOrDate: '2010', title: 'The Foundation', slug: 'the-foundation', description: 'Midtown Hospital opens its doors with a 100-bed facility.', image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=500&auto=format&fit=crop', category: 'Establishment', displayOrder: 1, publishedStatus: 'published' },
      { yearOrDate: '2015', title: 'First Heart Transplant', slug: 'first-heart-transplant', description: 'Successfully completed the region\'s first pediatric heart transplant.', image: 'https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?q=80&w=500&auto=format&fit=crop', category: 'Clinical Achievement', displayOrder: 2, publishedStatus: 'published' },
      { yearOrDate: '2020', title: 'New Oncology Wing', slug: 'new-oncology-wing', description: 'Inaugurated a state-of-the-art, comprehensive cancer care center.', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=500&auto=format&fit=crop', category: 'Expansion', displayOrder: 3, publishedStatus: 'published' }
    ]);

    console.log('All Discover Midtown data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
