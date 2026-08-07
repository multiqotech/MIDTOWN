'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, UserCircle2 } from 'lucide-react';
import { api } from '../../lib/api';

const CLOUDINARY_UPLOAD_PRESET = 'midtown'; // Unsigned preset
const CLOUDINARY_CLOUD_NAME = 'dkhyb43ae';

interface Doctor {
  _id?: string;
  name: string;
  specialist: string;
  qualification: string;
  extra?: string;
  description: string;
  imageUrl: string;
}

export default function DoctorsManager() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploading, setUploading] = useState(false);
  const [uploadPreset, setUploadPreset] = useState(CLOUDINARY_UPLOAD_PRESET);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await api.get('/api/doctors');
      setDoctors(data);
    } catch (err) {
      console.error(err);
      showMessage('Failed to load doctors', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const openNewDoctorForm = () => {
    setEditingDoctor({
      name: '',
      specialist: '',
      qualification: '',
      extra: '',
      description: '',
      imageUrl: '',
    });
    setIsFormOpen(true);
  };

  const openEditDoctorForm = (doctor: Doctor) => {
    setEditingDoctor({ ...doctor });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingDoctor(null);
    setIsFormOpen(false);
  };

  const handleSaveDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctor) return;

    try {
      if (editingDoctor._id) {
        await api.put(`/api/doctors/${editingDoctor._id}`, editingDoctor);
        showMessage('Doctor updated successfully!', 'success');
      } else {
        await api.post('/api/doctors', editingDoctor);
        showMessage('Doctor added successfully!', 'success');
      }
      closeForm();
      fetchDoctors();
    } catch (err) {
      console.error(err);
      showMessage('Failed to save doctor', 'error');
    }
  };

  const handleDeleteDoctor = async (id: string | undefined) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this doctor?')) return;

    try {
      await api.delete(`/api/doctors/${id}`);
      showMessage('Doctor deleted successfully!', 'success');
      fetchDoctors();
    } catch (err) {
      console.error(err);
      showMessage('Failed to delete doctor', 'error');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingDoctor) return;

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
        setEditingDoctor({ ...editingDoctor, imageUrl: data.secure_url });
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

  if (loading) return <div style={{ color: '#00A676' }}>Loading doctors...</div>;

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
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Manage Doctors</h3>
            <button 
              onClick={openNewDoctorForm}
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
              <Plus size={18} /> Add Doctor
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {doctors.map((doctor) => (
              <div key={doctor._id} style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a', overflow: 'hidden' }}>
                <div style={{ height: '240px', width: '100%', position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={doctor.imageUrl} alt={doctor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openEditDoctorForm(doctor)} style={{ background: '#fff', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#111' }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteDoctor(doctor._id)} style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.25rem', color: '#fff', fontSize: '1.1rem' }}>{doctor.name}</h4>
                  <p style={{ margin: '0 0 0.5rem', color: '#00A676', fontSize: '0.9rem', fontWeight: '500' }}>{doctor.specialist}</p>
                  <p style={{ margin: '0 0 1rem', color: '#888', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {doctor.description || 'No description provided.'}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', color: '#666', fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><UserCircle2 size={14} /> {doctor.qualification}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {doctors.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#888', backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a' }}>
                No doctors found. Create one to get started!
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2.5rem', border: '1px solid #2a2a2a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>
              {editingDoctor?._id ? 'Edit Doctor' : 'Add New Doctor'}
            </h3>
            <button 
              onClick={closeForm}
              style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveDoctor} style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Doctor Name *</label>
                <input 
                  required
                  type="text" 
                  value={editingDoctor?.name || ''}
                  onChange={(e) => setEditingDoctor(prev => ({ ...prev!, name: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                  placeholder="e.g. Dr. John Doe"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Specialist *</label>
                <input 
                  required
                  type="text" 
                  value={editingDoctor?.specialist || ''}
                  onChange={(e) => setEditingDoctor(prev => ({ ...prev!, specialist: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                  placeholder="e.g. Cardiology"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Qualification *</label>
                <input 
                  required
                  type="text" 
                  value={editingDoctor?.qualification || ''}
                  onChange={(e) => setEditingDoctor(prev => ({ ...prev!, qualification: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                  placeholder="e.g. MD, MBBS"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Extra (Optional)</label>
                <input 
                  type="text" 
                  value={editingDoctor?.extra || ''}
                  onChange={(e) => setEditingDoctor(prev => ({ ...prev!, extra: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                  placeholder="e.g. 15 Years Experience"
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Description *</label>
              <textarea 
                required
                value={editingDoctor?.description || ''}
                onChange={(e) => setEditingDoctor(prev => ({ ...prev!, description: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '120px', fontFamily: 'inherit' }}
                placeholder="Doctor's biography and experience..."
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Doctor Image URL *</label>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input 
                  required
                  type="text" 
                  value={editingDoctor?.imageUrl || ''}
                  onChange={(e) => setEditingDoctor(prev => ({ ...prev!, imageUrl: e.target.value }))}
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

              {editingDoctor?.imageUrl && (
                <div style={{ width: '150px', height: '150px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333', marginTop: '1rem' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={editingDoctor.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                Save Doctor
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
