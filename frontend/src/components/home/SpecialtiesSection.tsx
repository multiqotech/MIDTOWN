'use client';

import React from 'react';
import Link from 'next/link';
import { SPECIALTIES } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import styles from './SpecialtiesSection.module.css';

export default function SpecialtiesSection() {
  const displaySpecialties = SPECIALTIES.slice(0, 8);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading 
          title="Our Specialties" 
          subtitle="Comprehensive medical care across 50+ specialties"
          centered={true}
        />
        
        <div className={styles.grid}>
          {displaySpecialties.map((specialty) => (
            <Link href={`/specialties/${specialty.slug}`} key={specialty.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{specialty.icon}</span>
              </div>
              <h3 className={styles.name}>{specialty.name}</h3>
              <p className={styles.description}>{specialty.description}</p>
              <div className={styles.badge}>
                {specialty.doctorCount} Doctors
              </div>
            </Link>
          ))}
        </div>
        
        <div className={styles.actionWrapper}>
          <Button variant="outline" href="/specialties">
            View All Specialties
          </Button>
        </div>
      </div>
    </section>
  );
}
