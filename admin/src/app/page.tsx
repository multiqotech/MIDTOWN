'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        router.push('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Error connecting to backend');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: 'var(--color-bg)',
      padding: '1rem'
    }}>
      <div style={{ 
        backgroundColor: 'var(--color-white)', 
        padding: '2.5rem 2rem', 
        borderRadius: 'var(--radius-lg)', 
        boxShadow: 'var(--shadow-lg)', 
        width: '100%', 
        maxWidth: '450px' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '0.5rem' }}>Admin Portal</h1>
          <p style={{ color: 'var(--color-text-light)' }}>Sign in to manage MIDTOWN Hospitals</p>
        </div>
        
        {error && (
          <div style={{ 
            backgroundColor: '#fee2e2', 
            color: '#b91c1c', 
            padding: '1rem', 
            borderRadius: 'var(--radius-sm)', 
            marginBottom: '1.5rem', 
            textAlign: 'center',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-text)' }}>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.875rem 1rem', 
                border: '1px solid var(--color-gray-light)', 
                borderRadius: 'var(--radius-sm)', 
                color: 'var(--color-text)',
                outline: 'none',
                transition: 'border-color var(--transition-fast)'
              }}
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-text)' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.875rem 1rem', 
                border: '1px solid var(--color-gray-light)', 
                borderRadius: 'var(--radius-sm)', 
                color: 'var(--color-text)',
                outline: 'none',
                transition: 'border-color var(--transition-fast)'
              }}
              required 
            />
          </div>
          <button 
            type="submit"
            style={{ 
              backgroundColor: 'var(--color-secondary)', 
              color: 'var(--color-white)', 
              padding: '1rem', 
              border: 'none', 
              borderRadius: 'var(--radius-full)', 
              cursor: 'pointer',
              fontWeight: '700',
              marginTop: '1rem',
              fontSize: '1rem',
              transition: 'background-color var(--transition-fast), transform var(--transition-fast)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary-dark)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
