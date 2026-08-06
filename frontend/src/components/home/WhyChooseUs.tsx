'use client';

import React from 'react';
import Image from 'next/image';
import styles from './WhyChooseUs.module.css';

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose <span className={styles.highlight}>Midtown Hospital?</span></h2>
          <p className={styles.subtitle}>
            At Midtown Hospital, we combine expert medical care with compassion, offering personalized treatments to ensure every patient feels supported and valued throughout their healing journey.
          </p>
        </div>

        <div className={styles.bentoGrid}>
          {/* Main Large Card */}
          <div className={`${styles.bentoCard} ${styles.cardLarge}`}>
            <Image
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop"
              alt="Hospital Building"
              fill
              className={styles.cardImage}
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.cardOverlay}>
              <h3 className={styles.cardTitle}>60+ Years of Excellence</h3>
              <p className={styles.cardDesc}>Decades of medical care prioritizing your health and well-being.</p>
            </div>
          </div>

          {/* Top Left Small */}
          <div className={`${styles.bentoCard} ${styles.cardSmall} ${styles.bgDarkBlue}`}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>1000+ Expert Medical Care</h3>
              <p className={styles.cardDesc}>A team of professionals committed to your health and well-being.</p>
            </div>
            <div className={styles.cardBottomImage}>
              <Image src="https://images.unsplash.com/photo-1537368910025-702800faa86b?q=80&w=500&auto=format&fit=crop" alt="Doctors" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>

          {/* Top Right Small */}
          <div className={`${styles.bentoCard} ${styles.cardSmall} ${styles.bgTeal}`}>
             <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Advanced Medical Technology</h3>
              <p className={styles.cardDesc}>Modern technology for accurate diagnostics and effective treatments.</p>
            </div>
            <div className={styles.cardBottomImage}>
              <Image src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=500&auto=format&fit=crop" alt="Technology" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>

          {/* Bottom Left Small */}
          <div className={`${styles.bentoCard} ${styles.cardSmall} ${styles.bgTeal}`}>
             <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>98% Happy Patients</h3>
              <p className={styles.cardDesc}>We prioritize delivering a positive experience for every patient.</p>
            </div>
            <div className={styles.cardBottomImage}>
              <Image src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=500&auto=format&fit=crop" alt="Happy Patient" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>

          {/* Bottom Right Small */}
          <div className={`${styles.bentoCard} ${styles.cardSmall} ${styles.bgDarkBlue}`}>
             <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>40+ Years Trusted Pharmacy</h3>
              <p className={styles.cardDesc}>We trusted pharmacy solutions delivering quality care and reliability.</p>
            </div>
            <div className={styles.cardBottomImage}>
              <Image src="https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=500&auto=format&fit=crop" alt="Pharmacy" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
