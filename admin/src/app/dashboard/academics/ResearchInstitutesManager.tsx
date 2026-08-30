'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { api } from '../../../lib/api';

const CLOUDINARY_UPLOAD_PRESET = 'midtown';
const CLOUDINARY_CLOUD_NAME = 'dkhyb43ae';

export default function ResearchInstitutesManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await api.get('/api/discover/research-institutes');
      setItems(data);
    } catch (err) {
      console.error(err);
      showMessage('Failed to load items', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const openNewForm = () => {
    setEditingItem({
      title: '',
      slug: '',
      category: '',
      description: '',
      eligibility: '',
      durationOrDate: '',
      location: '',
      status: '',
      image: '',
      contactInfo: '',
      statistics: [],
      displayOrder: 0,
      publishedStatus: 'published',
      type: 'research-institute'
    });
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
        await api.put(`/api/discover/research-institutes/${editingItem._id}`, editingItem);
        showMessage('Updated successfully!', 'success');
      } else {
        await api.post('/api/discover/research-institutes', editingItem);
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
      await api.delete(`/api/discover/research-institutes/${id}`);
      showMessage('Deleted successfully!', 'success');
      fetchItems();
    } catch (err) {
      console.error(err);
      showMessage('Failed to delete', 'error');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

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
        setEditingItem({ ...editingItem, image: data.secure_url });
        showMessage('Image uploaded successfully!', 'success');
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

  const handleArrayChange = (field: string, idx: number, key: string, value: string) => {
    const newArr = [...(editingItem[field] || [])];
    newArr[idx] = { ...newArr[idx], [key]: value };
    setEditingItem({ ...editingItem, [field]: newArr });
  };

  const addArrayItem = (field: string, item: any) => {
    const newArr = [...(editingItem[field] || [])];
    newArr.push(item);
    setEditingItem({ ...editingItem, [field]: newArr });
  };

  const removeArrayItem = (field: string, idx: number) => {
    const newArr = [...(editingItem[field] || [])];
    newArr.splice(idx, 1);
    setEditingItem({ ...editingItem, [field]: newArr });
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
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Research Institutes</h3>
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
              <Plus size={18} /> Add Institute
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {items.map((item) => (
              <div key={item._id} style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a', overflow: 'hidden' }}>
                <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                  {item.image ? (
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>No Image</div>
                  )}
                  <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openEditForm(item)} style={{ background: '#fff', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#111' }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(item._id)} style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#fff', fontSize: '1.1rem' }}>{item.title}</h4>
                  <p style={{ margin: '0 0 0.5rem', color: '#00A676', fontSize: '0.9rem' }}>Slug: {item.slug}</p>
                  <p style={{ margin: '0 0 0.5rem', color: '#888', fontSize: '0.9rem' }}>Status: {item.publishedStatus}</p>
                </div>
              </div>
            ))}
            
            {items.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#888', backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a' }}>
                No institutes found. Create one to get started!
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2.5rem', border: '1px solid #2a2a2a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>
              {editingItem?._id ? 'Edit Institute' : 'Add New Institute'}
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
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Title *</label>
                <input 
                  required
                  type="text" 
                  value={editingItem?.title || ''}
                  onChange={(e: any) => setEditingItem(prev => ({ ...prev!, title: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Slug *</label>
                <input 
                  required
                  type="text" 
                  value={editingItem?.slug || ''}
                  onChange={(e: any) => setEditingItem(prev => ({ ...prev!, slug: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Category</label>
                <input 
                  type="text" 
                  value={editingItem?.category || ''}
                  onChange={(e: any) => setEditingItem(prev => ({ ...prev!, category: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Location</label>
                <input 
                  type="text" 
                  value={editingItem?.location || ''}
                  onChange={(e: any) => setEditingItem(prev => ({ ...prev!, location: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Description *</label>
              <textarea 
                required
                value={editingItem?.description || ''}
                onChange={(e: any) => setEditingItem(prev => ({ ...prev!, description: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '120px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Eligibility</label>
                <input 
                  type="text" 
                  value={editingItem?.eligibility || ''}
                  onChange={(e: any) => setEditingItem(prev => ({ ...prev!, eligibility: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Duration or Date</label>
                <input 
                  type="text" 
                  value={editingItem?.durationOrDate || ''}
                  onChange={(e: any) => setEditingItem(prev => ({ ...prev!, durationOrDate: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Contact Info</label>
                <input 
                  type="text" 
                  value={editingItem?.contactInfo || ''}
                  onChange={(e: any) => setEditingItem(prev => ({ ...prev!, contactInfo: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Status</label>
                <input 
                  type="text" 
                  value={editingItem?.status || ''}
                  onChange={(e: any) => setEditingItem(prev => ({ ...prev!, status: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Image URL</label>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input 
                  type="text" 
                  value={editingItem?.image || ''}
                  onChange={(e: any) => setEditingItem(prev => ({ ...prev!, image: e.target.value }))}
                  style={{ flex: 1, padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
                
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', padding: '0 1.5rem', borderRadius: '8px', cursor: 'pointer' }}
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              {editingItem?.image && (
                <div style={{ width: '150px', height: '150px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333', marginTop: '1rem' }}>
                  <img src={editingItem.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Published Status</label>
                <select 
                  value={editingItem?.publishedStatus || 'published'}
                  onChange={(e: any) => setEditingItem(prev => ({ ...prev!, publishedStatus: e.target.value }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Display Order</label>
                <input 
                  type="number" 
                  value={editingItem?.displayOrder || 0}
                  onChange={(e: any) => setEditingItem(prev => ({ ...prev!, displayOrder: parseInt(e.target.value) || 0 }))}
                  style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ border: '1px solid #333', padding: '1rem', borderRadius: '8px' }}>
              <label style={{ display: 'block', color: '#fff', fontSize: '1rem', marginBottom: '1rem' }}>Statistics</label>
              {(editingItem?.statistics || []).map((item: any, idx: number) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                      <input 
                        type="text"
                        value={item.label || ''}
                        onChange={(e: any) => handleArrayChange('statistics', idx, 'label', e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', border: '1px solid #444', borderRadius: '4px', color: '#fff', marginBottom: '0.5rem' }}
                        placeholder="Label"
                      />
                      <input 
                        type="text"
                        value={item.value || ''}
                        onChange={(e: any) => handleArrayChange('statistics', idx, 'value', e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', border: '1px solid #444', borderRadius: '4px', color: '#fff', marginBottom: '0.5rem' }}
                        placeholder="Value"
                      />
                  </div>
                  <button type="button" onClick={() => removeArrayItem('statistics', idx)} style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('statistics', { label: '', value: '' })} style={{ background: '#00A676', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer', color: '#fff' }}>
                Add Statistic
              </button>
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
