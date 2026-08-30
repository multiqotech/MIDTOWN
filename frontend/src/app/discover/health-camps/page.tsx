'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface Initiative {
  _id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  category?: string;
  location?: string;
  status?: string;
  image?: string;
  publishedStatus: string;
  displayOrder: number;
}

export default function HealthCampsPage() {
  const [items, setItems] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('/api/discover/health-camps');
        const published = response.filter((item: Initiative) => item.publishedStatus !== 'draft');
        published.sort((a: Initiative, b: Initiative) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setItems(published);
      } catch (err: any) {
        console.error('Failed to load health camps data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Image
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop"
            alt="Health Camps"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 50%' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Health Camps</h1>
            <p className={styles.subtitle}>Bringing quality healthcare closer to communities in need.</p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          <div className={styles.introSection}>
            <h2 className={styles.introHeading}>Community Healthcare</h2>
            <p className={styles.introText}>
              At Midtown Hospital, we believe healthcare is a fundamental right. Our regular health camps provide essential screenings, consultations, and treatments to underserved populations, ensuring everyone has access to the care they deserve.
            </p>
          </div>

          {loading ? (
            <div className={styles.loading}>Loading initiatives...</div>
          ) : (
            <div className={styles.grid}>
              {items.map((item: any) => (
                <Link 
                  key={item._id} 
                  href={`/discover/health-camps/${item.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={item.image || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=500&auto=format&fit=crop'}
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      {item.category && <p className={styles.cardCategory}>{item.category}</p>}
                      <p className={styles.cardDescription}>{item.description}</p>
                      <div className={styles.readMore}>
                        Learn More <span>&rarr;</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className={styles.introSection} style={{ marginBottom: 0 }}>
            <div className={styles.linksSection}>
              <Link href="/discover/community-outreach" className={styles.btnSecondary}>Community Outreach</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
