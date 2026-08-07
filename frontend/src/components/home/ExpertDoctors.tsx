'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ExpertDoctors.module.css';
import { api } from '../../lib/api';

interface Doctor {
  _id: string;
  name: string;
  specialist: string;
  qualification: string;
  imageUrl: string;
}

export default function ExpertDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4); // default desktop

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(4);
      else if (window.innerWidth >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, doctors.length - itemsPerView);
  const slideLeft = () => setCurrentIndex(prev => Math.max(0, prev - 1));
  const slideRight = () => setCurrentIndex(prev => Math.min(maxIndex, prev + 1));

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await api.get('/api/doctors');
        // Show up to 4 doctors on the home page
        setDoctors(data.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <section id="meet-our-doctors" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <span className={styles.label}>| OUR DOCTOR TEAM</span>
            <h2 className={styles.title}>Meet our expert doctors</h2>
          </div>
          <div className={styles.headerRight}>
            {doctors.length > itemsPerView && (
              <div className={styles.sliderControls}>
                <button onClick={slideLeft} disabled={currentIndex === 0} className={styles.sliderBtn}><ChevronLeft size={20} /></button>
                <button onClick={slideRight} disabled={currentIndex >= maxIndex} className={styles.sliderBtn}><ChevronRight size={20} /></button>
              </div>
            )}
            <Link href="/doctors" className={styles.viewAll}>
              View Full Team ↗
            </Link>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>Loading doctors...</div>
        ) : (
          <div className={styles.sliderContainer}>
            <div 
              className={styles.sliderTrack}
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {doctors.map((doctor) => (
                <div key={doctor._id} className={styles.slideItem}>
                  <Link href={`/doctors/${doctor._id}`} className={styles.doctorLink}>
                    <div className={styles.card}>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={doctor.imageUrl}
                          alt={doctor.name}
                          fill
                          className={styles.image}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardName}>{doctor.name}</h3>
                        <p className={styles.cardSpecialty}>{doctor.specialist}</p>
                        <p className={styles.cardQualification}>{doctor.qualification}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
