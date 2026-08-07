'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

interface NewsItem {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
  imageUrl: string;
  createdAt: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error('Failed to fetch news', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <main>
      <Header />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Recent News & Updates</h1>
          <p className={styles.subtitle}>
            Stay informed with the latest updates, medical breakthroughs, and community news from Midtown Hospitals.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#0d8b9e' }}>Loading latest news...</div>
        ) : (
          <div className={styles.grid}>
            {news.map((item) => (
              <Link href={`/news/${item._id}`} key={item._id} style={{ textDecoration: 'none' }}>
                <div className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <img src={item.imageUrl} alt={item.title} className={styles.image} />
                  </div>
                  
                  <div className={styles.content}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardSubtitle}>{item.subtitle}</p>
                    <p className={styles.description}>
                      {item.description.length > 150 ? item.description.substring(0, 150) + '...' : item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            
            {news.length === 0 && (
              <div className={styles.emptyState}>
                Check back soon for the latest updates and announcements!
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
