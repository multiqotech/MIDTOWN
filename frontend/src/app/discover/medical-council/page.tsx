'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface Leader {
  _id: string;
  name: string;
  slug: string;
  profileImage: string;
  designation: string;
  specialty: string;
  medicalQualifications: string[];
  shortBiography: string;
  displayOrder: number;
  publishedStatus: string;
}

export default function MedicalCouncilPage() {
  const [council, setCouncil] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCouncil = async () => {
      try {
        const response = await api.get('/api/discover/medical-council');
        const published = response.filter((item: Leader) => item.publishedStatus === 'published');
        published.sort((a: Leader, b: Leader) => a.displayOrder - b.displayOrder);
        setCouncil(published);
      } catch (err: any) {
        console.error('Failed to load medical council data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCouncil();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Image
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop"
            alt="Medical Council"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Medical Council</h1>
            <p className={styles.subtitle}>Bringing together clinical expertise, medical leadership, and a shared commitment to better patient outcomes.</p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          <div className={styles.introSection}>
            <h2 className={styles.introHeading}>Clinical Leadership</h2>
            <p className={styles.introText}>
              The Midtown Hospital Medical Council comprises our most senior and respected physicians, surgeons, and clinical researchers. Their mandate is to maintain the highest standards of evidence-based medicine, oversee patient safety protocols, and drive continuous clinical innovation across all departments.
            </p>
          </div>

          {loading ? (
            <div className={styles.loading}>Loading medical council...</div>
          ) : (
            <div className={styles.grid}>
              {council.map((member) => (
                <Link 
                  key={member._id} 
                  href={`/discover/medical-council/${member.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={member.profileImage || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500&auto=format&fit=crop'}
                        alt={member.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardName}>{member.name}</h3>
                      {member.medicalQualifications && member.medicalQualifications.length > 0 && (
                        <div className={styles.cardQuals}>{member.medicalQualifications.join(', ')}</div>
                      )}
                      <p className={styles.cardDesignation}>{member.designation}</p>
                      {member.specialty && <p className={styles.cardDepartment}>{member.specialty}</p>}
                      <p className={styles.cardBio}>{member.shortBiography}</p>
                      <div className={styles.readMore}>
                        View Profile <span>&rarr;</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className={styles.introSection} style={{ marginBottom: 0 }}>
            <h2 className={styles.introHeading}>Council Focus Areas</h2>
            <div className={styles.areasGrid}>
              <div className={styles.areaCard}>Clinical Excellence</div>
              <div className={styles.areaCard}>Patient Safety</div>
              <div className={styles.areaCard}>Medical Innovation</div>
              <div className={styles.areaCard}>Research</div>
              <div className={styles.areaCard}>Medical Education</div>
              <div className={styles.areaCard}>Quality Improvement</div>
            </div>
            
            <div className={styles.linksSection}>
              <Link href="/discover/executive-team" className={styles.btnSecondary}>Meet the Executive Team</Link>
              <Link href="/doctors" className={styles.btnSecondary}>Find a Doctor</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
