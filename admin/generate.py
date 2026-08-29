import os

output_dir = "/home/krishna-gupta/Desktop/MIDTOWN/admin/src/app/dashboard/discover"
os.makedirs(output_dir, exist_ok=True)

# Helper for singleton components
def generate_singleton(name, title, fields, api_endpoint):
    # fields is a list of tuples: (fieldName, fieldType, label)
    # fieldType: string, array-of-objects, etc.
    
    state_init = []
    for f in fields:
        if f[1] == 'string':
            state_init.append(f"{f[0]}: ''")
        elif f[1] == 'array-of-objects':
            state_init.append(f"{f[0]}: []")

    state_init_str = ", ".join(state_init)

    html_fields = ""
    for f in fields:
        if f[1] == 'string':
            if 'Image' in f[0] or 'Logo' in f[0] or 'cover' in f[0].lower() or 'Url' in f[0] or f[0] == 'icon':
                html_fields += f"""
            <div>
              <label style={{{{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}}}>{f[2]} *</label>
              <div style={{{{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}}}>
                <input 
                  type="text" 
                  value={{data.{f[0]} || ''}}
                  onChange={{(e) => setData(prev => ({{ ...prev!, {f[0]}: e.target.value }}))}}
                  style={{{{ flex: 1, padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}}}
                  placeholder="Enter URL or upload file"
                />
                <button 
                  type="button"
                  onClick={{() => {{ setCurrentUploadField('{f[0]}'); fileInputRef.current?.click(); }}}}
                  style={{{{ backgroundColor: '#222', color: '#fff', border: '1px solid #333', padding: '0 1.5rem', borderRadius: '8px', cursor: 'pointer' }}}}
                >
                  Upload
                </button>
              </div>
              {{data.{f[0]} && (
                <div style={{{{ width: '150px', height: '150px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}}}>
                  <img src={{data.{f[0]}}} alt="Preview" style={{{{ width: '100%', height: '100%', objectFit: 'cover' }}}} />
                </div>
              )}}
            </div>
"""
            else:
                html_fields += f"""
            <div>
              <label style={{{{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}}}>{f[2]} *</label>
              <textarea 
                value={{data.{f[0]} || ''}}
                onChange={{(e) => setData(prev => ({{ ...prev!, {f[0]}: e.target.value }}))}}
                style={{{{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', minHeight: '80px' }}}}
              />
            </div>
"""
        elif f[1] == 'array-of-objects':
            subfields = f[3]
            subfield_html = ""
            for sf in subfields:
                subfield_html += f"""
                      <input 
                        type="text"
                        value={{item.{sf[0]} || ''}}
                        onChange={{(e) => handleArrayChange('{f[0]}', idx, '{sf[0]}', e.target.value)}}
                        style={{{{ width: '100%', padding: '0.5rem', backgroundColor: '#222', border: '1px solid #444', borderRadius: '4px', color: '#fff', marginBottom: '0.5rem' }}}}
                        placeholder="{sf[2]}"
                      />
"""
            empty_obj = ", ".join([f"{sf[0]}: ''" for sf in subfields])
            html_fields += f"""
            <div style={{{{ border: '1px solid #333', padding: '1rem', borderRadius: '8px' }}}}>
              <label style={{{{ display: 'block', color: '#fff', fontSize: '1rem', marginBottom: '1rem' }}}}>{f[2]}</label>
              {{(data.{f[0]} || []).map((item: any, idx: number) => (
                <div key={{idx}} style={{{{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' }}}}>
                  <div style={{{{ flex: 1 }}}}>
                    {subfield_html}
                  </div>
                  <button type="button" onClick={{() => removeArrayItem('{f[0]}', idx)}} style={{{{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}}}>
                    Remove
                  </button>
                </div>
              ))}}
              <button type="button" onClick={{() => addArrayItem('{f[0]}', {{ {empty_obj} }})}} style={{{{ background: '#00A676', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer', color: '#fff' }}}}>
                Add Item
              </button>
            </div>
"""

    code = f"""'use client';
import React, {{ useState, useEffect, useRef }} from 'react';
import {{ CheckCircle2 }} from 'lucide-react';
import {{ api }} from '../../../lib/api';

const CLOUDINARY_UPLOAD_PRESET = 'midtown';
const CLOUDINARY_CLOUD_NAME = 'dkhyb43ae';

export default function {name}() {{
  const [data, setData] = useState<any>({{ {state_init_str} }});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({{ text: '', type: '' }});
  const [uploading, setUploading] = useState(false);
  const [currentUploadField, setCurrentUploadField] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {{
    fetchData();
  }}, []);

  const fetchData = async () => {{
    try {{
      const res = await api.get('{api_endpoint}');
      if (res) setData(res);
    }} catch (err) {{
      console.error(err);
      showMessage('Failed to load data', 'error');
    }} finally {{
      setLoading(false);
    }}
  }};

  const showMessage = (text: string, type: 'success' | 'error') => {{
    setMessage({{ text, type }});
    setTimeout(() => setMessage({{ text: '', type: '' }}), 5000);
  }};

  const handleSave = async (e: React.FormEvent) => {{
    e.preventDefault();
    setSaving(true);
    try {{
      await api.put('{api_endpoint}', data);
      showMessage('Saved successfully!', 'success');
    }} catch (err) {{
      console.error(err);
      showMessage('Failed to save', 'error');
    }} finally {{
      setSaving(false);
    }}
  }};

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {{
    const file = e.target.files?.[0];
    if (!file || !currentUploadField) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {{
      const res = await fetch(`https://api.cloudinary.com/v1_1/${{CLOUDINARY_CLOUD_NAME}}/upload`, {{
        method: 'POST',
        body: formData
      }});
      const result = await res.json();
      
      if (result.secure_url) {{
        setData({{ ...data, [currentUploadField]: result.secure_url }});
        showMessage('File uploaded successfully!', 'success');
      }} else {{
        showMessage('Cloudinary Error', 'error');
      }}
    }} catch (err: any) {{
      showMessage(`Network error: ${{err.message}}`, 'error');
    }} finally {{
      setUploading(false);
      setCurrentUploadField('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }}
  }};

  const handleArrayChange = (field: string, idx: number, key: string, value: string) => {{
    const newArr = [...(data[field] || [])];
    newArr[idx] = {{ ...newArr[idx], [key]: value }};
    setData({{ ...data, [field]: newArr }});
  }};

  const addArrayItem = (field: string, item: any) => {{
    const newArr = [...(data[field] || [])];
    newArr.push(item);
    setData({{ ...data, [field]: newArr }});
  }};

  const removeArrayItem = (field: string, idx: number) => {{
    const newArr = [...(data[field] || [])];
    newArr.splice(idx, 1);
    setData({{ ...data, [field]: newArr }});
  }};

  if (loading) return <div style={{{{ color: '#00A676' }}}}>Loading...</div>;

  return (
    <div style={{{{ display: 'flex', flexDirection: 'column', gap: '2rem' }}}}>
      {{message.text && (
        <div style={{{{ padding: '1rem', borderRadius: '8px', backgroundColor: message.type === 'success' ? 'rgba(0,166,118,0.1)' : 'rgba(255,77,79,0.1)', color: message.type === 'success' ? '#00A676' : '#ff4d4f' }}}}>
          {{message.text}}
        </div>
      )}}
      
      <div style={{{{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2.5rem', border: '1px solid #2a2a2a' }}}}>
        <h3 style={{{{ margin: '0 0 2rem', color: '#fff' }}}}>{title}</h3>
        
        <form onSubmit={{handleSave}} style={{{{ display: 'grid', gap: '1.5rem' }}}}>
          {html_fields}

          <input type="file" ref={{fileInputRef}} onChange={{handleFileUpload}} style={{{{ display: 'none' }}}} />

          <button type="submit" disabled={{saving}} style={{{{ backgroundColor: '#00A676', color: '#fff', border: 'none', padding: '1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', marginTop: '1rem' }}}}>
            {{saving ? 'Saving...' : 'Save Changes'}}
          </button>
        </form>
      </div>
    </div>
  );
}}
"""
    with open(os.path.join(output_dir, f"{name}.tsx"), "w") as f:
        f.write(code)

