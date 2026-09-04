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
import News from './models/News.js';
import Subscriber from './models/Subscriber.js';
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
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
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

// GET all locations
app.get('/api/locations', (req: Request, res: Response) => {
  // Hardcoded location data to fulfill the dynamic frontend fetch
  const locations = [
    {
      _id: 'loc1',
      name: 'Kanpur, Uttar Pradesh',
      status: 'Now Open',
      description: 'Our fully operational Polyclinic and Diagnostic Centre and Pharmacy spans 1,500 sq. ft., offering a full range of diagnostic and outpatient services backed by modern equipment and experienced professionals.',
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop'
    },
    {
      _id: 'loc2',
      name: 'Siliguri, West Bengal',
      status: 'Opening Soon',
      description: 'A modern Out-Patient Department (OPD) and Diagnostic Centre spread across 4,000 sq. ft., featuring 20+ OPD facilities, a well-stocked pharmacy, advanced radiology, emergency care, and specialized dental services.',
      imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=500&auto=format&fit=crop'
    }
  ];
  res.json(locations);
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
    console.log("BREVO_API_KEY exists:", !!process.env.BREVO_API_KEY);
    console.log(
      "Key prefix:",
      process.env.BREVO_API_KEY?.substring(0, 15)
    );
    // Send email via Brevo if API key is provided
    if (process.env.BREVO_API_KEY) {
      try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': process.env.BREVO_API_KEY!,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: {
            name: 'Midtown Hospitals',
            email: 'multiqotech@gmail.com'
          },
          to: [
            {
              email: 'krishnagupta831844@gmail.com',
              name: 'Admin'
            }
          ],
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

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Brevo API Error (${response.status}): ${errorBody}`);
      }

      const result = await response.json();
      console.log('[EMAIL] Sent successfully:', result);
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

// --- News API Endpoints ---

// Helper function to broadcast news to all subscribers
async function broadcastNewsToSubscribers(newsItem: any) {
  try {
    const subscribers = await Subscriber.find({});
    if (subscribers.length === 0) return;
    
    console.log(`Starting broadcast for news: ${newsItem.title} to ${subscribers.length} subscribers`);
    
    for (const sub of subscribers) {
      if (process.env.BREVO_API_KEY) {
        try {
          const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'api-key': process.env.BREVO_API_KEY,
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              sender: {
                name: 'Midtown Hospitals',
                email: 'multiqotech@gmail.com'
              },
              to: [{ email: sub.email }],
              subject: `New Update: ${newsItem.title}`,
              htmlContent: `
                <html>
                  <body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; text-align: center;">
                      <h2 style="color: #0f172a; margin-bottom: 10px;">${newsItem.title}</h2>
                      <h4 style="color: #64748b; margin-top: 0; font-weight: normal;">${newsItem.subtitle}</h4>
                    </div>
                    <div style="padding: 20px 0;">
                      ${newsItem.imageUrl ? `<img src="${newsItem.imageUrl}" alt="${newsItem.title}" style="width: 100%; border-radius: 8px; margin-bottom: 20px;"/>` : ''}
                      <p style="line-height: 1.6;">
                        ${newsItem.description.length > 200 ? newsItem.description.substring(0, 200) + '...' : newsItem.description}
                      </p>
                    </div>
                    <div style="text-align: center; margin-top: 30px;">
                      <a href="https://midtown-lime.vercel.app/news" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Read Full Article</a>
                    </div>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 40px 0 20px 0;" />
                    <p style="font-size: 12px; color: #94a3b8; text-align: center;">
                      You are receiving this email because you subscribed to updates from Midtown Hospitals.
                    </p>
                  </body>
                </html>
              `
            })
          });
          
          if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Brevo API Error for ${sub.email} (${response.status}): ${errorBody}`);
          }
        } catch (emailErr) {
          console.error(`[EMAIL ERROR] Failed to send broadcast to ${sub.email}:`, emailErr);
        }
      } else {
        console.log(`[EMAIL SIMULATION] Broadcast sent to ${sub.email} for news: ${newsItem.title}`);
      }
    }
    console.log(`Finished broadcast for news: ${newsItem.title}`);
  } catch (err) {
    console.error('Error during subscriber broadcast:', err);
  }
}

