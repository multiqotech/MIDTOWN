'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './DoctorProfile.module.css';
import { api } from '../../../lib/api';

interface Doctor {
  _id: string;
  name: string;
  specialist: string;
  qualification: string;
  extra?: string;
  description: string;
  imageUrl: string;
}

export default function DoctorProfilePage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchDoctor = async () => {
      try {
        const data = await api.get(`/api/doctors/${id}`);
        setDoctor(data);
      } catch (err) {
        console.error('Failed to fetch doctor:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.pageContainer} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ color: '#666', fontSize: '1.2rem' }}>Loading doctor profile...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!doctor) {
    return (
      <>
        <Header />
        <main className={styles.pageContainer} style={{ textAlign: 'center' }}>
          <h1 style={{ marginBottom: '1rem' }}>Doctor Not Found</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>We couldn't find the doctor you're looking for.</p>
          <Link href="/doctors" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to all doctors
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.pageContainer}>
        <Link href="/doctors" className={styles.backLink}>
          <ArrowLeft size={18} /> Back to all doctors
        </Link>
        
        <div className={styles.profileCard}>
          <div className={styles.imageSection}>
            <Image
              src={doctor.imageUrl}
              alt={doctor.name}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>
          
          <div className={styles.detailsSection}>
            <h1 className={styles.name}>{doctor.name}</h1>
            <div className={styles.specialty}>{doctor.specialty}</div>
            
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Qualifications</span>
                <span className={styles.infoValue}>{doctor.qualification}</span>
              </div>
              
              {doctor.extra && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Additional Info</span>
                  <span className={styles.infoValue}>{doctor.extra}</span>
                </div>
              )}
            </div>
            
            <div className={styles.descriptionSection}>
              <h3>About the Doctor</h3>
              <p className={styles.description}>{doctor.description}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
