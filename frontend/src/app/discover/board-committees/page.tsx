'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface Committee {
  _id?: string;
  title: string;
  description: string;
  members?: string[];
}

export default function BoardCommitteesPage() {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommittees = async () => {
      try {
        const data = await api.get('/api/discover/board-committees');
        setCommittees(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCommittees();
  }, []);

  if (loading) return <div className={styles.loading}>Loading Board Committees...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Board Committees</h1>
        <p className={styles.subtitle}>
          Discover the committees that guide our corporate governance and ensure transparency and accountability.
        </p>
      </header>
      
      <main className={styles.grid}>
        {committees.length > 0 ? (
          committees.map((committee, idx) => (
            <div key={committee._id || idx} className={styles.card}>
              <h2 className={styles.cardTitle}>{committee.title}</h2>
              <div className={styles.cardContent}>
                <p>{committee.description}</p>
                {committee.members && committee.members.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    <strong style={{ color: '#ccd6f6' }}>Members:</strong>
                    <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                      {committee.members.map((member, i) => (
                        <li key={i}>{member}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.subtitle}>No committees information available.</p>
        )}
      </main>
    </div>
  );
}
