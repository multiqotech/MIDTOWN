'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface ContentBlock { title: string; text: string; image?: string; }
interface Stat { label: string; value: string; }
interface PageData {
  heroTitle: string; heroSubtitle: string; heroImage: string;
  contentBlocks: ContentBlock[]; statistics?: Stat[];
}

export default function ShareholderInfoPage() {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/discover/shareholder-info')
      .then((result: any) => { if (result?.heroTitle) setData(result); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <><Header /><main className={styles.main}><div className={styles.loadingContainer}><div className={styles.spinner} /><p>Loading...</p></div></main><Footer /></>
  );

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          {data?.heroImage && <Image src={data.heroImage} alt={data.heroTitle || 'Shareholder Information'} fill style={{ objectFit: 'cover' }} priority />}
          <div className={styles.overlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{data?.heroTitle || 'Shareholder Information'}</h1>
            <p className={styles.subtitle}>{data?.heroSubtitle || 'Essential information for our valued shareholders and investors.'}</p>
          </div>
        </section>

        {data?.statistics && data.statistics.length > 0 && (
          <section className={styles.statsSection}>
            <div className={styles.statsGrid}>
              {data.statistics.map((stat: Stat, i: number) => (
                <div key={i} className={styles.statCard}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className={styles.contentContainer}>
          {data?.contentBlocks?.map((block: ContentBlock, idx: number) => (
            <div key={idx} className={`${styles.section} ${block.image ? styles.sectionWithImage : ''}`}>
              <div className={styles.textContent}>
                <h2 className={styles.heading}>{block.title}</h2>
                {block.text.split('\n\n').map((p: string, pi: number) => (
                  <p key={pi} className={styles.paragraph}>{p}</p>
                ))}
              </div>
              {block.image && (
                <div className={styles.imageWrapper}>
                  <Image src={block.image} alt={block.title} fill style={{ objectFit: 'cover' }} />
                </div>
              )}
            </div>
          ))}

          {(!data?.contentBlocks || data.contentBlocks.length === 0) && (
            <div className={styles.emptyState}>
              <h2>Content Coming Soon</h2>
              <p>This section is currently being updated. Please check back later.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
