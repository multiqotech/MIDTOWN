'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface ContentBlock {
  title?: string;
  text: string;
  image?: string;
  displayOrder: number;
}

interface Statistic {
  label: string;
  value: string;
}

interface NursingEducationData {
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: string;
  contentBlocks: ContentBlock[];
  statistics: Statistic[];
}

export default function NursingEducationPage() {
  const [data, setData] = useState<NursingEducationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/discover/nursing-education');
        if (response) {
          response.contentBlocks?.sort((a: ContentBlock, b: ContentBlock) => a.displayOrder - b.displayOrder);
          setData(response);
        }
      } catch (err: any) {
        console.error('Failed to load nursing education data', err);
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
          <div className={styles.loading}>Loading Nursing Education...</div>
        </main>
        <Footer />
      </>
    );
  }

  const heroImage = data?.heroImage || 'https://images.unsplash.com/photo-1584982751601-97d8cb0f66fc?q=80&w=2000&auto=format&fit=crop';
  const heroTitle = data?.heroTitle || 'Nursing Education';
  const heroSubtitle = data?.heroSubtitle || 'Empowering the next generation of compassionate caregivers.';

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
          {data?.statistics && data.statistics.length > 0 && (
            <div className={styles.card}>
              <h2 className={styles.heading}>Our Impact</h2>
              <div className={styles.statsGrid}>
                {data.statistics.map((stat, idx) => (
                  <div key={idx} className={styles.statItem}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data?.contentBlocks && data.contentBlocks.length > 0 ? (
            data.contentBlocks.map((block, idx) => (
              <div key={idx} className={styles.card}>
                {block.title && <h2 className={styles.heading}>{block.title}</h2>}
                <div style={{ display: 'flex', flexDirection: block.image ? (idx % 2 === 0 ? 'row' : 'row-reverse') : 'column', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <p className={styles.text}>{block.text}</p>
                  </div>
                  {block.image && (
                    <div style={{ flex: 1, position: 'relative', width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden' }}>
                      <Image src={block.image} alt={block.title || 'Nursing Education'} fill style={{ objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.card}>
              <p className={styles.text}>Information about our nursing education programs will be available soon.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
