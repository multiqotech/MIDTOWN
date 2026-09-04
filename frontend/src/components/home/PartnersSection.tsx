'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './PartnersSection.module.css';
import { api } from '../../lib/api';

interface Partner {
  _id: string;
  name: string;
  logo: string;
}

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await api.get('/api/partners');
        setPartners(data);
      } catch (err) {
        console.error('Failed to fetch partners', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Trusted by Leading Healthcare Partners</h2>
            <p className={styles.subtitle}>Loading partners...</p>
          </div>
        </div>
      </section>
    );
  }

  if (partners.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Trusted by Leading Healthcare Partners</h2>
          <p className={styles.subtitle}>Collaborating with trusted partners to deliver the best in health care services</p>
        </div>

        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {partners.map((partner) => (
              <div key={`track1-${partner._id}`} className={styles.logoItem}>
                {partner.logo ? (
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image 
                      src={partner.logo} 
                      alt={partner.name} 
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <span className={styles.logoText}>{partner.name}</span>
                )}
              </div>
            ))}
          </div>
          <div className={styles.marqueeTrack} aria-hidden="true">
            {partners.map((partner) => (
              <div key={`track2-${partner._id}`} className={styles.logoItem}>
                {partner.logo ? (
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image 
                      src={partner.logo} 
                      alt={partner.name} 
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <span className={styles.logoText}>{partner.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
