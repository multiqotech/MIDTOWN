'use client';
import React from 'react';
import styles from './ValueProposition.module.css';
import { HeartPulse, ShieldCheck, Clock, Users } from 'lucide-react';

export default function ValueProposition() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>The Midtown Promise</h2>
          <p className={styles.subtitle}>
            We combine world-class medical expertise with a compassionate approach, ensuring every patient receives the best possible care.
          </p>
        </div>
        
        <div className={styles.bentoGrid}>
          {/* Card 1 */}
          <div className={`${styles.card} ${styles.card1}`}>
            <div className={styles.bgIcon}>
              <HeartPulse size={160} />
            </div>
            <div className={styles.content}>
              <div className={styles.iconWrapper}>
                <HeartPulse size={32} color="#60a5fa" />
              </div>
              <h3 className={styles.cardTitle}>Compassionate Care</h3>
              <p className={styles.cardText}>
                Healing starts with empathy. Our staff is trained to listen, understand, and provide care that prioritizes your comfort and emotional well-being.
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className={`${styles.card} ${styles.card2}`}>
            <div className={styles.bgIcon}>
              <ShieldCheck size={160} />
            </div>
            <div className={styles.content}>
              <div className={styles.iconWrapper}>
                <ShieldCheck size={32} color="#60a5fa" />
              </div>
              <h3 className={styles.cardTitle}>Clinical Excellence</h3>
              <p className={styles.cardText}>
                We adhere to the highest international standards of medical safety and protocols, minimizing risks and maximizing positive health outcomes.
              </p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className={`${styles.card} ${styles.card3}`}>
            <div className={styles.bgIcon}>
              <Clock size={160} />
            </div>
            <div className={styles.content}>
              <div className={styles.iconWrapper}>
                <Clock size={32} color="#60a5fa" />
              </div>
              <h3 className={styles.cardTitle}>24/7 Availability</h3>
              <p className={styles.cardText}>
                Emergencies don&apos;t wait for business hours. Our dedicated emergency response team and critical care units operate round the clock.
              </p>
            </div>
          </div>
          
          {/* Card 4 */}
          <div className={`${styles.card} ${styles.card4}`}>
            <div className={styles.bgIcon}>
              <Users size={160} />
            </div>
            <div className={styles.content}>
              <div className={styles.iconWrapper}>
                <Users size={32} color="#60a5fa" />
              </div>
              <h3 className={styles.cardTitle}>Multidisciplinary Approach</h3>
              <p className={styles.cardText}>
                Our specialists collaborate across departments, ensuring that complex conditions are treated with a holistic, team-based strategy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
