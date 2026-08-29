'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface Award {
  _id: string;
  awardName: string;
  awardingOrganization: string;
  year: string;
  category: string;
  description: string;
  certificateImage: string;
  displayOrder: number;
  publishedStatus: string;
}

export default function AwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await api.get('/api/discover/awards');
        const published = response.filter((item: Award) => item.publishedStatus === 'published');
        published.sort((a: Award, b: Award) => a.displayOrder - b.displayOrder);
        setAwards(published);
      } catch (err) {
        console.error('Failed to load awards data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAwards();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Image
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2000&auto=format&fit=crop"
            alt="Awards & Accolades"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Awards & Accolades</h1>
            <p className={styles.subtitle}>Recognized for our unwavering commitment to clinical excellence.</p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          {loading ? (
            <div className={styles.loading}>Loading awards...</div>
          ) : (
            <div className={styles.grid}>
              {awards.map((award) => (
                <div key={award._id} className={styles.card}>
                  <div className={styles.awardIconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
                  </div>
                  <h3 className={styles.cardName}>{award.awardName}</h3>
                  <div className={styles.cardOrg}>{award.awardingOrganization}</div>
                  <div>
                    <span className={styles.cardYear}>{award.year}</span>
                    <span className={styles.cardYear} style={{ marginLeft: '10px', background: '#f8fafc', color: '#94a3b8' }}>{award.category}</span>
                  </div>
                  <p className={styles.cardDesc}>{award.description}</p>
                  
                  {award.certificateImage && (
                    <div className={styles.imageWrapper}>
                      <Image
                        src={award.certificateImage}
                        alt={`${award.awardName} Certificate`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
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
