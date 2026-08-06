'use client';
import React from 'react';
import { STATS } from '@/lib/constants';
import CounterAnimation from '@/components/ui/CounterAnimation';
import styles from './StatsSection.module.css';

export default function StatsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        {STATS.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <CounterAnimation end={stat.number} suffix={stat.suffix} label={stat.label} />
            {index < STATS.length - 1 && <div className={styles.separator}></div>}
          </div>
        ))}
      </div>
    </section>
  );
}
