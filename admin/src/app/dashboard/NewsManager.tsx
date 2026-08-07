'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, CheckCircle2, Newspaper } from 'lucide-react';
import { api } from '../../lib/api';

interface NewsItem {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
  imageUrl: string;
  isPublishedToSubscribers?: boolean;
  createdAt: string;
}

export default function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    keyPoints: [] as string[],
    imageUrl: '',
    publishToSubscribers: false,
    isPublishedToSubscribers: false,
  });

  const [currentKeyPoint, setCurrentKeyPoint] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const data = await api.get('/api/news');
      setNews(data);
    } catch (err) {
      console.error(err);
      showMessage('Failed to load news', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'midtown');

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dkhyb43ae/image/upload`, {
        method: 'POST',
        body: data,
      });
      const fileData = await res.json();
      if (fileData.error) {
        alert('Image upload error: ' + fileData.error.message);
        showMessage('Image upload failed', 'error');
        return;
      }
      setFormData({ ...formData, imageUrl: fileData.secure_url });
    } catch (err) {
      console.error('Image upload failed', err);
      showMessage('Image upload failed', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const addKeyPoint = () => {
    if (currentKeyPoint.trim()) {
      setFormData({ ...formData, keyPoints: [...formData.keyPoints, currentKeyPoint.trim()] });
      setCurrentKeyPoint('');
    }
  };

  const removeKeyPoint = (index: number) => {
    setFormData({
      ...formData,
      keyPoints: formData.keyPoints.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) {
      alert('Validation Error: Both a Title and a Featured Image are required!');
      showMessage('Title and Image are required', 'error');
      return;
    }

    try {
      if (editingItem) {
        await api.put(`/api/news/${editingItem._id}`, formData);
        showMessage('News updated successfully', 'success');
      } else {
        await api.post('/api/news', formData);
        showMessage('News added successfully', 'success');
      }
      setIsModalOpen(false);
      resetForm();
      fetchNews();
    } catch (err) {
      console.error(err);
      alert('Failed to save news. Please check console.');
      showMessage('Failed to save news', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return;
    try {
      await api.delete(`/api/news/${id}`);
      showMessage('News deleted successfully', 'success');
      fetchNews();
    } catch (err) {
      console.error(err);
      showMessage('Failed to delete news', 'error');
    }
  };

  const openEditModal = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      keyPoints: item.keyPoints || [],
      imageUrl: item.imageUrl,
      publishToSubscribers: false, // Default to false when editing
      isPublishedToSubscribers: item.isPublishedToSubscribers || false,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      keyPoints: [],
      imageUrl: '',
      publishToSubscribers: false,
      isPublishedToSubscribers: false,
    });
    setCurrentKeyPoint('');
  };

  if (loading) return <div style={{ color: '#00A676' }}>Loading News...</div>;

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
        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>News & Updates</h3>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          style={{
            backgroundColor: '#00A676',
            color: '#fff',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '600'
          }}
        >
          <Plus size={18} /> Add News
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {news.map((item) => (
          <div key={item._id} style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a', overflow: 'hidden' }}>
            <div style={{ height: '160px', width: '100%', backgroundColor: '#222', position: 'relative' }}>
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#666' }}><Newspaper size={40} /></div>
              )}
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#fff', fontSize: '1.1rem' }}>{item.title}</h4>
              <p style={{ margin: '0 0 1rem 0', color: '#888', fontSize: '0.9rem' }}>{item.subtitle}</p>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem', borderTop: '1px solid #2a2a2a', paddingTop: '1rem' }}>
                <button 
                  onClick={() => openEditModal(item)}
                  style={{ background: 'transparent', border: '1px solid #333', borderRadius: '4px', padding: '0.4rem 0.8rem', cursor: 'pointer', color: '#fff' }}
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(item._id)}
                  style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.4rem 0.8rem', cursor: 'pointer', color: '#fff' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {news.length === 0 && (
        <div style={{ padding: '3rem', textAlign: 'center', color: '#888', backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a' }}>
          No news articles found. Add one to get started!
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', 
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1A1A1A', borderRadius: '12px', width: '100%', maxWidth: '600px',
            maxHeight: '90vh', overflowY: 'auto', border: '1px solid #333'
          }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#fff' }}>{editingItem ? 'Edit News' : 'Add News'}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Image Upload */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Featured Image</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '100px', height: '100px', backgroundColor: '#222', borderRadius: '8px', overflow: 'hidden', border: '1px dashed #444', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {formData.imageUrl ? (
                      <img src={formData.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <ImageIcon size={30} color="#666" />
                    )}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      placeholder="Or paste image URL here" 
                      value={formData.imageUrl || ''}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', backgroundColor: '#0A0A0A', border: '1px solid #333', color: '#fff' }}
                    />
                    <label style={{
                      backgroundColor: '#333', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', textAlign: 'center', fontSize: '0.9rem'
                    }}>
                      {uploadingImage ? 'Uploading...' : 'Upload Image (midtown preset)'}
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploadingImage} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Title</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', backgroundColor: '#0A0A0A', border: '1px solid #333', color: '#fff' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Subtitle</label>
                  <input 
                    type="text" 
                    value={formData.subtitle || ''}
                    onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', backgroundColor: '#0A0A0A', border: '1px solid #333', color: '#fff' }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Description</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', backgroundColor: '#0A0A0A', border: '1px solid #333', color: '#fff', fontFamily: 'inherit', resize: 'vertical' }}
                />
              </div>

              {/* Key Points */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Key Points</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input 
                    type="text" 
                    value={currentKeyPoint}
                    onChange={(e) => setCurrentKeyPoint(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyPoint())}
                    placeholder="Enter a key point and click Add"
                    style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', backgroundColor: '#0A0A0A', border: '1px solid #333', color: '#fff' }}
                  />
                  <button type="button" onClick={addKeyPoint} style={{ backgroundColor: '#333', color: '#fff', border: 'none', padding: '0 1rem', borderRadius: '6px', cursor: 'pointer' }}>
                    Add
                  </button>
                </div>
                
                {formData.keyPoints.length > 0 && (
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {formData.keyPoints.map((point, index) => (
                      <li key={index} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#222', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.9rem', color: '#eee' }}>
                        <span>• {point}</span>
                        <button type="button" onClick={() => removeKeyPoint(index)} style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                          <Trash2 size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Broadcast Checkbox */}
              <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1f2937' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: formData.isPublishedToSubscribers ? 'not-allowed' : 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isPublishedToSubscribers ? true : formData.publishToSubscribers}
                    disabled={formData.isPublishedToSubscribers}
                    onChange={(e) => setFormData({ ...formData, publishToSubscribers: e.target.checked })}
                    style={{ width: '1.2rem', height: '1.2rem', accentColor: '#00A676', cursor: formData.isPublishedToSubscribers ? 'not-allowed' : 'pointer' }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: formData.isPublishedToSubscribers ? '#6b7280' : '#fff', fontWeight: '500' }}>
                      Broadcast to all Subscribed Users via Email
                    </span>
                    {formData.isPublishedToSubscribers && (
                      <span style={{ fontSize: '0.8rem', color: '#00A676', marginTop: '0.2rem' }}>
                        <CheckCircle2 size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                        Already broadcasted to subscribers
                      </span>
                    )}
                  </div>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #333' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: '6px', backgroundColor: 'transparent', border: '1px solid #444', color: '#fff', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '6px', backgroundColor: '#00A676', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: '600' }}>
                  {editingItem ? 'Update News' : 'Add News'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