# Helper for collection components
def generate_collection(name, title, fields, api_endpoint):
    # fields is a list of tuples: (fieldName, fieldType, label)
    
    empty_item = []
    for f in fields:
        if f[1] == 'string':
            empty_item.append(f"{f[0]}: ''")
        elif f[1] == 'array-of-strings':
            empty_item.append(f"{f[0]}: []")
    empty_item_str = ", ".join(empty_item)

    html_fields = ""
    for f in fields:
        if f[1] == 'string':
            if 'Image' in f[0] or 'Logo' in f[0] or 'Url' in f[0] or f[0] == 'icon':
                html_fields += f"""
            <div>
              <label style={{{{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}}}>{f[2]} *</label>
              <div style={{{{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}}}>
                <input 
                  type="text" 
                  value={{editingItem?.{f[0]} || ''}}
                  onChange={{(e) => setEditingItem(prev => ({{ ...prev!, {f[0]}: e.target.value }}))}}
                  style={{{{ flex: 1, padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}}}
                  placeholder="Enter URL or upload file"
                />
                <button 
                  type="button"
                  onClick={{() => {{ setCurrentUploadField('{f[0]}'); fileInputRef.current?.click(); }}}}
                  style={{{{ backgroundColor: '#222', color: '#fff', border: '1px solid #333', padding: '0 1.5rem', borderRadius: '8px', cursor: 'pointer' }}}}
                >
                  Upload
                </button>
              </div>
              {{editingItem?.{f[0]} && (
                <div style={{{{ width: '150px', height: '150px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}}}>
                  <img src={{editingItem.{f[0]}}} alt="Preview" style={{{{ width: '100%', height: '100%', objectFit: 'cover' }}}} />
                </div>
              )}}
            </div>
"""
            else:
                html_fields += f"""
            <div>
              <label style={{{{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}}}>{f[2]} *</label>
              <textarea 
                value={{editingItem?.{f[0]} || ''}}
                onChange={{(e) => setEditingItem(prev => ({{ ...prev!, {f[0]}: e.target.value }}))}}
                style={{{{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}}}
              />
            </div>
"""
        elif f[1] == 'array-of-strings':
            html_fields += f"""
            <div>
              <label style={{{{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}}}>{f[2]} (comma separated) *</label>
              <textarea 
                value={{(editingItem?.{f[0]} || []).join(', ')}}
                onChange={{(e) => setEditingItem(prev => ({{ ...prev!, {f[0]}: e.target.value.split(',').map(s=>s.trim()) }}))}}
                style={{{{ width: '100%', padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}}}
              />
            </div>
"""

    list_display = ""
    title_field = fields[0][0]
    sub_field = fields[1][0] if len(fields)>1 else fields[0][0]
    img_field = next((f[0] for f in fields if 'Image' in f[0] or 'Logo' in f[0]), None)

    code = f"""'use client';
import React, {{ useState, useEffect, useRef }} from 'react';
import {{ Plus, Edit2, Trash2, CheckCircle2 }} from 'lucide-react';
import {{ api }} from '../../../lib/api';

const CLOUDINARY_UPLOAD_PRESET = 'midtown';
const CLOUDINARY_CLOUD_NAME = 'dkhyb43ae';

export default function {name}() {{
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState({{ text: '', type: '' }});
  const [uploading, setUploading] = useState(false);
  const [currentUploadField, setCurrentUploadField] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {{
    fetchItems();
  }}, []);

  const fetchItems = async () => {{
    try {{
      const data = await api.get('{api_endpoint}');
      setItems(data);
    }} catch (err) {{
      console.error(err);
      showMessage('Failed to load data', 'error');
    }} finally {{
      setLoading(false);
    }}
  }};

  const showMessage = (text: string, type: 'success' | 'error') => {{
    setMessage({{ text, type }});
    setTimeout(() => setMessage({{ text: '', type: '' }}), 5000);
  }};

  const openNewForm = () => {{
    setEditingItem({{ {empty_item_str} }});
    setIsFormOpen(true);
  }};

  const openEditForm = (item: any) => {{
    setEditingItem({{ ...item }});
    setIsFormOpen(true);
  }};

  const closeForm = () => {{
    setEditingItem(null);
    setIsFormOpen(false);
  }};

  const handleSave = async (e: React.FormEvent) => {{
    e.preventDefault();
    if (!editingItem) return;

    try {{
      if (editingItem._id) {{
        await api.put(`{api_endpoint}/${{editingItem._id}}`, editingItem);
        showMessage('Updated successfully!', 'success');
      }} else {{
        await api.post('{api_endpoint}', editingItem);
        showMessage('Added successfully!', 'success');
      }}
      closeForm();
      fetchItems();
    }} catch (err) {{
      console.error(err);
      showMessage('Failed to save', 'error');
    }}
  }};

  const handleDelete = async (id: string | undefined) => {{
    if (!id) return;
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {{
      await api.delete(`{api_endpoint}/${{id}}`);
      showMessage('Deleted successfully!', 'success');
      fetchItems();
    }} catch (err) {{
      console.error(err);
      showMessage('Failed to delete', 'error');
    }}
  }};

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {{
    const file = e.target.files?.[0];
    if (!file || !editingItem || !currentUploadField) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {{
      const res = await fetch(`https://api.cloudinary.com/v1_1/${{CLOUDINARY_CLOUD_NAME}}/upload`, {{
        method: 'POST',
        body: formData
      }});
      const data = await res.json();
      
      if (data.secure_url) {{
        setEditingItem({{ ...editingItem, [currentUploadField]: data.secure_url }});
        showMessage('File uploaded successfully!', 'success');
      }} else {{
        showMessage('Cloudinary Error', 'error');
      }}
    }} catch (err: any) {{
      showMessage(`Network error: ${{err.message}}`, 'error');
    }} finally {{
      setUploading(false);
      setCurrentUploadField('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }}
  }};

  if (loading) return <div style={{{{ color: '#00A676' }}}}>Loading...</div>;

  return (
    <div style={{{{ display: 'flex', flexDirection: 'column', gap: '2rem' }}}}>
      {{message.text && (
        <div style={{{{ padding: '1rem', borderRadius: '8px', backgroundColor: message.type === 'success' ? 'rgba(0,166,118,0.1)' : 'rgba(255,77,79,0.1)', color: message.type === 'success' ? '#00A676' : '#ff4d4f' }}}}>
          {{message.text}}
        </div>
      )}}

      {{!isFormOpen ? (
        <>
          <div style={{{{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}}}>
            <h3 style={{{{ margin: 0, color: '#fff', fontSize: '1.25rem' }}}}>Manage {title}</h3>
            <button onClick={{openNewForm}} style={{{{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#00A676', color: 'white', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '6px', cursor: 'pointer' }}}}>
              <Plus size={{18}} /> Add New
            </button>
          </div>

          <div style={{{{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}}}>
            {{items.map((item) => (
              <div key={{item._id}} style={{{{ backgroundColor: '#1A1A1A', borderRadius: '12px', border: '1px solid #2a2a2a', overflow: 'hidden', padding: '1.5rem' }}}}>
                <div style={{{{ display: 'flex', justifyContent: 'space-between' }}}}>
                  <div>
                    <h4 style={{{{ margin: '0 0 0.5rem', color: '#fff' }}}}>{{item.{title_field}}}</h4>
                    <p style={{{{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}}}>{{item.{sub_field}}}</p>
                  </div>
                  <div style={{{{ display: 'flex', gap: '0.5rem' }}}}>
                    <button onClick={{() => openEditForm(item)}} style={{{{ background: '#333', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}}}><Edit2 size={{16}} /></button>
                    <button onClick={{() => handleDelete(item._id)}} style={{{{ background: '#ff4d4f', border: 'none', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', color: '#fff' }}}}><Trash2 size={{16}} /></button>
                  </div>
                </div>
              </div>
            ))}}
          </div>
        </>
      ) : (
        <div style={{{{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '2.5rem', border: '1px solid #2a2a2a' }}}}>
          <div style={{{{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}}}>
            <h3 style={{{{ margin: 0, color: '#fff' }}}}>{{editingItem?._id ? 'Edit' : 'Add'}} {title}</h3>
            <button onClick={{closeForm}} style={{{{ background: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer' }}}}>Cancel</button>
          </div>

          <form onSubmit={{handleSave}} style={{{{ display: 'grid', gap: '1.5rem' }}}}>
            {html_fields}

            <input type="file" ref={{fileInputRef}} onChange={{handleFileUpload}} style={{{{ display: 'none' }}}} />

            <div style={{{{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}}}>
              <button type="button" onClick={{closeForm}} style={{{{ background: 'transparent', color: '#aaa', border: '1px solid #333', padding: '0.75rem 2rem', borderRadius: '6px', cursor: 'pointer' }}}}>Cancel</button>
              <button type="submit" style={{{{ backgroundColor: '#00A676', color: '#fff', border: 'none', padding: '0.75rem 2.5rem', borderRadius: '6px', cursor: 'pointer' }}}}>Save</button>
            </div>
          </form>
        </div>
      )}}
    </div>
  );
}}
"""
    with open(os.path.join(output_dir, f"{name}.tsx"), "w") as f:
        f.write(code)

