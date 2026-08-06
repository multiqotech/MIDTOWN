import React from 'react';
import styles from './SectionHeading.module.css';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = true,
  light = false,
}) => {
  return (
    <div
      className={`${styles.container} ${centered ? styles.centered : ''} ${
        light ? styles.light : ''
      }`}
    >
      <div className={styles.decorativeBar}></div>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
