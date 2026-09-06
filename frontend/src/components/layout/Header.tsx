'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { CONTACT_INFO } from '@/lib/constants';
import { usePathname, useRouter } from 'next/navigation';
import DiscoverMegaMenu from './DiscoverMegaMenu';
import FindHospitalMegaMenu from './FindHospitalMegaMenu';
import CallbackModal from '../common/CallbackModal';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const discoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const pathname = usePathname();
  const router = useRouter();

  const [hospitalOpen, setHospitalOpen] = useState(false);
  const hospitalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [callDropdownOpen, setCallDropdownOpen] = useState(false);
  const callDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [callbackModalOpen, setCallbackModalOpen] = useState(false);

  const handleDiscoverEnter = () => {
    if (discoverTimeoutRef.current) clearTimeout(discoverTimeoutRef.current);
    setDiscoverOpen(true);
  };

  const handleDiscoverLeave = () => {
    discoverTimeoutRef.current = setTimeout(() => {
      setDiscoverOpen(false);
    }, 150);
  };

  const handleHospitalEnter = () => {
    if (hospitalTimeoutRef.current) clearTimeout(hospitalTimeoutRef.current);
    setHospitalOpen(true);
  };

  const handleHospitalLeave = () => {
    hospitalTimeoutRef.current = setTimeout(() => {
      setHospitalOpen(false);
    }, 150);
  };

  const handleCallEnter = () => {
    if (callDropdownTimeoutRef.current) clearTimeout(callDropdownTimeoutRef.current);
    setCallDropdownOpen(true);
  };

  const handleCallLeave = () => {
    callDropdownTimeoutRef.current = setTimeout(() => {
      setCallDropdownOpen(false);
    }, 200);
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        
        {/* We will move the phone button to the right side */}

        {/* Desktop Navigation */}
        <nav className={styles.mainNav}>
          <div className={styles.navGroup}>
            <div 
              className={styles.navItemWrapper}
              onMouseEnter={handleDiscoverEnter}
              onMouseLeave={handleDiscoverLeave}
            >
              <div className={styles.navItem}>
                DISCOVER MIDTOWN
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
            <div 
              className={styles.navItemWrapper}
              onMouseEnter={handleHospitalEnter}
              onMouseLeave={handleHospitalLeave}
            >
              <div className={styles.navItem}>
                FIND HOSPITAL
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
            <div 
              className={styles.navItem} 
              style={{ cursor: 'pointer' }}
              onClick={() => scrollToSection('meet-our-doctors')}
            >
              DOCTORS
            </div>
          </div>

          {/* Center Logo */}
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image 
                src="https://res.cloudinary.com/dkhyb43ae/image/upload/v1786082805/logo_midtown_ixg9f7.png" 
                alt="Midtown Hospitals Logo" 
                width={280} 
                height={70} 
                priority
                className={styles.logoImage}
              />
            </div>
          </Link>

          <div className={styles.navGroup}>
            <Link href="/news" className={styles.navItem} style={{ textDecoration: 'none' }}>
              RECENT NEWS
            </Link>
            <div 
              className={styles.navItem} 
              style={{ cursor: 'pointer' }}
              onClick={() => scrollToSection('our-services')}
            >
              MEDICAL SERVICES
            </div>
            <div 
              className={styles.navItem}
              style={{ cursor: 'pointer' }}
              onClick={() => scrollToSection('health-library')}
            >
              HEALTH LIBRARY
            </div>
          </div>
        </nav>

        {/* Right Side: Phone Button */}
        <div className={styles.rightUtilities}>
          <div 
            className={styles.callWrapper}
            onMouseEnter={handleCallEnter}
            onMouseLeave={handleCallLeave}
          >
            <div className={styles.iconCircleYellow} aria-label="Phone">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            
            {callDropdownOpen && (
              <div className={styles.callDropdown}>
                <a href={`tel:${CONTACT_INFO.phone}`} className={styles.dropdownItem}>
                  Emergency Call
                </a>
                <button 
                  className={styles.dropdownItem}
                  onClick={() => setCallbackModalOpen(true)}
                >
                  Request Callback
                </button>
              </div>
            )}
          </div>
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
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileNavItem} onClick={() => { setMobileMenuOpen(false); scrollToSection('meet-our-doctors'); }}>DOCTORS</div>
          <Link href="/news" className={styles.mobileNavItem} onClick={() => setMobileMenuOpen(false)}>RECENT NEWS</Link>
          {/* <div className={styles.mobileNavItem} onClick={() => { setMobileMenuOpen(false); scrollToSection('our-services'); }}>MEDICAL SERVICES</div> */}
          <div className={styles.mobileNavItem} onClick={() => { setMobileMenuOpen(false); scrollToSection('health-library'); }}>HEALTH LIBRARY</div>
        </div>
      )}

      {discoverOpen && (
        <div 
          onMouseEnter={handleDiscoverEnter}
          onMouseLeave={handleDiscoverLeave}
        >
          <DiscoverMegaMenu 
            onClose={() => setDiscoverOpen(false)} 
            onRequestCallback={() => {
              setDiscoverOpen(false);
              setCallbackModalOpen(true);
            }}
          />
        </div>
      )}

      {hospitalOpen && (
        <div 
          onMouseEnter={handleHospitalEnter}
          onMouseLeave={handleHospitalLeave}
        >
          <FindHospitalMegaMenu onClose={() => setHospitalOpen(false)} />
        </div>
      )}

      <CallbackModal 
        isOpen={callbackModalOpen} 
        onClose={() => setCallbackModalOpen(false)} 
      />
    </header>
  );
}
