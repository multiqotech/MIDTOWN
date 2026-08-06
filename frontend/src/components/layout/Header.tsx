'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { CONTACT_INFO } from '@/lib/constants';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        
        {/* Left Side: Contact & Utilities */}
        <div className={styles.leftUtilities}>
          <a href={`tel:${CONTACT_INFO.phone}`} className={styles.iconCircleYellow} aria-label="Phone">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
          <button className={styles.iconCircleOrange} aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          
          <div className={styles.emergency}>
            <div className={styles.sirenIcon}>
               <span className={styles.sirenTop}></span>
               <span className={styles.sirenBase}></span>
            </div>
            <span>{CONTACT_INFO.emergency}</span>
          </div>
          
          <div className={styles.languageSelect}>
            <span>EN</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.mainNav}>
          <div className={styles.navGroup}>
            <div className={styles.navItem}>
              DISCOVER MIDTOWN
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div className={styles.navItem}>
              FIND HOSPITAL
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>

          {/* Center Logo */}
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              {/* White silhouette of the logo for dark background */}
              <svg className={styles.logoSvg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 85C50 85 15 55 15 35C15 20 27 10 40 10C46 10 50 15 50 15C50 15 54 10 60 10C73 10 85 20 85 35C85 55 50 85 50 85Z" fill="white" />
                <path d="M20 45 L35 45 L42 25 L58 65 L65 45 L80 45" fill="none" stroke="#222" strokeWidth="5" strokeLinejoin="round" />
                <circle cx="50" cy="45" r="8" fill="#222" />
              </svg>
              <div className={styles.logoTextWrapper}>
                <div className={styles.logoTitle}>MIDTOWN</div>
                <div className={styles.logoTagline}>HOSPITALS</div>
              </div>
            </div>
          </Link>

          <div className={styles.navGroup}>
            <div className={styles.navItem}>
              MEDICAL SERVICES
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div className={styles.navItem}>
              HEALTH LIBRARY
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ''}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
