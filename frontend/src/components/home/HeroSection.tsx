'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './HeroSection.module.css';
import { api } from '../../lib/api';
import { Search, User, AlertCircle } from 'lucide-react';

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

  return (
    <section className={styles.heroSection}>
      <Image
        src={heroImage}
        alt="Doctor consulting with patient"
        fill
        className={styles.backgroundImage}
        priority
      />
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Where Healing<br />
            Feels Like <span className={styles.highlight}>Home</span>
          </h1>
          <p className={styles.subtitle}>
            Start your journey to better health. Find the right doctor and specialty below.
          </p>
          
          <div className={styles.searchContainer} ref={searchRef}>
            <div className={styles.searchBar}>
              <div className={styles.searchIconWrapper}>
                <Search size={20} color="#0076a8" />
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

        </div>
      </div>
    </section>
  );
}
