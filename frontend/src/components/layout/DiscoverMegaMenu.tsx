import React from 'react';
import styles from './DiscoverMegaMenu.module.css';

interface DiscoverMegaMenuProps {
  onClose?: () => void;
}

export default function DiscoverMegaMenu({ onClose }: DiscoverMegaMenuProps) {
  return (
    <div className={styles.megaMenuWrapper}>
      <div className={styles.megaMenuContainer}>
        {/* Left Columns Container */}
        <div className={styles.leftPanel}>
          {/* Column 1 */}
          <ul className={styles.navColumnMain}>
            <li className={styles.activeItem}>The Midtown Story <span>&gt;</span></li>
            <li>Leadership <span>&gt;</span></li>
            <li>Academics & Research <span>&gt;</span></li>
            <li>CSR & Sustainability <span>&gt;</span></li>
            <li>Corporate Governance <span>&gt;</span></li>
            <li>Investor Relations <span>&gt;</span></li>
            <li>Media Centre <span>&gt;</span></li>
            <li>Corporate Partnerships <span>&gt;</span></li>
            <li>Healers&apos; Circle <span>&gt;</span></li>
            <li>Clinical Quality & Outcomes <span>&gt;</span></li>
          </ul>

          {/* Column 2 */}
          <div className={styles.subColumnContainer}>
            <ul className={styles.navColumnSub}>
              <li>Overview</li>
              <li>A Day at Midtown</li>
              <li>Vision &amp; Mission</li>
              <li>Careers</li>
              <li>Midtown Anthem</li>
              <li>Leadership</li>
              <li>Our Group Brands</li>
              <li>Awards &amp; Accolades</li>
              <li>Alliances</li>
              <li>Achievements &amp; Milestones</li>
            </ul>
          </div>
        </div>

        {/* Right Panel: Quick Links */}
        <div className={styles.rightPanel}>
          <div className={styles.quickLinksHeader}>
            <h3>Quick Links</h3>
            {onClose && (
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            )}
          </div>
          
          <div className={styles.infoCards}>
            <div className={styles.infoCardYellow}>
              <span className={styles.cardLabel}>Emergency</span>
              <span className={styles.cardValue}>1066</span>
            </div>
            <div className={styles.infoCardBlue}>
              <span className={styles.cardLabel}>Midtown Lifeline International</span>
              <span className={styles.cardValue}>+91 4043441066</span>
            </div>
            <div className={styles.infoCardBlue}>
              <span className={styles.cardLabel}>Health Help Line</span>
              <span className={styles.cardValue}>1860-500-1066</span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.actionBtn}>Book Appointment <span>&#8594;</span></button>
            <button className={styles.actionBtn}>Find Doctors <span>&#8594;</span></button>
            <button className={styles.actionBtn}>Contact Us <span>&#8594;</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}
