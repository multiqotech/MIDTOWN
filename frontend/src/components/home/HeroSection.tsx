'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1920&auto=format&fit=crop');

  useEffect(() => {
    fetch('http://localhost:5000/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.heroImageUrl) {
          setHeroImage(data.heroImageUrl);
        }
      })
      .catch(err => console.error('Failed to fetch settings:', err));
  }, []);

  return (
    <section className={styles.heroSection}>
      <Image
        src={heroImage}
        alt="Doctor consulting with patient"
        fill
        className={styles.backgroundImage}
        priority
      />
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Where Healing<br />
            Feels Like <span className={styles.highlight}>Home</span>
          </h1>
          <p className={styles.subtitle}>
            Start your journey to better health. Find the right doctor and specialty below.
          </p>
          
          <div className={styles.searchBar}>
            <div className={styles.searchSelect}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span>Doctor</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div className={styles.divider}></div>
            <input 
              type="text" 
              placeholder="Search doctor name..." 
              className={styles.searchInput}
            />
            <button className={styles.searchBtn}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
