'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './ServicesPage.module.css';
import { api } from '../../lib/api';

interface Service {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.get('/api/services');
        setServices(data || []);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className={styles.pageContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Our Medical Services</h1>
          <p className={styles.subtitle}>Comprehensive healthcare solutions tailored to your needs.</p>
        </div>

        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={20} />
          <input 
            type="text" 
            className={styles.searchInput}
            placeholder="Search for a service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>Loading services...</div>
        ) : (
          <div className={styles.grid}>
            {filteredServices.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      className={styles.image}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className={styles.overlay}></div>
                  </div>
                  <h3 className={styles.cardTitle}>{service.name}</h3>
                </div>
              </Link>
            ))}
            
            {filteredServices.length === 0 && (
              <div className={styles.noResults}>
                No services found matching "{searchQuery}".
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
