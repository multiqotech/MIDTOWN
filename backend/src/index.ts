import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

// Helper to read data
const readData = () => {
  try {
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    return { cities: [] };
  }
};

// Helper to write data
const writeData = (data: any) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// GET all cities
app.get('/api/cities', (req: Request, res: Response) => {
  const data = readData();
  res.json(data.cities);
});

// POST new city
app.post('/api/cities', (req: Request, res: Response) => {
  const data = readData();
  const newCity = {
    id: Date.now().toString(),
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    locations: req.body.locations || []
  };
  data.cities.push(newCity);
  writeData(data);
  res.status(201).json(newCity);
});

// PUT update city
app.put('/api/cities/:id', (req: Request, res: Response) => {
  const data = readData();
  const index = data.cities.findIndex((c: any) => c.id === req.params.id);
  if (index !== -1) {
    data.cities[index] = { ...data.cities[index], ...req.body };
    writeData(data);
    res.json(data.cities[index]);
  } else {
    res.status(404).json({ message: 'City not found' });
  }
});

// DELETE city
app.delete('/api/cities/:id', (req: Request, res: Response) => {
  const data = readData();
  const newCities = data.cities.filter((c: any) => c.id !== req.params.id);
  if (newCities.length !== data.cities.length) {
    data.cities = newCities;
    writeData(data);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'City not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
