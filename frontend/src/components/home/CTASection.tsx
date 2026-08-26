'use client';

import React from 'react';
import styles from './CTASection.module.css';

export default function CTASection() {
  return (
    <section className={styles.section}>
      {/* Decorative Elements */}
      <div className={styles.shape1}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="4" opacity="0.1" strokeDasharray="10 10" />
        </svg>
      </div>
      <div className={styles.shape2}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M40 10 V70 M10 40 H70" stroke="white" strokeWidth="8" strokeLinecap="round" opacity="0.1" />
        </svg>
      </div>
      <div className={styles.shape3}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M30 5 V55 M5 30 H55" stroke="white" strokeWidth="6" strokeLinecap="round" opacity="0.1" />
        </svg>
      </div>
      <div className={styles.shape4}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="50" stroke="white" strokeWidth="2" opacity="0.1" />
        </svg>
      </div>

      <div className={styles.container}>
        <h2 className={styles.heading}>Ready to experience healthcare that puts you first?</h2>
        
        <div className={styles.buttonRow}>
          <a href="#contact" className={styles.btnPrimary}>
            Contact Us Today
          </a>
        </div>
      </div>
    </section>
  );
}
