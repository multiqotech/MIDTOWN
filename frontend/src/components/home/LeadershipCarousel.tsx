'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { api } from '@/lib/api';
import styles from './LeadershipCarousel.module.css';

interface Leader {
  _id: string;
  name: string;
  designation: string;
  shortBiography: string;
  profileImage?: string;
}

export default function LeadershipCarousel() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        // Fetching from executive-team, fallback to hardcoded if backend is empty
        const data = await api.get('/api/discover/executive-team');
        if (data && data.length > 0) {
          setLeaders(data);
        } else {
          // Fallback static data if backend is empty
          setLeaders([
            {
              _id: '1',
              name: 'Mr. Sanjay Kumar Soni',
              designation: 'Managing Director',
              shortBiography: 'A visionary leader driving Midtown Hospital\'s mission to make high-quality healthcare genuinely affordable, bridging the gap between advanced medical services and accessibility.',
              profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop'
            },
            {
              _id: '2',
              name: 'Mr. Sachin Kumar Soni',
              designation: 'Director',
              shortBiography: 'The strategist behind Midtown Hospital\'s growth, ensuring every new project stays true to the company\'s commitment to excellence and accessibility.',
              profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500&auto=format&fit=crop'
            },
            {
              _id: '3',
              name: 'Dr. Emily Chen',
              designation: 'Chief Medical Officer',
              shortBiography: 'Leading our clinical teams to deliver the highest standards of patient safety and innovative medical treatments.',
              profileImage: 'https://images.unsplash.com/photo-1594824432258-f4b63ee18a7b?q=80&w=500&auto=format&fit=crop'
            }
          ]);
        }
      } catch (err) {
        console.error('Failed to fetch leadership:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadership();
  }, []);

  if (loading) {
    return <div className={styles.loadingState}>Loading leadership...</div>;
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselTrack}>
        {leaders.map((leader) => (
          <div key={leader._id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image 
                src={leader.profileImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop'} 
                alt={leader.name}
                fill
                style={{ objectFit: 'cover' }}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                  <p className={styles.bio}>{leader.shortBiography}</p>
                </div>
              </div>
            </div>
            <div className={styles.cardFooter}>
              <h4 className={styles.name}>{leader.name}</h4>
              <span className={styles.role}>{leader.designation}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
