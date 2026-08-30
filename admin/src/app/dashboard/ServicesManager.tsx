import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, UploadCloud, Link as LinkIcon, X, CheckCircle2, Stethoscope } from 'lucide-react';
import { api } from '../../lib/api';

const CLOUDINARY_UPLOAD_PRESET = 'midtown'; // Unsigned preset
const CLOUDINARY_CLOUD_NAME = 'dkhyb43ae';

interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  keyPoints: string[];
  suggestions: string[];
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploading, setUploading] = useState(false);
  const [uploadPreset, setUploadPreset] = useState(CLOUDINARY_UPLOAD_PRESET);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await api.get('/api/services');
      setServices(data);
    } catch (err) {
      console.error(err);
      showMessage('Failed to load services', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const openNewServiceForm = () => {
    setEditingService({
      id: '',
      name: '',
      description: '',
      imageUrl: '',
      keyPoints: [],
      suggestions: []
    });
    setIsFormOpen(true);
  };

  const openEditServiceForm = (service: Service) => {
    setEditingService({ ...service });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingService(null);
    setIsFormOpen(false);
  };

  const handleSaveService = async () => {
    if (!editingService) return;
    if (!editingService.name || !editingService.imageUrl) {
      showMessage('Service name and image are required.', 'error');
      return;
    }

    try {
      if (editingService.id) {
        await api.put(`/api/services/${editingService.id}`, editingService);
        showMessage('Service updated successfully!', 'success');
      } else {
        await api.post('/api/services', editingService);
        showMessage('Service created successfully!', 'success');
      }
      fetchServices();
      handleCloseForm();
    } catch (err) {
      showMessage('Failed to save service', 'error');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.delete(`/api/services/${id}`);
      showMessage('Service deleted successfully', 'success');
      fetchServices();
    } catch (err) {
      showMessage('Failed to delete service', 'error');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingService) return;

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
        setEditingService({ ...editingService, imageUrl: data.secure_url });
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

  const addArrayItem = (field: 'keyPoints' | 'suggestions') => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      [field]: [...editingService[field], '']
    });
  };

  const updateArrayItem = (field: 'keyPoints' | 'suggestions', index: number, value: string) => {
    if (!editingService) return;
    const newArray = [...editingService[field]];
    newArray[index] = value;
    setEditingService({
      ...editingService,
      [field]: newArray
    });
  };

  const removeArrayItem = (field: 'keyPoints' | 'suggestions', index: number) => {
    if (!editingService) return;
    const newArray = [...editingService[field]];
    newArray.splice(index, 1);
    setEditingService({
      ...editingService,
      [field]: newArray
    });
  };

  if (loading) return <div style={{ color: '#00A676' }}>Loading services...</div>;

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
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Manage Services</h3>
            <button 
              onClick={openNewServiceForm}
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
              <Plus size={18} /> Add Service
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {services.map((service) => (
              <div key={service.id} style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a', overflow: 'hidden' }}>
                <div style={{ height: '160px', width: '100%', position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={service.imageUrl} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openEditServiceForm(service)} style={{ background: '#fff', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#111' }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteService(service.id)} style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#fff', fontSize: '1.1rem' }}>{service.name}</h4>
                  <p style={{ margin: '0 0 1rem', color: '#888', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {service.description || 'No description provided.'}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', color: '#666', fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle2 size={14} /> {service.keyPoints.length} Points</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Stethoscope size={14} /> {service.suggestions.length} Suggestions</span>
                  </div>
                </div>
              </div>
            ))}
            
            {services.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#888', backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a' }}>
                No services found. Create one to get started!
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2.5rem', border: '1px solid #2a2a2a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>
              {editingService?.id ? 'Edit Service' : 'Create New Service'}
            </h3>
            <button onClick={handleCloseForm} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Service Name */}
            <div>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Service Name</label>
              <input 
                type="text" 
                value={editingService?.name || ''}
                onChange={(e: any) => setEditingService({ ...editingService!, name: e.target.value })}
                placeholder="e.g. Emergency Department"
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Description</label>
              <textarea 
                value={editingService?.description || ''}
                onChange={(e: any) => setEditingService({ ...editingService!, description: e.target.value })}
                placeholder="Detailed description of the service..."
                rows={4}
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', resize: 'vertical' }}
              />
            </div>

            {/* Image */}
            <div>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Service Image</label>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', padding: '0.5rem 1rem' }}>
                    <LinkIcon size={16} color="#666" />
                    <input 
                      type="url" 
                      value={editingService?.imageUrl || ''}
                      onChange={(e: any) => setEditingService({ ...editingService!, imageUrl: e.target.value })}
                      placeholder="Paste Image URL"
                      style={{ flex: 1, padding: '0.375rem 0', backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none' }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ height: '1px', flex: 1, backgroundColor: '#333' }}></div>
                    <span style={{ color: '#666', fontSize: '0.8rem', fontWeight: '600' }}>OR</span>
                    <div style={{ height: '1px', flex: 1, backgroundColor: '#333' }}></div>
                  </div>

                  <div>
                    <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#888' }}>Upload Preset:</span>
                      <input 
                        type="text" 
                        value={uploadPreset}
                        onChange={(e: any) => setUploadPreset(e.target.value)}
                        style={{ padding: '0.25rem 0.5rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '4px', color: '#fff', fontSize: '0.75rem', flex: 1 }}
                      />
                    </div>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      style={{ border: '1px dashed #444', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', backgroundColor: '#111', cursor: 'pointer' }}
                    >
                      <UploadCloud size={24} color="#666" style={{ margin: '0 auto 0.5rem' }} />
                      <p style={{ margin: 0, color: '#aaa', fontSize: '0.85rem' }}>{uploading ? 'Uploading...' : 'Upload Image to Cloudinary'}</p>
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" style={{ display: 'none' }} />
                    </div>
                  </div>
                </div>

                <div style={{ width: '200px', height: '150px', backgroundColor: '#0a0a0a', borderRadius: '8px', border: '1px solid #333', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {editingService?.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={editingService.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ color: '#555', fontSize: '0.85rem' }}>No Image</span>
                  )}
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #2a2a2a', margin: '1rem 0' }} />

            {/* Key Points */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#eee', fontSize: '1.1rem', fontWeight: '600' }}>Key Points</label>
                <button 
                  onClick={() => addArrayItem('keyPoints')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  <Plus size={16} /> Add Point
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {editingService?.keyPoints.map((point, index) => (
                  <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      value={point}
                      onChange={(e: any) => updateArrayItem('keyPoints', index, e.target.value)}
                      placeholder="e.g. 24/7 Availability"
                      style={{ flex: 1, padding: '0.75rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '6px', color: '#fff', outline: 'none' }}
                    />
                    <button 
                      onClick={() => removeArrayItem('keyPoints', index)}
                      style={{ background: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', border: 'none', padding: '0 1rem', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                {editingService?.keyPoints.length === 0 && <span style={{ color: '#666', fontSize: '0.85rem' }}>No key points added.</span>}
              </div>
            </div>

            {/* Suggestions */}
            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#eee', fontSize: '1.1rem', fontWeight: '600' }}>Suggestions for Patients</label>
                <button 
                  onClick={() => addArrayItem('suggestions')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  <Plus size={16} /> Add Suggestion
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {editingService?.suggestions.map((sug, index) => (
                  <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      value={sug}
                      onChange={(e: any) => updateArrayItem('suggestions', index, e.target.value)}
                      placeholder="e.g. Bring your medical records"
                      style={{ flex: 1, padding: '0.75rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '6px', color: '#fff', outline: 'none' }}
                    />
                    <button 
                      onClick={() => removeArrayItem('suggestions', index)}
                      style={{ background: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', border: 'none', padding: '0 1rem', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                {editingService?.suggestions.length === 0 && <span style={{ color: '#666', fontSize: '0.85rem' }}>No suggestions added.</span>}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
              <button 
                onClick={handleCloseForm}
                style={{ backgroundColor: 'transparent', color: '#aaa', border: '1px solid #333', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveService}
                style={{ backgroundColor: '#00A676', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
              >
                Save Service Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
