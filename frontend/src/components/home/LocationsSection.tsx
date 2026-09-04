'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './LocationsSection.module.css';
import { api } from '../../lib/api';

interface Location {
  _id?: string;
  id?: string;
  name: string;
  address?: string;
  description?: string;
  status: string;
  imageUrl?: string;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

export default function LocationsSection() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const data = await api.get('/api/locations');
        setLocations(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLocations();
  }, []);

  return (
    <section id="locations" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Locations</h2>
        
        {loading ? (
          <div className={styles.loading}>Loading locations...</div>
        ) : (
          <div className={styles.grid2Col}>
            {locations.map((loc, idx) => (
              <div key={loc._id || loc.id || idx} className={styles.locationCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={loc.imageUrl || FALLBACK_IMAGE}
                    alt={loc.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className={styles.image}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.locationTitle}>{loc.name}</h3>
                  <span className={loc.status?.toLowerCase().includes('open') && !loc.status?.toLowerCase().includes('soon') ? styles.statusOpen : styles.statusSoon}>
                    {loc.status || 'Opening Soon'}
                  </span>
                  <p className={styles.description}>
                    {loc.address || loc.description}
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
