'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import styles from './CallbackModal.module.css';
import { api } from '../../lib/api';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    speciality: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await api.post('/api/enquiries', formData);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setSuccess(false);
      setFormData({ name: '', phone: '', speciality: '', description: '' });
      setError('');
    }, 300);
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>
          <X size={20} />
        </button>

        {success ? (
          <div className={styles.successMessage}>
            <h3>Thank you!</h3>
            <p>Your request has been received. Our team will contact you shortly.</p>
            <button className={styles.submitButton} onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Enter Name" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Phone</label>
              <div className={styles.phoneGroup}>
                <div className={styles.phonePrefix}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://flagcdn.com/w20/in.png" alt="IN" width="20" />
                  +91
                </div>
                <input 
                  type="tel" 
                  className={`${styles.input} ${styles.phoneInput}`} 
                  placeholder="Enter 10-digit mobile number" 
                  required
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                  value={formData.phone}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                    setFormData({...formData, phone: onlyNums});
                  }}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Speciality</label>
              <select 
                className={styles.input} 
                required
                value={formData.speciality}
                onChange={(e) => setFormData({...formData, speciality: e.target.value})}
              >
                <option value="" disabled>Select Speciality</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Oncology">Oncology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description (Optional)</label>
              <textarea 
                className={styles.textarea} 
                placeholder="Briefly describe your condition or query" 
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {error && <div style={{ color: '#ff4d4f', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</div>}

            <button type="submit" className={styles.submitButton} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>

            <div className={styles.consentGroup}>
              <input type="checkbox" required className={styles.checkbox} id="consent" />
              <label htmlFor="consent">
                I consent to being contacted via phone/email regarding my enquiry and related healthcare services. I acknowledge the Privacy Policy and T&C.
              </label>
            </div>

            <div className={styles.contactEmail}>
              Email - contact@midtownhospitals.com
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
