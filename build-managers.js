const fs = require('fs');
const path = require('path');

const generateCrudManager = (componentName, apiRoute, singularName, hasCoverImage = false) => `
'use client';
import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { api } from '../../../lib/api';
import ImageUpload from '../../../components/ImageUpload';

export default function ${componentName}() {
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
      const data = await api.get('${apiRoute}');
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
    setEditingItem({ title: '', description: '', image: '', ${hasCoverImage ? "coverImage: ''," : ""} });
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
        await api.put(\`${apiRoute}/\${editingItem._id}\`, editingItem);
        showMessage('Updated successfully!', 'success');
      } else {
        await api.post('${apiRoute}', editingItem);
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
      await api.delete(\`${apiRoute}/\${id}\`);
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
        <div style={{ padding: '1rem 1.5rem', borderRadius: '8px', backgroundColor: message.type === 'success' ? 'rgba(0, 166, 118, 0.1)' : 'rgba(255, 77, 79, 0.1)', color: message.type === 'success' ? '#00A676' : '#ff4d4f', border: \`1px solid \${message.type === 'success' ? 'rgba(0, 166, 118, 0.2)' : 'rgba(255, 77, 79, 0.2)'}\`, display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '500' }}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : null}
          {message.text}
        </div>
      )}

      {!isFormOpen ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Manage ${componentName.replace('Manager', '')}</h3>
            <button onClick={openNewForm} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#00A676', color: 'white', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
              <Plus size={18} /> Add ${singularName}
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
              {editingItem?._id ? 'Edit' : 'Add'} ${singularName}
            </h3>
            <button onClick={closeForm} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.9rem' }}>Cancel</button>
          </div>

          <form onSubmit={handleSave} style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Title/Name *</label>
              <input required type="text" value={editingItem?.title || editingItem?.name || ''} onChange={(e) => setEditingItem((prev: any) => ({ ...prev, title: e.target.value, name: e.target.value }))} style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }} />
            </div>
            
            <ImageUpload label="${hasCoverImage ? 'Cover Image' : 'Featured Image / Logo'}" value={editingItem?.image || editingItem?.logo || editingItem?.coverImage || ''} onChange={(url: string) => setEditingItem((prev: any) => ({ ...prev, image: url, logo: url, coverImage: url }))} />
            
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
`;

const generateSingletonManager = (componentName, apiRoute, pageTitle) => `
'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { api } from '../../../lib/api';
import ImageUpload from '../../../components/ImageUpload';

export default function ${componentName}() {
  const [data, setData] = useState<any>({ heroTitle: '', heroSubtitle: '', heroImage: '', introduction: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await api.get('${apiRoute}');
      if (result && Object.keys(result).length > 0) {
        setData(result);
      }
    } catch (err) {
      console.error(err);
      showMessage('Failed to load page content', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: string) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('${apiRoute}', data);
      showMessage('Saved successfully!', 'success');
    } catch (err) {
      console.error(err);
      showMessage('Failed to save', 'error');
    } finally {
      setSaving(false);
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
      
      <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2.5rem', border: '1px solid #2a2a2a' }}>
        <h3 style={{ margin: '0 0 2rem', color: '#fff' }}>${pageTitle}</h3>
        
        <form onSubmit={handleSave} style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Hero Title *</label>
            <input 
              type="text"
              value={data.heroTitle || ''}
              onChange={(e: any) => setData((prev: any) => ({ ...prev!, heroTitle: e.target.value }))}
              style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Hero Subtitle</label>
            <textarea 
              value={data.heroSubtitle || ''}
              onChange={(e: any) => setData((prev: any) => ({ ...prev!, heroSubtitle: e.target.value }))}
              style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px' }}
            />
          </div>
          
          <ImageUpload label="Hero Image" value={data.heroImage || ''} onChange={(url: string) => setData((prev: any) => ({ ...prev!, heroImage: url }))} />

          <div>
            <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Introduction / Main Content</label>
            <textarea 
              value={data.introduction || ''}
              onChange={(e: any) => setData((prev: any) => ({ ...prev!, introduction: e.target.value }))}
              style={{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '120px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button 
              type="submit" 
              disabled={saving}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#00A676', color: '#fff', border: 'none', padding: '0.75rem 2.5rem', borderRadius: '6px', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: '600' }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
`;

const configs = [
  // Media Centre
  { dir: 'media-centre', file: 'PressReleasesManager.tsx', type: 'crud', route: '/api/discover/press-releases', single: 'Press Release' },
  { dir: 'media-centre', file: 'InTheNewsManager.tsx', type: 'crud', route: '/api/discover/in-the-news', single: 'News Article' },
  { dir: 'media-centre', file: 'MediaKitManager.tsx', type: 'crud', route: '/api/discover/media-kit', single: 'Media Kit Resource' },
  { dir: 'media-centre', file: 'BrandGuidelinesManager.tsx', type: 'crud', route: '/api/discover/brand-guidelines', single: 'Brand Guideline' },
  { dir: 'media-centre', file: 'EventGalleryManager.tsx', type: 'crud', route: '/api/discover/event-gallery', single: 'Event' },

  // Corporate Partnerships
  { dir: 'corporate-partnerships', file: 'CorporateTieUpsManager.tsx', type: 'crud', route: '/api/discover/corporate-tie-ups', single: 'Corporate Tie-up' },
  { dir: 'corporate-partnerships', file: 'WellnessProgramsManager.tsx', type: 'crud', route: '/api/discover/wellness-programs', single: 'Wellness Program' },
  { dir: 'corporate-partnerships', file: 'InsurancePartnersManager.tsx', type: 'crud', route: '/api/discover/insurance-partners', single: 'Insurance Partner' },
  { dir: 'corporate-partnerships', file: 'TpaDeskManager.tsx', type: 'singleton', route: '/api/discover/tpa-desk', title: 'TPA Desk Page Content' }
];

configs.forEach(config => {
  const dirPath = path.join(__dirname, 'admin/src/app/dashboard', config.dir);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  
  const componentName = config.file.replace('.tsx', '');
  
  let content = '';
  if (config.type === 'crud') {
    content = generateCrudManager(componentName, config.route, config.single, config.single.includes('Media') || config.single.includes('Brand'));
  } else {
    content = generateSingletonManager(componentName, config.route, config.title);
  }
  
  fs.writeFileSync(path.join(dirPath, config.file), content, 'utf8');
  console.log('Created ' + path.join(config.dir, config.file));
});