# 1. Overview
generate_singleton('OverviewManager', 'Discover Overview', [
    ('heroTitle', 'string', 'Hero Title'),
    ('heroSubtitle', 'string', 'Hero Subtitle'),
    ('heroImage', 'string', 'Hero Image URL'),
    ('introduction', 'string', 'Introduction'),
    ('whoWeAreContent', 'string', 'Who We Are Content'),
    ('statistics', 'array-of-objects', 'Statistics', [('label', 'string', 'Label'), ('value', 'string', 'Value')]),
    ('features', 'array-of-objects', 'Features', [('title', 'string', 'Title'), ('description', 'string', 'Description')]),
    ('specialtyHighlights', 'array-of-objects', 'Specialty Highlights', [('name', 'string', 'Name'), ('description', 'string', 'Description')]),
    ('ctaText', 'string', 'CTA Text'),
    ('ctaLink', 'string', 'CTA Link'),
], '/api/discover/overview')

# 2. Day at Midtown
generate_singleton('DayAtMidtownManager', 'Day at Midtown Content', [
    ('heroTitle', 'string', 'Hero Title'),
    ('heroSubtitle', 'string', 'Hero Subtitle'),
    ('heroImage', 'string', 'Hero Image URL'),
    ('introduction', 'string', 'Introduction'),
    ('journeySteps', 'array-of-objects', 'Journey Steps', [('title', 'string', 'Title'), ('description', 'string', 'Description'), ('icon', 'string', 'Icon Name/URL')]),
    ('timelineItems', 'array-of-objects', 'Timeline Items', [('time', 'string', 'Time'), ('title', 'string', 'Title'), ('description', 'string', 'Description')]),
    ('hospitalExperienceSections', 'array-of-objects', 'Hospital Experience', [('title', 'string', 'Title'), ('description', 'string', 'Description'), ('image', 'string', 'Image URL')]),
    ('ctaText', 'string', 'CTA Text'),
    ('ctaLink', 'string', 'CTA Link'),
], '/api/discover/day-at-midtown')

