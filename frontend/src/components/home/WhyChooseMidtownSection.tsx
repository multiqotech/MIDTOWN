'use client';

import React from 'react';
import styles from './WhyChooseMidtownSection.module.css';
import { ShieldCheck, HeartPulse, Building2 } from 'lucide-react';

export default function WhyChooseMidtownSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <h2 className={styles.title}>Why Choose <span className={styles.highlight}>Midtown Hospital?</span></h2>
          <p className={styles.description}>
            We believe in delivering world-class healthcare with a human touch. Our integrated approach ensures you receive the best care seamlessly, affordably, and compassionately.
          </p>
        </div>
        
        <div className={styles.rightContent}>
          <div className={styles.timelineLine}>
            <div className={styles.animatedLine}></div>
          </div>
          
          <div className={styles.featuresList}>
            <div className={styles.featureNode}>
              <div className={styles.nodeIconWrapper}>
                <Building2 size={24} className={styles.nodeIcon} />
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>Everything under one roof</h3>
                <p className={styles.featureDesc}>Consultations, diagnostics, pharmacy, and emergency care, all in one place.</p>
              </div>
            </div>
            
            <div className={styles.featureNode}>
              <div className={styles.nodeIconWrapper}>
                <ShieldCheck size={24} className={styles.nodeIcon} />
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>Affordable without compromise</h3>
                <p className={styles.featureDesc}>Quality care shouldn&apos;t come with a premium price tag.</p>
              </div>
            </div>
            
            <div className={styles.featureNode}>
              <div className={styles.nodeIconWrapper}>
                <HeartPulse size={24} className={styles.nodeIcon} />
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>Patient-first, always</h3>
                <p className={styles.featureDesc}>Your comfort and well-being guide everything we do.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
