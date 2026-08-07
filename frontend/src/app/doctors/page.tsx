'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './DoctorsPage.module.css';
import { api } from '../../lib/api';

interface Doctor {
  _id: string;
  name: string;
  specialist: string;
  qualification: string;
  imageUrl: string;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await api.get('/api/doctors');
        setDoctors(data);
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doctor.specialist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className={styles.pageContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Our Doctors</h1>
          <p className={styles.subtitle}>Meet our team of experienced and dedicated healthcare professionals.</p>
        </div>

        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={20} />
          <input 
            type="text" 
            className={styles.searchInput}
            placeholder="Search doctors by name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>Loading doctors...</div>
        ) : (
          <div className={styles.grid}>
            {filteredDoctors.map((doctor) => (
              <Link key={doctor._id} href={`/doctors/${doctor._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      fill
                      className={styles.image}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardName}>{doctor.name}</h3>
                    <p className={styles.cardSpecialty}>{doctor.specialty}</p>
                    <p className={styles.qualification}>{doctor.qualification}</p>
                  </div>
                </div>
              </Link>
            ))}
            
            {filteredDoctors.length === 0 && (
              <div className={styles.noResults}>
                No doctors found matching "{searchQuery}".
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
