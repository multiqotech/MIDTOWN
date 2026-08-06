'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { NAV_ITEMS } from '@/lib/constants';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo Section */}
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <svg className={styles.logoSvg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 85C50 85 15 55 15 35C15 20 27 10 40 10C46 10 50 15 50 15C50 15 54 10 60 10C73 10 85 20 85 35C85 55 50 85 50 85Z" fill="none" stroke="#00A676" strokeWidth="6" />
              <path d="M20 45 L35 45 L42 25 L58 65 L65 45 L80 45" fill="none" stroke="#E53935" strokeWidth="5" strokeLinejoin="round" />
              <circle cx="50" cy="45" r="8" fill="#0F4C81" />
              <path d="M40 70 Q50 45 60 70" fill="none" stroke="#0F4C81" strokeWidth="4" />
            </svg>
            <div className={styles.logoTextWrapper}>
              <div className={styles.logoTitle}>MIDTOWN</div>
              <div className={styles.logoTagline}>CLINIC | DIAGNOSTIC | PHARMACY</div>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className={styles.navItem}>
                {item.submenu ? (
                  <div className={styles.navLink}>
                    {item.label}
                    <svg className={styles.chevron} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                    <div className={styles.dropdown}>
                      <ul className={styles.dropdownList}>
                        {item.submenu.map((subItem) => (
                          <li key={subItem.label}>
                            <Link href={subItem.href} className={styles.dropdownLink}>
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Desktop */}
        <div className={styles.ctaDesktop}>
          <button className={styles.bookButton}>Book Appointment</button>
        </div>

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

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className={styles.overlay} onClick={() => setMobileMenuOpen(false)}></div>
        )}

        {/* Mobile Sidebar */}
        <div className={`${styles.mobileSidebar} ${mobileMenuOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <div className={styles.logoTitle}>MIDTOWN</div>
            <button className={styles.closeButton} onClick={() => setMobileMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className={styles.mobileNav}>
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className={styles.mobileNavItem}>
                {item.submenu ? (
                  <>
                    <button 
                      className={styles.mobileNavBtn} 
                      onClick={() => toggleSubmenu(item.label)}
                    >
                      {item.label}
                      <svg 
                        className={`${styles.chevron} ${openSubmenu === item.label ? styles.chevronOpen : ''}`} 
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    {openSubmenu === item.label && (
                      <div className={styles.mobileSubmenu}>
                        {item.submenu.map((subItem) => (
                          <Link 
                            key={subItem.label} 
                            href={subItem.href} 
                            className={styles.mobileSubLink}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link 
                    href={item.href} 
                    className={styles.mobileNavLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          <div className={styles.mobileCta}>
            <button className={styles.bookButtonMobile}>Book Appointment</button>
          </div>
        </div>
      </div>
    </header>
  );
}