# 3. Vision Mission
generate_singleton('VisionMissionManager', 'Vision & Mission', [
    ('heroTitle', 'string', 'Hero Title'),
    ('heroSubtitle', 'string', 'Hero Subtitle'),
    ('heroImage', 'string', 'Hero Image URL'),
    ('vision', 'string', 'Vision'),
    ('mission', 'string', 'Mission'),
    ('healthcarePhilosophy', 'string', 'Healthcare Philosophy'),
    ('missionPillars', 'array-of-objects', 'Mission Pillars', [('title', 'string', 'Title'), ('description', 'string', 'Description')]),
    ('coreValues', 'array-of-objects', 'Core Values', [('title', 'string', 'Title'), ('description', 'string', 'Description')]),
], '/api/discover/vision-mission')

# 4. Anthem
generate_singleton('AnthemManager', 'Anthem Content', [
    ('pageTitle', 'string', 'Page Title'),
    ('introduction', 'string', 'Introduction'),
    ('anthemStory', 'string', 'Anthem Story'),
    ('audioFileUrl', 'string', 'Audio File URL'),
    ('videoUrl', 'string', 'Video URL'),
    ('coverImage', 'string', 'Cover Image URL'),
    ('credits', 'string', 'Credits'),
    ('lyrics', 'string', 'Lyrics'),
], '/api/discover/anthem')

