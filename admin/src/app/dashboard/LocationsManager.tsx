import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, MapPin, UploadCloud, Link as LinkIcon, X, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/api';

const CLOUDINARY_UPLOAD_PRESET = 'midtown'; // Unsigned preset
const CLOUDINARY_CLOUD_NAME = 'dkhyb43ae';

interface Location {
  id: string;
  name: string;
  mapUrl: string;
}

interface City {
  id: string;
  name: string;
  imageUrl: string;
  locations: Location[];
}

export default function LocationsManager() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploading, setUploading] = useState(false);
  const [uploadPreset, setUploadPreset] = useState(CLOUDINARY_UPLOAD_PRESET);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const data = await api.get('/api/cities');
      setCities(data);
    } catch (err) {
      console.error(err);
      showMessage('Failed to load cities', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const openNewCityForm = () => {
    setEditingCity({
      id: '',
      name: '',
      imageUrl: '',
      locations: []
    });
    setIsFormOpen(true);
  };

  const openEditCityForm = (city: City) => {
    setEditingCity({ ...city }); // Clone
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingCity(null);
    setIsFormOpen(false);
  };

  const handleSaveCity = async () => {
    if (!editingCity) return;
    if (!editingCity.name || !editingCity.imageUrl) {
      showMessage('City name and image are required.', 'error');
      return;
    }

    try {
      if (editingCity.id) {
        // Update
        await api.put(`/api/cities/${editingCity.id}`, editingCity);
        showMessage('City updated successfully!', 'success');
      } else {
        // Create
        await api.post('/api/cities', editingCity);
        showMessage('City created successfully!', 'success');
      }
      fetchCities();
      handleCloseForm();
    } catch (err) {
      showMessage('Failed to save city', 'error');
    }
  };

  const handleDeleteCity = async (id: string) => {
    if (!confirm('Are you sure you want to delete this city?')) return;
    try {
      await api.delete(`/api/cities/${id}`);
      showMessage('City deleted successfully', 'success');
      fetchCities();
    } catch (err) {
      showMessage('Failed to delete city', 'error');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingCity) return;

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
        setEditingCity({ ...editingCity, imageUrl: data.secure_url });
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

  const addLocation = () => {
    if (!editingCity) return;
    const newLocation: Location = {
      id: Date.now().toString(),
      name: '',
      mapUrl: ''
    };
    setEditingCity({
      ...editingCity,
      locations: [...editingCity.locations, newLocation]
    });
  };

  const updateLocation = (index: number, field: 'name' | 'mapUrl', value: string) => {
    if (!editingCity) return;
    const updatedLocations = [...editingCity.locations];
    updatedLocations[index][field] = value;
    setEditingCity({
      ...editingCity,
      locations: updatedLocations
    });
  };

  const removeLocation = (index: number) => {
    if (!editingCity) return;
    const updatedLocations = [...editingCity.locations];
    updatedLocations.splice(index, 1);
    setEditingCity({
      ...editingCity,
      locations: updatedLocations
    });
  };

  if (loading) return <div style={{ color: '#00A676' }}>Loading cities...</div>;

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
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Manage Cities</h3>
            <button 
              onClick={openNewCityForm}
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
              <Plus size={18} /> Add City
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {cities.map((city) => (
              <div key={city.id} style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a', overflow: 'hidden' }}>
                <div style={{ height: '160px', width: '100%', position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={city.imageUrl} alt={city.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openEditCityForm(city)} style={{ background: '#fff', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#111' }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteCity(city.id)} style={{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#fff', fontSize: '1.1rem' }}>{city.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.9rem' }}>
                    <MapPin size={16} /> {city.locations?.length || 0} Locations
                  </div>
                </div>
              </div>
            ))}
            
            {cities.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#888', backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a' }}>
                No cities found. Create one to get started!
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2.5rem', border: '1px solid #2a2a2a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>
              {editingCity?.id ? 'Edit City' : 'Create New City'}
            </h3>
            <button onClick={handleCloseForm} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* City Name */}
            <div>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>City Name</label>
              <input 
                type="text" 
                value={editingCity?.name || ''}
                onChange={(e) => setEditingCity({ ...editingCity!, name: e.target.value })}
                placeholder="e.g. New York, London, Delhi"
                style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              />
            </div>

            {/* City Image */}
            <div>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>City Image</label>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', padding: '0.5rem 1rem' }}>
                    <LinkIcon size={16} color="#666" />
                    <input 
                      type="url" 
                      value={editingCity?.imageUrl || ''}
                      onChange={(e) => setEditingCity({ ...editingCity!, imageUrl: e.target.value })}
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
                        onChange={(e) => setUploadPreset(e.target.value)}
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
                  {editingCity?.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={editingCity.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ color: '#555', fontSize: '0.85rem' }}>No Image</span>
                  )}
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #2a2a2a', margin: '1rem 0' }} />

            {/* Locations */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#eee', fontSize: '1.1rem', fontWeight: '600' }}>Locations in City</label>
                  <span style={{ fontSize: '0.85rem', color: '#888' }}>Total Locations: {editingCity?.locations?.length || 0}</span>
                </div>
                <button 
                  onClick={addLocation}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#222', color: '#fff', border: '1px solid #333', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  <Plus size={16} /> Add Location
                </button>
              </div>

              {editingCity?.locations?.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#111', borderRadius: '8px', color: '#666', border: '1px dashed #333' }}>
                  No locations added yet. Click &quot;Add Location&quot; to add a hospital or clinic.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {editingCity?.locations?.map((loc, index) => (
                    <div key={index} style={{ display: 'flex', gap: '1rem', backgroundColor: '#111', padding: '1.25rem', borderRadius: '8px', border: '1px solid #333', alignItems: 'flex-start' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontWeight: '600', flexShrink: 0 }}>
                        {index + 1}
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', color: '#aaa', marginBottom: '0.25rem', fontSize: '0.8rem' }}>Location Name</label>
                          <input 
                            type="text" 
                            value={loc.name}
                            onChange={(e) => updateLocation(index, 'name', e.target.value)}
                            placeholder="e.g. Midtown Central Hospital"
                            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '6px', color: '#fff', outline: 'none' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: '#aaa', marginBottom: '0.25rem', fontSize: '0.8rem' }}>Google Maps Embed URL</label>
                          <input 
                            type="text" 
                            value={loc.mapUrl}
                            onChange={(e) => updateLocation(index, 'mapUrl', e.target.value)}
                            placeholder="https://www.google.com/maps/embed?..."
                            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '6px', color: '#fff', outline: 'none' }}
                          />
                        </div>
                      </div>
                      <button 
                        onClick={() => removeLocation(index)}
                        style={{ background: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', flexShrink: 0 }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
              <button 
                onClick={handleCloseForm}
                style={{ backgroundColor: 'transparent', color: '#aaa', border: '1px solid #333', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveCity}
                style={{ backgroundColor: '#00A676', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
              >
                Save City Data
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
