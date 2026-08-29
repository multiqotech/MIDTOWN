'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface Leader {
  _id: string;
  name: string;
  slug: string;
  profileImage: string;
  designation: string;
  shortBiography: string;
  displayOrder: number;
  publishedStatus: string;
}

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await api.get('/api/discover/leadership');
        // Filter out drafts
        const published = response.filter((item: Leader) => item.publishedStatus === 'published');
        // Sort by display order
        published.sort((a: Leader, b: Leader) => a.displayOrder - b.displayOrder);
        setLeaders(published);
      } catch (err) {
        console.error('Failed to load leadership data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop"
            alt="Our Leadership"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Our Leadership</h1>
            <p className={styles.subtitle}>Guided by vision, driven by compassion.</p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          <div className={styles.introSection}>
            <h2 className={styles.introHeading}>Leadership Philosophy</h2>
            <p className={styles.introText}>
              At Midtown Hospital, our leadership team is committed to fostering an environment of clinical excellence, innovation, and unwavering patient-centric care. Together, we guide the organization towards achieving our mission of improving lives.
            </p>
          </div>

          {loading ? (
            <div className={styles.loading}>Loading leadership team...</div>
          ) : (
            <div className={styles.grid}>
              {leaders.map((leader) => (
                <Link 
                  key={leader._id} 
                  href={`/discover/our-leadership/${leader.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={leader.profileImage || 'https://images.unsplash.com/photo-1537368910025-702800faa86b?q=80&w=500&auto=format&fit=crop'}
                        alt={leader.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardName}>{leader.name}</h3>
                      <p className={styles.cardDesignation}>{leader.designation}</p>
                      <p className={styles.cardBio}>{leader.shortBiography}</p>
                      <div className={styles.readMore}>
                        Read Profile <span>&rarr;</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
