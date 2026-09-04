'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './LocationsSection.module.css';
import { api } from '../../lib/api';

interface Location {
  id: string;
  name: string;
  mapUrl: string;
}

interface City {
  id: string;
  name: string;
  imageUrl: string;
  locations: Location[];
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

export default function LocationsSection() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCities() {
      try {
        const data = await api.get('/api/cities');
        setCities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <section id="locations" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Locations</h2>
        
        {loading ? (
          <div className={styles.loading}>Loading locations...</div>
        ) : (
          <div className={styles.grid2Col}>
            {cities.map((city, idx) => (
              <div key={city.id || idx} className={styles.locationCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={city.imageUrl || FALLBACK_IMAGE}
                    alt={city.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className={styles.image}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.locationTitle}>{city.name}</h3>
                  <span className={styles.statusOpen}>
                    {city.locations.length} Location{city.locations.length !== 1 ? 's' : ''}
                  </span>
                  <p className={styles.description}>
                    Explore our state-of-the-art facilities in {city.name}, offering advanced medical care and comprehensive outpatient services.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
