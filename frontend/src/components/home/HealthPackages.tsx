'use client';
import React from 'react';
import { HEALTH_PACKAGES } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import styles from './HealthPackages.module.css';

export default function HealthPackages() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading 
          title="Health Packages" 
          subtitle="Preventive care packages designed for your well-being" 
        />
        <div className={styles.grid}>
          {HEALTH_PACKAGES.map((pkg) => (
            <div key={pkg.id} className={`${styles.card} ${pkg.popular ? styles.popular : ''}`}>
              {pkg.popular && <div className={styles.popularBadge}>Most Popular</div>}
              
              <div className={styles.header}>
                <h3 className={styles.name}>{pkg.name}</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>₹{pkg.price}</span>
                  {pkg.originalPrice > pkg.price && (
                    <span className={styles.originalPrice}>₹{pkg.originalPrice}</span>
                  )}
                </div>
                {pkg.originalPrice > pkg.price && (
                  <div className={styles.savingsBadge}>
                    Save ₹{pkg.originalPrice - pkg.price}
                  </div>
                )}
              </div>
              
              <div className={styles.features}>
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className={styles.featureItem}>
                    <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className={styles.footer}>
                <Button 
                  variant={pkg.popular ? 'secondary' : 'primary'} 
                  size="md" 
                  fullWidth
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
