'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { api } from '../../../lib/api';

const CLOUDINARY_UPLOAD_PRESET = 'midtown';
const CLOUDINARY_CLOUD_NAME = 'dkhyb43ae';

interface MedicalCouncilMember {
  _id?: string;
  name: string;
  slug: string;
  imageUrl: string;
  medicalQualifications: string;
  specialty: string;
  designation: string; // Council Position
  shortBiography: string;
  fullBiography: string;
  experience: string; // Clinical
  areasOfExpertise: string;
  researchInterests: string;
  publications: string;
  awards: string;
  responsibilities: string; // Council
  displayOrder: number;
  publishedStatus: boolean;
}

export default function MedicalCouncilManager() {
  const [members, setMembers] = useState<MedicalCouncilMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<MedicalCouncilMember | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploading, setUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await api.get('/api/discover/medical-council');
      setMembers(data || []);
    } catch (err) {
      console.error(err);
      showMessage('Failed to load members', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const openNewForm = () => {
    setEditingMember({
      name: '',
      slug: '',
      imageUrl: '',
      medicalQualifications: '',
      specialty: '',
      designation: '',
      shortBiography: '',
      fullBiography: '',
      experience: '',
      areasOfExpertise: '',
      researchInterests: '',
      publications: '',
      awards: '',
      responsibilities: '',
      displayOrder: 0,
      publishedStatus: true,
    });
    setIsFormOpen(true);
  };

  const openEditForm = (member: MedicalCouncilMember) => {
    setEditingMember({ ...member });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingMember(null);
    setIsFormOpen(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    try {
      if (editingMember._id) {
        await api.put(`/api/discover/medical-council/${editingMember._id}`, editingMember);
        showMessage('Updated successfully!', 'success');
      } else {
        await api.post('/api/discover/medical-council', editingMember);
        showMessage('Added successfully!', 'success');
      }
      closeForm();
      fetchMembers();
    } catch (err) {
      console.error(err);
      showMessage('Failed to save', 'error');
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this?')) return;

    try {
      await api.delete(`/api/discover/medical-council/${id}`);
      showMessage('Deleted successfully!', 'success');
      fetchMembers();
    } catch (err) {
      console.error(err);
      showMessage('Failed to delete', 'error');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingMember) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.secure_url) {
        setEditingMember({ ...editingMember, imageUrl: data.secure_url });
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

  if (loading) return <div style={{ color: '#00A676' }}>Loading...</div>;

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
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Medical Council</h3>
            <button 
              onClick={openNewForm}
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
              <Plus size={18} /> Add Member
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {members.map((member) => (
              <div key={member._id} style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a', overflow: 'hidden' }}>
                <div style={{ height: '240px', width: '100%', position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>No Image</div>
                  )}
                  <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openEditForm(member)} style={{ background: '#fff', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#111' }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(member._id)} style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.25rem', color: '#fff', fontSize: '1.1rem' }}>{member.name}</h4>
                  <p style={{ margin: '0 0 0.5rem', color: '#00A676', fontSize: '0.9rem', fontWeight: '500' }}>{member.designation} - {member.specialty}</p>
                  <p style={{ margin: '0 0 1rem', color: '#888', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {member.shortBiography || 'No biography provided.'}
                  </p>
                </div>
              </div>
            ))}
            
            {members.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#888', backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a' }}>
                No records found. Create one to get started!
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2.5rem', border: '1px solid #2a2a2a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: '0', color: '#fff', fontSize: '1.25rem' }}>
              {editingMember?._id ? 'Edit Member' : 'Add New Member'}
            </h3>
            <button 
              onClick={closeForm}
              style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Name *</label>
                <input 
                  required
                  type="text" 
                  value={editingMember?.name || ''}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, name: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Slug *</label>
                <input 
                  required
                  type="text" 
                  value={editingMember?.slug || ''}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, slug: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Council Position (Designation) *</label>
                <input 
                  required
                  type="text" 
                  value={editingMember?.designation || ''}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, designation: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Specialty *</label>
                <input 
                  required
                  type="text" 
                  value={editingMember?.specialty || ''}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, specialty: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Medical Qualifications *</label>
                <input 
                  required
                  type="text" 
                  value={editingMember?.medicalQualifications || ''}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, medicalQualifications: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Display Order</label>
                <input 
                  type="number" 
                  value={editingMember?.displayOrder || 0}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, displayOrder: parseInt(e.target.value) || 0 }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <input 
                  type="checkbox" 
                  checked={editingMember?.publishedStatus ?? true}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, publishedStatus: e.target.checked }))}
                /> Published Status
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Short Biography</label>
                <textarea 
                  value={editingMember?.shortBiography || ''}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, shortBiography: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px', fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Full Biography</label>
                <textarea 
                  value={editingMember?.fullBiography || ''}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, fullBiography: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '120px', fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Clinical Experience</label>
                <textarea 
                  value={editingMember?.experience || ''}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, experience: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px', fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Areas of Expertise</label>
                <textarea 
                  value={editingMember?.areasOfExpertise || ''}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, areasOfExpertise: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px', fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Research Interests</label>
                <textarea 
                  value={editingMember?.researchInterests || ''}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, researchInterests: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px', fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Publications</label>
                <textarea 
                  value={editingMember?.publications || ''}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, publications: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px', fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Awards</label>
                <textarea 
                  value={editingMember?.awards || ''}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, awards: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px', fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Council Responsibilities</label>
                <textarea 
                  value={editingMember?.responsibilities || ''}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, responsibilities: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px', fontFamily: 'inherit' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Image URL</label>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input 
                  type="text" 
                  value={editingMember?.imageUrl || ''}
                  onChange={(e: any) => setEditingMember(prev => ({ ...prev!, imageUrl: e.target.value }))}
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

              {editingMember?.imageUrl && (
                <div style={{ width: '150px', height: '150px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333', marginTop: '1rem' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={editingMember.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
