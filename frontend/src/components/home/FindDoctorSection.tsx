'use client';

import React from 'react';
import { FEATURED_DOCTORS, SPECIALTIES } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import styles from './FindDoctorSection.module.css';

export default function FindDoctorSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading 
          title="Find a Doctor" 
          subtitle="Connect with our expert physicians" 
        />

        <div className={styles.searchRow}>
          <input 
            type="text" 
            placeholder="Search by doctor name..." 
            className={styles.searchInput}
          />
          <select className={styles.specialtySelect} aria-label="Select Specialty">
            <option value="">All Specialties</option>
            {SPECIALTIES.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <button className={styles.searchBtn}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Search
          </button>
        </div>

        <div className={styles.grid}>
          {FEATURED_DOCTORS.map(doctor => (
            <div key={doctor.id} className={styles.card}>
              <div className={styles.imagePlaceholder}>
                <div className={styles.avatarCircle}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.userIcon}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.name}>{doctor.name}</h3>
                <p className={styles.specialty}>{doctor.specialty}</p>
                <div className={styles.metaRow}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.metaIcon}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className={styles.experience}>{doctor.experience}</span>
                </div>
                <p className={styles.education}>{doctor.education}</p>
                <div className={styles.cardAction}>
                  <Button variant="outline" size="sm" fullWidth href={`/doctors/${doctor.slug}`}>
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewAllWrapper}>
          <Button variant="primary" size="lg" href="/doctors">
            View All Doctors
          </Button>
        </div>
      </div>
    </section>
  );
}
