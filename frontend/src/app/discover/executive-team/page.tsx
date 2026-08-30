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
  department: string;
  shortBiography: string;
  displayOrder: number;
  publishedStatus: string;
}

export default function ExecutiveTeamPage() {
  const [executives, setExecutives] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const response = await api.get('/api/discover/executive-team');
        const published = response.filter((item: Leader) => item.publishedStatus === 'published');
        published.sort((a: Leader, b: Leader) => a.displayOrder - b.displayOrder);
        setExecutives(published);
      } catch (err: any) {
        console.error('Failed to load executive team data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExecutives();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Image
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2000&auto=format&fit=crop"
            alt="Executive Team"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Executive Team</h1>
            <p className={styles.subtitle}>The leaders working together to transform strategy into exceptional healthcare experiences.</p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          <div className={styles.introSection}>
            <h2 className={styles.introHeading}>Operational Excellence</h2>
            <p className={styles.introText}>
              Our Executive Team ensures the seamless day-to-day running of Midtown Hospital. By fostering innovation, optimizing operations, and prioritizing a culture of compassionate care, they translate our grand vision into tangible, life-saving outcomes every single day.
            </p>
          </div>

          {loading ? (
            <div className={styles.loading}>Loading executive team...</div>
          ) : (
            <div className={styles.grid}>
              {executives.map((member) => (
                <Link 
                  key={member._id} 
                  href={`/discover/executive-team/${member.slug}`}
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
                      {member.department && <p className={styles.cardDepartment}>{member.department}</p>}
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
            <h2 className={styles.introHeading}>Leadership Areas</h2>
            <div className={styles.areasGrid}>
              <div className={styles.areaCard}>Clinical Excellence</div>
              <div className={styles.areaCard}>Operations</div>
              <div className={styles.areaCard}>Patient Experience</div>
              <div className={styles.areaCard}>Technology & Innovation</div>
              <div className={styles.areaCard}>People & Culture</div>
              <div className={styles.areaCard}>Strategy & Growth</div>
            </div>
            
            <div className={styles.linksSection}>
              <Link href="/discover/board-of-directors" className={styles.btnSecondary}>Meet the Board of Directors</Link>
              <Link href="/discover/careers" className={styles.btnSecondary}>Careers at Midtown</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
