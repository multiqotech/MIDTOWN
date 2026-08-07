'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ExpertDoctors.module.css';
import { api } from '../../lib/api';

interface Doctor {
  _id: string;
  name: string;
  specialist: string;
  qualification: string;
  imageUrl: string;
}

export default function ExpertDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await api.get('/api/doctors');
        // Show up to 4 doctors on the home page
        setDoctors(data.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <section id="meet-our-doctors" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <span className={styles.label}>| OUR DOCTOR TEAM</span>
            <h2 className={styles.title}>Meet our expert doctors</h2>
          </div>
          <Link href="/doctors" className={styles.viewAll}>
            View Full Team ↗
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>Loading doctors...</div>
        ) : (
          <div className={styles.grid}>
            {doctors.map((doctor) => (
              <Link key={doctor._id} href={`/doctors/${doctor._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      fill
                      className={styles.image}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardName}>{doctor.name}</h3>
                    <p className={styles.cardSpecialty}>{doctor.specialist}</p>
                    <p className={styles.cardQualification}>{doctor.qualification}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
