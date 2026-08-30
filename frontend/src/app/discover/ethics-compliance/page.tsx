'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { api } from '@/lib/api';
import Image from 'next/image';

interface ContentBlock {
  _id?: string;
  title: string;
  text: string;
  image?: string;
}

interface DiscoverPageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  contentBlocks: ContentBlock[];
}

export default function EthicsCompliancePage() {
  const [data, setData] = useState<DiscoverPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/discover/ethics-compliance');
        setData(response);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className={styles.loading}>Loading Ethics & Compliance...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!data) return <div className={styles.error}>No data found</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{data.heroTitle}</h1>
        <p className={styles.subtitle}>
          {data.heroSubtitle}
        </p>
      </header>
      
      {data.heroImage && (
        <div style={{ width: '100%', maxWidth: '1200px', height: '400px', position: 'relative', margin: '0 auto 4rem', borderRadius: '16px', overflow: 'hidden' }}>
          <Image src={data.heroImage} alt={data.heroTitle} fill style={{ objectFit: 'cover' }} />
        </div>
      )}
      
      <main className={styles.grid}>
        {data.contentBlocks && data.contentBlocks.length > 0 ? (
          data.contentBlocks.map((block, idx) => (
            <div key={block._id || idx} className={styles.card}>
              <h2 className={styles.cardTitle}>{block.title}</h2>
              <div className={styles.cardContent}>
                <p>{block.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.subtitle}>No ethics information available.</p>
        )}
      </main>
    </div>
  );
}
