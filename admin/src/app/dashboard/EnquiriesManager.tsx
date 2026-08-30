'use client';

import React, { useState, useEffect } from 'react';
import { PhoneCall, CheckCircle2, Trash2 } from 'lucide-react';
import { api } from '../../lib/api';

interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  speciality: string;
  description?: string;
  status: string;
  createdAt: string;
}

export default function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const data = await api.get('/api/enquiries');
      setEnquiries(data);
    } catch (err) {
      console.error(err);
      showMessage('Failed to load enquiries', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await api.put(`/api/enquiries/${id}`, { status: newStatus });
      showMessage(`Status updated to ${newStatus}`, 'success');
      fetchEnquiries();
    } catch (err) {
      console.error(err);
      showMessage('Failed to update status', 'error');
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await api.delete(`/api/enquiries/${id}`);
      showMessage('Enquiry deleted', 'success');
      fetchEnquiries();
    } catch (err) {
      console.error(err);
      showMessage('Failed to delete enquiry', 'error');
    }
  };

  if (loading) return <div style={{ color: '#00A676' }}>Loading Enquiries...</div>;

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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Callback Enquiries</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {enquiries.map((enquiry) => (
          <div key={enquiry._id} style={{ 
            backgroundColor: '#1A1A1A', 
            borderRadius: '12px', 
            border: `1px solid ${enquiry.status === 'New' ? '#00A676' : '#2a2a2a'}`, 
            padding: '1.5rem', 
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#fff', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {enquiry.name} 
                  {enquiry.status === 'New' && <span style={{ fontSize: '0.75rem', backgroundColor: '#00A676', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '12px' }}>New</span>}
                </h4>
                <div style={{ display: 'flex', gap: '1.5rem', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  <a href={`tel:${enquiry.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#66b2ff', textDecoration: 'none' }}>
                    <PhoneCall size={14}/> 
                    {enquiry.phone || 'N/A'}
                  </a>
                  <span><strong>Speciality:</strong> {enquiry.speciality}</span>
                  <span><strong>Date:</strong> {new Date(enquiry.createdAt).toLocaleString()}</span>
                </div>
                {enquiry.description && (
                  <p style={{ margin: '0.5rem 0 0 0', color: '#ddd', fontSize: '0.95rem', background: '#222', padding: '0.75rem', borderRadius: '8px' }}>
                    {enquiry.description}
                  </p>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select 
                  value={enquiry.status}
                  onChange={(e: any) => updateStatus(enquiry._id, e.target.value)}
                  style={{ 
                    backgroundColor: '#333', 
                    color: '#fff', 
                    border: 'none', 
                    padding: '0.5rem', 
                    borderRadius: '4px',
                    outline: 'none'
                  }}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <button 
                  onClick={() => deleteEnquiry(enquiry._id)} 
                  style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {enquiries.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#888', backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a' }}>
            No enquiries found.
          </div>
        )}
      </div>
    </div>
  );
}
