import React from 'react';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

async function getFellowship(slug: string) {
  try {
    const res = await fetch('http://localhost:5000/api/discover/fellowships', { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const fellowships = await res.json();
    return fellowships.find((f: any) => f.slug === slug);
  } catch (error) {
    console.error('Failed to fetch fellowship:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const fellowship = await getFellowship(params.slug);
  if (!fellowship) return { title: 'Not Found' };
  return {
    title: `${fellowship.title} | Midtown Hospital Fellowships`,
    description: fellowship.description?.substring(0, 160),
  };
}

export default async function FellowshipDetail({ params }: { params: { slug: string } }) {
  const fellowship = await getFellowship(params.slug);

  if (!fellowship) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <span className={styles.category}>{fellowship.category || 'Program'}</span>
        <h1 className={styles.title}>{fellowship.title}</h1>
      </div>

      {fellowship.image && (
        <img src={fellowship.image} alt={fellowship.title} className={styles.image} />
      )}

      <div className={styles.metaGrid}>
        {fellowship.status && (
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Status</span>
            <span className={styles.metaValue}>{fellowship.status}</span>
          </div>
        )}
        {fellowship.durationOrDate && (
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Duration</span>
            <span className={styles.metaValue}>{fellowship.durationOrDate}</span>
          </div>
        )}
        {fellowship.location && (
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Location</span>
            <span className={styles.metaValue}>{fellowship.location}</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <div className={styles.text}>{fellowship.description}</div>
        </div>

        {fellowship.eligibility && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Eligibility</h2>
            <div className={styles.text}>{fellowship.eligibility}</div>
          </div>
        )}

        {fellowship.contactInfo && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            <div className={styles.text}>{fellowship.contactInfo}</div>
          </div>
        )}
      </div>
    </div>
  );
}
