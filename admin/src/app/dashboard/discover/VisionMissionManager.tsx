'use client';
import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { api } from '../../../lib/api';

const CLOUDINARY_UPLOAD_PRESET = 'midtown';
const CLOUDINARY_CLOUD_NAME = 'dkhyb43ae';

export default function VisionMissionManager() {
  const [data, setData] = useState<any>({ heroTitle: '', heroSubtitle: '', heroImage: '', vision: '', mission: '', healthcarePhilosophy: '', missionPillars: [], coreValues: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploading, setUploading] = useState(false);
  const [currentUploadField, setCurrentUploadField] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/api/discover/vision-mission');
      if (res) setData(res);
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
    setSaving(true);
    try {
      await api.put('/api/discover/vision-mission', data);
      showMessage('Saved successfully!', 'success');
    } catch (err) {
      console.error(err);
      showMessage('Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUploadField) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      
      if (result.secure_url) {
        setData({ ...data, [currentUploadField]: result.secure_url });
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

  const handleArrayChange = (field: string, idx: number, key: string, value: string) => {
    const newArr = [...(data[field] || [])];
    newArr[idx] = { ...newArr[idx], [key]: value };
    setData({ ...data, [field]: newArr });
  };

  const addArrayItem = (field: string, item: any) => {
    const newArr = [...(data[field] || [])];
    newArr.push(item);
    setData({ ...data, [field]: newArr });
  };

  const removeArrayItem = (field: string, idx: number) => {
    const newArr = [...(data[field] || [])];
    newArr.splice(idx, 1);
    setData({ ...data, [field]: newArr });
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
        <h3 style={{ margin: '0 0 2rem', color: '#fff' }}>Vision & Mission</h3>
        
        <form onSubmit={handleSave} style={{ display: 'grid', gap: '1.5rem' }}>
          
            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Hero Title *</label>
              <textarea 
                value={data.heroTitle || ''}
                onChange={(e) => setData((prev: any) => ({ ...prev!, heroTitle: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Hero Subtitle *</label>
              <textarea 
                value={data.heroSubtitle || ''}
                onChange={(e) => setData((prev: any) => ({ ...prev!, heroSubtitle: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Hero Image URL *</label>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input 
                  type="text" 
                  value={data.heroImage || ''}
                  onChange={(e) => setData((prev: any) => ({ ...prev!, heroImage: e.target.value }))}
                  style={{ flex: 1, padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                  placeholder="Enter URL or upload file"
                />
                <button 
                  type="button"
                  onClick={() => { setCurrentUploadField('heroImage'); fileInputRef.current?.click(); }}
                  style={{ backgroundColor: '#222', color: '#fff', border: '1px solid #333', padding: '0 1.5rem', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Upload
                </button>
              </div>
              {data.heroImage && (
                <div style={{ width: '150px', height: '150px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
                  <img src={data.heroImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Vision *</label>
              <textarea 
                value={data.vision || ''}
                onChange={(e) => setData((prev: any) => ({ ...prev!, vision: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Mission *</label>
              <textarea 
                value={data.mission || ''}
                onChange={(e) => setData((prev: any) => ({ ...prev!, mission: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Healthcare Philosophy *</label>
              <textarea 
                value={data.healthcarePhilosophy || ''}
                onChange={(e) => setData((prev: any) => ({ ...prev!, healthcarePhilosophy: e.target.value }))}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px' }}
              />
            </div>

            <div style={{ border: '1px solid #333', padding: '1rem', borderRadius: '8px' }}>
              <label style={{ display: 'block', color: '#fff', fontSize: '1rem', marginBottom: '1rem' }}>Mission Pillars</label>
              {(data.missionPillars || []).map((item: any, idx: number) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    
                      <input 
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => handleArrayChange('missionPillars', idx, 'title', e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', border: '1px solid #444', borderRadius: '4px', color: '#fff', marginBottom: '0.5rem' }}
                        placeholder="Title"
                      />

                      <input 
                        type="text"
                        value={item.description || ''}
                        onChange={(e) => handleArrayChange('missionPillars', idx, 'description', e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', border: '1px solid #444', borderRadius: '4px', color: '#fff', marginBottom: '0.5rem' }}
                        placeholder="Description"
                      />

                  </div>
                  <button type="button" onClick={() => removeArrayItem('missionPillars', idx)} style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('missionPillars', { title: '', description: '' })} style={{ background: '#00A676', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer', color: '#fff' }}>
                Add Item
              </button>
            </div>

            <div style={{ border: '1px solid #333', padding: '1rem', borderRadius: '8px' }}>
              <label style={{ display: 'block', color: '#fff', fontSize: '1rem', marginBottom: '1rem' }}>Core Values</label>
              {(data.coreValues || []).map((item: any, idx: number) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    
                      <input 
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => handleArrayChange('coreValues', idx, 'title', e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', border: '1px solid #444', borderRadius: '4px', color: '#fff', marginBottom: '0.5rem' }}
                        placeholder="Title"
                      />

                      <input 
                        type="text"
                        value={item.description || ''}
                        onChange={(e) => handleArrayChange('coreValues', idx, 'description', e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', border: '1px solid #444', borderRadius: '4px', color: '#fff', marginBottom: '0.5rem' }}
                        placeholder="Description"
                      />

                  </div>
                  <button type="button" onClick={() => removeArrayItem('coreValues', idx)} style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('coreValues', { title: '', description: '' })} style={{ background: '#00A676', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer', color: '#fff' }}>
                Add Item
              </button>
            </div>


          <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} />

          <button type="submit" disabled={saving} style={{ backgroundColor: '#00A676', color: '#fff', border: 'none', padding: '1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', marginTop: '1rem' }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
