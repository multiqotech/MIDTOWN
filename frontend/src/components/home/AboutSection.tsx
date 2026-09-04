'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './AboutSection.module.css';
import LeadershipCarousel from './LeadershipCarousel';
import { Target, Lightbulb, Users, Stethoscope, ChevronRight } from 'lucide-react';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: 'Personalized Care',
      desc: 'Treatment plans built around you, not a checklist. Our doctors take the time to understand your unique health needs.',
      icon: <Users size={20} />
    },
    {
      title: 'Advanced Tech',
      desc: 'Modern diagnostics for faster, more accurate answers. We invest in the latest medical equipment.',
      icon: <Target size={20} />
    },
    {
      title: 'Expert Team',
      desc: 'Skilled professionals driven by genuine care. Our specialists bring decades of experience.',
      icon: <Stethoscope size={20} />
    }
  ];

  return (
    <section className={styles.section}>
      
      {/* 1. WELCOME SPLIT-SCREEN BLOCK */}
      <div className={styles.container}>
        <div className={styles.welcomeGrid}>
          
          {/* Left: Image Collage */}
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapperMain}>
              <Image 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop"
                alt="Midtown Hospital Exterior"
                fill
                style={{ objectFit: 'cover' }}
                className={styles.mainImage}
              />
            </div>
            <div className={styles.imageWrapperSecondary}>
              <Image 
                src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=500&auto=format&fit=crop"
                alt="Doctors collaborating"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.floatingBadge}>
              <span className={styles.badgeNumber}>20+</span>
              <span className={styles.badgeText}>Years of<br/>Trust</span>
            </div>
          </div>

          {/* Right: Content & Tabs */}
          <div className={styles.contentColumn}>
            <span className={styles.kicker}>Welcome to Midtown Hospital</span>
            <h2 className={styles.title}>Redefining Healthcare with Compassion</h2>
            <p className={styles.description}>
              Midtown Hospital India Pvt. Ltd. was founded on a simple belief: everyone deserves access to excellent medical care, regardless of background. We're committed to giving every patient access to high-quality, affordable medical care — backed by modern facilities and a team that treats you like family.
            </p>
            
            <div className={styles.tabsContainer}>
              <h3 className={styles.subtitle}>What Sets Us Apart</h3>
              <div className={styles.tabHeaders}>
                {tabs.map((tab, index) => (
                  <button 
                    key={index} 
                    className={`${styles.tabBtn} ${activeTab === index ? styles.activeTabBtn : ''}`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
              <div className={styles.tabContent}>
                <div className={styles.tabIcon}>{tabs[activeTab].icon}</div>
                <p>{tabs[activeTab].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. VISION & MISSION PARALLAX BANNER */}
      <div className={styles.parallaxBanner}>
        <div className={styles.parallaxOverlay}></div>
        <div className={styles.container}>
          <div className={styles.parallaxGrid}>
            <div className={styles.parallaxCard}>
              <div className={styles.parallaxIcon}><Lightbulb size={32} /></div>
              <h3 className={styles.parallaxTitle}>Our Vision</h3>
              <p className={styles.parallaxText}>
                To establish 20+ hospitals across India within the next five years — bringing world-class medical care to millions and setting a new benchmark for affordable healthcare.
              </p>
            </div>
            <div className={styles.parallaxCard}>
              <div className={styles.parallaxIcon}><Target size={32} /></div>
              <h3 className={styles.parallaxTitle}>Our Mission</h3>
              <p className={styles.parallaxText}>
                Healthcare is a right, not a privilege. We're working to bring the highest standard of medical care to everyday people, at a cost they can afford, without ever compromising on quality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC LEADERSHIP CAROUSEL */}
      <div className={styles.leadershipSection}>
        <div className={styles.container}>
          <div className={styles.leadershipHeader}>
            <div>
              <span className={styles.kicker}>Our Board</span>
              <h2 className={styles.title}>Leadership Team</h2>
            </div>
            <p className={styles.leadershipDesc}>
              The visionaries and strategists behind Midtown Hospital's commitment to clinical excellence and affordable care.
            </p>
          </div>
          <LeadershipCarousel />
        </div>
      </div>

    </section>
  );
}
