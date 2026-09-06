'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Calendar } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CallbackModal from '@/components/common/CallbackModal';
import styles from './ServiceDetails.module.css';
import { api } from '../../../lib/api';
import { CONTACT_INFO } from '@/lib/constants';

interface Service {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  keyPoints: string[];
  suggestions: string[];
}

export default function ServiceDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isCallbackModalOpen, setCallbackModalOpen] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await api.get(`/api/services/${id}`);
        setService(data);
      } catch (err) {
        console.error('Failed to fetch service details:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchService();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ padding: '8rem 2rem', textAlign: 'center', minHeight: '60vh' }}>
          Loading service details...
        </div>
        <Footer />
      </>
    );
  }

  if (error || !service) {
    return notFound();
  }

  return (
    <>
      <Header />
      <main className={styles.pageContainer}>
        {/* Back navigation */}
        <div className={styles.navContainer}>
          <Link href="/services" className={styles.backLink}>
            <ArrowLeft size={18} />
            Back to Services
          </Link>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            {/* Hero Image */}
            <div className={styles.heroImageWrapper}>
              <Image
                src={service.imageUrl}
                alt={service.name}
                fill
                className={styles.heroImage}
                priority
              />
              <div className={styles.heroOverlay}></div>
              <h1 className={styles.title}>{service.name}</h1>
            </div>

            {/* Description */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Overview</h2>
              <p className={styles.description}>{service.description}</p>
            </div>

            {/* Key Points */}
            {service.keyPoints && service.keyPoints.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>What to Expect</h2>
                <ul className={styles.list}>
                  {service.keyPoints.map((point, idx) => (
                    <li key={idx} className={styles.listItem}>
                      <CheckCircle2 className={styles.listIcon} size={20} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggestions */}
            {service.suggestions && service.suggestions.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Our Recommendations</h2>
                <ul className={styles.list}>
                  {service.suggestions.map((suggestion, idx) => (
                    <li key={idx} className={styles.listItem}>
                      <span className={styles.bullet}></span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar CTA */}
          <aside className={styles.sidebar}>
            <div className={styles.ctaCard}>
              <h3 className={styles.ctaTitle}>Need this service?</h3>
              <p className={styles.ctaText}>
                Book a consultation with our specialists to get started with your personalized care plan.
              </p>
              <button 
                className={styles.ctaButton}
                onClick={() => setCallbackModalOpen(true)}
              >
                <Calendar size={18} />
                Call Back
              </button>
              
              <div className={styles.contactInfo}>
                <p>Or call us directly at:</p>
                <strong>{CONTACT_INFO.phone}</strong>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <CallbackModal isOpen={isCallbackModalOpen} onClose={() => setCallbackModalOpen(false)} />
    </>
  );
}
