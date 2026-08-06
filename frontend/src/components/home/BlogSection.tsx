'use client';

import React from 'react';
import styles from './BlogSection.module.css';
import { BLOG_POSTS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export default function BlogSection() {
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getGradient = (index: number) => {
    const gradients = [
      'linear-gradient(135deg, var(--color-primary), #3b82f6)',
      'linear-gradient(135deg, var(--color-secondary), #34d399)',
      'linear-gradient(135deg, var(--color-accent), #f87171)'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading 
          title="Health Articles & News" 
          subtitle="Stay informed with the latest health tips and medical insights" 
        />
        
        <div className={styles.grid}>
          {BLOG_POSTS.map((post, index) => (
            <div key={post.id} className={styles.card}>
              <div 
                className={styles.imageArea}
                style={{ background: getGradient(index) }}
              >
                <svg 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                  <path d="M18 14h-8"></path>
                  <path d="M15 18h-5"></path>
                  <path d="M10 6h8v4h-8V6Z"></path>
                </svg>
              </div>
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.category}>{post.category}</span>
                  <span className={styles.date}>{formatDate(post.date)}</span>
                </div>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} className={styles.readMore}>
                  Read More &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.buttonWrapper}>
          <Button variant="outline" href="/blog">View All Articles</Button>
        </div>
      </div>
    </section>
  );
}
