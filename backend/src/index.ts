import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import City from './models/City.js';
import Settings from './models/Settings.js';

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
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    res.json({ success: true, token: 'fake-jwt-token-123' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

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
app.put('/api/settings', async (req: Request, res: Response) => {
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
app.post('/api/cities', async (req: Request, res: Response) => {
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
app.put('/api/cities/:id', async (req: Request, res: Response) => {
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
app.delete('/api/cities/:id', async (req: Request, res: Response) => {
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

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
