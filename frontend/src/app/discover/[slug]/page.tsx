'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './DiscoverPage.module.css';
import { api } from '@/lib/api';

interface ContentBlock {
  title: string;
  text: string;
  image?: string;
}

interface Stat {
  label: string;
  value: string;
}

interface PageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  contentBlocks: ContentBlock[];
  statistics?: Stat[];
}

export default function DiscoverPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState('');
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    params.then(p => {
      setSlug(p.slug);
      api.get(`/api/discover/${p.slug}`)
        .then((result: any) => {
          if (result && result.heroTitle) {
            setData(result);
          } else {
            setNotFound(true);
          }
        })
        .catch(() => setNotFound(true))
        .finally(() => setLoading(false));
    });
  }, [params]);

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !data) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.notFound}>
            <h1>Page Not Found</h1>
            <p>The section you are looking for does not exist or has been moved.</p>
            <Link href="/" className={styles.btnPrimary}>Return Home</Link>
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
        {/* Hero Section */}
        <section className={styles.hero}>
          {data.heroImage && (
            <Image
              src={data.heroImage}
              alt={data.heroTitle}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          )}
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{data.heroTitle}</h1>
            <p className={styles.subtitle}>{data.heroSubtitle}</p>
          </div>
        </section>

        {/* Statistics */}
        {data.statistics && data.statistics.length > 0 && (
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

        {/* Content Sections */}
        <div className={styles.contentContainer}>
          {data.contentBlocks.map((section: ContentBlock, idx: number) => (
            <div
              key={idx}
              className={`${styles.section} ${section.image ? styles.sectionWithImage : ''}`}
            >
              <div className={styles.textContent}>
                <h2 className={styles.heading}>{section.title}</h2>
                {section.text.split('\n\n').map((paragraph: string, pIdx: number) => (
                  <p key={pIdx} className={styles.paragraph}>{paragraph}</p>
                ))}
              </div>

              {section.image && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
