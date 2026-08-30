import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import { DiscoverPageContent } from './models/DiscoverPageContent.js';
import { discoverContent } from '../../frontend/src/lib/discover-content.js';

dotenv.config({ path: path.join(import.meta.dirname, '.env') });

const migrate = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL is not defined in .env');
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected for migration');

    for (const [slug, data] of Object.entries(discoverContent)) {
      if (slug === 'leadership') continue;
      
      const payload = {
        pageType: slug,
        heroTitle: data.title,
        heroSubtitle: data.subtitle,
        heroImage: data.heroImage,
        contentBlocks: data.sections.map(s => ({
          title: s.heading,
          text: s.content.join('\n\n'),
          image: s.image || ''
        }))
      };

      await DiscoverPageContent.findOneAndUpdate(
        { pageType: slug },
        payload,
        { upsert: true, new: true }
      );
      console.log(`Migrated ${slug}`);
    }

    console.log('Migration complete');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

migrate();
