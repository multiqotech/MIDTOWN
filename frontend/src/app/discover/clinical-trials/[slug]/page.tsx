import React from 'react';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

async function getClinicalTrial(slug: string) {
  try {
    const res = await fetch('http://localhost:5000/api/discover/clinical-trials', { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const trials = await res.json();
    return trials.find((t: any) => t.slug === slug);
  } catch (error) {
    console.error('Failed to fetch clinical trial:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const trial = await getClinicalTrial(params.slug);
  if (!trial) return { title: 'Not Found' };
  return {
    title: `${trial.title} | Midtown Hospital Clinical Trials`,
    description: trial.description?.substring(0, 160),
  };
}

export default async function ClinicalTrialDetail({ params }: { params: { slug: string } }) {
  const trial = await getClinicalTrial(params.slug);

  if (!trial) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <span className={styles.category}>{trial.category || 'Research'}</span>
        <h1 className={styles.title}>{trial.title}</h1>
      </div>

      {trial.image && (
        <img src={trial.image} alt={trial.title} className={styles.image} />
      )}

      <div className={styles.metaGrid}>
        {trial.status && (
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Status</span>
            <span className={styles.metaValue}>{trial.status}</span>
          </div>
        )}
        {trial.durationOrDate && (
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Duration</span>
            <span className={styles.metaValue}>{trial.durationOrDate}</span>
          </div>
        )}
        {trial.location && (
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Location</span>
            <span className={styles.metaValue}>{trial.location}</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <div className={styles.text}>{trial.description}</div>
        </div>

        {trial.eligibility && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Eligibility</h2>
            <div className={styles.text}>{trial.eligibility}</div>
          </div>
        )}

        {trial.contactInfo && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            <div className={styles.text}>{trial.contactInfo}</div>
          </div>
        )}
      </div>
    </div>
  );
}
