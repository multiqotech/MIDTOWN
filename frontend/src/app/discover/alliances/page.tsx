'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface Alliance {
  _id: string;
  partnerName: string;
  slug: string;
  partnerLogo: string;
  description: string;
  category: string;
  websiteUrl: string;
  displayOrder: number;
  publishedStatus: string;
}

export default function AlliancesPage() {
  const [alliances, setAlliances] = useState<Alliance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlliances = async () => {
      try {
        const response = await api.get('/api/discover/alliances');
        const published = response.filter((item: Alliance) => item.publishedStatus === 'published');
        published.sort((a: Alliance, b: Alliance) => a.displayOrder - b.displayOrder);
        setAlliances(published);
      } catch (err: any) {
        console.error('Failed to load alliances data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlliances();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Image
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2000&auto=format&fit=crop"
            alt="Strategic Alliances"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Our Strategic Alliances</h1>
            <p className={styles.subtitle}>Collaborating with global leaders in healthcare, technology, and research.</p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          <div className={styles.introSection}>
            <h2 className={styles.introHeading}>Together, We Achieve More</h2>
            <p className={styles.introText}>
              By partnering with esteemed academic institutions, innovative technology companies, and global health organizations, we continuously push the boundaries of clinical excellence and patient care.
            </p>
          </div>

          {loading ? (
            <div className={styles.loading}>Loading alliances...</div>
          ) : (
            <div className={styles.grid}>
              {alliances.map((alliance) => (
                <div key={alliance._id} className={styles.card}>
                  <div className={styles.logoWrapper}>
                    <Image
                      src={alliance.partnerLogo || 'https://images.unsplash.com/photo-1629904853716-f0cb54ce96ce?q=80&w=500&auto=format&fit=crop'}
                      alt={alliance.partnerName}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <h3 className={styles.cardName}>{alliance.partnerName}</h3>
                  <span className={styles.cardCategory}>{alliance.category}</span>
                  <p className={styles.cardDesc}>{alliance.description}</p>
                  {alliance.websiteUrl && (
                    <a 
                      href={alliance.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.btnPrimary}
                    >
                      Visit Partner
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
