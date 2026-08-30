import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { notFound } from 'next/navigation';

async function getClinicalTrials() {
  try {
    const res = await fetch('http://localhost:5000/api/discover/clinical-trials', { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch clinical trials:', error);
    return [];
  }
}

export const metadata = {
  title: 'Clinical Trials | Midtown Hospital',
  description: 'Explore ongoing clinical trials and research initiatives at Midtown Hospital.',
};

export default async function ClinicalTrialsPage() {
  const trials = await getClinicalTrials();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Clinical Trials</h1>
        <p className={styles.subtitle}>
          Advancing medicine through groundbreaking research and clinical studies. Participate in the future of healthcare.
        </p>
      </header>

      <div className={styles.grid}>
        {trials.map((trial: any) => (
          <Link href={`/discover/clinical-trials/${trial.slug}`} key={trial._id} className={styles.card}>
            {trial.image && (
              <img src={trial.image} alt={trial.title} className={styles.cardImage} />
            )}
            <div className={styles.cardContent}>
              <span className={styles.category}>{trial.category || 'Research'}</span>
              <h2 className={styles.cardTitle}>{trial.title}</h2>
              <p className={styles.cardDesc}>
                {trial.description?.substring(0, 150)}{trial.description?.length > 150 ? '...' : ''}
              </p>
              <span className={styles.readMore}>Learn More →</span>
            </div>
          </Link>
        ))}
      </div>
      
      {trials.length === 0 && (
        <div style={{ textAlign: 'center', color: '#a0aec0', marginTop: '2rem' }}>
          No clinical trials available at the moment.
        </div>
      )}
    </div>
  );
}
