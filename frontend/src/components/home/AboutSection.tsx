'use client';

import React from 'react';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.welcomeBlock}>
          <h2 className={styles.title}>Welcome to Midtown Hospital</h2>
          <p className={styles.description}>
            Welcome to Midtown Hospital, where healthcare goes beyond treatment to genuinely improve lives. As a rapidly growing hospital chain, we&apos;re committed to giving every patient access to high-quality, affordable medical care — backed by modern facilities and a team that treats you like family.
          </p>
          <div className={styles.features}>
            <h3 className={styles.subtitle}>What Sets Us Apart</h3>
            <ul className={styles.featureList}>
              <li><strong>Personalized Care</strong> — Treatment plans built around you, not a checklist.</li>
              <li><strong>Advanced Technology</strong> — Modern diagnostics for faster, more accurate answers.</li>
              <li><strong>Expert Team</strong> — Skilled professionals driven by genuine care.</li>
            </ul>
          </div>
        </div>

        <div className={styles.aboutBlock}>
          <h2 className={styles.title}>About Us</h2>
          <h3 className={styles.subtitle}>Redefining Healthcare with Compassion and Innovation</h3>
          <p className={styles.description}>
            Midtown Hospital India Pvt. Ltd. was founded on a simple belief: everyone deserves access to excellent medical care, regardless of background. We&apos;re building a growing network of hospitals across India, driven by innovation, efficiency, and empathy at every step.
          </p>
        </div>

        <div className={styles.grid2Col}>
          <div className={styles.card}>
            <h3 className={styles.subtitle}>Our Vision</h3>
            <p>
              To establish 20+ hospitals across India within the next five years — bringing world-class medical care to millions and setting a new benchmark for affordable healthcare.
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.subtitle}>Our Mission</h3>
            <p>
              Healthcare is a right, not a privilege. We&apos;re working to bring the highest standard of medical care to everyday people, at a cost they can afford, without ever compromising on quality.
            </p>
          </div>
        </div>

        <div className={styles.leadershipBlock}>
          <h2 className={styles.title}>Leadership</h2>
          <div className={styles.grid2Col}>
            <div className={styles.leaderCard}>
              <h4 className={styles.leaderName}>Mr. Sanjay Kumar Soni</h4>
              <span className={styles.leaderRole}>Managing Director</span>
              <p>A visionary leader driving Midtown Hospital&apos;s mission to make high-quality healthcare genuinely affordable, bridging the gap between advanced medical services and accessibility.</p>
            </div>
            <div className={styles.leaderCard}>
              <h4 className={styles.leaderName}>Mr. Sachin Kumar Soni</h4>
              <span className={styles.leaderRole}>Director</span>
              <p>The strategist behind Midtown Hospital&apos;s growth, ensuring every new project stays true to the company&apos;s commitment to excellence and accessibility.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
