import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './DiscoverPage.module.css';
import { discoverContent } from '@/lib/discover-content';

// This function tells Next.js which paths to pre-render at build time
export function generateStaticParams() {
  return Object.keys(discoverContent).map((slug) => ({
    slug: slug,
  }));
}

export default async function DiscoverPage({ params }: { params: Promise<{ slug: string }> }) {
  // the-midtown-story, academics-research, etc.
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Leadership has its own dedicated page
  if (slug === 'our-leadership') {
    return null; // Should be handled by its own route, but just in case
  }

  const data = discoverContent[slug];

  if (!data) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.notFound}>
            <h1>Page Not Found</h1>
            <p>The section you are looking for does not exist or has been moved.</p>
            <Link href="/" className={styles.btnPrimary}>Return Home</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <Image
            src={data.heroImage}
            alt={data.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{data.title}</h1>
            <p className={styles.subtitle}>{data.subtitle}</p>
          </div>
        </section>

        {/* Content Sections */}
        <div className={styles.contentContainer}>
          {data.sections.map((section, idx) => (
            <div 
              key={idx} 
              className={`${styles.section} ${section.image ? styles.sectionWithImage : ''}`}
            >
              <div className={styles.textContent}>
                <h2 className={styles.heading}>{section.heading}</h2>
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className={styles.paragraph}>{paragraph}</p>
                ))}
              </div>
              
              {section.image && (
                <div className={styles.imageWrapper}>
                  <Image 
                    src={section.image} 
                    alt={section.heading} 
                    fill 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
