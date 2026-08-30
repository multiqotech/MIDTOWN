'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface Policy {
  _id?: string;
  title: string;
  summary: string;
  yearOrDate?: string;
}

export default function PoliciesGuidelinesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const data = await api.get('/api/discover/policies-guidelines');
        setPolicies(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  if (loading) return <div className={styles.loading}>Loading Policies & Guidelines...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Policies & Guidelines</h1>
        <p className={styles.subtitle}>
          Explore the fundamental principles and rules that govern our operations and decision-making.
        </p>
      </header>
      
      <main className={styles.grid}>
        {policies.length > 0 ? (
          policies.map((policy, idx) => (
            <div key={policy._id || idx} className={styles.card}>
              <h2 className={styles.cardTitle}>{policy.title}</h2>
              <div className={styles.cardContent}>
                <p>{policy.summary}</p>
                {policy.yearOrDate && (
                  <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#64ffda' }}>
                    Effective Date: {policy.yearOrDate}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.subtitle}>No policies available at the moment.</p>
        )}
      </main>
    </div>
  );
}
