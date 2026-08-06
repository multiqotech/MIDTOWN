import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import styles from './WhyChooseUs.module.css';

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.imageArea}>
            <svg className={styles.medicalCross} viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 10h-5V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v5H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5v5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-5h5a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z" />
            </svg>
            
            <div className={styles.floatingCard1}>
              <div className={styles.floatTextLarge}>15+ Years</div>
              <div className={styles.floatTextSmall}>of Excellence</div>
            </div>
            
            <div className={styles.floatingCard2}>
              <div className={styles.floatTextLarge2}>24/7</div>
              <div className={styles.floatTextSmall2}>Emergency Care</div>
            </div>
          </div>
        </div>
        
        <div className={styles.rightColumn}>
          <SectionHeading 
            title="Why Choose MIDTOWN?" 
            centered={false} 
          />
          <p className={styles.description}>
            At MIDTOWN, we combine cutting-edge technology with compassionate care to deliver exceptional healthcare experiences. Our commitment to excellence has made us a trusted name in healthcare.
          </p>
          
          <div className={styles.featuresList}>
            <div className={styles.featureRow}>
              <div className={styles.iconCircle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className={styles.featureText}>
                <h4 className={styles.featureTitle}>Advanced Technology</h4>
                <p className={styles.featureDesc}>State-of-the-art equipment and robotic surgery capabilities</p>
              </div>
            </div>

            <div className={styles.featureRow}>
              <div className={styles.iconCircle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className={styles.featureText}>
                <h4 className={styles.featureTitle}>Expert Medical Team</h4>
                <p className={styles.featureDesc}>100+ highly qualified specialists across 50+ departments</p>
              </div>
            </div>

            <div className={styles.featureRow}>
              <div className={styles.iconCircle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className={styles.featureText}>
                <h4 className={styles.featureTitle}>24/7 Emergency</h4>
                <p className={styles.featureDesc}>Round-the-clock emergency and trauma care services</p>
              </div>
            </div>

            <div className={styles.featureRow}>
              <div className={styles.iconCircle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className={styles.featureText}>
                <h4 className={styles.featureTitle}>Affordable Care</h4>
                <p className={styles.featureDesc}>Quality healthcare at transparent and competitive pricing</p>
              </div>
            </div>
          </div>
          
          <div className={styles.actionArea}>
            <Button variant="outline" href="/about">Learn More About Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
