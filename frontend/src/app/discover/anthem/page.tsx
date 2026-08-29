'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface AnthemData {
  pageTitle: string;
  introduction: string;
  anthemStory: string;
  audioFileUrl: string;
  videoUrl: string;
  coverImage: string;
  credits: string;
  lyrics: string;
}

export default function AnthemPage() {
  const [data, setData] = useState<AnthemData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/discover/anthem');
        setData(response);
      } catch (err) {
        console.error('Failed to load anthem data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.loading}>Loading Anthem...</div>
        </main>
        <Footer />
      </>
    );
  }

  const coverImage = data?.coverImage || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&auto=format&fit=crop';
  const pageTitle = data?.pageTitle || 'Midtown Anthem';

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Image
            src={coverImage}
            alt={pageTitle}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <p className={styles.subtitle}>{data?.introduction || 'The sound of hope and healing.'}</p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          
          <div className={styles.mediaSection}>
            {data?.videoUrl ? (
              <div className={styles.videoWrapper}>
                <iframe 
                  src={data.videoUrl} 
                  title="Midtown Anthem Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            ) : null}

            {data?.audioFileUrl && (
              <div>
                <h3 style={{ marginBottom: '1rem', color: '#e2e8f0' }}>Listen to the Anthem</h3>
                <audio controls className={styles.audioPlayer}>
                  <source src={data.audioFileUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>

          <div className={styles.storySection}>
            <h2 className={styles.heading}>The Story Behind the Music</h2>
            <p className={styles.text}>{data?.anthemStory || 'Our anthem was created to inspire courage, compassion, and togetherness. It represents the resilient spirit of our patients and the unwavering dedication of our healers.'}</p>
            
            {data?.credits && (
              <p className={styles.credits}>{data.credits}</p>
            )}
          </div>

          {data?.lyrics && (
            <div className={styles.lyricsSection}>
              <h2 className={styles.heading}>Lyrics</h2>
              <div className={styles.lyricsText}>{data.lyrics}</div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
