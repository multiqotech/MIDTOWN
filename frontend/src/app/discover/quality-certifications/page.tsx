'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

export default function QualityCertificationsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/discover/quality-certifications')
      .then((result: any) => setItems(Array.isArray(result) ? result : []))
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
          <div className={styles.overlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Quality Certifications</h1>
            <p className={styles.subtitle}>Accreditations and certifications that underscore our commitment to excellence.</p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>No Items Available</h2>
              <p>Content is being prepared. Please check back soon.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {items.map((item: any) => (
                <div key={item._id} className={styles.card}>
                  {item.image && (
                    <div className={styles.cardImage}>
                      <Image src={item.image} alt={item.title || ''} fill style={{ objectFit: 'cover' }} />
                    </div>
                  )}
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.title || item.name}</h3>
                    {(item.category || item.yearOrDate || item.year || item.date || item.issuerOrRole) && (
                      <div className={styles.cardMeta}>
                        {item.category && <span className={styles.tag}>{item.category}</span>}
                        {(item.yearOrDate || item.year || item.date) && <span className={styles.date}>{item.yearOrDate || item.year || item.date}</span>}
                        {item.issuerOrRole && <span className={styles.meta}>{item.issuerOrRole}</span>}
                      </div>
                    )}
                    <p className={styles.cardDesc}>{item.description || item.summary || ''}</p>
                    {item.source && <p className={styles.source}>Source: {item.source}</p>}
                    {(item.fileUrl || item.sourceUrl) && (
                      <a href={item.fileUrl || item.sourceUrl} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                        {item.fileUrl ? 'Download' : 'Read More'} →
                      </a>
                    )}
                    {item.slug && (
                      <Link href={`/discover/quality-certifications/${item.slug}`} className={styles.cardLink}>
                        View Details →
                      </Link>
                    )}
                  </div>
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
