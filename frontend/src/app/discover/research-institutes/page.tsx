'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface ResearchInstitute {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  category?: string;
  location?: string;
  publishedStatus: string;
}

export default function ResearchInstitutesPage() {
  const [institutes, setInstitutes] = useState<ResearchInstitute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/discover/research-institutes');
        if (response && Array.isArray(response)) {
          setInstitutes(response.filter((item: ResearchInstitute) => item.publishedStatus !== 'draft'));
        }
      } catch (err: any) {
        console.error('Failed to load research institutes', err);
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
          <div className={styles.loading}>Loading Research Institutes...</div>
        </main>
        <Footer />
      </>
    );
  }

  const heroImage = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop';
  
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Image
            src={heroImage}
            alt="Research Institutes"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Research Institutes</h1>
            <p className={styles.subtitle}>Pioneering medical breakthroughs and innovations.</p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          <div className={styles.featuresGrid}>
            {institutes.length > 0 ? (
              institutes.map((institute) => (
                <div key={institute._id} className={styles.card} style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                    <Image 
                      src={institute.image || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop'} 
                      alt={institute.title} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 className={styles.heading} style={{ fontSize: '1.5rem', marginBottom: '0.5rem', borderBottom: 'none', paddingBottom: '0' }}>{institute.title}</h3>
                    {institute.category && <p style={{ color: '#f6a118', fontWeight: 600, marginBottom: '1rem', fontSize: '0.9rem' }}>{institute.category}</p>}
                    <p className={styles.text} style={{ flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {institute.description}
                    </p>
                    <Link href={`/discover/research-institutes/${institute.slug}`} className={styles.btnPrimary} style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                      Learn More
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.card} style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                <p className={styles.text}>Information about our research institutes will be available soon.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