# 5. Careers (Job)
generate_collection('CareersManager', 'Jobs / Careers', [
    ('title', 'string', 'Job Title'),
    ('slug', 'string', 'Slug'),
    ('department', 'string', 'Department'),
    ('location', 'string', 'Location'),
    ('employmentType', 'string', 'Employment Type'),
    ('experienceRequired', 'string', 'Experience Required'),
    ('shortDescription', 'string', 'Short Description'),
    ('fullDescription', 'string', 'Full Description'),
    ('requirements', 'array-of-strings', 'Requirements'),
    ('responsibilities', 'array-of-strings', 'Responsibilities'),
    ('applicationLink', 'string', 'Application Link'),
    ('status', 'string', 'Status (published/draft/closed)'),
], '/api/discover/jobs')

# 6. Leadership
generate_collection('LeadershipManager', 'Leadership Members', [
    ('name', 'string', 'Name'),
    ('slug', 'string', 'Slug'),
    ('profileImage', 'string', 'Profile Image URL'),
    ('designation', 'string', 'Designation'),
    ('shortBiography', 'string', 'Short Biography'),
    ('fullBiography', 'string', 'Full Biography'),
    ('education', 'array-of-strings', 'Education'),
    ('experience', 'array-of-strings', 'Experience'),
    ('achievements', 'array-of-strings', 'Achievements'),
    ('leadershipMessage', 'string', 'Leadership Message'),
    ('publishedStatus', 'string', 'Published Status (published/draft)'),
], '/api/discover/leadership')

