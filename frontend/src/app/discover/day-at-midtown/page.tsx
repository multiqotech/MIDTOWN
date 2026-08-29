'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface DayData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  introduction: string;
  journeySteps: { title: string; description: string; displayOrder: number }[];
  timelineItems: { time: string; title: string; description: string; displayOrder: number }[];
  ctaText: string;
  ctaLink: string;
}

export default function DayAtMidtownPage() {
  const [data, setData] = useState<DayData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/discover/day-at-midtown');
        setData(response);
      } catch (err) {
        console.error('Failed to load day at midtown data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.loading}>Loading Timeline...</div>
        </main>
        <Footer />
      </>
    );
  }

  const heroImage = data?.heroImage || 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?q=80&w=2000&auto=format&fit=crop';
  const heroTitle = data?.heroTitle || 'A Day at Midtown';
  const heroSubtitle = data?.heroSubtitle || 'Experience the journey of care.';

  const timelineItems = data?.timelineItems && data.timelineItems.length > 0 
    ? [...data.timelineItems].sort((a, b) => a.displayOrder - b.displayOrder)
    : [
        { time: '08:00 AM', title: 'Arrival & Registration', description: 'Patients arrive and are greeted by our front desk.' },
        { time: '09:30 AM', title: 'Consultation', description: 'Expert doctors evaluate symptoms.' },
        { time: '11:00 AM', title: 'Diagnostics', description: 'State-of-the-art labs and imaging.' },
        { time: '02:00 PM', title: 'Treatment', description: 'Personalized care begins.' },
      ];

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Image
            src={heroImage}
            alt={heroTitle}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{heroTitle}</h1>
            <p className={styles.subtitle}>{heroSubtitle}</p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          <div className={styles.card}>
            <h2 className={styles.heading}>The Patient Journey</h2>
            <p className={styles.text}>{data?.introduction || 'From arrival to discharge, every moment is optimized for your comfort and recovery.'}</p>
            
            <div className={styles.timeline}>
              {timelineItems.map((item, idx) => (
                <div key={idx} className={`${styles.timelineItem} ${idx % 2 === 0 ? styles.left : styles.right}`}>
                  <div className={styles.timelineContent}>
                    <span className={styles.timeLabel}>{item.time}</span>
                    <h3 className={styles.stepTitle}>{item.title}</h3>
                    <p className={styles.stepDesc}>{(item as any).description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {data?.ctaText && (
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaText}>{data.ctaText}</h2>
              <Link href={data.ctaLink || '/'} className={styles.btnPrimary}>
                Book an Appointment
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