// GET all news
app.get('/api/news', async (req: Request, res: Response) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single news
app.get('/api/news/:id', async (req: Request, res: Response) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (newsItem) {
      res.json(newsItem);
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new news
app.post('/api/news', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { publishToSubscribers, ...newsData } = req.body;
    let newsItem: any = await News.create(newsData);
    
    // Broadcast if requested and not yet published
    if (publishToSubscribers && !newsItem.isPublishedToSubscribers) {
      await broadcastNewsToSubscribers(newsItem);
      newsItem.isPublishedToSubscribers = true;
      await newsItem.save();
    }
    
    res.status(201).json(newsItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// PUT update news
app.put('/api/news/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { publishToSubscribers, ...newsData } = req.body;
    let newsItem: any = await (News as any).findByIdAndUpdate(
      req.params.id, 
      newsData, 
      { new: true }
    );
    
    if (newsItem) {
      // Broadcast if requested and not yet published
      if (publishToSubscribers && !newsItem.isPublishedToSubscribers) {
        await broadcastNewsToSubscribers(newsItem);
        newsItem.isPublishedToSubscribers = true;
        await newsItem.save();
      }
      res.json(newsItem);
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE news
app.delete('/api/news/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const newsItem = await News.findByIdAndDelete(req.params.id);
    if (newsItem) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Discover Midtown API Endpoints ---

// Helper function for singleton GET
const getSingleton = async (Model: mongoose.Model<any>, req: Request, res: Response) => {
  try {
    const item = await Model.findOne();
    res.json(item || {});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function for singleton PUT
const putSingleton = async (Model: mongoose.Model<any>, req: Request, res: Response) => {
  try {
    const item = await Model.findOneAndUpdate({}, req.body, { 
      new: true, 
      upsert: true,
      setDefaultsOnInsert: true 
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DiscoverOverview
app.get('/api/discover/overview', (req, res) => getSingleton(DiscoverOverview, req, res));
app.put('/api/discover/overview', requireAdmin, (req, res) => putSingleton(DiscoverOverview, req, res));

// DayAtMidtownContent
app.get('/api/discover/day-at-midtown', (req, res) => getSingleton(DayAtMidtownContent, req, res));
app.put('/api/discover/day-at-midtown', requireAdmin, (req, res) => putSingleton(DayAtMidtownContent, req, res));

// VisionMission
app.get('/api/discover/vision-mission', (req, res) => getSingleton(VisionMission, req, res));
app.put('/api/discover/vision-mission', requireAdmin, (req, res) => putSingleton(VisionMission, req, res));

// AnthemContent
app.get('/api/discover/anthem', (req, res) => getSingleton(AnthemContent, req, res));
app.put('/api/discover/anthem', requireAdmin, (req, res) => putSingleton(AnthemContent, req, res));

// Helper functions for CRUD
const getCollection = async (Model: mongoose.Model<any>, req: Request, res: Response, sortField = 'displayOrder') => {
  try {
    const items = await Model.find().sort({ [sortField]: 1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getCollectionItem = async (Model: mongoose.Model<any>, req: Request, res: Response) => {
  try {
    const item = await Model.findById(req.params.id);
    if (item) res.json(item);
    else res.status(404).json({ message: 'Not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const postCollectionItem = async (Model: mongoose.Model<any>, req: Request, res: Response) => {
  try {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const putCollectionItem = async (Model: mongoose.Model<any>, req: Request, res: Response) => {
  try {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) res.json(item);
    else res.status(404).json({ message: 'Not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCollectionItem = async (Model: mongoose.Model<any>, req: Request, res: Response) => {
  try {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (item) res.status(204).send();
    else res.status(404).json({ message: 'Not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const generateCrudRoutes = (path: string, Model: mongoose.Model<any>, sortField?: string) => {
  app.get(`/api/discover/${path}`, (req, res) => getCollection(Model, req, res, sortField));
  app.get(`/api/discover/${path}/:id`, (req, res) => getCollectionItem(Model, req, res));
  app.post(`/api/discover/${path}`, requireAdmin, (req, res) => postCollectionItem(Model, req, res));
  app.put(`/api/discover/${path}/:id`, requireAdmin, (req, res) => putCollectionItem(Model, req, res));
  app.delete(`/api/discover/${path}/:id`, requireAdmin, (req, res) => deleteCollectionItem(Model, req, res));
};

const generateFilteredCrudRoutes = (path: string, Model: mongoose.Model<any>, filter: any, sortField = 'displayOrder') => {
  app.get(`/api/discover/${path}`, async (req, res) => {
    try {
      const items = await Model.find(filter).sort({ [sortField]: 1, createdAt: -1 });
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.get(`/api/discover/${path}/:slugOrId`, async (req, res) => {
    try {
      let item;
      if (mongoose.isValidObjectId(req.params.slugOrId)) {
        item = await Model.findOne({ _id: req.params.slugOrId, ...filter });
      } else {
        item = await Model.findOne({ slug: req.params.slugOrId, ...filter });
      }
      
      if (item) res.json(item);
      else res.status(404).json({ message: 'Not found' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post(`/api/discover/${path}`, requireAdmin, async (req, res) => {
    try {
      const item = await Model.create({ ...req.body, ...filter });
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

  app.put(`/api/discover/${path}/:id`, requireAdmin, async (req, res) => {
    try {
      const item = await Model.findOneAndUpdate({ _id: req.params.id, ...filter }, { ...req.body, ...filter }, { new: true });
      if (item) res.json(item);
      else res.status(404).json({ message: 'Not found' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.delete(`/api/discover/${path}/:id`, requireAdmin, async (req, res) => {
    try {
      const item = await Model.findOneAndDelete({ _id: req.params.id, ...filter });
      if (item) res.status(204).send();
      else res.status(404).json({ message: 'Not found' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
};

const generateSingletonFilteredRoutes = (path: string, Model: mongoose.Model<any>, filter: any) => {
  app.get(`/api/discover/${path}`, async (req, res) => {
    try {
      let data = await Model.findOne(filter);
      if (!data) {
        data = await Model.create(filter);
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.put(`/api/discover/${path}`, requireAdmin, async (req, res) => {
    try {
      let data = await Model.findOne(filter);
      if (data) {
        data = await Model.findOneAndUpdate(filter, { ...req.body, ...filter }, { new: true });
      } else {
        data = await Model.create({ ...req.body, ...filter });
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
};

// Category Overviews (Singletons)
generateSingletonFilteredRoutes('the-midtown-story', DiscoverPageContent, { pageType: 'the-midtown-story' });
generateSingletonFilteredRoutes('academics-research', DiscoverPageContent, { pageType: 'academics-research' });
generateSingletonFilteredRoutes('csr-sustainability', DiscoverPageContent, { pageType: 'csr-sustainability' });
generateSingletonFilteredRoutes('corporate-governance', DiscoverPageContent, { pageType: 'corporate-governance' });
generateSingletonFilteredRoutes('investor-relations', DiscoverPageContent, { pageType: 'investor-relations' });
generateSingletonFilteredRoutes('media-centre', DiscoverPageContent, { pageType: 'media-centre' });
generateSingletonFilteredRoutes('corporate-partnerships', DiscoverPageContent, { pageType: 'corporate-partnerships' });
generateSingletonFilteredRoutes('healers-circle', DiscoverPageContent, { pageType: 'healers-circle' });
generateSingletonFilteredRoutes('clinical-quality', DiscoverPageContent, { pageType: 'clinical-quality' });

// Collections
generateCrudRoutes('jobs', Job, 'createdAt');
generateFilteredCrudRoutes('board-of-directors', LeadershipMember, { type: 'board' });
generateFilteredCrudRoutes('executive-team', LeadershipMember, { type: 'executive' });
generateFilteredCrudRoutes('medical-council', LeadershipMember, { type: 'medical-council' });
generateCrudRoutes('group-brands', GroupBrand);
generateCrudRoutes('awards', Award);
generateCrudRoutes('alliances', Alliance);
generateCrudRoutes('milestones', Milestone);

// Academics & Research
generateSingletonFilteredRoutes('medical-education', DiscoverPageContent, { pageType: 'medical-education' });
generateSingletonFilteredRoutes('nursing-education', DiscoverPageContent, { pageType: 'nursing-education' });
generateFilteredCrudRoutes('research-institutes', ProgramInitiative, { type: 'research-institute' });
generateFilteredCrudRoutes('clinical-trials', ProgramInitiative, { type: 'clinical-trial' });
generateFilteredCrudRoutes('publications', DocumentResource, { type: 'publication' });
generateFilteredCrudRoutes('fellowships', ProgramInitiative, { type: 'fellowship' });

// CSR & Sustainability
generateFilteredCrudRoutes('health-camps', ProgramInitiative, { type: 'health-camp' });
generateFilteredCrudRoutes('community-outreach', ProgramInitiative, { type: 'csr-initiative' });
generateFilteredCrudRoutes('environmental-initiatives', ProgramInitiative, { type: 'environmental-initiative' });
generateFilteredCrudRoutes('waste-management', ProgramInitiative, { type: 'waste-management' });
generateFilteredCrudRoutes('green-hospitals', ProgramInitiative, { type: 'green-hospital' });

// Corporate Governance
generateFilteredCrudRoutes('board-committees', ProgramInitiative, { type: 'board-committee' });
generateFilteredCrudRoutes('policies-guidelines', DocumentResource, { type: 'policy' });
generateSingletonFilteredRoutes('ethics-compliance', DiscoverPageContent, { pageType: 'ethics-compliance' });

// Investor Relations
generateFilteredCrudRoutes('financial-results', DocumentResource, { type: 'financial-result' });
generateFilteredCrudRoutes('annual-reports', DocumentResource, { type: 'annual-report' });
generateSingletonFilteredRoutes('shareholder-info', DiscoverPageContent, { pageType: 'shareholder-info' });
generateFilteredCrudRoutes('corporate-announcements', NewsArticle, { type: 'corporate-announcement' });
generateSingletonFilteredRoutes('stock-information', DiscoverPageContent, { pageType: 'stock-information' });

// Media Centre
generateFilteredCrudRoutes('press-releases', NewsArticle, { type: 'press-release' });
generateFilteredCrudRoutes('in-the-news', NewsArticle, { type: 'in-the-news' });
generateFilteredCrudRoutes('media-kit', DocumentResource, { type: 'media-kit' });
generateFilteredCrudRoutes('brand-guidelines', DocumentResource, { type: 'brand-guideline' });
generateFilteredCrudRoutes('event-gallery', NewsArticle, { type: 'event-gallery' });

// Corporate Partnerships
generateFilteredCrudRoutes('corporate-tie-ups', ProgramInitiative, { type: 'corporate-tie-up' });
generateFilteredCrudRoutes('wellness-programs', ProgramInitiative, { type: 'wellness-program' });
generateFilteredCrudRoutes('insurance-partners', ProgramInitiative, { type: 'insurance-partner' });
generateSingletonFilteredRoutes('tpa-desk', DiscoverPageContent, { pageType: 'tpa-desk' });

// Healers' Circle
generateSingletonFilteredRoutes('nursing-excellence', DiscoverPageContent, { pageType: 'nursing-excellence' });
generateFilteredCrudRoutes('doctor-awards', Recognition, { type: 'doctor-award' });
generateSingletonFilteredRoutes('paramedical-staff', DiscoverPageContent, { pageType: 'paramedical-staff' });
generateFilteredCrudRoutes('employee-spotlights', Recognition, { type: 'employee-spotlight' });

// Clinical Quality & Outcomes
generateFilteredCrudRoutes('quality-certifications', Recognition, { type: 'quality-certification' });
generateSingletonFilteredRoutes('infection-control', DiscoverPageContent, { pageType: 'infection-control' });
generateSingletonFilteredRoutes('patient-safety', DiscoverPageContent, { pageType: 'patient-safety' });
generateFilteredCrudRoutes('clinical-indicators', DocumentResource, { type: 'clinical-indicator' });
generateSingletonFilteredRoutes('feedback-mechanism', DiscoverPageContent, { pageType: 'feedback-mechanism' });


// --- Newsletter Subscription API Endpoints ---

// POST new subscriber
app.post('/api/subscribe', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Check if already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      // 200 OK because the email is in the list, but it's not an error state in terms of DB
      return res.status(200).json({ status: 'exists', message: "You're already subscribed." });
    }

    const subscriber = await Subscriber.create({ email });

    // Send Welcome Email via Brevo API
    if (process.env.BREVO_API_KEY) {
      try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            sender: {
              name: 'Midtown Hospitals',
              email: 'multiqotech@gmail.com'
            },
            to: [
              {
                email: email
              }
            ],
            subject: 'Welcome to Midtown Hospitals Newsletter!',
            htmlContent: `
              <html>
                <body>
                  <h2>Welcome to Midtown Hospitals Newsletter!</h2>
                  <p>Thank you for subscribing.</p>
                  <p>You'll receive health tips, latest news, and updates directly in your inbox.</p>
                  <br/>
                  <p>Stay healthy,</p>
                  <p>The Midtown Hospitals Team</p>
                </body>
              </html>
            `
          })
        });

        if (!response.ok) {
          const errorBody = await response.text();
          console.error(`Brevo API Error (${response.status}): ${errorBody}`);
        } else {
          console.log(`[EMAIL] Welcome email sent successfully to ${email}`);
        }
      } catch (emailErr) {
        console.error(`[EMAIL ERROR] Failed to send welcome email via Brevo:`, emailErr);
      }
    } else {
      console.log(`[EMAIL SIMULATION] Welcome email generated for ${email}! (Add BREVO_API_KEY to .env to send real emails)`);
    }

    res.status(201).json({ status: 'success', message: "Thank you! You'll receive health tips and updates in your inbox." });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
app.get("/ping", (_req, res) => {
  res.status(200).send("pong");
});
// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    setInterval(async () => {
      try {
        // const url = process.env.APP_URL || `http://localhost:${PORT}`;
        await fetch('https://midtown-d1ze.onrender.com/ping');
        console.log("Self ping successful");
      } catch (err) {
        console.error("Self ping failed:", err);
      }
    }, 10 * 1000); // 10 seconds
  });
});
