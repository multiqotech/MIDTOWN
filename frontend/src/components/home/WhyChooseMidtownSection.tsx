'use client';

import React from 'react';
import styles from './WhyChooseMidtownSection.module.css';
import { CheckCircle2 } from 'lucide-react';

export default function WhyChooseMidtownSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Why Choose Midtown Hospital?</h2>
        
        <div className={styles.featuresList}>
          <div className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <CheckCircle2 size={28} color="#059669" />
            </div>
            <div>
              <h3 className={styles.featureTitle}>Everything under one roof</h3>
              <p className={styles.featureDesc}>consultations, diagnostics, pharmacy, and emergency care, all in one place.</p>
            </div>
          </div>
          
          <div className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <CheckCircle2 size={28} color="#059669" />
            </div>
            <div>
              <h3 className={styles.featureTitle}>Affordable without compromise</h3>
              <p className={styles.featureDesc}>quality care shouldn&apos;t come with a premium price tag.</p>
            </div>
          </div>
          
          <div className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <CheckCircle2 size={28} color="#059669" />
            </div>
            <div>
              <h3 className={styles.featureTitle}>Patient-first, always</h3>
              <p className={styles.featureDesc}>your comfort and well-being guide everything we do.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
