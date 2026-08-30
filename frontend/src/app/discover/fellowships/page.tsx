import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

async function getFellowships() {
  try {
    const res = await fetch('http://localhost:5000/api/discover/fellowships', { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch fellowships:', error);
    return [];
  }
}

export const metadata = {
  title: 'Fellowships & Training | Midtown Hospital',
  description: 'Explore our medical fellowship programs designed for the next generation of healthcare leaders.',
};

export default async function FellowshipsPage() {
  const fellowships = await getFellowships();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Fellowships</h1>
        <p className={styles.subtitle}>
          Elevate your medical career with our specialized fellowship programs, guided by world-renowned experts and utilizing state-of-the-art facilities.
        </p>
      </header>

      <div className={styles.grid}>
        {fellowships.map((fellowship: any) => (
          <Link href={`/discover/fellowships/${fellowship.slug}`} key={fellowship._id} className={styles.card}>
            {fellowship.image && (
              <img src={fellowship.image} alt={fellowship.title} className={styles.cardImage} />
            )}
            <div className={styles.cardContent}>
              <span className={styles.category}>{fellowship.category || 'Program'}</span>
              <h2 className={styles.cardTitle}>{fellowship.title}</h2>
              <p className={styles.cardDesc}>
                {fellowship.description?.substring(0, 150)}{fellowship.description?.length > 150 ? '...' : ''}
              </p>
              <span className={styles.readMore}>Learn More →</span>
            </div>
          </Link>
        ))}
      </div>
      
      {fellowships.length === 0 && (
        <div style={{ textAlign: 'center', color: '#a0aec0', marginTop: '2rem' }}>
          No fellowships available at the moment.
        </div>
      )}
    </div>
  );
}
