'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, MessageSquare, Star } from 'lucide-react';
import { api } from '../../lib/api';

const CLOUDINARY_UPLOAD_PRESET = 'midtown'; // Unsigned preset
const CLOUDINARY_CLOUD_NAME = 'dkhyb43ae';

interface Testimonial {
  _id?: string;
  name: string;
  text: string;
  rating: number;
  image: string;
  isVideo: boolean;
}

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploading, setUploading] = useState(false);
  const [uploadPreset, setUploadPreset] = useState(CLOUDINARY_UPLOAD_PRESET);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await api.get('/api/testimonials');
      setTestimonials(data);
    } catch (err) {
      console.error(err);
      showMessage('Failed to load testimonials', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const openNewTestimonialForm = () => {
    setEditingTestimonial({
      name: '',
      text: '',
      rating: 5,
      image: '',
      isVideo: false,
    });
    setIsFormOpen(true);
  };

  const openEditTestimonialForm = (testimonial: Testimonial) => {
    setEditingTestimonial({ ...testimonial });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingTestimonial(null);
    setIsFormOpen(false);
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    try {
      if (editingTestimonial._id) {
        await api.put(`/api/testimonials/${editingTestimonial._id}`, editingTestimonial);
        showMessage('Testimonial updated successfully!', 'success');
      } else {
        await api.post('/api/testimonials', editingTestimonial);
        showMessage('Testimonial added successfully!', 'success');
      }
      closeForm();
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      showMessage('Failed to save testimonial', 'error');
    }
  };

  const handleDeleteTestimonial = async (id: string | undefined) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      await api.delete(`/api/testimonials/${id}`);
      showMessage('Testimonial deleted successfully!', 'success');
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      showMessage('Failed to delete testimonial', 'error');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingTestimonial) return;

    if (!uploadPreset) {
      showMessage('Please enter an upload preset name first.', 'error');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.secure_url) {
        setEditingTestimonial({ ...editingTestimonial, image: data.secure_url });
        showMessage('Image uploaded successfully!', 'success');
      } else {
        showMessage(`Cloudinary Error: ${data.error?.message || 'Unknown error'}`, 'error');
      }
    } catch (err: any) {
      showMessage(`Network error: ${err.message}`, 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (loading) return <div style={{ color: '#00A676' }}>Loading testimonials...</div>;

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
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Manage Testimonials</h3>
            <button 
              onClick={openNewTestimonialForm}
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
              <Plus size={18} /> Add Testimonial
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a', overflow: 'hidden' }}>
                <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={testimonial.image} alt={testimonial.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {testimonial.isVideo && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
                      ▶
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openEditTestimonialForm(testimonial)} style={{ background: '#fff', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#111' }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteTestimonial(testimonial._id)} style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h4 style={{ margin: '0', color: '#fff', fontSize: '1.1rem' }}>{testimonial.name}</h4>
                    <div style={{ color: '#FFD700', display: 'flex', fontSize: '0.9rem' }}>
                      {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                    </div>
                  </div>
                  <p style={{ margin: '0 0 1rem', color: '#888', fontSize: '0.9rem', fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    "{testimonial.text}"
                  </p>
                </div>
              </div>
            ))}
            
            {testimonials.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#888', backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a' }}>
                No testimonials found. Create one to get started!
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2.5rem', border: '1px solid #2a2a2a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>
              {editingTestimonial?._id ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>
            <button 
              onClick={closeForm}
              style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveTestimonial} style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Patient Name *</label>
                <input 
                  required
                  type="text" 
                  value={editingTestimonial?.name || ''}
                  onChange={(e: any) => setEditingTestimonial(prev => ({ ...prev!, name: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                  placeholder="e.g. Sarah M."
                />
              </div>
              
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Rating (1-5) *</label>
                <input 
                  required
                  type="number" 
                  min="1"
                  max="5"
                  value={editingTestimonial?.rating || 5}
                  onChange={(e: any) => setEditingTestimonial(prev => ({ ...prev!, rating: Number(e.target.value) }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Testimonial Text *</label>
              <textarea 
                required
                value={editingTestimonial?.text || ''}
                onChange={(e: any) => setEditingTestimonial(prev => ({ ...prev!, text: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '100px', fontFamily: 'inherit' }}
                placeholder="What did the patient say..."
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={editingTestimonial?.isVideo || false}
                  onChange={(e: any) => setEditingTestimonial(prev => ({ ...prev!, isVideo: e.target.checked }))}
                  style={{ width: '18px', height: '18px', accentColor: '#00A676' }}
                />
                Show Play Video Overlay Icon on Image
              </label>
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Testimonial Image URL *</label>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input 
                  required
                  type="text" 
                  value={editingTestimonial?.image || ''}
                  onChange={(e: any) => setEditingTestimonial(prev => ({ ...prev!, image: e.target.value }))}
                  style={{ flex: 1, padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                  placeholder="Enter image URL or upload file"
                />
                
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', padding: '0 1.5rem', borderRadius: '8px', cursor: 'pointer' }}
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>

              {editingTestimonial?.image && (
                <div style={{ width: '150px', height: '150px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333', marginTop: '1rem', position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={editingTestimonial.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {editingTestimonial.isVideo && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
                      ▶
                    </div>
                  )}
                </div>
              )}
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
                Save Testimonial
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
