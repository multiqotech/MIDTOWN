'use client';

import React from 'react';
import styles from './LocationsSection.module.css';
import { MapPin } from 'lucide-react';

export default function LocationsSection() {
  return (
    <section id="locations" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Locations</h2>
        
        <div className={styles.grid2Col}>
          <div className={styles.locationCard}>
            <div className={styles.iconWrapper}>
              <MapPin size={24} color="#059669" />
            </div>
            <h3 className={styles.locationTitle}>Kanpur, Uttar Pradesh</h3>
            <span className={styles.statusOpen}>Now Open</span>
            <p className={styles.description}>
              Our fully operational Polyclinic and Diagnostic Centre and Pharmacy spans 1,500 sq. ft., offering a full range of diagnostic and outpatient services backed by modern equipment and experienced professionals.
            </p>
          </div>

          <div className={styles.locationCard}>
            <div className={styles.iconWrapper}>
              <MapPin size={24} color="#059669" />
            </div>
            <h3 className={styles.locationTitle}>Siliguri, West Bengal</h3>
            <span className={styles.statusSoon}>Opening Soon</span>
            <p className={styles.description}>
              A modern Out-Patient Department (OPD) and Diagnostic Centre spread across 4,000 sq. ft., featuring 20+ OPD facilities, a well-stocked pharmacy, advanced radiology, emergency care, and specialized dental services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
