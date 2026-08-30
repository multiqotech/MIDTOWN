
'use client';
import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { api } from '../../../lib/api';
import ImageUpload from '../../../components/ImageUpload';

export default function MediaKitManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await api.get('/api/discover/media-kit');
      setItems(data);
    } catch (err) {
      console.error(err);
      showMessage('Failed to load items', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: string) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const openNewForm = () => {
    setEditingItem({ title: '', description: '', image: '', coverImage: '', });
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

  const handleSave = async (e: any) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      if (editingItem._id) {
        await api.put(`/api/discover/media-kit/${editingItem._id}`, editingItem);
        showMessage('Updated successfully!', 'success');
      } else {
        await api.post('/api/discover/media-kit', editingItem);
        showMessage('Added successfully!', 'success');
      }
      closeForm();
      fetchItems();
    } catch (err) {
      console.error(err);
      showMessage('Failed to save', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await api.delete(`/api/discover/media-kit/${id}`);
      showMessage('Deleted successfully!', 'success');
      fetchItems();
    } catch (err) {
      console.error(err);
      showMessage('Failed to delete', 'error');
    }
  };

  if (loading) return <div style={{ color: '#00A676' }}>Loading...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {message.text && (
        <div style={{ padding: '1rem 1.5rem', borderRadius: '8px', backgroundColor: message.type === 'success' ? 'rgba(0, 166, 118, 0.1)' : 'rgba(255, 77, 79, 0.1)', color: message.type === 'success' ? '#00A676' : '#ff4d4f', border: `1px solid ${message.type === 'success' ? 'rgba(0, 166, 118, 0.2)' : 'rgba(255, 77, 79, 0.2)'}`, display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '500' }}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : null}
          {message.text}
        </div>
      )}

      {!isFormOpen ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Manage MediaKit</h3>
            <button onClick={openNewForm} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#00A676', color: 'white', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
              <Plus size={18} /> Add Media Kit Resource
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {items.map((item) => (
              <div key={item._id} style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#fff', fontSize: '1.1rem' }}>{item.title || item.name}</h4>
                  <p style={{ margin: '0 0 1rem', color: '#888', fontSize: '0.9rem' }}>{item.description || item.summary || item.content?.substring(0, 50)}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button onClick={() => openEditForm(item)} style={{ background: '#333', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer', color: '#fff', flex: 1 }}>Edit</button>
                    <button onClick={() => handleDelete(item._id)} style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer', color: '#fff', flex: 1 }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#888', backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a' }}>
                No items found. Create one to get started!
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2.5rem', border: '1px solid #2a2a2a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>
              {editingItem?._id ? 'Edit' : 'Add'} Media Kit Resource
            </h3>
            <button onClick={closeForm} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.9rem' }}>Cancel</button>
          </div>

          <form onSubmit={handleSave} style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Title/Name *</label>
              <input required type="text" value={editingItem?.title || editingItem?.name || ''} onChange={(e) => setEditingItem((prev: any) => ({ ...prev, title: e.target.value, name: e.target.value }))} style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }} />
            </div>
            
            <ImageUpload label="Cover Image" value={editingItem?.image || editingItem?.logo || editingItem?.coverImage || ''} onChange={(url: string) => setEditingItem((prev: any) => ({ ...prev, image: url, logo: url, coverImage: url }))} />
            
            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Description / Content *</label>
              <textarea required value={editingItem?.description || editingItem?.content || editingItem?.summary || ''} onChange={(e) => setEditingItem((prev: any) => ({ ...prev, description: e.target.value, content: e.target.value, summary: e.target.value }))} style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '120px' }} />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', cursor: 'pointer' }}>
                <input type="checkbox" checked={editingItem?.published !== false} onChange={(e) => setEditingItem((prev: any) => ({ ...prev, published: e.target.checked }))} />
                Published
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={closeForm} style={{ backgroundColor: 'transparent', color: '#aaa', border: '1px solid #333', padding: '0.75rem 2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Cancel</button>
              <button type="submit" style={{ backgroundColor: '#00A676', color: '#fff', border: 'none', padding: '0.75rem 2.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
