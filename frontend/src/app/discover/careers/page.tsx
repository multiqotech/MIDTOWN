'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { api } from '@/lib/api';

interface Job {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  experienceRequired: string;
  shortDescription: string;
  applicationLink: string;
  status: string;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/api/discover/jobs');
        // Filter out drafts
        setJobs(response.filter((job: Job) => job.status === 'published'));
      } catch (err: any) {
        console.error('Failed to load jobs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <Image
            src="https://images.unsplash.com/photo-1551076805-e18690c5e451?q=80&w=2000&auto=format&fit=crop"
            alt="Careers at Midtown"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
            priority
          />
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Join Our Team</h1>
            <p className={styles.subtitle}>Build a rewarding career making a real difference.</p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          <h2 className={styles.sectionHeading}>Current Openings</h2>
          
          {loading ? (
            <div className={styles.loading}>Loading opportunities...</div>
          ) : jobs.length === 0 ? (
            <div className={styles.emptyState}>
              We currently don't have any open positions. Please check back later!
            </div>
          ) : (
            <div className={styles.jobsGrid}>
              {jobs.map((job) => (
                <div key={job._id} className={styles.jobCard}>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <div className={styles.jobMeta}>
                    <span className={styles.metaBadge}>{job.department}</span>
                    <span className={styles.metaBadge}>{job.location}</span>
                    <span className={styles.metaBadge}>{job.employmentType}</span>
                  </div>
                  <p className={styles.jobDesc}>{job.shortDescription}</p>
                  <Link 
                    href={job.applicationLink || `mailto:careers@midtownhospital.com?subject=Application for ${job.title}`}
                    className={styles.btnPrimary}
                  >
                    Apply Now
                  </Link>
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
