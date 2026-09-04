'use client';
import React from 'react';
import styles from './ValueProposition.module.css';
import { HeartPulse, ShieldCheck, Clock, Users } from 'lucide-react';

const PROMISES = [
  {
    icon: HeartPulse,
    title: 'Compassionate Care',
    text: 'Healing starts with empathy. Our staff is trained to listen, understand, and provide care that prioritizes your comfort and emotional well-being.',
    accent: '#00A676',
  },
  {
    icon: ShieldCheck,
    title: 'Clinical Excellence',
    text: 'We adhere to the highest international standards of medical safety and protocols, minimizing risks and maximizing positive health outcomes.',
    accent: '#0F4C81',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    text: 'Emergencies don\'t wait for business hours. Our dedicated emergency response team and critical care units operate round the clock.',
    accent: '#D97706',
  },
  {
    icon: Users,
    title: 'Multidisciplinary Approach',
    text: 'Our specialists collaborate across departments, ensuring that complex conditions are treated with a holistic, team-based strategy.',
    accent: '#7C3AED',
  },
];

export default function ValueProposition() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.kicker}>Why Midtown?</span>
          <h2 className={styles.title}>The Midtown Promise</h2>
          <p className={styles.subtitle}>
            We combine world-class medical expertise with a compassionate approach, ensuring every patient receives the best possible care.
          </p>
        </div>

        <div className={styles.grid}>
          {PROMISES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={styles.card}>
                <div className={styles.accentBar} style={{ background: item.accent }} />
                <div className={styles.iconCircle} style={{ background: `${item.accent}15`, color: item.accent }}>
                  <Icon size={28} />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
