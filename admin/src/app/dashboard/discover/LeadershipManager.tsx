'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { api } from '../../../lib/api';

const CLOUDINARY_UPLOAD_PRESET = 'midtown';
const CLOUDINARY_CLOUD_NAME = 'dkhyb43ae';

export default function LeadershipManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploading, setUploading] = useState(false);
  const [currentUploadField, setCurrentUploadField] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await api.get('/api/discover/leadership');
      setItems(data);
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

  const openNewForm = () => {
    setEditingItem({ name: '', slug: '', profileImage: '', designation: '', shortBiography: '', fullBiography: '', education: [], experience: [], achievements: [], leadershipMessage: '', publishedStatus: '' });
    setIsFormOpen(true);
  };

  const openEditForm = (item: any) => {
    setEditingItem({ ...item });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingItem(null);
    setIsFormOpen(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      if (editingItem._id) {
        await api.put(`/api/discover/leadership/${editingItem._id}`, editingItem);
        showMessage('Updated successfully!', 'success');
      } else {
        await api.post('/api/discover/leadership', editingItem);
        showMessage('Added successfully!', 'success');
      }
      closeForm();
      fetchItems();
    } catch (err) {
      console.error(err);
      showMessage('Failed to save', 'error');
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await api.delete(`/api/discover/leadership/${id}`);
      showMessage('Deleted successfully!', 'success');
      fetchItems();
    } catch (err) {
      console.error(err);
      showMessage('Failed to delete', 'error');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem || !currentUploadField) return;

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
        setEditingItem({ ...editingItem, [currentUploadField]: data.secure_url });
        showMessage('File uploaded successfully!', 'success');
      } else {
        showMessage('Cloudinary Error', 'error');
      }
    } catch (err: any) {
      showMessage(`Network error: ${err.message}`, 'error');
    } finally {
      setUploading(false);
      setCurrentUploadField('');
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

      {!isFormOpen ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Manage Leadership Members</h3>
            <button onClick={openNewForm} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#00A676', color: 'white', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '6px', cursor: 'pointer' }}>
              <Plus size={18} /> Add New
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {items.map((item) => (
              <div key={item._id} style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a', overflow: 'hidden', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem', color: '#fff' }}>{item.name}</h4>
                    <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>{item.slug}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openEditForm(item)} style={{ background: '#333', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(item._id)} style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2.5rem', border: '1px solid #2a2a2a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, color: '#fff' }}>{editingItem?._id ? 'Edit' : 'Add'} Leadership Members</h3>
            <button onClick={closeForm} style={{ background: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer' }}>Cancel</button>
          </div>

          <form onSubmit={handleSave} style={{ display: 'grid', gap: '1.5rem' }}>
            
            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Name *</label>
              <textarea 
                value={editingItem?.name || ''}
                onChange={(e) => setEditingItem((prev: any) => ({ ...prev!, name: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Slug *</label>
              <textarea 
                value={editingItem?.slug || ''}
                onChange={(e) => setEditingItem((prev: any) => ({ ...prev!, slug: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Profile Image URL *</label>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input 
                  type="text" 
                  value={editingItem?.profileImage || ''}
                  onChange={(e) => setEditingItem((prev: any) => ({ ...prev!, profileImage: e.target.value }))}
                  style={{ flex: 1, padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                  placeholder="Enter URL or upload file"
                />
                <button 
                  type="button"
                  onClick={() => { setCurrentUploadField('profileImage'); fileInputRef.current?.click(); }}
                  style={{ backgroundColor: '#222', color: '#fff', border: '1px solid #333', padding: '0 1.5rem', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Upload
                </button>
              </div>
              {editingItem?.profileImage && (
                <div style={{ width: '150px', height: '150px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
                  <img src={editingItem.profileImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Designation *</label>
              <textarea 
                value={editingItem?.designation || ''}
                onChange={(e) => setEditingItem((prev: any) => ({ ...prev!, designation: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Short Biography *</label>
              <textarea 
                value={editingItem?.shortBiography || ''}
                onChange={(e) => setEditingItem((prev: any) => ({ ...prev!, shortBiography: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Full Biography *</label>
              <textarea 
                value={editingItem?.fullBiography || ''}
                onChange={(e) => setEditingItem((prev: any) => ({ ...prev!, fullBiography: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Education (comma separated) *</label>
              <textarea 
                value={(editingItem?.education || []).join(', ')}
                onChange={(e) => setEditingItem((prev: any) => ({ ...prev!, education: e.target.value.split(',').map(s=>s.trim()) }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Experience (comma separated) *</label>
              <textarea 
                value={(editingItem?.experience || []).join(', ')}
                onChange={(e) => setEditingItem((prev: any) => ({ ...prev!, experience: e.target.value.split(',').map(s=>s.trim()) }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Achievements (comma separated) *</label>
              <textarea 
                value={(editingItem?.achievements || []).join(', ')}
                onChange={(e) => setEditingItem((prev: any) => ({ ...prev!, achievements: e.target.value.split(',').map(s=>s.trim()) }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Leadership Message *</label>
              <textarea 
                value={editingItem?.leadershipMessage || ''}
                onChange={(e) => setEditingItem((prev: any) => ({ ...prev!, leadershipMessage: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Published Status (published/draft) *</label>
              <textarea 
                value={editingItem?.publishedStatus || ''}
                onChange={(e) => setEditingItem((prev: any) => ({ ...prev!, publishedStatus: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>


            <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={closeForm} style={{ background: 'transparent', color: '#aaa', border: '1px solid #333', padding: '0.75rem 2rem', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ backgroundColor: '#00A676', color: '#fff', border: 'none', padding: '0.75rem 2.5rem', borderRadius: '6px', cursor: 'pointer' }}>Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
