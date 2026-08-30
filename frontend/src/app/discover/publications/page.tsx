import React from 'react';
import styles from './page.module.css';

async function getPublications() {
  try {
    const res = await fetch('http://localhost:5000/api/discover/publications', { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch publications:', error);
    return [];
  }
}

export const metadata = {
  title: 'Publications & Research | Midtown Hospital',
  description: 'Explore our latest academic research and medical publications.',
};

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Research & Publications</h1>
        <p className={styles.subtitle}>
          Discover the latest medical insights, case studies, and research findings from our esteemed healthcare professionals.
        </p>
      </header>

      <div className={styles.grid}>
        {publications.map((pub: any) => (
          <div key={pub._id} className={styles.card}>
            {pub.coverImage && (
              <img src={pub.coverImage} alt={pub.title} className={styles.cover} />
            )}
            <div className={styles.content}>
              <div className={styles.meta}>
                <span className={styles.category}>{pub.category || 'Research'}</span>
                <span className={styles.year}>{pub.yearOrDate}</span>
              </div>
              <h2 className={styles.cardTitle}>{pub.title}</h2>
              {pub.authors && pub.authors.length > 0 && (
                <div className={styles.authors}>By {pub.authors.join(', ')}</div>
              )}
              <p className={styles.summary}>
                {pub.summary?.substring(0, 150)}{pub.summary?.length > 150 ? '...' : ''}
              </p>
              {pub.fileUrl ? (
                <a href={pub.fileUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Read Full Publication
                </a>
              ) : (
                <span style={{ color: '#a0aec0', marginTop: 'auto' }}>File unavailable</span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {publications.length === 0 && (
        <div style={{ textAlign: 'center', color: '#a0aec0', marginTop: '2rem' }}>
          No publications available at the moment.
        </div>
      )}
    </div>
  );
}
