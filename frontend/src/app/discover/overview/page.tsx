'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface OverviewData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  introduction: string;
  whoWeAreContent: string;
  statistics: { label: string; value: string }[];
  features: { title: string; description: string }[];
  specialtyHighlights: { name: string; description: string }[];
  ctaText: string;
  ctaLink: string;
}

export default function OverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/discover/overview');
        setData(response);
      } catch (err: any) {
        console.error('Failed to load overview data', err);
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
          <div className={styles.loading}>Loading Overview...</div>
        </main>
        <Footer />
      </>
    );
  }

  // Fallback data if CMS is empty
  const heroImage = data?.heroImage || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop';
  const heroTitle = data?.heroTitle || 'Midtown Overview';
  const heroSubtitle = data?.heroSubtitle || 'Discover our commitment to excellence.';

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
            <h2 className={styles.heading}>Introduction</h2>
            <p className={styles.text}>{data?.introduction || 'Welcome to Midtown Hospital.'}</p>
            
            {data?.statistics && data.statistics.length > 0 && (
              <div className={styles.statsGrid}>
                {data.statistics.map((stat, idx) => (
                  <div key={idx} className={styles.statItem}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.card}>
            <h2 className={styles.heading}>Who We Are</h2>
            <p className={styles.text}>{data?.whoWeAreContent || 'We are a premier healthcare provider.'}</p>
            
            {data?.features && data.features.length > 0 && (
              <div className={styles.featuresGrid}>
                {data.features.map((feature, idx) => (
                  <div key={idx} className={styles.featureItem}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDesc}>{feature.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {data?.ctaText && (
            <div className={styles.ctaSection}>
              <h2 className={styles.ctaText}>{data.ctaText}</h2>
              <Link href={data.ctaLink || '/'} className={styles.btnPrimary}>
                Discover More
              </Link>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
