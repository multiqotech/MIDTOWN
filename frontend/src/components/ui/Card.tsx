import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  variant?: 'default' | 'bordered' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = true,
  variant = 'default',
  ...props
}) => {
  const cardClass = `${styles.card} ${styles[variant]} ${
    hoverable ? styles.hoverable : ''
  } ${className}`;

  return (
    <div className={cardClass} {...props}>
      {children}
    </div>
  );
};

export default Card;
