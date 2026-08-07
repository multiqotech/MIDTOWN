export interface NavItem {
  label: string;
  href: string;
  submenu?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Our Hospitals',
    href: '/hospitals',
    submenu: [
      { label: 'MIDTOWN Main Campus', href: '/hospitals/main-campus' },
      { label: 'MIDTOWN City Center', href: '/hospitals/city-center' },
      { label: 'MIDTOWN Westside', href: '/hospitals/westside' },
      { label: 'MIDTOWN East', href: '/hospitals/east' },
    ],
  },
  {
    label: 'Specialties',
    href: '/specialties',
    submenu: [
      { label: 'Cardiology', href: '/specialties/cardiology' },
      { label: 'Orthopedics', href: '/specialties/orthopedics' },
      { label: 'Neurology', href: '/specialties/neurology' },
      { label: 'Oncology', href: '/specialties/oncology' },
      { label: 'Gastroenterology', href: '/specialties/gastroenterology' },
      { label: 'Pediatrics', href: '/specialties/pediatrics' },
      { label: 'Dermatology', href: '/specialties/dermatology' },
      { label: 'Ophthalmology', href: '/specialties/ophthalmology' },
      { label: 'Pulmonology', href: '/specialties/pulmonology' },
      { label: 'Urology', href: '/specialties/urology' },
    ],
  },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Health Packages', href: '/packages' },
  { label: 'Contact', href: '/contact' },
];

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: '/images/hero-hospital.jpg',
    title: 'World-Class Healthcare',
    subtitle: 'Experience cutting-edge medical technology and compassionate care at MIDTOWN',
    ctaText: 'Explore Our Services',
    ctaLink: '/specialties',
  },
  {
    image: '/images/hero-doctor.jpg',
    title: 'Expert Doctors, Exceptional Care',
    subtitle: 'Our team of 100+ specialists delivers personalized treatment plans',
    ctaText: 'Find a Doctor',
    ctaLink: '/doctors',
  },
  {
    image: '/images/hero-team.jpg',
    title: 'Your Health, Our Priority',
    subtitle: 'Comprehensive healthcare solutions for you and your family',
    ctaText: 'Book Appointment',
    ctaLink: '/appointment',
  },
];

export interface Specialty {
  id: string;
  name: string;
  icon: string;
  description: string;
  doctorCount: number;
  slug: string;
}

export const SPECIALTIES: Specialty[] = [
  { id: '1', name: 'Cardiology', icon: '❤️', description: 'Advanced cardiac care with state-of-the-art catheterization labs', doctorCount: 12, slug: 'cardiology' },
  { id: '2', name: 'Orthopedics', icon: '🦴', description: 'Joint replacement, sports medicine, and spine surgery', doctorCount: 10, slug: 'orthopedics' },
  { id: '3', name: 'Neurology', icon: '🧠', description: 'Comprehensive neurological care and advanced diagnostics', doctorCount: 8, slug: 'neurology' },
  { id: '4', name: 'Oncology', icon: '🎗️', description: 'Multi-disciplinary cancer treatment and support', doctorCount: 9, slug: 'oncology' },
  { id: '5', name: 'Gastroenterology', icon: '🫁', description: 'Digestive health and hepatology services', doctorCount: 7, slug: 'gastroenterology' },
  { id: '6', name: 'Pediatrics', icon: '👶', description: 'Complete child healthcare from newborn to adolescent', doctorCount: 11, slug: 'pediatrics' },
  { id: '7', name: 'Dermatology', icon: '🧴', description: 'Skin care, cosmetic dermatology, and laser treatments', doctorCount: 6, slug: 'dermatology' },
  { id: '8', name: 'Ophthalmology', icon: '👁️', description: 'Advanced eye care including LASIK and cataract surgery', doctorCount: 8, slug: 'ophthalmology' },
  { id: '9', name: 'Pulmonology', icon: '🫀', description: 'Respiratory care and sleep medicine', doctorCount: 5, slug: 'pulmonology' },
  { id: '10', name: 'Urology', icon: '🏥', description: 'Urological care with minimally invasive procedures', doctorCount: 6, slug: 'urology' },
];

export interface FeaturedDoctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  education: string;
  slug: string;
}

export const FEATURED_DOCTORS: FeaturedDoctor[] = [
  { id: 'd1', name: 'Dr. Rajesh Sharma', specialty: 'Cardiology', experience: '20+ Years', image: '/images/doctor-placeholder.jpg', education: 'MBBS, MD (Cardiology) - AIIMS', slug: 'rajesh-sharma' },
  { id: 'd2', name: 'Dr. Priya Mehta', specialty: 'Orthopedics', experience: '15+ Years', image: '/images/doctor-placeholder.jpg', education: 'MBBS, MS (Ortho) - CMC Vellore', slug: 'priya-mehta' },
  { id: 'd3', name: 'Dr. Arun Kapoor', specialty: 'Neurology', experience: '18+ Years', image: '/images/doctor-placeholder.jpg', education: 'MBBS, DM (Neurology) - PGI Chandigarh', slug: 'arun-kapoor' },
  { id: 'd4', name: 'Dr. Sneha Patel', specialty: 'Oncology', experience: '12+ Years', image: '/images/doctor-placeholder.jpg', education: 'MBBS, MD (Oncology) - Tata Memorial', slug: 'sneha-patel' },
];

