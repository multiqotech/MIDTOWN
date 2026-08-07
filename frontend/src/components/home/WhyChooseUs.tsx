'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './WhyChooseUs.module.css';
import { api } from '../../lib/api';

interface Feature {
  title: string;
  description: string;
  imageUrl: string;
}

interface WhyChooseData {
  description: string;
  heroFeature: Feature;
  features: Feature[];
}

export default function WhyChooseUs() {
  const [data, setData] = useState<WhyChooseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/api/why-choose');
        setData(res);
      } catch (err) {
        console.error('Failed to fetch why choose data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // We group features into pairs (columns) for the slider
  // 4 features = 2 columns. If > 4, we have more columns.
  const featureColumns = [];
  for (let i = 0; i < data.features.length; i += 2) {
    featureColumns.push(data.features.slice(i, i + 2));
  }

  // Calculate max index to slide to.
  // 1 visible column at a time on mobile. 2 on desktop (but CSS handles width).
  // On desktop, we show 2 columns (4 items).
  const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
  const itemsPerView = isDesktop ? 2 : 1;
  const maxIndex = Math.max(0, featureColumns.length - itemsPerView);

  const slideLeft = () => setCurrentIndex(prev => Math.max(0, prev - 1));
  const slideRight = () => setCurrentIndex(prev => Math.min(maxIndex, prev + 1));

  // Auto alternating colors for feature cards
  const getCardColorClass = (index: number) => {
    return index % 2 === 0 ? styles.bgDarkBlue : styles.bgTeal;
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sliderHeader}>
          <div className={styles.header}>
            <h2 className={styles.title}>Why Choose <span className={styles.highlight}>Midtown Hospital?</span></h2>
            <p className={styles.subtitle}>{data.description}</p>
          </div>
          
          {featureColumns.length > itemsPerView && (
            <div className={styles.sliderControls}>
              <button 
                onClick={slideLeft} 
                disabled={currentIndex === 0}
                className={styles.sliderBtn}
                aria-label="Previous features"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={slideRight} 
                disabled={currentIndex >= maxIndex}
                className={styles.sliderBtn}
                aria-label="Next features"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        <div className={styles.sliderContainer}>
          {/* Main Large Card (Fixed) */}
          <div className={styles.heroCardContainer}>
            <div className={`${styles.bentoCard} ${styles.cardLarge}`} style={{ height: '100%' }}>
              <Image
                src={data.heroFeature.imageUrl || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop"}
                alt={data.heroFeature.title}
                fill
                className={styles.cardImage}
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.cardOverlay}>
                <h3 className={styles.cardTitle}>{data.heroFeature.title}</h3>
                <p className={styles.cardDesc}>{data.heroFeature.description}</p>
              </div>
            </div>
          </div>

          {/* Features Slider */}
          <div className={styles.featuresSliderWrapper}>
            <div 
              className={styles.featuresTrack}
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {featureColumns.map((col, colIndex) => (
                <div key={colIndex} className={styles.featureColumn}>
                  {col.map((feature, idx) => {
                    const globalIndex = colIndex * 2 + idx;
                    return (
                      <div key={idx} className={`${styles.bentoCard} ${styles.cardSmall} ${getCardColorClass(globalIndex)} ${styles.featureCardWrapper}`}>
                        <div className={styles.cardContent}>
                          <h3 className={styles.cardTitle}>{feature.title}</h3>
                          <p className={styles.cardDesc}>{feature.description}</p>
                        </div>
                        <div className={styles.cardBottomImage}>
                          <Image 
                            src={feature.imageUrl || "https://images.unsplash.com/photo-1537368910025-702800faa86b?q=80&w=500&auto=format&fit=crop"} 
                            alt={feature.title} 
                            fill 
                            style={{ objectFit: 'cover' }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
