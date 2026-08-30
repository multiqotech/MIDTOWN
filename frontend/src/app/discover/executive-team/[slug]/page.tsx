'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from '../../leadership-profile.module.css';
import { api } from '@/lib/api';

export default function ExecutiveProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resolvedParams = await params;
        const response = await api.get('/api/discover/executive-team');
        const member = response.find((p: any) => p.slug === resolvedParams.slug && p.publishedStatus === 'published');
        
        if (member) {
          setProfile(member);
        } else {
          router.push('/discover/executive-team');
        }
      } catch (err: any) {
        console.error(err);
        router.push('/discover/executive-team');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [params, router]);

  if (loading) return <div className={styles.loading}>Loading profile...</div>;
  if (!profile) return null;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/discover/executive-team" className={styles.backLink}>
            <span>&larr;</span> Back to Executive Team
          </Link>

          <div className={styles.profileWrapper}>
            <div className={styles.sidebar}>
              <div className={styles.imageContainer}>
                <Image
                  src={profile.profileImage || 'https://images.unsplash.com/photo-1537368910025-702800faa86b?q=80&w=500&auto=format&fit=crop'}
                  alt={profile.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div className={styles.sidebarContent}>
                <h1 className={styles.name}>{profile.name}</h1>
                <div className={styles.designation}>{profile.designation}</div>
                {profile.department && (
                  <div style={{ color: '#f6a118', fontWeight: 600, marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                    {profile.department}
                  </div>
                )}

                {profile.education && profile.education.length > 0 && (
                  <div className={styles.metaSection}>
                    <div className={styles.metaTitle}>Education</div>
                    {profile.education.map((item: string, i: number) => (
                      <div key={i} className={styles.metaValue}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.content}>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Biography</h2>
                <div className={styles.biography} dangerouslySetInnerHTML={{ __html: profile.fullBiography ? profile.fullBiography.replace(/\n/g, '<br/>') : profile.shortBiography }} />
              </div>

              {profile.experience && profile.experience.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Professional Journey</h2>
                  <ul className={styles.list}>
                    {profile.experience.map((item: string, i: number) => (
                      <li key={i} className={styles.listItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {profile.areasOfExpertise && profile.areasOfExpertise.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Areas of Expertise</h2>
                  <ul className={styles.list}>
                    {profile.areasOfExpertise.map((item: string, i: number) => (
                      <li key={i} className={styles.listItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {profile.responsibilities && profile.responsibilities.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Key Responsibilities</h2>
                  <ul className={styles.list}>
                    {profile.responsibilities.map((item: string, i: number) => (
                      <li key={i} className={styles.listItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {profile.leadershipMessage && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Leadership Message</h2>
                  <div className={styles.messageBox}>
                    "{profile.leadershipMessage}"
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
