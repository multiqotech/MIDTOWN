'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './HeroSection.module.css';
import { api } from '../../lib/api';
import { Search, User, AlertCircle, Star, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import CallbackModal from '../common/CallbackModal';
import CounterAnimation from '../ui/CounterAnimation';

interface Doctor {
  _id: string;
  name: string;
  specialist: string;
  qualification: string;
  imageUrl: string;
}

export default function HeroSection() {
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1920&auto=format&fit=crop');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch hero image
    api.get('/api/settings')
      .then(data => {
        if (data.heroImageUrl) {
          setHeroImage(data.heroImageUrl);
        }
      })
      .catch(err => console.error('Failed to fetch settings:', err));
      
    // Fetch doctors for search
    api.get('/api/doctors')
      .then(data => {
        setDoctors(data);
      })
      .catch(err => console.error('Failed to fetch doctors:', err));
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search logic
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setFilteredDoctors([]);
      setShowDropdown(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Find matching doctors (by name or specialty)
    const matchingDocs = doctors.filter(d => 
      d.name.toLowerCase().includes(query) ||
      d.specialist.toLowerCase().includes(query)
    );

    setFilteredDoctors(matchingDocs.slice(0, 4)); // Show top 4 doctors
    setShowDropdown(true);

  }, [searchQuery, doctors]);

  const handlePopularClick = (specialty: string) => {
    setSearchQuery(specialty);
  };

  return (
    <section className={styles.heroSection}>
      <Image
        src={heroImage}
        alt="Doctor consulting with patient"
        fill
        className={styles.backgroundImage}
        priority
      />
      
      {/* Dark Gradient Overlay */}
      <div className={styles.darkOverlay}></div>
      
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          
          {/* LEFT COLUMN */}
          <div className={styles.leftColumn}>
            <div className={styles.badgeWrapper}>
              <span className={styles.badgeText}>Excellence in Healthcare</span>
            </div>
            
            <h1 className={styles.title}>
              Midtown Hospital:<br />
              Where Care Meets <span className={styles.highlight}>Excellence</span>
            </h1>
            
            <p className={styles.subtitle}>
              Compassionate, affordable healthcare — closer to home.
            </p>
            
            <div className={styles.searchContainer} ref={searchRef}>
              <div className={styles.searchBar}>
                <div className={styles.searchIconWrapper}>
                  <Search size={20} color="#00A676" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search doctor name or specialty..." 
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.length >= 2) setShowDropdown(true);
                  }}
                />
              </div>

              {/* Dropdown Results */}
              {showDropdown && (searchQuery.length >= 2) && (
                <div className={styles.dropdown}>
                  {filteredDoctors.length === 0 ? (
                    <div className={styles.noResults}>
                      <AlertCircle size={18} color="#666" />
                      <p>No doctors found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    <>
                      {/* Doctors Section */}
                      {filteredDoctors.length > 0 && (
                        <div className={styles.resultSection}>
                          <div className={styles.sectionTitle}>
                            <User size={16} />
                            <span>Doctors & Specialists</span>
                          </div>
                          {filteredDoctors.map(doctor => (
                            <Link 
                              key={doctor._id} 
                              href={`/doctors/${doctor._id}`}
                              className={styles.resultItem}
                              onClick={() => setShowDropdown(false)}
                              style={{ textDecoration: 'none' }}
                            >
                              <img src={doctor.imageUrl} alt={doctor.name} className={styles.doctorAvatar} />
                              <div>
                                <div className={styles.resultName}>{doctor.name}</div>
                                <div className={styles.resultSubtitle}>{doctor.specialist}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
            
            <div className={styles.popularTags}>
              <span className={styles.popularLabel}>Popular:</span>
              <button className={styles.tagBtn} onClick={() => handlePopularClick('Cardiology')}>Cardiology</button>
              <button className={styles.tagBtn} onClick={() => handlePopularClick('Neurology')}>Neurology</button>
              <button className={styles.tagBtn} onClick={() => handlePopularClick('Pediatrics')}>Pediatrics</button>
            </div>

            <div className={styles.actionButtons}>
              <Link href="/doctors" className={styles.primaryBtn}>
                Book an Appointment <ArrowRight size={18} />
              </Link>
              <button className={styles.secondaryBtn} onClick={() => window.location.href = '#locations'}>
                Find a Location <Search size={18} />
              </button>
            </div>

            <div className={styles.trustBadge}>
              <div className={styles.stars}>
                <Star size={16} fill="#FACC15" color="#FACC15" />
                <Star size={16} fill="#FACC15" color="#FACC15" />
                <Star size={16} fill="#FACC15" color="#FACC15" />
                <Star size={16} fill="#FACC15" color="#FACC15" />
                <Star size={16} fill="#FACC15" color="#FACC15" />
              </div>
              <p className={styles.trustText}>Trusted by <strong>50,000+</strong> Patients</p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className={styles.rightColumn}>
            {/* The doctor image is using the background for now, but we can layer floating cards on the right */}
            <div className={styles.floatingCardsContainer}>
              <div className={`${styles.floatingCard} ${styles.card1}`}>
                <div className={styles.iconCircle}>
                  <CheckCircle size={20} color="#00A676" />
                </div>
                <span>24/7 Emergency</span>
              </div>
              
              <div className={`${styles.floatingCard} ${styles.card2}`}>
                <div className={styles.iconCircle}>
                  <CheckCircle size={20} color="#00A676" />
                </div>
                <span>NABH Accredited</span>
              </div>
              
              <div className={`${styles.floatingCard} ${styles.card3}`}>
                <div className={styles.iconCircle}>
                  <CheckCircle size={20} color="#00A676" />
                </div>
                <span>200+ Specialists</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* BOTTOM STATS BAR */}
      <div className={styles.statsBarWrapper}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <CounterAnimation end={120} suffix="+" label="Expert Doctors" numberClassName={styles.statNumber} labelClassName={styles.statLabel} />
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <CounterAnimation end={35} suffix="+" label="Departments" numberClassName={styles.statNumber} labelClassName={styles.statLabel} />
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <CounterAnimation end={4.9} decimals={1} label="Patient Rating" numberClassName={styles.statNumber} labelClassName={styles.statLabel} />
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <CounterAnimation end={1} suffix="M+" label="Happy Patients" numberClassName={styles.statNumber} labelClassName={styles.statLabel} />
          </div>
        </div>
      </div>

      <CallbackModal isOpen={isCallbackModalOpen} onClose={() => setIsCallbackModalOpen(false)} />
    </section>
  );
}
