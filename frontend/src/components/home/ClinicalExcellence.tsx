'use client';

import React from 'react';
import Link from 'next/link';
import styles from './ClinicalExcellence.module.css';

const SPECIALTIES = [
  { id: '1', name: 'Cardiac Care', desc: 'Heart health treatments', icon: <HeartIcon /> },
  { id: '2', name: 'Dentistry', desc: 'Dental Care Solutions', icon: <ToothIcon /> },
  { id: '3', name: 'Endocrinology', desc: 'Thyroid health care', icon: <DropIcon /> },
  { id: '4', name: 'Neurology', desc: 'Brain and nerve care', icon: <BrainIcon /> },
  { id: '5', name: 'Orthopedics', desc: 'Bone and joint care', icon: <BoneIcon /> },
  { id: '6', name: 'Liver Care', desc: 'Liver health and transplant care', icon: <StomachIcon /> },
  { id: '7', name: 'Renal Care', desc: 'Kidney health treatment', icon: <KidneyIcon /> },
  { id: '8', name: 'Gynecology', desc: 'Gynecological Care Solutions', icon: <FemaleIcon /> },
  { id: '9', name: 'Pediatric Care', desc: 'Child health services', icon: <BabyIcon /> },
];

export default function ClinicalExcellence() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>An Ecosystem for Clinical Excellence</h2>
          <p className={styles.subtitle}>
            Discover world-class healthcare with Midtown's specialized centers of medical innovation. Our advanced facilities offer unmatched expertise in key specialties and super specialties, setting new global standards in clinical excellence and patient care.
          </p>
        </div>

        <div className={styles.grid}>
          {SPECIALTIES.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{item.name}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buttonWrapper}>
          <Link href="/specialties" className={styles.viewAllButton}>
            View All Specialties
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Basic placeholder icons
function HeartIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>; }
function ToothIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z"></path><path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z"></path></svg>; }
function DropIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>; }
function BrainIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>; }
function BoneIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 10c.7-.7 1.4-1.4 2.1-2.1a3 3 0 1 0-4.2-4.2L12.8 5.8"></path><path d="M7 14c-.7.7-1.4 1.4-2.1 2.1a3 3 0 1 0 4.2 4.2L11.2 18.2"></path><path d="M17 14c.7.7 1.4 1.4 2.1 2.1a3 3 0 1 1-4.2 4.2L12.8 18.2"></path><path d="M7 10c-.7-.7-1.4-1.4-2.1-2.1a3 3 0 1 1 4.2-4.2L11.2 5.8"></path><path d="m14 10-4 4"></path></svg>; }
function StomachIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>; }
function KidneyIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.8 4A6.3 8.7 0 0 1 20 9"></path><path d="M9 9h.01"></path><path d="M4 10a6 6 0 0 0 9 5c4 0 7-3 7-7s-3-7-7-7c-2.4 0-4.6 1.4-5.6 3.5"></path></svg>; }
function FemaleIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="5"></circle><path d="M12 13v9"></path><path d="M9 18h6"></path></svg>; }
function BabyIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="5"></circle><path d="M12 13v9"></path><path d="M8 17h8"></path></svg>; }
