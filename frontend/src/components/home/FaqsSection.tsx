'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FaqsSection.module.css';
import { api } from '../../lib/api';

interface Faq {
  _id: string;
  question: string;
  answer: string;
}

export default function FaqsSection() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await api.get('/api/faqs');
        setFaqs(data);
        if (data.length > 0) {
          setOpenId(data[0]._id); // Open the first one by default
        }
      } catch (err) {
        console.error('Failed to fetch FAQs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Frequently Asked Questions</h2>
            <p className={styles.subtitle}>Loading questions...</p>
          </div>
        </div>
      </section>
    );
  }

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>Find answers to some of the most common questions from our patients.</p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq) => {
            const isOpen = openId === faq._id;
            return (
              <div key={faq._id} className={styles.faqItem}>
                <button 
                  className={styles.questionButton}
                  onClick={() => toggleFaq(faq._id)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} 
                  />
                </button>
                <div 
                  className={`${styles.answerWrapper} ${isOpen ? styles.open : ''}`}
                  aria-hidden={!isOpen}
                >
                  <div className={styles.answerInner}>
                    <div className={styles.answerContent}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
