'use client';

import React from 'react';
import styles from './PartnersSection.module.css';

const PARTNERS = [
  'BPJS Kesehatan', 'Allianz', 'avrist', 'AXA', 'Bina Pertiwi',
  'Cigna', 'Manulife', 'Prudential', 'grapiku', 'AIA', 'BCALife'
];

export default function PartnersSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Trusted by Leading Healthcare Partners</h2>
          <p className={styles.subtitle}>Collaborating with trusted partners to deliver the best in health care services</p>
        </div>

        <div className={styles.logoGrid}>
          {PARTNERS.map((partner, index) => (
            <div key={index} className={styles.logoItem}>
              {/* Placeholder for actual logos */}
              <span className={styles.logoText}>{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
