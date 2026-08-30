'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface VisionMissionData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  vision: string;
  mission: string;
  healthcarePhilosophy: string;
  missionPillars: { title: string; description: string; displayOrder: number }[];
  coreValues: { title: string; description: string; displayOrder: number }[];
}

export default function VisionMissionPage() {
  const [data, setData] = useState<VisionMissionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/discover/vision-mission');
        setData(response);
      } catch (err: any) {
        console.error('Failed to load vision/mission data', err);
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
          <div className={styles.loading}>Loading Vision & Mission...</div>
        </main>
        <Footer />
      </>
    );
  }

  const heroImage = data?.heroImage || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop';
  const heroTitle = data?.heroTitle || 'Vision & Mission';
  const heroSubtitle = data?.heroSubtitle || 'Our guiding principles.';

  const pillars = data?.missionPillars && data.missionPillars.length > 0 
    ? [...data.missionPillars].sort((a, b) => a.displayOrder - b.displayOrder)
    : [
        { title: 'Clinical Excellence', description: 'Providing the highest standard of evidence-based medical care.' },
        { title: 'Patient-Centric Care', description: 'Putting the needs of the patient first in every decision.' },
        { title: 'Innovation', description: 'Embracing technology to improve outcomes.' },
      ];

  const values = data?.coreValues && data.coreValues.length > 0
    ? [...data.coreValues].sort((a, b) => a.displayOrder - b.displayOrder)
    : [
        { title: 'Compassion', description: 'We treat everyone with empathy and kindness.' },
        { title: 'Integrity', description: 'We uphold the highest ethical standards.' },
        { title: 'Excellence', description: 'We strive for continuous improvement.' },
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
            <h2 className={styles.heading}>Our Vision</h2>
            <p className={styles.text}>"{data?.vision || 'To be the most trusted healthcare partner, delivering exceptional outcomes through compassion and innovation.'}"</p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.heading}>Our Mission</h2>
            <p className={styles.text}>"{data?.mission || 'To improve the health and well-being of the communities we serve by providing accessible, high-quality medical care.'}"</p>
            
            <div className={styles.pillarsGrid}>
              {pillars.map((pillar, idx) => (
                <div key={idx} className={styles.pillarItem}>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarDesc}>{(pillar as any).description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card} style={{ background: 'transparent', boxShadow: 'none' }}>
            <h2 className={styles.heading}>Core Values</h2>
            <div className={styles.valuesGrid}>
              {values.map((value, idx) => (
                <div key={idx} className={styles.valueItem}>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDesc}>{(value as any).description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
