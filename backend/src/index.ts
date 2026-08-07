import express from 'express';
// import type { Request, Response } from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import City from './models/City.js';
import Settings from './models/Settings.js';
import Service from './models/Service.js';
import WhyChoose from './models/WhyChoose.js';
import Doctor from './models/Doctor.js';
import Testimonial from './models/Testimonial.js';
import Partner from './models/Partner.js';
import Faq from './models/Faq.js';
import Enquiry from './models/Enquiry.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Load env vars
dotenv.config({ path: path.join(import.meta.dirname, '.env') });

const dataFilePath = path.join(import.meta.dirname, 'data.json');

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL is not defined in .env');
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully');
    
    await seedDatabase();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    const cityCount = await City.countDocuments();
    const settingsCount = await Settings.countDocuments();
    
    if (cityCount === 0 || settingsCount === 0) {
      console.log('Seeding database from data.json...');
      const rawData = fs.readFileSync(dataFilePath, 'utf8');
      const data = JSON.parse(rawData);
      
      if (cityCount === 0 && data.cities && data.cities.length > 0) {
        await City.insertMany(data.cities);
        console.log(`Seeded ${data.cities.length} cities`);
      }
      
      if (settingsCount === 0 && data.settings) {
        await Settings.create(data.settings);
        console.log('Seeded settings');
      }

      const serviceCount = await Service.countDocuments();
      if (serviceCount === 0) {
        // Initial fallback seed for services to keep the grid populated
        const initialServices = [
          { id: '1', name: 'Emergency Department', imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop', description: '24/7 emergency care for all critical conditions.', keyPoints: ['Rapid Response', 'Advanced Life Support', 'Trauma Center'], suggestions: ['Call ahead if possible', 'Bring ID and insurance'] },
          { id: '2', name: 'Hyperbaric Oxygen Therapy', imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop', description: 'Advanced healing through pressurized 100% oxygen.', keyPoints: ['Wound Healing', 'Decompression Sickness', 'Infection Control'], suggestions: ['Avoid smoking before therapy'] },
          { id: '3', name: 'Internal Medicine Specialist', imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=600&auto=format&fit=crop', description: 'Comprehensive adult medical care.', keyPoints: ['Preventive Care', 'Chronic Disease Management'], suggestions: ['Bring all current medications'] },
          { id: '4', name: 'Pediatric Specialist', imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=600&auto=format&fit=crop', description: 'Expert medical care for infants, children, and adolescents.', keyPoints: ['Vaccinations', 'Growth Monitoring'], suggestions: ['Bring child vaccination records'] },
          { id: '5', name: 'Obstetrics & Gynecology', imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop', description: 'Women health services.', keyPoints: ['Maternity Care', 'Ultrasound'], suggestions: [] },
          { id: '6', name: 'Wound Care Clinic', imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop', description: 'Specialized care for chronic and non-healing wounds.', keyPoints: ['Advanced Dressings', 'Diabetic Ulcer Care'], suggestions: ['Keep wound area clean'] },
          { id: '7', name: 'General Polyclinic', imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop', description: 'General medical consultations and outpatient care.', keyPoints: ['General Checkups', 'Referrals'], suggestions: [] },
          { id: '8', name: 'Dental Polyclinic', imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop', description: 'Comprehensive dental care and oral surgery.', keyPoints: ['Teeth Cleaning', 'Root Canals', 'Extractions'], suggestions: ['Brush and floss regularly'] },
          { id: '9', name: 'Inpatient', imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=600&auto=format&fit=crop', description: 'Comfortable and fully-equipped rooms for admitted patients.', keyPoints: ['24/7 Nursing', 'Nutritional Care'], suggestions: ['Visiting hours are 10 AM to 8 PM'] },
          { id: '10', name: 'Delivery Room', imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=600&auto=format&fit=crop', description: 'State-of-the-art facilities for safe childbirth.', keyPoints: ['Fetal Monitoring', 'Neonatal Care Unit'], suggestions: ['Pack your hospital bag in advance'] },
          { id: '11', name: 'Pharmacy', imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=600&auto=format&fit=crop', description: 'In-house pharmacy for all your prescription needs.', keyPoints: ['Prescription Fulfillment', 'Over-the-Counter Meds'], suggestions: ['Bring your prescription slip'] },
          { id: '12', name: 'Laboratory', imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop', description: 'Accurate and rapid diagnostic testing.', keyPoints: ['Blood Tests', 'Pathology'], suggestions: ['Fast for 8 hours if doing a lipid panel'] },
          { id: '13', name: 'Radiology', imageUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=600&auto=format&fit=crop', description: 'Advanced imaging services including X-Ray, MRI, and CT Scans.', keyPoints: ['Digital X-Ray', 'Ultrasound'], suggestions: ['Remove metal jewelry before scan'] },
          { id: '14', name: 'Marine Ambulance', imageUrl: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad8169?q=80&w=600&auto=format&fit=crop', description: 'Emergency medical transport via water.', keyPoints: ['Rapid Island Transport', 'Life Support Equipped'], suggestions: [] },
          { id: '15', name: 'Morgue', imageUrl: 'https://images.unsplash.com/photo-1519494140681-8b17d76b8b6d?q=80&w=600&auto=format&fit=crop', description: 'Respectful and secure mortuary services.', keyPoints: ['Cold Storage', 'Autopsy Facilities'], suggestions: [] }
        ];
        await Service.insertMany(initialServices);
        console.log('Seeded initial services');
      }
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign(
      { role: 'admin' }, 
      process.env.JWT_SECRET || 'fallback_secret_123', 
      { expiresIn: '24h' }
    );
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Auth Middleware
const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_123');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// GET Settings
app.get('/api/settings', async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings || {});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT Settings
app.put('/api/settings', requireAdmin, async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, { 
      new: true, 
      upsert: true,
      setDefaultsOnInsert: true 
    });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all cities
app.get('/api/cities', async (req: Request, res: Response) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new city
app.post('/api/cities', requireAdmin, async (req: Request, res: Response) => {
  try {
    const newCity = {
      id: Date.now().toString(),
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      locations: req.body.locations || []
    };
    const city = await City.create(newCity);
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update city
app.put('/api/cities/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const city = await City.findOneAndUpdate(
      { id: req.params.id }, 
      req.body, 
      { new: true }
    );
    if (city) {
      res.json(city);
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE city
app.delete('/api/cities/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const city = await City.findOneAndDelete({ id: req.params.id });
    if (city) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all services
app.get('/api/services', async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single service
app.get('/api/services/:id', async (req: Request, res: Response) => {
  try {
    const service = await Service.findOne({ id: req.params.id });
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new service
app.post('/api/services', requireAdmin, async (req: Request, res: Response) => {
  try {
    const newService = {
      id: Date.now().toString(),
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      description: req.body.description || '',
      keyPoints: req.body.keyPoints || [],
      suggestions: req.body.suggestions || [],
    };
    const service = await Service.create(newService);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update service
app.put('/api/services/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const service = await Service.findOneAndUpdate(
      { id: req.params.id }, 
      req.body, 
      { new: true }
    );
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE service
app.delete('/api/services/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const service = await Service.findOneAndDelete({ id: req.params.id });
    if (service) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// --- Why Choose Us API Endpoints ---
app.get('/api/why-choose', async (req: Request, res: Response) => {
  try {
    let whyChoose = await WhyChoose.findOne();
    if (!whyChoose) {
      // Return default if none exists
      whyChoose = new WhyChoose({
        description: "At Midtown Hospital, we combine expert medical care with compassion, offering personalized treatments to ensure every patient feels supported and valued throughout their healing journey.",
        heroFeature: {
          title: "60+ Years of Excellence",
          description: "Decades of medical care prioritizing your health and well-being.",
          imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop"
        },
        features: [
          {
            title: "1000+ Expert Medical Care",
            description: "A team of professionals committed to your health and well-being.",
            imageUrl: "https://images.unsplash.com/photo-1537368910025-702800faa86b?q=80&w=500&auto=format&fit=crop"
          },
          {
            title: "Advanced Medical Technology",
            description: "Modern technology for accurate diagnostics and effective treatments.",
            imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=500&auto=format&fit=crop"
          },
          {
            title: "98% Happy Patients",
            description: "We prioritize delivering a positive experience for every patient.",
            imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=500&auto=format&fit=crop"
          },
          {
            title: "40+ Years Trusted Pharmacy",
            description: "We trusted pharmacy solutions delivering quality care and reliability.",
            imageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=500&auto=format&fit=crop"
          }
        ]
      });
      await whyChoose.save();
    }
    res.json(whyChoose);
  } catch (error) {
    console.error('Error fetching why-choose:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/why-choose', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { description, heroFeature, features } = req.body;
    let whyChoose = await WhyChoose.findOne();
    
    if (!whyChoose) {
      whyChoose = new WhyChoose({ description, heroFeature, features });
    } else {
      whyChoose.description = description;
      whyChoose.heroFeature = heroFeature;
      whyChoose.features = features;
    }
    
    await whyChoose.save();
    res.json(whyChoose);
  } catch (error) {
    console.error('Error updating why-choose:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Doctor API Endpoints ---

// GET all doctors
app.get('/api/doctors', async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single doctor
app.get('/api/doctors/:id', async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new doctor
app.post('/api/doctors', requireAdmin, async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// PUT update doctor
app.put('/api/doctors/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE doctor
app.delete('/api/doctors/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (doctor) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Testimonial API Endpoints ---

// GET all testimonials
app.get('/api/testimonials', async (req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single testimonial
app.get('/api/testimonials/:id', async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      res.json(testimonial);
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new testimonial
app.post('/api/testimonials', requireAdmin, async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// PUT update testimonial
app.put('/api/testimonials/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (testimonial) {
      res.json(testimonial);
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE testimonial
app.delete('/api/testimonials/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (testimonial) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Partner API Endpoints ---

// GET all partners
app.get('/api/partners', async (req: Request, res: Response) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single partner
app.get('/api/partners/:id', async (req: Request, res: Response) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (partner) {
      res.json(partner);
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new partner
app.post('/api/partners', requireAdmin, async (req: Request, res: Response) => {
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json(partner);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// PUT update partner
app.put('/api/partners/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const partner = await Partner.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (partner) {
      res.json(partner);
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE partner
app.delete('/api/partners/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (partner) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- FAQs API Endpoints ---

// GET all faqs
app.get('/api/faqs', async (req: Request, res: Response) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single faq
app.get('/api/faqs/:id', async (req: Request, res: Response) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (faq) {
      res.json(faq);
    } else {
      res.status(404).json({ message: 'FAQ not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new faq
app.post('/api/faqs', requireAdmin, async (req: Request, res: Response) => {
  try {
    const faq = await Faq.create(req.body);
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// PUT update faq
app.put('/api/faqs/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const faq = await Faq.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (faq) {
      res.json(faq);
    } else {
      res.status(404).json({ message: 'FAQ not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE faq
app.delete('/api/faqs/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (faq) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'FAQ not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Enquiries API Endpoints ---

// GET all enquiries
app.get('/api/enquiries', requireAdmin, async (req: Request, res: Response) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new enquiry (Frontend Callback Form)
app.post('/api/enquiries', async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    
    // Validate phone number
    if (!phone || !/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number. Must be exactly 10 digits.' });
    }

    const enquiry = await Enquiry.create(req.body);
    
    // Send email via Brevo if API key is provided
    if (process.env.BREVO_API_KEY) {
      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            sender: { name: 'Midtown Hospitals', email: 'noreply@midtownhospitals.com' },
            to: [{ email: 'admin@midtownhospitals.com', name: 'Admin' }],
            subject: 'New Callback Request - Midtown Hospitals',
            htmlContent: `
              <html>
                <body>
                  <h2>New Callback Request</h2>
                  <p><strong>Name:</strong> ${enquiry.name}</p>
                  <p><strong>Phone:</strong> ${enquiry.phone}</p>
                  <p><strong>Speciality:</strong> ${enquiry.speciality}</p>
                  <p><strong>Description:</strong> ${enquiry.description || 'N/A'}</p>
                </body>
              </html>
            `
          })
        });
        console.log(`[EMAIL] Successfully sent notification to admin via Brevo.`);
      } catch (emailErr) {
        console.error(`[EMAIL ERROR] Failed to send email via Brevo:`, emailErr);
      }
    } else {
      console.log(`[EMAIL SIMULATION] New callback request received! (Add BREVO_API_KEY to .env to send real emails)`);
      console.log(`Name: ${enquiry.name}, Phone: ${enquiry.phone}`);
    }
    
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// PUT update enquiry status
app.put('/api/enquiries/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (enquiry) {
      res.json(enquiry);
    } else {
      res.status(404).json({ message: 'Enquiry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE enquiry
app.delete('/api/enquiries/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (enquiry) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Enquiry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
