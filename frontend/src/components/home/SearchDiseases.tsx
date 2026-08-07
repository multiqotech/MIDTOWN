'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './SearchDiseases.module.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function SearchDiseases() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  return (
    <section id="health-library" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.imageCard}>
            <Image
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop"
              alt="Scientist looking through microscope"
              fill
              className={styles.image}
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.imageOverlay}>
              <h3 className={styles.imageTitle}>Personalized Care. Transformed</h3>
              <p className={styles.imageSubtitle}>Learn how we tailor treatments</p>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <h2 className={styles.title}>Search diseases & conditions</h2>
          <p className={styles.subtitle}>Find diseases & conditions by first letter</p>

          <div className={styles.alphabetGrid}>
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                className={`${styles.letterBtn} ${activeLetter === letter ? styles.active : ''}`}
                onClick={() => setActiveLetter(letter)}
              >
                {letter}
              </button>
            ))}
          </div>

          <div className={styles.searchContainer}>
            <label htmlFor="disease-search" className={styles.searchLabel}>
              Search Diseases & Conditions
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="disease-search"
                type="text"
                placeholder="Search diseases..."
                className={styles.searchInput}
              />
              <button className={styles.searchButton} aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
