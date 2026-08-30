'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/api';

interface Faq {
  _id?: string;
  question: string;
  answer: string;
}

export default function FaqsManager() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const data = await api.get('/api/faqs');
      setFaqs(data);
    } catch (err) {
      console.error(err);
      showMessage('Failed to load FAQs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const openNewFaqForm = () => {
    setEditingFaq({
      question: '',
      answer: '',
    });
    setIsFormOpen(true);
  };

  const openEditFaqForm = (faq: Faq) => {
    setEditingFaq({ ...faq });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingFaq(null);
    setIsFormOpen(false);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    try {
      if (editingFaq._id) {
        await api.put(`/api/faqs/${editingFaq._id}`, editingFaq);
        showMessage('FAQ updated successfully!', 'success');
      } else {
        await api.post('/api/faqs', editingFaq);
        showMessage('FAQ added successfully!', 'success');
      }
      closeForm();
      fetchFaqs();
    } catch (err) {
      console.error(err);
      showMessage('Failed to save FAQ', 'error');
    }
  };

  const handleDeleteFaq = async (id: string | undefined) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      await api.delete(`/api/faqs/${id}`);
      showMessage('FAQ deleted successfully!', 'success');
      fetchFaqs();
    } catch (err) {
      console.error(err);
      showMessage('Failed to delete FAQ', 'error');
    }
  };

  if (loading) return <div style={{ color: '#00A676' }}>Loading FAQs...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {message.text && (
        <div style={{ 
          padding: '1rem 1.5rem', 
          borderRadius: '8px', 
          backgroundColor: message.type === 'success' ? 'rgba(0, 166, 118, 0.1)' : 'rgba(255, 77, 79, 0.1)',
          color: message.type === 'success' ? '#00A676' : '#ff4d4f',
          border: `1px solid ${message.type === 'success' ? 'rgba(0, 166, 118, 0.2)' : 'rgba(255, 77, 79, 0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: '500'
        }}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : null}
          {message.text}
        </div>
      )}

      {!isFormOpen ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Manage FAQs</h3>
            <button 
              onClick={openNewFaqForm}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#00A676',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.25rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              <Plus size={18} /> Add FAQ
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq) => (
              <div key={faq._id} style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a', padding: '1.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openEditFaqForm(faq)} style={{ background: '#333', border: 'none', borderRadius: '4px', padding: '0.4rem', cursor: 'pointer', color: '#fff' }}>
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDeleteFaq(faq._id)} style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.4rem', cursor: 'pointer', color: '#fff' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#fff', fontSize: '1.1rem', paddingRight: '4rem' }}>Q: {faq.question}</h4>
                <p style={{ margin: '0', color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6' }}>A: {faq.answer}</p>
              </div>
            ))}
            
            {faqs.length === 0 && (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#888', backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a' }}>
                No FAQs found. Create one to get started!
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2.5rem', border: '1px solid #2a2a2a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>
              {editingFaq?._id ? 'Edit FAQ' : 'Add New FAQ'}
            </h3>
            <button 
              onClick={closeForm}
              style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveFaq} style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Question *</label>
              <input 
                required
                type="text" 
                value={editingFaq?.question || ''}
                onChange={(e: any) => setEditingFaq(prev => ({ ...prev!, question: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                placeholder="e.g. What are the visiting hours?"
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Answer *</label>
              <textarea 
                required
                rows={4}
                value={editingFaq?.answer || ''}
                onChange={(e: any) => setEditingFaq(prev => ({ ...prev!, answer: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', resize: 'vertical' }}
                placeholder="Enter the detailed answer here..."
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button 
                type="button"
                onClick={closeForm}
                style={{ backgroundColor: 'transparent', color: '#aaa', border: '1px solid #333', padding: '0.75rem 2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
              >
                Cancel
              </button>
              <button 
                type="submit"
                style={{ backgroundColor: '#00A676', color: '#fff', border: 'none', padding: '0.75rem 2.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
              >
                Save FAQ
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
