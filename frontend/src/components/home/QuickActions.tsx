import React from 'react';
import Link from 'next/link';
import styles from './QuickActions.module.css';

const ACTIONS = [
  {
    title: 'Find a Doctor',
    description: 'Search by specialty or name',
    href: '/doctors',
    iconColor: 'var(--color-secondary, #00A676)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m8 17 4 4 4-4" />
      </svg>
    )
  },
  {
    title: 'Book Appointment',
    description: 'Schedule your visit online',
    href: '/appointments',
    iconColor: 'var(--color-primary, #0F4C81)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  },
  {
    title: 'Health Packages',
    description: 'Comprehensive checkups',
    href: '/packages',
    iconColor: 'var(--color-accent, #E53935)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M9 14h6" />
        <path d="M9 10h6" />
        <path d="M9 18h6" />
      </svg>
    )
  },
  {
    title: 'Emergency',
    description: '24/7 medical support',
    href: '/emergency',
    iconColor: 'var(--color-accent, #E53935)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <path d="M12 11v6" />
        <path d="M9 14h6" />
      </svg>
    )
  }
];

export default function QuickActions() {
  return (
    <section className={styles.quickActionsSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {ACTIONS.map((action, index) => (
            <Link href={action.href} key={index} className={styles.card} style={{ '--hover-color': action.iconColor } as React.CSSProperties}>
              <div className={styles.iconWrapper} style={{ color: action.iconColor }}>
                {action.icon}
              </div>
              <h3 className={styles.title}>{action.title}</h3>
              <p className={styles.description}>{action.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
