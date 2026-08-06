'use client';

import React from 'react';
import Image from 'next/image';
import styles from './TestimonialsSection.module.css';

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah M.',
    text: '"The doctors and staff at Midtown Hospital were incredibly supportive during my treatment. Highly recommended!"',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop',
    isVideo: true,
  },
  {
    id: '2',
    name: 'Emily R.',
    text: 'A wonderful experience. The facilities are top notch and the care is very personalized.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop',
    isVideo: true,
  },
  {
    id: '3',
    name: 'David K.',
    text: 'I felt so well taken care of during my entire stay. Thank you Midtown team.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop',
    isVideo: true,
  },
  {
    id: '4',
    name: 'Michael T.',
    text: 'The best hospital in the city. Expert doctors and great technology.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop',
    isVideo: true,
  }
];

export default function TestimonialsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textColumn}>
          <h2 className={styles.title}>Voices of Trust<br/>Our Patients</h2>
          <p className={styles.subtitle}>
            Real stories from our patients about their journey to healing at Midtown Hospital.
          </p>
          <div className={styles.controls}>
            <button className={styles.controlBtn} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className={styles.controlBtn} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className={styles.carouselColumn}>
          <div className={styles.carouselTrack}>
            {TESTIMONIALS.map((t, idx) => (
              <div key={t.id} className={`${styles.testimonialCard} ${idx === 0 ? styles.activeCard : ''}`}>
                <div className={styles.imageWrapper}>
                  <Image src={t.image} alt={t.name} fill style={{ objectFit: 'cover' }} />
                  {t.isVideo && (
                    <div className={styles.playIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  )}
                </div>
                {idx === 0 && (
                  <div className={styles.activeContent}>
                    <div className={styles.stars}>
                      {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                    </div>
                    <h4 className={styles.activeTitle}>Exceptional Care and Support</h4>
                    <p className={styles.activeText}>{t.text}</p>
                    <div className={styles.activeAuthor}>
                      <span>{t.name}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
