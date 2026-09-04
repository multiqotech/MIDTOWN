'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './CounterAnimation.module.css';

export interface CounterAnimationProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
  decimals?: number;
  numberClassName?: string;
  labelClassName?: string;
}

export const CounterAnimation: React.FC<CounterAnimationProps> = ({
  end,
  suffix = '',
  label,
  duration = 2000,
  decimals = 0,
  numberClassName,
  labelClassName,
}) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number;

          const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

          const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = time - startTime;
            const percent = Math.min(progress / duration, 1);
            const value = end * easeOutQuart(percent);
            setCount(value);

            if (progress < duration) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [end, duration]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={numberClassName || styles.number}>
        {count.toFixed(decimals)}{suffix}
      </div>
      <div className={labelClassName || styles.label}>{label}</div>
    </div>
  );
};

export default CounterAnimation;
