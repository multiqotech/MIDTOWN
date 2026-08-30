'use client';
import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../../lib/api';

const CLOUDINARY_UPLOAD_PRESET = 'midtown';
const CLOUDINARY_CLOUD_NAME = 'dkhyb43ae';

export default function TpaDeskManager() {
  const [editingItem, setEditingItem] = useState<any>({ title: '', slug: '', description: '', content: '', image: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploading, setUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const data = await api.get('/api/discover/tpa-desk');
      if (data) {
        setEditingItem(data);
      }
    } catch (err) {
      console.error(err);
      showMessage('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put('/api/discover/tpa-desk', editingItem);
      showMessage('Updated successfully!', 'success');
      fetchItem();
    } catch (err) {
      console.error(err);
      showMessage('Failed to save', 'error');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.secure_url) {
        setEditingItem({ ...editingItem, image: data.secure_url });
        showMessage('File uploaded successfully!', 'success');
      } else {
        showMessage('Cloudinary Error', 'error');
      }
    } catch (err: any) {
      showMessage(`Network error: ${err.message}`, 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
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
        <h3 style={{ margin: '0 0 2rem 0', color: '#fff' }}>Manage TPA Desk</h3>

        <form onSubmit={handleSave} style={{ display: 'grid', gap: '1.5rem' }}>
          
          <div>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Title *</label>
            <textarea 
              value={editingItem?.title || ''}
              onChange={(e: any) => setEditingItem((prev: any) => ({ ...prev, title: e.target.value }))}
              style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Slug *</label>
            <textarea 
              value={editingItem?.slug || ''}
              onChange={(e: any) => setEditingItem((prev: any) => ({ ...prev, slug: e.target.value }))}
              style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Description *</label>
            <textarea 
              value={editingItem?.description || ''}
              onChange={(e: any) => setEditingItem((prev: any) => ({ ...prev, description: e.target.value }))}
              style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Content *</label>
            <textarea 
              value={editingItem?.content || ''}
              onChange={(e: any) => setEditingItem((prev: any) => ({ ...prev, content: e.target.value }))}
              style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '100px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Image URL</label>
            <textarea 
              value={editingItem?.image || ''}
              onChange={(e: any) => setEditingItem((prev: any) => ({ ...prev, image: e.target.value }))}
              style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
            />
          </div>

          <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" style={{ backgroundColor: '#00A676', color: '#fff', border: 'none', padding: '0.75rem 2.5rem', borderRadius: '6px', cursor: 'pointer' }}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