# 7. Group Brands
generate_collection('GroupBrandsManager', 'Group Brands', [
    ('brandName', 'string', 'Brand Name'),
    ('slug', 'string', 'Slug'),
    ('logo', 'string', 'Logo URL'),
    ('description', 'string', 'Description'),
    ('category', 'string', 'Category'),
    ('websiteUrl', 'string', 'Website URL'),
    ('publishedStatus', 'string', 'Published Status (published/draft)'),
], '/api/discover/group-brands')

# 8. Awards
generate_collection('AwardsManager', 'Awards', [
    ('awardName', 'string', 'Award Name'),
    ('awardingOrganization', 'string', 'Awarding Organization'),
    ('year', 'string', 'Year'),
    ('category', 'string', 'Category'),
    ('description', 'string', 'Description'),
    ('certificateImage', 'string', 'Certificate Image URL'),
    ('publishedStatus', 'string', 'Published Status (published/draft)'),
], '/api/discover/awards')

# 9. Alliances
generate_collection('AlliancesManager', 'Alliances', [
    ('partnerName', 'string', 'Partner Name'),
    ('slug', 'string', 'Slug'),
    ('partnerLogo', 'string', 'Partner Logo URL'),
    ('category', 'string', 'Category'),
    ('description', 'string', 'Description'),
    ('websiteUrl', 'string', 'Website URL'),
    ('publishedStatus', 'string', 'Published Status (published/draft)'),
], '/api/discover/alliances')

# 10. Achievements (Milestones)
generate_collection('AchievementsManager', 'Milestones', [
    ('yearOrDate', 'string', 'Year or Date'),
    ('title', 'string', 'Title'),
    ('slug', 'string', 'Slug'),
    ('description', 'string', 'Description'),
    ('image', 'string', 'Image URL'),
    ('category', 'string', 'Category'),
    ('publishedStatus', 'string', 'Published Status (published/draft)'),
], '/api/discover/milestones')

print("Successfully generated all 10 managers in", output_dir)
