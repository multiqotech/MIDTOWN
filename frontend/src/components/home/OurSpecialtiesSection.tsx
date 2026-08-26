'use client';

import React from 'react';
import styles from './OurSpecialtiesSection.module.css';

export default function OurSpecialtiesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Services &amp; Our Specialties</h2>
        
        <div className={styles.grid2Col}>
          <div className={styles.card}>
            <div className={styles.icon}>🩺</div>
            <h3 className={styles.cardTitle}>Multi-specialty consultations</h3>
            <p className={styles.cardDesc}>across a range of medical disciplines</p>
          </div>
          
          <div className={styles.card}>
            <div className={styles.icon}>🔬</div>
            <h3 className={styles.cardTitle}>Advanced diagnostic and radiology services</h3>
            <p className={styles.cardDesc}>for fast, accurate results</p>
          </div>
          
          <div className={styles.card}>
            <div className={styles.icon}>🚑</div>
            <h3 className={styles.cardTitle}>24/7 emergency care</h3>
            <p className={styles.cardDesc}>for urgent and critical needs</p>
          </div>
          
          <div className={styles.card}>
            <div className={styles.icon}>💊</div>
            <h3 className={styles.cardTitle}>On-site pharmacy</h3>
            <p className={styles.cardDesc}>for convenient access to medications</p>
          </div>
        </div>
      </div>
    </section>
  );
}
