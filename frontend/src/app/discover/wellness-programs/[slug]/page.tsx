'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';

export default function WellnessProgramsDetailPage({ params }: { params: { slug: string } }) {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/discover/wellness-programs/${params.slug}`);
        if (!response.ok) throw new Error('Failed to fetch item');
        const result = await response.json();
        setItem(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [params.slug]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!item) return <div className={styles.error}>Not found</div>;

  return (
    <div className={styles.detailContainer}>
      <Link href="/discover/wellness-programs" className={styles.backLink}>&larr; Back to Wellness Programs</Link>
      <h1 className={styles.title}>{item.title}</h1>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: item.content }} />
    </div>
  );
}
