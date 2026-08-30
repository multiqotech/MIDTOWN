'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';
import { ArrowLeft, MapPin, Phone, Calendar, CheckCircle } from 'lucide-react';

interface Statistic {
  label: string;
  value: string;
}

interface ResearchInstitute {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  description: string;
  eligibility?: string;
  durationOrDate?: string;
  location?: string;
  status?: string;
  image?: string;
  contactInfo?: string;
  statistics?: Statistic[];
  publishedStatus: string;
}

export default function ResearchInstituteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  
  const [institute, setInstitute] = useState<ResearchInstitute | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/discover/research-institutes');
        if (response && Array.isArray(response)) {
          const found = response.find((item: ResearchInstitute) => item.slug === slug && item.publishedStatus !== 'draft');
          if (found) {
            setInstitute(found);
          } else {
            router.push('/discover/research-institutes');
          }
        }
      } catch (err: any) {
        console.error('Failed to load research institute details', err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug, router]);

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.loading}>Loading details...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!institute) return null;

  const heroImage = institute.image || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop';

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Image
            src={heroImage}
            alt={institute.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <Link href="/discover/research-institutes" style={{ color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 500 }}>
              <ArrowLeft size={18} /> Back to Research Institutes
            </Link>
            <h1 className={styles.title}>{institute.title}</h1>
            {institute.category && <p className={styles.subtitle} style={{ color: '#f6a118', fontWeight: 600 }}>{institute.category}</p>}
          </div>
        </section>

        <div className={styles.contentContainer}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem', alignItems: 'start' }}>
            
            <div className={styles.card}>
              <h2 className={styles.heading}>About the Institute</h2>
              <div className={styles.text} style={{ whiteSpace: 'pre-wrap' }}>
                {institute.description}
              </div>

              {institute.statistics && institute.statistics.length > 0 && (
                <div className={styles.statsGrid} style={{ marginTop: '3rem' }}>
                  {institute.statistics.map((stat, idx) => (
                    <div key={idx} className={styles.statItem}>
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.card} style={{ position: 'sticky', top: '100px', padding: '2rem' }}>
              <h3 className={styles.heading} style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Key Information</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {institute.location && (
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <MapPin color="#0076a8" style={{ marginTop: '0.25rem' }} />
                    <div>
                      <span style={{ display: 'block', color: '#64748b', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Location</span>
                      <span style={{ color: '#1e293b' }}>{institute.location}</span>
                    </div>
                  </div>
                )}

                {institute.status && (
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <CheckCircle color="#0076a8" style={{ marginTop: '0.25rem' }} />
                    <div>
                      <span style={{ display: 'block', color: '#64748b', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Status</span>
                      <span style={{ color: '#1e293b' }}>{institute.status}</span>
                    </div>
                  </div>
                )}

                {institute.durationOrDate && (
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <Calendar color="#0076a8" style={{ marginTop: '0.25rem' }} />
                    <div>
                      <span style={{ display: 'block', color: '#64748b', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Duration / Date</span>
                      <span style={{ color: '#1e293b' }}>{institute.durationOrDate}</span>
                    </div>
                  </div>
                )}

                {institute.eligibility && (
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <CheckCircle color="#0076a8" style={{ marginTop: '0.25rem' }} />
                    <div>
                      <span style={{ display: 'block', color: '#64748b', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Eligibility</span>
                      <span style={{ color: '#1e293b' }}>{institute.eligibility}</span>
                    </div>
                  </div>
                )}

                {institute.contactInfo && (
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <Phone color="#0076a8" style={{ marginTop: '0.25rem' }} />
                    <div>
                      <span style={{ display: 'block', color: '#64748b', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Contact Info</span>
                      <span style={{ color: '#1e293b' }}>{institute.contactInfo}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
