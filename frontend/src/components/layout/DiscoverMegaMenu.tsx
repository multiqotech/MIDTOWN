'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './DiscoverMegaMenu.module.css';

interface DiscoverMegaMenuProps {
  onClose?: () => void;
}

const MENU_CATEGORIES = [
  { id: 'the-midtown-story', label: 'The Midtown Story', slug: '/discover/the-midtown-story' },
  { id: 'leadership', label: 'Leadership', slug: '/discover/our-leadership' },
  { id: 'academics-research', label: 'Academics & Research', slug: '/discover/academics-research' },
  { id: 'csr-sustainability', label: 'CSR & Sustainability', slug: '/discover/csr-sustainability' },
  { id: 'corporate-governance', label: 'Corporate Governance', slug: '/discover/corporate-governance' },
  { id: 'investor-relations', label: 'Investor Relations', slug: '/discover/investor-relations' },
  { id: 'media-centre', label: 'Media Centre', slug: '/discover/media-centre' },
  { id: 'corporate-partnerships', label: 'Corporate Partnerships', slug: '/discover/corporate-partnerships' },
  { id: 'healers-circle', label: 'Healers\' Circle', slug: '/discover/healers-circle' },
  { id: 'clinical-quality', label: 'Clinical Quality & Outcomes', slug: '/discover/clinical-quality' },
];

const SUBMENU_DATA: Record<string, { label: string; slug: string }[]> = {
  'the-midtown-story': [
    { label: 'Overview', slug: '/discover/overview' },
    { label: 'A Day at Midtown', slug: '/discover/day-at-midtown' },
    { label: 'Vision & Mission', slug: '/discover/vision-mission' },
    { label: 'Careers', slug: '/discover/careers' },
    { label: 'Midtown Anthem', slug: '/discover/anthem' },
    { label: 'Leadership', slug: '/discover/our-leadership' },
    { label: 'Our Group Brands', slug: '/discover/group-brands' },
    { label: 'Awards & Accolades', slug: '/discover/awards' },
    { label: 'Alliances', slug: '/discover/alliances' },
    { label: 'Achievements & Milestones', slug: '/discover/achievements' },
  ],
  'leadership': [
    { label: 'Board of Directors', slug: '/discover/board-of-directors' },
    { label: 'Executive Team', slug: '/discover/executive-team' },
    { label: 'Medical Council', slug: '/discover/medical-council' },
  ],
  'academics-research': [
    { label: 'Medical Education', slug: '/discover/medical-education' },
    { label: 'Nursing Education', slug: '/discover/nursing-education' },
    { label: 'Research Institutes', slug: '/discover/research-institutes' },
    { label: 'Clinical Trials', slug: '/discover/clinical-trials' },
    { label: 'Publications', slug: '/discover/publications' },
    { label: 'Fellowships', slug: '/discover/fellowships' },
  ],
  'csr-sustainability': [
    { label: 'Health Camps', slug: '/discover/health-camps' },
    { label: 'Community Outreach', slug: '/discover/community-outreach' },
    { label: 'Environmental Initiatives', slug: '/discover/environmental-initiatives' },
    { label: 'Waste Management', slug: '/discover/waste-management' },
    { label: 'Green Hospitals', slug: '/discover/green-hospitals' },
  ],
  'corporate-governance': [
    { label: 'Board Committees', slug: '/discover/board-committees' },
    { label: 'Policies & Guidelines', slug: '/discover/policies-guidelines' },
    { label: 'Ethics & Compliance', slug: '/discover/ethics-compliance' },
  ],
  'investor-relations': [
    { label: 'Financial Results', slug: '/discover/financial-results' },
    { label: 'Annual Reports', slug: '/discover/annual-reports' },
    { label: 'Shareholder Info', slug: '/discover/shareholder-info' },
    { label: 'Corporate Announcements', slug: '/discover/corporate-announcements' },
    { label: 'Stock Information', slug: '/discover/stock-information' },
  ],
  'media-centre': [
    { label: 'Press Releases', slug: '/discover/press-releases' },
    { label: 'In the News', slug: '/discover/in-the-news' },
    { label: 'Media Kit', slug: '/discover/media-kit' },
    { label: 'Brand Guidelines', slug: '/discover/brand-guidelines' },
    { label: 'Event Gallery', slug: '/discover/event-gallery' },
  ],
  'corporate-partnerships': [
    { label: 'Corporate Tie-ups', slug: '/discover/corporate-tie-ups' },
    { label: 'Wellness Programs', slug: '/discover/wellness-programs' },
    { label: 'Insurance Partners', slug: '/discover/insurance-partners' },
    { label: 'TPA Desk', slug: '/discover/tpa-desk' },
  ],
  'healers-circle': [
    { label: 'Nursing Excellence', slug: '/discover/nursing-excellence' },
    { label: 'Doctor Awards', slug: '/discover/doctor-awards' },
    { label: 'Paramedical Staff', slug: '/discover/paramedical-staff' },
    { label: 'Employee Spotlights', slug: '/discover/employee-spotlights' },
  ],
  'clinical-quality': [
    { label: 'Quality Certifications', slug: '/discover/quality-certifications' },
    { label: 'Infection Control', slug: '/discover/infection-control' },
    { label: 'Patient Safety', slug: '/discover/patient-safety' },
    { label: 'Clinical Indicators', slug: '/discover/clinical-indicators' },
    { label: 'Feedback Mechanism', slug: '/discover/feedback-mechanism' },
  ]
};

export default function DiscoverMegaMenu({ onClose }: DiscoverMegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>('the-midtown-story');

  const activeSubmenus = SUBMENU_DATA[activeCategory] || [];

  return (
    <div className={styles.megaMenuWrapper}>
      <div className={styles.megaMenuContainer}>
        {/* Left Columns Container */}
        <div className={styles.leftPanel}>
          {/* Column 1 */}
          <ul className={styles.navColumnMain}>
            {MENU_CATEGORIES.map((cat) => (
              <li 
                key={cat.id}
                className={activeCategory === cat.id ? styles.activeItem : ''}
                onMouseEnter={() => setActiveCategory(cat.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  {cat.label} <span>&gt;</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Column 2 */}
          <div className={styles.subColumnContainer}>
            <ul className={styles.navColumnSub}>
              {activeSubmenus.map((sub) => (
                <li key={sub.slug}>
                  <Link 
                    href={sub.slug} 
                    onClick={onClose} 
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}
                  >
                    {sub.label}
                  </Link>
                </li>
              ))}
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
              <a href="tel:1066" className={styles.cardValue} style={{ textDecoration: 'none' }}>1066</a>
            </div>
            <div className={styles.infoCardBlue}>
              <span className={styles.cardLabel}>Midtown Lifeline International</span>
              <a href="tel:+914043441066" className={styles.cardValue} style={{ textDecoration: 'none' }}>+91 4043441066</a>
            </div>
            <div className={styles.infoCardBlue}>
              <span className={styles.cardLabel}>Health Help Line</span>
              <a href="tel:18605001066" className={styles.cardValue} style={{ textDecoration: 'none' }}>1860-500-1066</a>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <Link href="/appointments" onClick={onClose} style={{ textDecoration: 'none' }} className={styles.actionBtn}>Book Appointment <span>&#8594;</span></Link>
            <Link href="/doctors" onClick={onClose} style={{ textDecoration: 'none' }} className={styles.actionBtn}>Find Doctors <span>&#8594;</span></Link>
            <Link href="/contact" onClick={onClose} style={{ textDecoration: 'none' }} className={styles.actionBtn}>Contact Us <span>&#8594;</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
