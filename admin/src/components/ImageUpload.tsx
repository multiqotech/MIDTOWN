'use client';
import React, { useRef, useState } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const CLOUDINARY_UPLOAD_PRESET = 'midtown';
const CLOUDINARY_CLOUD_NAME = 'dkhyb43ae';

export default function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setUploading(true);
    setError('');
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
        onChange(data.secure_url);
      } else {
        setError(`Upload Failed: ${data.error?.message || 'Unknown error'}`);
      }
    } catch (err: any) {
      setError(`Network error: ${err.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
        {label}
      </label>
      
      {error && (
        <div style={{ color: '#ff4d4f', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          {error}
        </div>
      )}

      {value ? (
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '300px', 
          height: '200px', 
          borderRadius: '8px', 
          overflow: 'hidden',
          border: '1px solid #333'
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={value} 
            alt="Uploaded preview" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <button
            type="button"
            onClick={handleRemove}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              background: 'rgba(0,0,0,0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div 
          onClick={() => !uploading && fileInputRef.current?.click()}
          style={{ 
            width: '100%', 
            padding: '2rem', 
            border: '2px dashed #333', 
            borderRadius: '8px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: uploading ? 'not-allowed' : 'pointer',
            backgroundColor: '#111',
            color: '#888',
            transition: 'border-color 0.2s'
          }}
        >
          {uploading ? (
            <Loader2 size={32} className="animate-spin" style={{ marginBottom: '0.5rem', color: '#00A676' }} />
          ) : (
            <UploadCloud size={32} style={{ marginBottom: '0.5rem' }} />
          )}
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            {uploading ? 'Uploading...' : 'Click to upload image'}
          </p>
        </div>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
}
