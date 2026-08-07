'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './TestimonialsSection.module.css';
import { api } from '../../lib/api';

interface Testimonial {
  _id: string;
  name: string;
  text: string;
  rating: number;
  image: string;
  isVideo: boolean;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await api.get('/api/testimonials');
        setTestimonials(data);
      } catch (err) {
        console.error('Failed to fetch testimonials', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return <section className={styles.section}><div className={styles.container}>Loading testimonials...</div></section>;
  }

  if (testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleModalNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleModalPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Create an array that shifts elements so activeIndex is always at the start for the carousel view
  const visibleTestimonials = [
    ...testimonials.slice(activeIndex),
    ...testimonials.slice(0, activeIndex)
  ];

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.textColumn}>
            <h2 className={styles.title}>Voices of Trust<br/>Our Patients</h2>
            <p className={styles.subtitle}>
              Real stories from our patients about their journey to healing at Midtown Hospital.
            </p>
            <div className={styles.controls}>
              <button className={styles.controlBtn} aria-label="Previous" onClick={handlePrev}>
                <ChevronLeft size={20} />
              </button>
              <button className={styles.controlBtn} aria-label="Next" onClick={handleNext}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className={styles.carouselColumn}>
            <div className={styles.carouselTrack}>
              {visibleTestimonials.map((t, idx) => (
                <div 
                  key={t._id} 
                  className={`${styles.testimonialCard} ${idx === 0 ? styles.activeCard : ''}`}
                  onClick={() => openModal((activeIndex + idx) % testimonials.length)}
                >
                  <div className={styles.imageWrapper}>
                    <Image src={t.image} alt={t.name} fill style={{ objectFit: 'cover' }} />
                    {/* t.isVideo && (
                      <div className={styles.playIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    ) */}
                  </div>
                  {idx === 0 && (
                    <div className={styles.activeContent}>
                      <div className={styles.stars}>
                        {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                      </div>
                      <h4 className={styles.activeTitle}>Patient Experience</h4>
                      <p className={styles.activeText}>"{t.text}"</p>
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

      {/* Popup Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeModal} aria-label="Close">
              <X size={24} />
            </button>
            
            <div className={styles.modalInner}>
              <button className={styles.modalNavBtn} onClick={handleModalPrev} aria-label="Previous">
                <ChevronLeft size={32} />
              </button>
              
              <div className={styles.modalCard}>
                <div className={styles.modalImageWrapper}>
                  <Image 
                    src={testimonials[modalIndex].image} 
                    alt={testimonials[modalIndex].name} 
                    fill 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
                <div className={styles.modalTextContent}>
                  <div className={styles.stars} style={{ fontSize: '1.25rem' }}>
                    {'★'.repeat(testimonials[modalIndex].rating)}
                    {'☆'.repeat(5 - testimonials[modalIndex].rating)}
                  </div>
                  <h3 className={styles.modalAuthor}>{testimonials[modalIndex].name}</h3>
                  <p className={styles.modalText}>"{testimonials[modalIndex].text}"</p>
                </div>
              </div>

              <button className={styles.modalNavBtn} onClick={handleModalNext} aria-label="Next">
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
