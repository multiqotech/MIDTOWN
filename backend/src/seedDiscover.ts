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
import { DiscoverPageContent } from './models/DiscoverPageContent.js';
import { ProgramInitiative } from './models/ProgramInitiative.js';
import { DocumentResource } from './models/DocumentResource.js';
import { NewsArticle } from './models/NewsArticle.js';
import { Recognition } from './models/Recognition.js';

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

    console.log('Seeding Board of Directors...');
    await LeadershipMember.deleteMany({});
    await LeadershipMember.insertMany([
      { type: 'board', name: 'Dr. Sarah Jenkins', slug: 'sarah-jenkins-board', profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format&fit=crop', designation: 'Chairperson', shortBiography: 'Visionary leader with 25 years of healthcare governance.', fullBiography: 'Dr. Sarah Jenkins leads the board with a focus on sustainable growth and ethical medical practice.', education: ['MD, Harvard Medical School', 'MBA, Wharton'], experience: ['Chairperson, Midtown Hospital (2015-Present)'], areasOfExpertise: ['Strategic Governance', 'Healthcare Economics'], responsibilities: ['Strategic Direction', 'Financial Oversight'], leadershipMessage: 'Our goal is not just to treat patients, but to elevate the standard of healthcare for the entire region.', displayOrder: 1, publishedStatus: 'published' }
    ]);

    console.log('Seeding Executive Team...');
    await LeadershipMember.insertMany([
      { type: 'executive', name: 'James Carter', slug: 'james-carter-exec', profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop', designation: 'Chief Operating Officer', department: 'Operations', shortBiography: 'Ensuring seamless hospital operations and exceptional patient experiences.', fullBiography: 'James has spent over two decades optimizing hospital workflows to ensure that patient care is never delayed.', education: ['MHA, Johns Hopkins'], experience: ['COO, Midtown Hospital (2018-Present)'], areasOfExpertise: ['Hospital Operations', 'Supply Chain Management'], responsibilities: ['Day-to-day Operations', 'Resource Allocation'], leadershipMessage: 'Operational excellence translates directly into better patient outcomes.', displayOrder: 1, publishedStatus: 'published' }
    ]);

    console.log('Seeding Medical Council...');
    await LeadershipMember.insertMany([
      { type: 'medical-council', name: 'Dr. Marcus Webb', slug: 'marcus-webb-med', profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500&auto=format&fit=crop', designation: 'Head of Council', specialty: 'Neurosurgery', medicalQualifications: ['MBBS', 'MD', 'MCh Neurosurgery'], shortBiography: 'Renowned neurosurgeon ensuring clinical excellence across all departments.', fullBiography: 'Dr. Marcus Webb oversees all clinical operations, ensuring that the highest standards of patient care and safety are maintained.', experience: ['Head of Neurosurgery (2010-2018)'], areasOfExpertise: ['Minimally Invasive Spine Surgery'], researchInterests: ['Neuro-regeneration', 'Spinal Implants'], publications: ['Journal of Neurosurgery (2022)', 'Spine Today (2020)'], awards: ['Top Neurosurgeon 2021'], responsibilities: ['Clinical Governance', 'Surgical Standards'], displayOrder: 1, publishedStatus: 'published' }
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

    console.log('Seeding Academics & Research...');
    await DiscoverPageContent.deleteMany({});
    await DiscoverPageContent.insertMany([
      { pageType: 'medical-education', heroTitle: 'Medical Education', heroSubtitle: 'Training the next generation of medical pioneers through world-class programs.', heroImage: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5eb2?q=80&w=2000&auto=format&fit=crop', contentBlocks: [{ title: 'Our Education Philosophy', text: 'At Midtown Hospital, we believe that exceptional patient care starts with exceptional education. Our medical education programs blend rigorous academic training with hands-on clinical experience.\n\nOur faculty includes nationally recognised clinicians and researchers who are committed to mentoring the next generation of healthcare leaders.' }, { title: 'Programs Offered', text: 'We offer comprehensive undergraduate and postgraduate medical programs across 25+ specialties. Our Continuing Medical Education (CME) program hosts over 50 workshops and seminars annually, keeping our practitioners at the forefront of medical science.' }], statistics: [{ label: 'Students Trained', value: '1,500+' }, { label: 'Specialties', value: '25+' }, { label: 'Annual CME Events', value: '50+' }] },
      { pageType: 'nursing-education', heroTitle: 'Nursing Education', heroSubtitle: 'Empowering nurses with advanced clinical skills and compassionate care.', heroImage: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2000&auto=format&fit=crop', contentBlocks: [{ title: 'Nursing Development', text: 'Our nursing education ecosystem is designed to nurture clinical excellence, compassion, and leadership. We offer BSc Nursing, GNM, and Post-Basic specialisation programs.' }, { title: 'Simulation & Skills Lab', text: 'Our state-of-the-art simulation centre provides a safe, controlled environment for nursing students to practise clinical procedures and develop critical decision-making skills.' }], statistics: [{ label: 'Nursing Graduates', value: '800+' }, { label: 'Training Programs', value: '12' }] },
      { pageType: 'ethics-compliance', heroTitle: 'Ethics & Compliance', heroSubtitle: 'Upholding the highest standards of integrity in every action.', heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop', contentBlocks: [{ title: 'Our Commitment', text: 'At Midtown Hospital, ethics and compliance are not just policies — they are core to our identity. Every decision, interaction, and procedure is guided by our unwavering commitment to integrity.' }, { title: 'Whistleblower Protection', text: 'We maintain a confidential reporting system that enables employees, partners, and stakeholders to report concerns without fear of retaliation.' }] },
      { pageType: 'shareholder-info', heroTitle: 'Shareholder Information', heroSubtitle: 'Essential information for our valued shareholders and investors.', heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2000&auto=format&fit=crop', contentBlocks: [{ title: 'Investor Relations Overview', text: 'Midtown Hospital India Pvt. Ltd. is committed to maintaining transparent communication with our shareholders and the investment community.' }, { title: 'Dividend Policy', text: 'Our dividend policy balances returning value to shareholders while maintaining sufficient capital for strategic growth and operational excellence.' }] },
      { pageType: 'stock-information', heroTitle: 'Stock Information', heroSubtitle: 'Market data and investment insights for Midtown Hospital.', heroImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2000&auto=format&fit=crop', contentBlocks: [{ title: 'Market Overview', text: 'Stay informed with the latest stock performance data and market insights for Midtown Hospital.' }] },
      { pageType: 'nursing-excellence', heroTitle: 'Nursing Excellence', heroSubtitle: 'Celebrating the compassion and clinical mastery of our nursing professionals.', heroImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2000&auto=format&fit=crop', contentBlocks: [{ title: 'Our Nursing Legacy', text: 'Nursing at Midtown Hospital is more than a profession — it is a calling. Our nurses are the backbone of patient care, providing round-the-clock compassion, expertise, and dedication.' }, { title: 'Recognition Programs', text: 'We celebrate nursing excellence through annual awards, skill development scholarships, and international conference sponsorships.' }], statistics: [{ label: 'Nursing Staff', value: '2,000+' }, { label: 'Awards Won', value: '45+' }] },
      { pageType: 'paramedical-staff', heroTitle: 'Paramedical Staff', heroSubtitle: 'The unsung heroes who keep our hospitals running seamlessly.', heroImage: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=2000&auto=format&fit=crop', contentBlocks: [{ title: 'Our Paramedical Team', text: 'From lab technicians and radiographers to physiotherapists and pharmacists, our paramedical staff forms a critical layer of healthcare delivery at Midtown.' }, { title: 'Training & Development', text: 'We invest in continuous professional development, sponsoring certifications, workshops, and skill enhancement programs for all paramedical staff.' }] },
      { pageType: 'infection-control', heroTitle: 'Infection Control', heroSubtitle: 'Rigorous protocols for the highest standards of hygiene and patient safety.', heroImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2000&auto=format&fit=crop', contentBlocks: [{ title: 'Our Infection Control Framework', text: 'Midtown Hospital maintains a comprehensive infection prevention and control program that exceeds national standards. Our dedicated Infection Control Committee monitors, reviews, and updates protocols continuously.' }, { title: 'Surveillance & Reporting', text: 'We employ real-time surveillance systems to track healthcare-associated infections (HAIs) and implement evidence-based interventions.' }], statistics: [{ label: 'HAI Rate', value: '<0.5%' }, { label: 'Hand Hygiene Compliance', value: '98%' }] },
      { pageType: 'patient-safety', heroTitle: 'Patient Safety', heroSubtitle: 'A culture where patient wellbeing comes above everything else.', heroImage: 'https://images.unsplash.com/photo-1551190822-a9ce113ac100?q=80&w=2000&auto=format&fit=crop', contentBlocks: [{ title: 'Safety First Culture', text: 'Patient safety at Midtown Hospital is embedded in every process, protocol, and interaction. Our Patient Safety Council leads a hospital-wide initiative to prevent adverse events.' }, { title: 'Medication Safety', text: 'Our electronic medication management system includes barcode scanning, drug interaction checks, and dosage verification to minimise medication errors.' }] },
      { pageType: 'feedback-mechanism', heroTitle: 'Feedback Mechanism', heroSubtitle: 'Your voice shapes better healthcare — we listen, learn, and improve.', heroImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2000&auto=format&fit=crop', contentBlocks: [{ title: 'How We Listen', text: 'Midtown Hospital values every piece of feedback. We offer multiple channels including digital kiosks, mobile apps, website forms, and in-person feedback desks at every facility.' }, { title: 'Continuous Improvement', text: 'Feedback is reviewed weekly by our Quality Improvement team and actionable insights are implemented within defined timelines.' }] },
      { pageType: 'tpa-desk', heroTitle: 'TPA Desk', heroSubtitle: 'Hassle-free claims processing and seamless insurance coordination.', heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop', contentBlocks: [{ title: 'TPA Services', text: 'Our dedicated TPA (Third Party Administrator) desk provides comprehensive support for cashless hospitalisation, claim processing, and insurance coordination.' }, { title: 'Cashless Facility', text: 'We offer cashless treatment under all major insurance policies and TPAs. Our dedicated team ensures seamless pre-authorisation and real-time claim tracking.' }] }
    ]);

    await ProgramInitiative.deleteMany({});
    await ProgramInitiative.insertMany([
      // Research Institutes
      { type: 'research-institute', title: 'Midtown Oncology Research Institute', slug: 'oncology-institute', category: 'Oncology', description: 'Pioneering new treatments for various cancers through translational research and clinical innovation.', location: 'Main Campus', status: 'Active', displayOrder: 1, publishedStatus: 'published' },
      { type: 'research-institute', title: 'Cardiovascular Research Centre', slug: 'cardiovascular-centre', category: 'Cardiology', description: 'Advancing heart care through cutting-edge research in interventional cardiology and cardiac surgery.', location: 'Tower B', status: 'Active', displayOrder: 2, publishedStatus: 'published' },
      // Clinical Trials
      { type: 'clinical-trial', title: 'Phase III Trial — Novel Immunotherapy for Melanoma', slug: 'immunotherapy-trial', category: 'Immunotherapy', description: 'Investigating the efficacy of a new targeted immunotherapy drug for Stage III melanoma patients.', eligibility: 'Adults 18-65 with Stage III Melanoma', status: 'Recruiting', displayOrder: 1, publishedStatus: 'published' },
      { type: 'clinical-trial', title: 'Diabetes Prevention Study', slug: 'diabetes-prevention', category: 'Endocrinology', description: 'A randomised controlled trial evaluating lifestyle interventions for prediabetic individuals.', eligibility: 'Adults 30-60 with prediabetes', status: 'Active', displayOrder: 2, publishedStatus: 'published' },
      // Fellowships
      { type: 'fellowship', title: 'Advanced Cardiology Fellowship', slug: 'cardiology-fellowship', category: 'Cardiology', description: 'A two-year intensive fellowship in advanced interventional cardiology techniques.', durationOrDate: '2 Years', status: 'Active', displayOrder: 1, publishedStatus: 'published' },
      { type: 'fellowship', title: 'Minimally Invasive Surgery Fellowship', slug: 'mis-fellowship', category: 'Surgery', description: 'Training program in laparoscopic and robotic surgical techniques across specialties.', durationOrDate: '18 Months', status: 'Active', displayOrder: 2, publishedStatus: 'published' },
      // Health Camps
      { type: 'health-camp', title: 'Rural Eye Care Camp', slug: 'rural-eye-care-2023', category: 'Ophthalmology', description: 'Providing free cataract surgeries and eye checkups to underserved rural communities.', durationOrDate: 'Oct 2023', location: 'Village District', displayOrder: 1, publishedStatus: 'published' },
      { type: 'health-camp', title: 'Women\'s Health Awareness Camp', slug: 'womens-health-2023', category: 'Gynaecology', description: 'Free health screenings and awareness sessions focused on women\'s reproductive and general health.', durationOrDate: 'Nov 2023', location: 'Community Centre', displayOrder: 2, publishedStatus: 'published' },
      // CSR initiatives
      { type: 'csr-initiative', title: 'Clean Water for Schools', slug: 'clean-water-schools', category: 'Community', description: 'Installing water purification systems in 50 schools across underprivileged areas.', durationOrDate: 'Ongoing', displayOrder: 1, publishedStatus: 'published' },
      { type: 'environmental-initiative', title: 'Solar Powered Campus Transition', slug: 'solar-campus', category: 'Energy', description: 'Transitioning 40% of our energy consumption to renewable solar power across all campuses.', durationOrDate: 'Ongoing', displayOrder: 1, publishedStatus: 'published' },
      { type: 'waste-management', title: 'Biomedical Waste Management Program', slug: 'biomedical-waste', category: 'Waste Management', description: 'Comprehensive segregation, treatment, and disposal system for all biomedical waste.', status: 'Active', displayOrder: 1, publishedStatus: 'published' },
      { type: 'green-hospital', title: 'LEED Certified Main Campus', slug: 'leed-campus', category: 'Green Building', description: 'Our main campus holds LEED Gold certification for sustainable building design and operations.', status: 'Active', displayOrder: 1, publishedStatus: 'published' },
      // Corporate Partnerships
      { type: 'board-committee', title: 'Audit Committee', slug: 'audit-committee', category: 'Governance', description: 'Oversees financial reporting integrity, internal controls, and audit processes.', displayOrder: 1, publishedStatus: 'published' },
      { type: 'board-committee', title: 'Nomination & Remuneration Committee', slug: 'nomination-committee', category: 'Governance', description: 'Responsible for board composition, director appointments, and executive compensation.', displayOrder: 2, publishedStatus: 'published' },
      { type: 'corporate-tie-up', title: 'TechCorp Employee Wellness Partnership', slug: 'techcorp-wellness', category: 'Corporate', description: 'Comprehensive health check-up and wellness packages for TechCorp\'s 5000+ employees.', durationOrDate: '2023-2025', displayOrder: 1, publishedStatus: 'published' },
      { type: 'wellness-program', title: 'Corporate Wellness 360', slug: 'corporate-wellness-360', category: 'Corporate Health', description: 'A comprehensive preventive health program designed for corporate partners.', durationOrDate: 'Annual', displayOrder: 1, publishedStatus: 'published' },
      { type: 'wellness-program', title: 'Executive Health Check Program', slug: 'executive-health', category: 'Preventive Care', description: 'Premium health assessment packages tailored for senior management and executives.', durationOrDate: 'Annual', displayOrder: 2, publishedStatus: 'published' },
      { type: 'insurance-partner', title: 'Star Health Insurance', slug: 'star-health', category: 'Health Insurance', description: 'Comprehensive cashless treatment facility available for all Star Health policyholders.', status: 'Active', displayOrder: 1, publishedStatus: 'published' },
      { type: 'insurance-partner', title: 'HDFC ERGO Health Insurance', slug: 'hdfc-ergo', category: 'Health Insurance', description: 'Full cashless hospitalisation and specialised treatment coverage.', status: 'Active', displayOrder: 2, publishedStatus: 'published' },
    ]);

    await DocumentResource.deleteMany({});
    await DocumentResource.insertMany([
      { type: 'publication', title: 'Advancements in Minimally Invasive Spine Surgery', slug: 'mis-spine', category: 'Neurosurgery', yearOrDate: '2023', summary: 'A comprehensive review of emerging techniques in minimally invasive spinal procedures.', authors: ['Dr. Marcus Webb', 'Dr. Priya Sharma'], fileUrl: '#', displayOrder: 1, publishedStatus: 'published' },
      { type: 'publication', title: 'Impact of AI-Assisted Diagnostics in Radiology', slug: 'ai-radiology', category: 'Radiology', yearOrDate: '2023', summary: 'Evaluating the accuracy and efficiency of AI-powered diagnostic imaging tools.', authors: ['Dr. Anil Kapoor'], fileUrl: '#', displayOrder: 2, publishedStatus: 'published' },
      { type: 'policy', title: 'Code of Business Conduct and Ethics', slug: 'code-of-conduct', category: 'Governance', yearOrDate: '2023', summary: 'Guidelines ensuring all operations adhere to the highest ethical standards.', displayOrder: 1, publishedStatus: 'published' },
      { type: 'policy', title: 'Whistleblower Protection Policy', slug: 'whistleblower-policy', category: 'Compliance', yearOrDate: '2023', summary: 'Framework for reporting concerns and ensuring protection for whistleblowers.', displayOrder: 2, publishedStatus: 'published' },
      { type: 'financial-result', title: 'Q3 FY2023 Financial Results', slug: 'q3-fy2023', category: 'Finance', yearOrDate: 'Q3 2023', summary: 'Revenue grew 18% YoY driven by strong patient volumes and expanded service offerings.', displayOrder: 1, publishedStatus: 'published' },
      { type: 'financial-result', title: 'Q2 FY2023 Financial Results', slug: 'q2-fy2023', category: 'Finance', yearOrDate: 'Q2 2023', summary: 'Continued growth with operational efficiencies improving EBITDA margins.', displayOrder: 2, publishedStatus: 'published' },
      { type: 'annual-report', title: 'Annual Report FY2023', slug: 'annual-report-2023', category: 'Annual Report', yearOrDate: '2023', summary: 'Comprehensive review of Midtown Hospital\'s performance, strategy, and outlook.', fileUrl: '#', displayOrder: 1, publishedStatus: 'published' },
      { type: 'media-kit', title: 'Midtown Hospital Media Kit', slug: 'media-kit-2023', category: 'Press Resources', yearOrDate: '2023', summary: 'Comprehensive media resources including logos, fact sheets, and executive bios.', fileUrl: '#', displayOrder: 1, publishedStatus: 'published' },
      { type: 'brand-guideline', title: 'Brand Identity Guidelines v2.0', slug: 'brand-guidelines-v2', category: 'Brand', yearOrDate: '2023', summary: 'Official guidelines for logo usage, colour palette, typography, and brand voice.', fileUrl: '#', displayOrder: 1, publishedStatus: 'published' },
      { type: 'clinical-indicator', title: 'Surgical Site Infection Rate', slug: 'ssi-rate', category: 'Surgery', yearOrDate: '2023', summary: 'Tracking and reporting of post-surgical infection rates across all departments.', displayOrder: 1, publishedStatus: 'published' },
      { type: 'clinical-indicator', title: 'Patient Readmission Rate', slug: 'readmission-rate', category: 'Quality', yearOrDate: '2023', summary: '30-day readmission rates tracked and benchmarked against national averages.', displayOrder: 2, publishedStatus: 'published' },
    ]);

    console.log('Seeding Media Centre...');
    await NewsArticle.deleteMany({});
    await NewsArticle.insertMany([
      { type: 'press-release', title: 'Midtown Hospital Opens New Robotic Surgery Wing', slug: 'new-robotic-surgery-wing', date: '2023-11-15', category: 'Expansion', summary: 'State-of-the-art facility featuring da Vinci Xi surgical systems will increase surgical capacity by 30%.', content: 'Midtown Hospital today announced the inauguration of its new Robotic Surgery Wing, equipped with the latest da Vinci Xi surgical systems. The wing will serve as a centre of excellence for minimally invasive robotic procedures across urology, gynaecology, and general surgery.', publishedStatus: 'published', displayOrder: 1 },
      { type: 'press-release', title: 'Midtown Hospital Achieves NABH Accreditation', slug: 'nabh-accreditation', date: '2023-09-20', category: 'Quality', summary: 'Recognition of our commitment to maintaining the highest standards of healthcare quality.', content: 'Midtown Hospital is proud to announce its successful accreditation by the National Accreditation Board for Hospitals & Healthcare Providers (NABH), validating our commitment to patient safety and quality healthcare delivery.', publishedStatus: 'published', displayOrder: 2 },
      { type: 'in-the-news', title: 'Healthcare Innovation Awards 2023: Midtown Hospital recognised', slug: 'innovation-awards-2023', date: '2023-10-01', source: 'Healthcare Today', sourceUrl: '#', summary: 'Midtown Hospital recognised for pioneering digital health initiatives.', publishedStatus: 'published', displayOrder: 1 },
      { type: 'in-the-news', title: 'Midtown Hospital leads telemedicine adoption in the region', slug: 'telemedicine-leader', date: '2023-08-15', source: 'Medical Express', sourceUrl: '#', summary: 'Coverage of Midtown\'s comprehensive telemedicine platform serving rural communities.', publishedStatus: 'published', displayOrder: 2 },
      { type: 'corporate-announcement', title: 'Board Meeting — Q3 Results Approval', slug: 'board-meeting-q3', date: '2023-11-10', category: 'Corporate', summary: 'Board of Directors approved Q3 FY2023 financial results.', publishedStatus: 'published', displayOrder: 1 },
      { type: 'event-gallery', title: 'Annual Healthcare Conference 2023', slug: 'annual-conference-2023', date: '2023-10-28', category: 'Conference', summary: 'Highlights from our flagship annual healthcare conference attended by 500+ delegates.', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop', publishedStatus: 'published', displayOrder: 1 },
    ]);

    console.log('Seeding Recognition & Quality...');
    await Recognition.deleteMany({});
    await Recognition.insertMany([
      { type: 'doctor-award', title: 'Dr. Priya Sharma — Excellence in Cardiology', issuerOrRole: 'Indian Medical Association', year: '2023', description: 'Recognised for pioneering contributions to interventional cardiology and patient outcomes.', image: '', displayOrder: 1, publishedStatus: 'published' },
      { type: 'doctor-award', title: 'Dr. Rajesh Kumar — Best Surgeon Award', issuerOrRole: 'National Surgical Society', year: '2022', description: 'Awarded for excellence in minimally invasive surgical procedures.', displayOrder: 2, publishedStatus: 'published' },
      { type: 'employee-spotlight', title: 'Nurse Meena Devi — Compassion in Action', issuerOrRole: 'ICU Nursing', year: '2023', description: 'Nurse Meena has been with Midtown for 12 years, consistently going above and beyond for her patients. Her dedication during the pandemic earned her the hospital\'s highest nursing honour.', quote: 'Every patient is someone\'s family. I treat them exactly as I would want my own family to be treated.', displayOrder: 1, publishedStatus: 'published' },
      { type: 'employee-spotlight', title: 'Suresh Patel — Lab Technician of the Year', issuerOrRole: 'Pathology Lab', year: '2023', description: 'Suresh has processed over 50,000 lab samples with near-perfect accuracy, contributing to faster and more reliable diagnostics.', displayOrder: 2, publishedStatus: 'published' },
      { type: 'quality-certification', title: 'JCI Accreditation', issuerOrRole: 'Joint Commission International', year: '2023', description: 'Gold Seal of Approval for global healthcare quality and patient safety standards.', status: 'Active', displayOrder: 1, publishedStatus: 'published' },
      { type: 'quality-certification', title: 'NABH Accreditation', issuerOrRole: 'National Accreditation Board for Hospitals', year: '2023', description: 'Full accreditation recognising our commitment to quality healthcare delivery.', status: 'Active', displayOrder: 2, publishedStatus: 'published' },
      { type: 'quality-certification', title: 'ISO 9001:2015', issuerOrRole: 'Bureau Veritas', year: '2022', description: 'Certification for quality management systems across all hospital operations.', status: 'Active', displayOrder: 3, publishedStatus: 'published' },
    ]);

    console.log('All remaining Discover Midtown data seeded successfully!');

    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding data:', err);
    mongoose.disconnect();
  }
};

seedData();
