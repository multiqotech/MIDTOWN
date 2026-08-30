'use client';
import React, { useState, useEffect } from 'react';
import ImageUpload from '../../../components/ImageUpload';
import { CheckCircle2 } from 'lucide-react';
import { api } from '../../../lib/api';

export default function InfectionControlManager() {
  const [data, setData] = useState({ heroTitle: '', heroSubtitle: '', heroImage: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/api/discover/infection-control');
      if (res) setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/api/discover/infection-control', data);
      showMessage('Saved successfully!', 'success');
    } catch (err) {
      console.error(err);
      showMessage('Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ color: '#00A676' }}>Loading...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {message.text && (
        <div style={{ padding: '1rem', borderRadius: '8px', backgroundColor: message.type === 'success' ? 'rgba(0,166,118,0.1)' : 'rgba(255,77,79,0.1)', color: message.type === 'success' ? '#00A676' : '#ff4d4f' }}>
          {message.text}
        </div>
      )}
      
      <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2.5rem', border: '1px solid #2a2a2a' }}>
        <h3 style={{ margin: '0 0 2rem', color: '#fff' }}>Infection Control</h3>
        
        <form onSubmit={handleSave} style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Hero Title *</label>
            <input 
              value={data.heroTitle || ''}
              onChange={(e) => setData(prev => ({ ...prev, heroTitle: e.target.value }))}
              style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Hero Subtitle</label>
            <textarea 
              value={data.heroSubtitle || ''}
              onChange={(e) => setData(prev => ({ ...prev, heroSubtitle: e.target.value }))}
              style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px' }}
            />
          </div>
          <ImageUpload label="Hero Image" value={data.heroImage || ''} onChange={(url) => setData(prev => ({ ...prev, heroImage: url }))} />
          <button type="submit" disabled={saving} style={{ backgroundColor: '#00A676', color: '#fff', border: 'none', padding: '1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', marginTop: '1rem' }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
