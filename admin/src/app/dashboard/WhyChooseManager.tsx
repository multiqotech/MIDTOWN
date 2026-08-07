'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { Trash2, Plus, Upload, Save, AlertCircle } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  imageUrl: string;
}

interface WhyChooseData {
  description: string;
  heroFeature: Feature;
  features: Feature[];
}

export default function WhyChooseManager() {
  const [data, setData] = useState<WhyChooseData>({
    description: '',
    heroFeature: { title: '', description: '', imageUrl: '' },
    features: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [uploadingState, setUploadingState] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/why-choose');
      setData(res);
    } catch (error) {
      console.error('Failed to fetch why choose data:', error);
      setMessage({ type: 'error', text: 'Failed to load data.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });
      await api.put('/api/why-choose', data);
      setMessage({ type: 'success', text: 'Section updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Failed to save data:', error);
      setMessage({ type: 'error', text: 'Failed to save changes.' });
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>, fieldKey: string, featureIndex?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingState(prev => ({ ...prev, [fieldKey]: true }));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'midtown_preset'); // your cloudinary preset

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dkhyb43ae/image/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await res.json();
      const imageUrl = uploadData.secure_url;

      if (fieldKey === 'hero') {
        setData(prev => ({ ...prev, heroFeature: { ...prev.heroFeature, imageUrl } }));
      } else if (featureIndex !== undefined) {
        const newFeatures = [...data.features];
        newFeatures[featureIndex].imageUrl = imageUrl;
        setData({ ...data, features: newFeatures });
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingState(prev => ({ ...prev, [fieldKey]: false }));
    }
  };

  const addFeature = () => {
    setData({
      ...data,
      features: [...data.features, { title: 'New Feature', description: 'Description', imageUrl: '' }]
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...data.features];
    newFeatures.splice(index, 1);
    setData({ ...data, features: newFeatures });
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...data.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setData({ ...data, features: newFeatures });
  };

  if (loading) return <div style={{ color: '#00A676' }}>Loading why choose us data...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Why Choose Us - Section Manager</h3>
        <button 
          onClick={handleSave} 
          disabled={saving}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#00A676',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.25rem',
            borderRadius: '6px',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            opacity: saving ? 0.7 : 1
          }}
        >
          {saving ? 'Saving...' : <><Save size={18} /> Save Changes</>}
        </button>
      </div>

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
          {message.type === 'success' ? <AlertCircle size={20} /> : null}
          {message.text}
        </div>
      )}

      {/* Main Section Info */}
      <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2rem', border: '1px solid #2a2a2a' }}>
        <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.1rem', color: '#fff' }}>Main Section Description</h3>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>Subtitle Text</label>
          <textarea
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="At Midtown Hospital..."
            style={{ 
              width: '100%', 
              padding: '1rem', 
              backgroundColor: '#111', 
              border: '1px solid #333', 
              borderRadius: '8px', 
              color: '#fff',
              outline: 'none',
              minHeight: '100px',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>

      {/* Hero Feature */}
      <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2rem', border: '1px solid #2a2a2a' }}>
        <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.1rem', color: '#fff' }}>Hero Card (Large Left Card)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>Title</label>
            <input
              type="text"
              value={data.heroFeature.title}
              onChange={(e) => setData({ ...data, heroFeature: { ...data.heroFeature, title: e.target.value } })}
              style={{ width: '100%', padding: '1rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', marginBottom: '1.5rem' }}
            />
            
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>Description</label>
            <textarea
              value={data.heroFeature.description}
              onChange={(e) => setData({ ...data, heroFeature: { ...data.heroFeature, description: e.target.value } })}
              style={{ width: '100%', padding: '1rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '100px', fontFamily: 'inherit' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>Background Image</label>
            {data.heroFeature.imageUrl ? (
              <div style={{ position: 'relative', width: '100%', height: '160px', marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.heroFeature.imageUrl} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div style={{ width: '100%', height: '160px', backgroundColor: '#111', border: '1px dashed #444', borderRadius: '8px', marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                <AlertCircle size={24} style={{ marginBottom: '0.5rem' }} />
                <span>No image</span>
              </div>
            )}
            
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', backgroundColor: '#222', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', border: '1px solid #333' }}>
              {uploadingState['hero'] ? 'Uploading...' : <><Upload size={16} /> Upload New Image</>}
              <input 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={(e) => uploadImage(e, 'hero')}
                disabled={uploadingState['hero']}
              />
            </label>
            <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#666' }}>Alternatively, paste an image URL:</div>
            <input
              type="text"
              value={data.heroFeature.imageUrl}
              onChange={(e) => setData({ ...data, heroFeature: { ...data.heroFeature, imageUrl: e.target.value } })}
              placeholder="https://..."
              style={{ width: '100%', padding: '0.75rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '6px', color: '#fff', outline: 'none', marginTop: '0.5rem', fontSize: '0.9rem' }}
            />
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2rem', border: '1px solid #2a2a2a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #2a2a2a', paddingBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Feature Cards (Small Cards)</h3>
          <button 
            onClick={addFeature}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(0, 166, 118, 0.1)', color: '#00A676', border: '1px solid rgba(0, 166, 118, 0.2)', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}
          >
            <Plus size={16} /> Add Feature
          </button>
        </div>
        
        <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '2rem' }}>
          Add 4 features for a grid layout. If you add more than 4, they will be displayed in a slider.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {data.features.map((feature, index) => (
            <div key={index} style={{ padding: '1.5rem', border: '1px solid #2a2a2a', borderRadius: '8px', backgroundColor: '#111', display: 'flex', gap: '2rem', position: 'relative', flexWrap: 'wrap' }}>
              <button 
                onClick={() => removeFeature(index)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#ff4d4f', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '4px' }}
                title="Remove Feature"
              >
                <Trash2 size={18} />
              </button>
              
              <div style={{ flex: '1 1 300px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature #{index + 1}</label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => updateFeature(index, 'title', e.target.value)}
                  placeholder="Title"
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '6px', color: '#fff', outline: 'none', marginBottom: '1rem', fontWeight: '600' }}
                />
                <textarea
                  rows={2}
                  value={feature.description}
                  onChange={(e) => updateFeature(index, 'description', e.target.value)}
                  placeholder="Description"
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '6px', color: '#fff', outline: 'none', fontSize: '0.9rem', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ flex: '0 0 200px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Image</label>
                {feature.imageUrl ? (
                  <div style={{ position: 'relative', width: '100%', height: '100px', marginBottom: '0.5rem', borderRadius: '6px', overflow: 'hidden', border: '1px solid #333' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={feature.imageUrl} alt="Feature" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div style={{ width: '100%', height: '100px', backgroundColor: '#1A1A1A', border: '1px dashed #444', borderRadius: '6px', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                    <span style={{ fontSize: '0.75rem' }}>No image</span>
                  </div>
                )}
                
                <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.25rem', backgroundColor: '#222', color: '#ddd', padding: '0.5rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', border: '1px solid #333', marginBottom: '0.5rem', width: '100%' }}>
                  {uploadingState[`feature_${index}`] ? 'Uploading...' : 'Upload Image'}
                  <input 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    onChange={(e) => uploadImage(e, `feature_${index}`, index)}
                    disabled={uploadingState[`feature_${index}`]}
                  />
                </label>
                <input
                  type="text"
                  value={feature.imageUrl}
                  onChange={(e) => updateFeature(index, 'imageUrl', e.target.value)}
                  placeholder="Or URL..."
                  style={{ width: '100%', padding: '0.5rem', backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '4px', color: '#fff', outline: 'none', fontSize: '0.75rem' }}
                />
              </div>
            </div>
          ))}
          
          {data.features.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#666', border: '1px dashed #333', borderRadius: '8px', backgroundColor: '#111' }}>
              No features added. Click "Add Feature" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
