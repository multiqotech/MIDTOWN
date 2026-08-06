'use client';

import React from 'react';
import Image from 'next/image';
import { HERO_SLIDES } from '@/lib/constants';
import Carousel from '@/components/ui/Carousel';
import Button from '@/components/ui/Button';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <Carousel autoPlay interval={5000} showDots showArrows className={styles.carousel}>
        {HERO_SLIDES.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className={styles.bgImage}
              style={{ objectFit: 'cover' }}
              priority={index === 0}
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <h1 className={styles.title}>{slide.title}</h1>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              <div className={styles.ctaWrapper}>
                <Button variant="secondary" size="lg" href={slide.ctaLink}>
                  {slide.ctaText}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div className={styles.appointmentFormWrapper}>
        <div className={styles.appointmentForm}>
          <select className={styles.select} aria-label="Specialty">
            <option value="">Select Specialty</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="orthopedics">Orthopedics</option>
          </select>
          <select className={styles.select} aria-label="Location">
            <option value="">Select Location</option>
            <option value="main">Main Campus</option>
            <option value="north">North Clinic</option>
          </select>
          <input type="date" className={styles.select} aria-label="Preferred Date" />
          <button className={styles.searchBtn}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
