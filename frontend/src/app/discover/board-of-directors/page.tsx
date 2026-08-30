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

export default function BoardOfDirectorsPage() {
  const [board, setBoard] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await api.get('/api/discover/board-of-directors');
        const published = response.filter((item: Leader) => item.publishedStatus === 'published');
        published.sort((a: Leader, b: Leader) => a.displayOrder - b.displayOrder);
        setBoard(published);
      } catch (err: any) {
        console.error('Failed to load board data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
            alt="Board of Directors"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Board of Directors</h1>
            <p className={styles.subtitle}>Guiding Midtown Hospital with strategic vision, responsible governance, and a commitment to sustainable healthcare excellence.</p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          <div className={styles.introSection}>
            <h2 className={styles.introHeading}>Governance at Midtown</h2>
            <p className={styles.introText}>
              Our Board of Directors represents a diverse assembly of industry leaders, medical pioneers, and financial experts. Together, they provide the ethical oversight, financial stewardship, and strategic direction required to sustain our legacy of clinical excellence.
            </p>
          </div>

          {loading ? (
            <div className={styles.loading}>Loading board members...</div>
          ) : (
            <div className={styles.grid}>
              {board.map((member) => (
                <Link 
                  key={member._id} 
                  href={`/discover/board-of-directors/${member.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={member.profileImage || 'https://images.unsplash.com/photo-1537368910025-702800faa86b?q=80&w=500&auto=format&fit=crop'}
                        alt={member.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardName}>{member.name}</h3>
                      <p className={styles.cardDesignation}>{member.designation}</p>
                      <p className={styles.cardBio}>{member.shortBiography}</p>
                      <div className={styles.readMore}>
                        View Profile <span>&rarr;</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className={styles.introSection} style={{ marginBottom: 0 }}>
            <h2 className={styles.introHeading}>Our Governance Philosophy</h2>
            <div className={styles.governanceGrid}>
              <div className={styles.govCard}>
                <h3 className={styles.govTitle}>Ethical Responsibility</h3>
                <p className={styles.govDesc}>Upholding the highest moral standards in every decision, ensuring patient trust is never compromised.</p>
              </div>
              <div className={styles.govCard}>
                <h3 className={styles.govTitle}>Financial Stewardship</h3>
                <p className={styles.govDesc}>Ensuring sustainable growth and responsible allocation of resources to reinvest in advanced medical care.</p>
              </div>
              <div className={styles.govCard}>
                <h3 className={styles.govTitle}>Patient-Centric Growth</h3>
                <p className={styles.govDesc}>Aligning all strategic expansions and institutional changes with the primary goal of improving patient outcomes.</p>
              </div>
            </div>
            
            <div className={styles.linksSection}>
              <Link href="/discover/executive-team" className={styles.btnSecondary}>Meet the Executive Team</Link>
              <Link href="/discover/medical-council" className={styles.btnSecondary}>Meet the Medical Council</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
