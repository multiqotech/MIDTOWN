'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
}

export default function CommunityOutreachDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [item, setItem] = useState<Initiative | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      if (!slug) return;
      try {
        const response = await api.get('/api/discover/community-outreach');
        const found = response.find((i: Initiative) => i.slug === slug && i.publishedStatus !== 'draft');
        setItem(found || null);
      } catch (err: any) {
        console.error('Failed to load detail', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.loading}>Loading details...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!item) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.notFound}>
            <h1>Initiative Not Found</h1>
            <p>The community outreach initiative you are looking for does not exist or has been removed.</p>
            <Link href="/discover/community-outreach" className={styles.backBtn}>
              Back to Community Outreach
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
        <section className={styles.hero}>
          <div className={styles.heroImageWrapper}>
            <Image
              src={item.image || 'https://images.unsplash.com/photo-1593113562632-f5de9ebc9053?q=80&w=2000&auto=format&fit=crop'}
              alt={item.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className={styles.overlay}></div>
          </div>
          
          <div className={styles.heroContent}>
            <Link href="/discover/community-outreach" className={styles.backLink}>
              &larr; Back to Community Outreach
            </Link>
            <h1 className={styles.title}>{item.title}</h1>
            {item.category && <p className={styles.category}>{item.category}</p>}
          </div>
        </section>

        <div className={styles.contentContainer}>
          <div className={styles.detailsCard}>
            <div className={styles.metaInfo}>
              {item.status && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Status</span>
                  <span className={styles.metaValue}>{item.status}</span>
                </div>
              )}
              {item.location && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Location</span>
                  <span className={styles.metaValue}>{item.location}</span>
                </div>
              )}
            </div>

            <div className={styles.description}>
              <h2>About this Initiative</h2>
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
