'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Image as ImageIcon, MapPin, Users, Settings, LogOut, UploadCloud, Link as LinkIcon, CheckCircle2, Stethoscope, Award } from 'lucide-react';
import { api } from '../../lib/api';
import LocationsManager from './LocationsManager';
import ServicesManager from './ServicesManager';
import WhyChooseManager from './WhyChooseManager';

const CLOUDINARY_UPLOAD_PRESET = 'midtown'; // Replace with your actual unsigned preset
const CLOUDINARY_CLOUD_NAME = 'dkhyb43ae';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('hero');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/');
      return;
    }

    api.get('/api/settings')
      .then(data => {
        if (data.heroImageUrl) {
          setHeroImageUrl(data.heroImageUrl);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [router]);

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/api/settings', { heroImageUrl });
      showMessage('Hero settings saved successfully!', 'success');
    } catch (err) {
      showMessage('Error connecting to backend.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const [uploadPreset, setUploadPreset] = useState(CLOUDINARY_UPLOAD_PRESET);
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        setHeroImageUrl(data.secure_url);
        showMessage('Image uploaded successfully! Remember to save changes.', 'success');
      } else {
        console.error('Cloudinary Error:', data);
        showMessage(`Cloudinary Error: ${data.error?.message || 'Unknown error'}`, 'error');
      }
    } catch (err: any) {
      console.error('Network Error:', err);
      showMessage(`Network error: ${err.message}`, 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/');
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111', color: '#00A676', fontWeight: 'bold' }}>Loading Workspace...</div>;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'hero', label: 'Hero Section', icon: <ImageIcon size={20} /> },
    { id: 'locations', label: 'Locations', icon: <MapPin size={20} /> },
    { id: 'services', label: 'Medical Services', icon: <Stethoscope size={20} /> },
    { id: 'whychoose', label: 'Why Choose Us', icon: <Award size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'settings', label: 'System Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#111', color: '#eee', fontFamily: 'var(--font-primary)' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '280px', backgroundColor: '#1A1A1A', borderRight: '1px solid #2a2a2a', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #2a2a2a' }}>
          <h1 style={{ margin: 0, fontSize: '1.25rem', color: '#fff', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#00A676' }}>MIDTOWN</span> Admin
          </h1>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#888' }}>Superadmin Workspace</p>
        </div>
        
        <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.875rem 1rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#00A676' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#aaa',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseOver={(e) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#252525' }}
              onMouseOut={(e) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        
        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid #2a2a2a' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              width: '100%',
              padding: '0.875rem 1rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#ff4d4f',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 77, 79, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        
        {/* Topbar */}
        <header style={{ padding: '1.5rem 2.5rem', backgroundColor: '#1A1A1A', borderBottom: '1px solid #2a2a2a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>
            {tabs.find(t => t.id === activeTab)?.label || 'Dashboard'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#0F4C81', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              A
            </div>
          </div>
        </header>

        {/* Dynamic Workspace */}
        <div style={{ padding: '2.5rem', maxWidth: '1000px' }}>
          {message.text && (
            <div style={{ 
              padding: '1rem 1.5rem', 
              marginBottom: '2rem', 
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

          {activeTab === 'hero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2rem', border: '1px solid #2a2a2a' }}>
                <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.1rem', color: '#fff' }}>Update Hero Image</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Link Paste Option */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: '#aaa', fontWeight: '500' }}>
                      <LinkIcon size={16} /> Paste Direct Link
                    </label>
                    <input 
                      type="url" 
                      value={heroImageUrl}
                      onChange={(e) => setHeroImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      style={{ 
                        width: '100%', 
                        padding: '1rem', 
                        backgroundColor: '#111', 
                        border: '1px solid #333', 
                        borderRadius: '8px', 
                        color: '#fff',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#00A676'}
                      onBlur={(e) => e.target.style.borderColor = '#333'}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ height: '1px', flex: 1, backgroundColor: '#333' }}></div>
                    <span style={{ color: '#666', fontSize: '0.85rem', fontWeight: '600' }}>OR</span>
                    <div style={{ height: '1px', flex: 1, backgroundColor: '#333' }}></div>
                  </div>

                  {/* File Upload Option */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: '#aaa', fontWeight: '500' }}>
                      <UploadCloud size={16} /> Upload Image (Cloudinary)
                    </label>

                    <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', color: '#888' }}>Upload Preset:</span>
                      <input 
                        type="text" 
                        value={uploadPreset}
                        onChange={(e) => setUploadPreset(e.target.value)}
                        placeholder="e.g. unsigned_preset"
                        style={{ 
                          padding: '0.5rem', 
                          backgroundColor: '#111', 
                          border: '1px solid #333', 
                          borderRadius: '4px', 
                          color: '#fff',
                          fontSize: '0.85rem',
                          outline: 'none',
                          flex: 1
                        }}
                      />
                    </div>
                    
                    <div 
                      style={{ 
                        border: '2px dashed #333', 
                        borderRadius: '8px', 
                        padding: '2rem', 
                        textAlign: 'center',
                        backgroundColor: '#111',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s',
                        position: 'relative'
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      onMouseOver={(e) => e.currentTarget.style.borderColor = '#00A676'}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = '#333'}
                    >
                      <UploadCloud size={40} color="#555" style={{ margin: '0 auto 1rem' }} />
                      <p style={{ margin: 0, color: '#aaa', fontSize: '0.95rem' }}>
                        {uploading ? 'Uploading to Cloudinary...' : 'Click to browse or drag and drop'}
                      </p>
                      <p style={{ margin: '0.5rem 0 0', color: '#666', fontSize: '0.8rem' }}>PNG, JPG, WEBP up to 10MB</p>
                      
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Preview & Save Action */}
              {heroImageUrl && (
                <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2rem', border: '1px solid #2a2a2a' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Live Preview</h3>
                    <button 
                      onClick={handleSave}
                      disabled={saving}
                      style={{ 
                        backgroundColor: '#00A676', 
                        color: 'white', 
                        padding: '0.75rem 2rem', 
                        border: 'none', 
                        borderRadius: '6px', 
                        cursor: saving ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        opacity: saving ? 0.7 : 1,
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => !saving && (e.currentTarget.style.backgroundColor = '#00d28c')}
                      onMouseOut={(e) => !saving && (e.currentTarget.style.backgroundColor = '#00A676')}
                    >
                      {saving ? 'Saving...' : 'Save Configuration'}
                    </button>
                  </div>
                  
                  <div style={{ 
                    width: '100%', 
                    height: '350px', 
                    backgroundColor: '#0a0a0a', 
                    borderRadius: '8px', 
                    overflow: 'hidden',
                    border: '1px solid #333'
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={heroImageUrl} 
                      alt="Hero Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                </div>
              )}

            </div>
          )}

          {activeTab === 'locations' && (
            <LocationsManager />
          )}

          {activeTab === 'services' && (
            <ServicesManager />
          )}

          {activeTab === 'whychoose' && (
            <WhyChooseManager />
          )}

          {activeTab !== 'hero' && activeTab !== 'locations' && activeTab !== 'services' && activeTab !== 'whychoose' && (
            <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '3rem', border: '1px solid #2a2a2a', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', backgroundColor: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Settings size={24} color="#666" />
              </div>
              <h3 style={{ margin: '0 0 0.5rem', color: '#fff', fontSize: '1.25rem' }}>Module in Development</h3>
              <p style={{ color: '#aaa', margin: 0 }}>The {tabs.find(t => t.id === activeTab)?.label} section is currently being built.</p>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
