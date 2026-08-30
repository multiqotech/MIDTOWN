'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface Milestone {
  _id: string;
  yearOrDate: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  displayOrder: number;
  publishedStatus: string;
}

export default function AchievementsPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await api.get('/api/discover/milestones');
        const published = response.filter((item: Milestone) => item.publishedStatus === 'published');
        // Sort by display order or year
        published.sort((a: Milestone, b: Milestone) => a.displayOrder - b.displayOrder);
        setMilestones(published);
      } catch (err: any) {
        console.error('Failed to load milestones data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMilestones();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Image
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2000&auto=format&fit=crop"
            alt="Achievements & Milestones"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Achievements & Milestones</h1>
            <p className={styles.subtitle}>A legacy of healthcare innovation and excellence.</p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          <div className={styles.card}>
            <h2 className={styles.heading}>Our Journey</h2>
            <p className={styles.text}>
              Since our founding, Midtown Hospital has continuously evolved to meet the healthcare needs of our community. Explore our key milestones, historic moments, and clinical achievements.
            </p>
            
            {loading ? (
              <div className={styles.loading}>Loading timeline...</div>
            ) : (
              <div className={styles.timeline}>
                {milestones.map((milestone, idx) => (
                  <div key={milestone._id} className={`${styles.timelineItem} ${idx % 2 === 0 ? styles.left : styles.right}`}>
                    <div className={styles.timelineContent}>
                      <span className={styles.timeLabel}>{milestone.yearOrDate}</span>
                      <h3 className={styles.stepTitle}>{milestone.title}</h3>
                      <span className={styles.category}>{milestone.category}</span>
                      <p className={styles.stepDesc}>{milestone.description}</p>
                      
                      {milestone.image && (
                        <div className={styles.imageWrapper}>
                          <Image 
                            src={milestone.image} 
                            alt={milestone.title} 
                            fill 
                            style={{ objectFit: 'cover' }} 
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
