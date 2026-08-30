'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { api } from '../../../lib/api';

export default function BoardCommitteesManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await api.get('/api/discover/board-committees');
      setItems(Array.isArray(data) ? data : (data.data || []));
    } catch (err) {
      console.error(err);
      showMessage('Failed to load Committees', 'error');
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
      name: '',
      description: '',
      members: '',
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
        await api.put(`/api/discover/board-committees/${editingItem._id}`, editingItem);
        showMessage('Committee updated successfully!', 'success');
      } else {
        await api.post('/api/discover/board-committees', editingItem);
        showMessage('Committee added successfully!', 'success');
      }
      closeForm();
      fetchItems();
    } catch (err) {
      console.error(err);
      showMessage('Failed to save Committee', 'error');
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this Committee?')) return;

    try {
      await api.delete(`/api/discover/board-committees/${id}`);
      showMessage('Committee deleted successfully!', 'success');
      fetchItems();
    } catch (err) {
      console.error(err);
      showMessage('Failed to delete Committee', 'error');
    }
  };

  if (loading) return <div style={{ color: '#00A676' }}>Loading Committees...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {message.text && (
        <div style={{ padding: '1rem 1.5rem', borderRadius: '8px', backgroundColor: message.type === 'success' ? 'rgba(0, 166, 118, 0.1)' : 'rgba(255, 77, 79, 0.1)', color: message.type === 'success' ? '#00A676' : '#ff4d4f' }}>
          {message.text}
        </div>
      )}

      {!isFormOpen ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Manage Committees</h3>
            <button 
              onClick={openNewForm}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#00A676', color: 'white', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
            >
              <Plus size={18} /> Add Committee
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map((item) => (
              <div key={item._id} style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a', padding: '1.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openEditForm(item)} style={{ background: '#333', border: 'none', borderRadius: '4px', padding: '0.4rem', cursor: 'pointer', color: '#fff' }}>
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.4rem', cursor: 'pointer', color: '#fff' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
                <p style={{ margin: '0 0 0.5rem 0', color: '#aaa', fontSize: '0.95rem' }}><strong>Committee Name:</strong> {item.name}</p>
                <p style={{ margin: '0 0 0.5rem 0', color: '#aaa', fontSize: '0.95rem' }}><strong>Description:</strong> {item.description}</p>
                <p style={{ margin: '0 0 0.5rem 0', color: '#aaa', fontSize: '0.95rem' }}><strong>Members (comma separated):</strong> {item.members}</p>
              </div>
            ))}
            
            {items.length === 0 && (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#888', backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a' }}>
                No Committees found. Create one to get started!
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2.5rem', border: '1px solid #2a2a2a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>
              {editingItem?._id ? 'Edit' : 'Add New'} Committee
            </h3>
            <button onClick={closeForm} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>Cancel</button>
          </div>

          <form onSubmit={handleSave} style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Committee Name *</label>
              <input 
                required
                type="text" 
                value={editingItem?.name || ''}
                onChange={(e: any) => setEditingItem(prev => ({ ...prev!, name: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Description *</label>
              <input 
                required
                type="text" 
                value={editingItem?.description || ''}
                onChange={(e: any) => setEditingItem(prev => ({ ...prev!, description: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Members (comma separated) *</label>
              <input 
                required
                type="text" 
                value={editingItem?.members || ''}
                onChange={(e: any) => setEditingItem(prev => ({ ...prev!, members: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={closeForm} style={{ backgroundColor: 'transparent', color: '#aaa', border: '1px solid #333', padding: '0.75rem 2rem', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ backgroundColor: '#00A676', color: '#fff', border: 'none', padding: '0.75rem 2.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Save Committee</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
