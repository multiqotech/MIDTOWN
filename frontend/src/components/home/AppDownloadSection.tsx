'use client';

import React from 'react';
import styles from './AppDownloadSection.module.css';

export default function AppDownloadSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left Column - Content */}
        <div className={styles.contentColumn}>
          <span className={styles.badge}>DOWNLOAD OUR APP</span>
          <h2 className={styles.heading}>Healthcare at Your Fingertips</h2>
          <p className={styles.description}>
            Download the MIDTOWN app for easy appointment booking, online consultations, health records, and more. Available on iOS and Android.
          </p>
          
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <div className={styles.checkCircle}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span>Book appointments instantly</span>
            </li>
            <li className={styles.featureItem}>
              <div className={styles.checkCircle}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span>Access medical records anytime</span>
            </li>
            <li className={styles.featureItem}>
              <div className={styles.checkCircle}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span>Online consultations with doctors</span>
            </li>
            <li className={styles.featureItem}>
              <div className={styles.checkCircle}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span>Order medicines & lab tests</span>
            </li>
          </ul>

          <div className={styles.storeButtons}>
            <a href="#" className={styles.storeButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M4 2.5C4 2 4.4 1.5 5 1.5C5.2 1.5 5.4 1.6 5.5 1.7L18.4 9C19.2 9.4 19.5 10.3 19.1 11.1C19 11.3 18.8 11.4 18.6 11.5L5.7 18.8C5 19.2 4.1 19 3.7 18.3C3.6 18.1 3.5 17.9 3.5 17.7V3C3.5 2.7 3.7 2.5 4 2.5ZM5.5 3.7V16.8L16.2 10.7L5.5 3.7Z" />
              </svg>
              <div className={styles.storeText}>
                <span className={styles.storeSmall}>GET IT ON</span>
                <span className={styles.storeLarge}>Google Play</span>
              </div>
            </a>
            <a href="#" className={styles.storeButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM13.8 6.4C14.7 6.4 15.6 7 16 7.8C16.1 8 16 8.2 15.8 8.3C14.7 8.9 14.4 10.3 15 11.4C15.4 12.1 16.1 12.5 16.9 12.5C17.1 12.5 17.3 12.7 17.2 12.9C16.6 14.8 14.9 16.1 13 16.1C11.5 16.1 10.3 15.2 9.6 14C9.5 13.9 9.3 13.9 9.2 14C8.5 15.2 7.3 16.1 5.8 16.1C3.9 16.1 2.2 14.8 1.6 12.9C1.5 12.7 1.7 12.5 1.9 12.5C2.7 12.5 3.4 12.1 3.8 11.4C4.4 10.3 4.1 8.9 3 8.3C2.8 8.2 2.7 8 2.8 7.8C3.2 7 4.1 6.4 5 6.4C6 6.4 6.8 6.9 7.4 7.6C7.5 7.7 7.7 7.7 7.8 7.6C8.4 6.9 9.2 6.4 10.2 6.4C11.2 6.4 12 6.9 12.6 7.6C12.7 7.7 12.9 7.7 13 7.6C13.2 7.2 13.5 6.8 13.8 6.4Z" />
              </svg>
              <div className={styles.storeText}>
                <span className={styles.storeSmall}>Download on the</span>
                <span className={styles.storeLarge}>App Store</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column - Phone Mockup */}
        <div className={styles.mockupColumn}>
          <div className={styles.phoneMockup}>
            <div className={styles.phoneScreen}>
              <div className={styles.appLogo}>MIDTOWN</div>
            </div>
          </div>

          <div className={`${styles.floatingCard} ${styles.cardTopRight}`}>
            Appointment Confirmed ✓
          </div>
          <div className={`${styles.floatingCard} ${styles.cardBottomLeft}`}>
            💊 Medicine Delivered
          </div>
        </div>
      </div>
    </section>
  );
}
