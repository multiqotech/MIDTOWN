'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ExpertDoctors.module.css';

const DOCTORS = [
  { id: '1', name: 'Dr. Fiona Wood', specialty: 'Cardiology', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop' },
  { id: '2', name: 'Dr. Fiona Wood', specialty: 'Dentist', image: 'https://images.unsplash.com/photo-1594824432258-f7b579048a1c?q=80&w=400&auto=format&fit=crop' },
  { id: '3', name: 'Dr. Fiona Wood', specialty: 'Pediatrician', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop' },
  { id: '4', name: 'Dr. Charlie Teo', specialty: 'Cardiology', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop' }, // Using a generic doctor image as placeholder
];

export default function ExpertDoctors() {
  return (
    <section className={styles.section}>
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

        <div className={styles.grid}>
          {DOCTORS.map((doctor) => (
            <div key={doctor.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className={styles.image}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardName}>{doctor.name}</h3>
                <p className={styles.cardSpecialty}>{doctor.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
