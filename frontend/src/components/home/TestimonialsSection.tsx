'use client';
import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './TestimonialsSection.module.css';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!TESTIMONIALS || TESTIMONIALS.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  if (!TESTIMONIALS || TESTIMONIALS.length === 0) return null;

  const current = TESTIMONIALS[currentIndex];
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading 
          title="Patient Stories" 
          subtitle="Hear from those who trusted us with their care" 
        />
        
        <div className={styles.carouselContainer}>
          <div className={styles.testimonialCard} key={current.id}>
            <div className={styles.quoteIcon}>"</div>
            <p className={styles.quoteText}>{current.quote}</p>
            
            <div className={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg 
                  key={star} 
                  className={`${styles.star} ${star <= current.rating ? styles.starFilled : styles.starEmpty}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            <div className={styles.divider}></div>
            
            <div className={styles.patientInfo}>
              <div className={styles.avatar}>
                {getInitials(current.name)}
              </div>
              <h4 className={styles.patientName}>{current.name}</h4>
              <p className={styles.patientCondition}>{current.condition}</p>
            </div>
          </div>
          
          <div className={styles.dotsContainer}>
            {TESTIMONIALS.map((_, index) => (
              <button 
                key={index} 
                className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
