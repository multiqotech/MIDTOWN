'use client';

import React from 'react';
import styles from './OurSpecialtiesSection.module.css';

export default function OurSpecialtiesSection() {
  const specialties = [
    {
      id: 1,
      icon: '🩺',
      title: 'Multi-specialty consultations',
      desc: 'across a range of medical disciplines',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      icon: '🔬',
      title: 'Advanced diagnostic and radiology services',
      desc: 'for fast, accurate results',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      icon: '🚑',
      title: '24/7 emergency care',
      desc: 'for urgent and critical needs',
      image: 'https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      icon: '💊',
      title: 'On-site pharmacy',
      desc: 'for convenient access to medications',
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Services &amp; Our Specialties</h2>
        
        <div className={styles.grid2Col}>
          {specialties.map((item) => (
            <div className={styles.card} key={item.id}>
              <div 
                className={styles.cardBackground} 
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <div className={styles.icon}>{item.icon}</div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
