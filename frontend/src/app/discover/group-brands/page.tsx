'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface Brand {
  _id: string;
  brandName: string;
  slug: string;
  logo: string;
  description: string;
  category: string;
  websiteUrl: string;
  displayOrder: number;
  publishedStatus: string;
}

export default function GroupBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await api.get('/api/discover/group-brands');
        const published = response.filter((item: Brand) => item.publishedStatus === 'published');
        published.sort((a: Brand, b: Brand) => a.displayOrder - b.displayOrder);
        setBrands(published);
      } catch (err: any) {
        console.error('Failed to load group brands data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop"
            alt="Our Group Brands"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Our Group Brands</h1>
            <p className={styles.subtitle}>A comprehensive ecosystem of healthcare excellence.</p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          <div className={styles.introSection}>
            <h2 className={styles.introHeading}>The Midtown Network</h2>
            <p className={styles.introText}>
              Midtown Hospital is part of a larger healthcare ecosystem dedicated to providing full-spectrum medical services, from diagnostics and retail pharmacy to education and digital health solutions.
            </p>
          </div>

          {loading ? (
            <div className={styles.loading}>Loading brands...</div>
          ) : (
            <div className={styles.grid}>
              {brands.map((brand) => (
                <div key={brand._id} className={styles.card}>
                  <div className={styles.logoWrapper}>
                    <Image
                      src={brand.logo || 'https://images.unsplash.com/photo-1629904853716-f0cb54ce96ce?q=80&w=500&auto=format&fit=crop'}
                      alt={brand.brandName}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <h3 className={styles.cardName}>{brand.brandName}</h3>
                  <span className={styles.cardCategory}>{brand.category}</span>
                  <p className={styles.cardDesc}>{brand.description}</p>
                  {brand.websiteUrl && (
                    <a 
                      href={brand.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.btnPrimary}
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
