'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from '../page.module.css';
import { api } from '@/lib/api';

export default function EmployeeSpotlightsDetailPage() {
  const params = useParams();
  const id = params.slug; // Assuming dynamic route is [slug]
  
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/discover/employee-spotlights/${id}`);
        setItem(response);
      } catch (err: any) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : item ? (
            <div className={styles.detail}>
              <h1 className={styles.title}>{item.title}</h1>
              
                <p className={styles.meta}>{item.issuerOrRole} | {item.year}</p>
                {item.image && <img src={item.image} alt={item.title} className={styles.detailImage} />}
                <p>{item.description}</p>
                {item.quote && <blockquote>{item.quote}</blockquote>}
              
            </div>
          ) : (
            <div>Not found</div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}