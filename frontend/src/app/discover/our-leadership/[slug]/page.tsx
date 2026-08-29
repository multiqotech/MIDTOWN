'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
  fullBiography: string;
  education: string[];
  experience: string[];
  achievements: string[];
  leadershipMessage: string;
}

export default function LeadershipProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [leader, setLeader] = useState<Leader | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeader = async () => {
      try {
        const response = await api.get('/api/discover/leadership');
        const found = response.find((item: Leader) => item.slug === slug);
        setLeader(found || null);
      } catch (err) {
        console.error('Failed to load leadership profile', err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchLeader();
    }
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.loading}>Loading Profile...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!leader) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.notFound}>
            <h1>Profile Not Found</h1>
            <p>The leadership profile you are looking for does not exist.</p>
            <Link href="/discover/our-leadership" className={styles.btnPrimary}>
              Back to Leadership
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.profileHero}>
          <div className={styles.heroContent}>
            <div className={styles.imageWrapper}>
              <Image
                src={leader.profileImage || 'https://images.unsplash.com/photo-1537368910025-702800faa86b?q=80&w=500&auto=format&fit=crop'}
                alt={leader.name}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div className={styles.textContent}>
              <h1 className={styles.name}>{leader.name}</h1>
              <h2 className={styles.designation}>{leader.designation}</h2>
              {leader.leadershipMessage && (
                <div className={styles.message}>
                  "{leader.leadershipMessage}"
                </div>
              )}
            </div>
          </div>
        </section>

        <div className={styles.detailsContainer}>
          <div className={styles.bioSection}>
            <h2 className={styles.heading}>Biography</h2>
            <div className={styles.text}>
              {leader.fullBiography || leader.shortBiography || 'No biography available.'}
            </div>
          </div>

          <div className={styles.sidebar}>
            {leader.education && leader.education.length > 0 && (
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarHeading}>Education</h3>
                <ul className={styles.list}>
                  {leader.education.map((edu, idx) => (
                    <li key={idx} className={styles.listItem}>{edu}</li>
                  ))}
                </ul>
              </div>
            )}

            {leader.experience && leader.experience.length > 0 && (
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarHeading}>Experience</h3>
                <ul className={styles.list}>
                  {leader.experience.map((exp, idx) => (
                    <li key={idx} className={styles.listItem}>{exp}</li>
                  ))}
                </ul>
              </div>
            )}

            {leader.achievements && leader.achievements.length > 0 && (
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarHeading}>Achievements</h3>
                <ul className={styles.list}>
                  {leader.achievements.map((achieve, idx) => (
                    <li key={idx} className={styles.listItem}>{achieve}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
