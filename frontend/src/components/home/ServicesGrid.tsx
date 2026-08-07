'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ServicesGrid.module.css';
import { api } from '../../lib/api';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  imageUrl: string;
}

export default function ServicesGrid() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.get('/api/services');
        // Only show up to 9 services on the home page
        setServices((data || []).slice(0, 9));
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const renderServiceCard = (service: Service) => (
    <Link href={`/services/${service.id}`} key={service.id} style={{ textDecoration: 'none' }} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className={styles.image}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className={styles.overlay}></div>
        </div>
        <h3 className={styles.cardTitle}>{service.name}</h3>
      </div>
    </Link>
  );

  return (
    <section id="our-services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>Our Services</h2>
            <p className={styles.subtitle}>
              MIDTOWN Hospital can handle various health problems with the support of the best and most trusted medical services
            </p>
          </div>
          <Link href="/services" className={styles.viewAll}>
            View All Services ↗
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>Loading services...</div>
        ) : (
          <>
            {!isMobile ? (
              // Desktop Grid (3 per row)
              <div className={styles.grid}>
                {services.map(renderServiceCard)}
              </div>
            ) : (
              // Mobile Carousel (1 at a time)
              <div className={styles.carouselContainer}>
                <button className={styles.carouselBtn} onClick={handlePrev} aria-label="Previous service">
                  <ChevronLeft size={24} />
                </button>
                
                <div className={styles.carouselSlide}>
                  {services.length > 0 && renderServiceCard(services[currentIndex])}
                </div>

                <button className={styles.carouselBtn} onClick={handleNext} aria-label="Next service">
                  <ChevronRight size={24} />
                </button>
                
                {/* Dots indicator */}
                <div className={styles.dotsContainer}>
                  {services.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
                      onClick={() => setCurrentIndex(idx)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
