'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ServicesGrid.module.css';
import { api } from '../../lib/api';

interface Service {
  id: string;
  name: string;
  imageUrl: string;
}

export default function ServicesGrid() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.get('/api/services');
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="our-services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Services</h2>
          <p className={styles.subtitle}>
            MIDTOWN Hospital can handle various health problems with the support of the best and most trusted medical services
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>Loading services...</div>
        ) : (
          <div className={styles.grid}>
            {services.map((service) => (
              <Link href={`/services/${service.id}`} key={service.id} style={{ textDecoration: 'none' }}>
                <div className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className={styles.overlay}></div>
                  </div>
                  <h3 className={styles.cardTitle}>{service.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
