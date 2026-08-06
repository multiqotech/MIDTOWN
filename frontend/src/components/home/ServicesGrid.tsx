'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ServicesGrid.module.css';

const SERVICES = [
  { id: '1', name: 'Emergency Department', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop' },
  { id: '2', name: 'Hyperbaric Oxygen Therapy', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop' },
  { id: '3', name: 'Internal Medicine Specialist', image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=600&auto=format&fit=crop' },
  { id: '4', name: 'Pediatric Specialist', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=600&auto=format&fit=crop' },
  { id: '5', name: 'Obstetrics & Gynecology', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop' },
  { id: '6', name: 'Wound Care Clinic', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop' },
  { id: '7', name: 'General Polyclinic', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop' },
  { id: '8', name: 'Dental Polyclinic', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop' },
  { id: '9', name: 'Inpatient', image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=600&auto=format&fit=crop' },
  { id: '10', name: 'Delivery Room', image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=600&auto=format&fit=crop' },
  { id: '11', name: 'Pharmacy', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=600&auto=format&fit=crop' },
  { id: '12', name: 'Laboratory', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop' },
  { id: '13', name: 'Radiology', image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=600&auto=format&fit=crop' },
  { id: '14', name: 'Marine Ambulance', image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad8169?q=80&w=600&auto=format&fit=crop' },
  { id: '15', name: 'Morgue', image: 'https://images.unsplash.com/photo-1519494140681-8b17d76b8b6d?q=80&w=600&auto=format&fit=crop' }
];

export default function ServicesGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Services</h2>
          <p className={styles.subtitle}>
            MIDTOWN Hospital can handle various health problems with the support of the best and most trusted medical services
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <div key={service.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className={styles.overlay}></div>
              </div>
              <h3 className={styles.cardTitle}>{service.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