export interface HealthPackage {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  features: string[];
  popular: boolean;
  slug: string;
}

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'hp1',
    name: 'Comprehensive Health Check',
    price: 2999,
    originalPrice: 4999,
    features: ['Complete Blood Count', 'Liver & Kidney Function', 'Thyroid Profile', 'Cardiac Risk Markers', 'Vitamin D & B12', 'Chest X-Ray', 'ECG', 'Doctor Consultation'],
    popular: true,
    slug: 'comprehensive-health-check'
  },
  {
    id: 'hp2',
    name: 'Cardiac Health Package',
    price: 3999,
    originalPrice: 5999,
    features: ['2D Echo', 'TMT/Stress Test', 'Lipid Profile', 'HbA1c', 'ECG', 'Chest X-Ray', 'Cardiologist Consultation', 'Diet Counseling'],
    popular: false,
    slug: 'cardiac-health-package'
  },
  {
    id: 'hp3',
    name: 'Senior Citizen Package',
    price: 4499,
    originalPrice: 6999,
    features: ['Complete Blood Count', 'Bone Densitometry', 'Arthritis Profile', 'Eye Checkup', 'Dental Checkup', 'Physician Consultation', 'Dietary Advice', 'Physiotherapy Consultation'],
    popular: false,
    slug: 'senior-citizen-package'
  },
  {
    id: 'hp4',
    name: 'Women Wellness Package',
    price: 3499,
    originalPrice: 5499,
    features: ['Pap Smear', 'Mammogram / Breast Ultrasound', 'Thyroid Profile', 'Vitamin D & Iron Studies', 'Pelvic Ultrasound', 'Gynecologist Consultation', 'Diet Counseling'],
    popular: false,
    slug: 'women-wellness-package'
  },
];

export interface Stat {
  number: number | string;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { number: 15, suffix: '+', label: 'Years of Excellence' },
  { number: 100, suffix: '+', label: 'Expert Doctors' },
  { number: 50, suffix: '+', label: 'Specialties & Services' },
  { number: '10L', suffix: '+', label: 'Patients Treated' },
];

export interface Testimonial {
  id: string;
  name: string;
  condition: string;
  quote: string;
  rating: number;
  image: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Ramesh Kumar', condition: 'Cardiac Surgery', quote: 'The care I received at MIDTOWN was exceptional. The doctors were very attentive and the staff made sure I was comfortable throughout my recovery.', rating: 5, image: '/images/patient-placeholder.jpg' },
  { id: 't2', name: 'Sunita Devi', condition: 'Joint Replacement', quote: 'I can finally walk without pain thanks to the excellent orthopedics team. The physiotherapy post-surgery was also very well coordinated.', rating: 5, image: '/images/patient-placeholder.jpg' },
  { id: 't3', name: 'Amit Singh', condition: 'Pediatric Care', quote: 'We always trust MIDTOWN for our children\'s healthcare. The pediatricians are extremely knowledgeable and patient.', rating: 5, image: '/images/patient-placeholder.jpg' },
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  slug: string;
}

export const BLOG_POSTS: BlogPost[] = [
  { id: 'b1', title: 'Understanding Heart Health in Your 40s', excerpt: 'Learn about the critical steps you need to take to maintain optimal heart health as you age.', category: 'Cardiology', date: '2023-10-15T00:00:00Z', image: '/images/blog-placeholder.jpg', slug: 'understanding-heart-health' },
  { id: 'b2', title: 'Tips for Managing Joint Pain in Winter', excerpt: 'Winter can be tough on your joints. Here are some expert tips from our orthopedic specialists to keep pain at bay.', category: 'Orthopedics', date: '2023-11-02T00:00:00Z', image: '/images/blog-placeholder.jpg', slug: 'managing-joint-pain' },
  { id: 'b3', title: 'The Importance of Regular Eye Checkups', excerpt: 'Many eye conditions develop without obvious symptoms. Regular checkups are essential for preserving your vision.', category: 'Ophthalmology', date: '2023-11-20T00:00:00Z', image: '/images/blog-placeholder.jpg', slug: 'importance-eye-checkups' },
];

export interface FooterLinks {
  aboutLinks: { label: string; href: string }[];
  quickLinks: { label: string; href: string }[];
  specialtyLinks: { label: string; href: string }[];
}

export const FOOTER_LINKS: FooterLinks = {
  aboutLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Leadership', href: '/leadership' },
    { label: 'Careers', href: '/careers' },
    { label: 'News & Media', href: '/news' },
    { label: 'Contact Us', href: '/contact' },
  ],
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'DOCTORS', href: '/doctors' },
    { label: 'MEDICAL SERVICES', href: '/services' },
    { label: 'RECENT NEWS', href: '/news' },
    { label: 'HEALTH LIBRARY', href: '/#health-library' },
  ],
  specialtyLinks: [
    { label: 'Cardiology', href: '/doctors?specialty=Cardiology' },
    { label: 'Orthopedics', href: '/doctors?specialty=Orthopedics' },
    { label: 'Neurology', href: '/doctors?specialty=Neurology' },
    { label: 'Oncology', href: '/doctors?specialty=Oncology' },
    { label: 'Pediatrics', href: '/doctors?specialty=Pediatrics' },
  ],
};

export const CONTACT_INFO = {
  phone: '+91 800 123 4567',
  emergency: '1066',
  email: 'info@midtownhospital.com',
  address: '123 Health Avenue, Medical District, City Center, 400001',
};
