'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '../../../lib/api';

interface NewsItem {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
  imageUrl: string;
  createdAt: string;
}

export default function SingleNewsPage() {
  const params = useParams();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    
    const fetchNewsItem = async () => {
      try {
        const data = await api.get(`/api/news/${params.id}`);
        setNewsItem(data);
      } catch (err) {
        console.error('Failed to fetch news item', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [params.id]);

  return (
    <main>
      <Header />
      
      <div className={styles.container}>
        <div className={styles.backLinkWrapper}>
          <Link href="/news" className={styles.backLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to News
          </Link>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading article...</div>
        ) : error || !newsItem ? (
          <div className={styles.error}>
            Sorry, we couldn't find that article. It may have been removed.
          </div>
        ) : (
          <div className={styles.contentWrapper}>
            <div className={styles.imageSection}>
              <img src={newsItem.imageUrl} alt={newsItem.title} className={styles.image} />
            </div>
            
            <div className={styles.detailsSection}>
              <h1 className={styles.title}>{newsItem.title}</h1>
              <h2 className={styles.subtitle}>{newsItem.subtitle}</h2>
              
              <div className={styles.description}>
                {newsItem.description.split('\n').map((paragraph, idx) => (
                  <p key={idx} style={{ marginBottom: '1rem' }}>{paragraph}</p>
                ))}
              </div>
              
              {newsItem.keyPoints && newsItem.keyPoints.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <h3 className={styles.keyPointsTitle}>Key Highlights</h3>
                  <ul className={styles.keyPoints}>
                    {newsItem.keyPoints.map((point, idx) => (
                      <li key={idx} className={styles.keyPoint}>
                        <span className={styles.keyPointIcon}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
