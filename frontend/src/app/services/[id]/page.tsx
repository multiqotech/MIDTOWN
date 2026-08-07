'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Lightbulb } from 'lucide-react';
import { api } from '../../../lib/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  keyPoints: string[];
  suggestions: string[];
}

export default function ServiceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await api.get(`/api/services/${params.id}`);
        setService(data);
      } catch (error) {
        console.error('Failed to fetch service details:', error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchService();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', color: '#00A676' }}>
        Loading service details...
      </div>
    );
  }

  if (!service) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', color: '#555' }}>
        <h2>Service not found.</h2>
        <button 
          onClick={() => router.back()}
          style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: '#00A676', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div style={{ backgroundColor: '#fdfdfd', color: '#333', fontFamily: '"Inter", sans-serif' }}>
      
      {/* Container */}
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '60vh' }}>
        
        <button 
          onClick={() => router.back()}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: '#00A676', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', marginBottom: '2rem' }}
        >
          <ArrowLeft size={20} /> Back to Services
        </button>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-start' }}>
          
          {/* Left Column - Details */}
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#111', margin: '0 0 1rem', lineHeight: '1.2' }}>
                {service.name}
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6', margin: 0 }}>
                {service.description || 'No detailed description is available for this service yet.'}
              </p>
            </div>

            {service.keyPoints && service.keyPoints.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#222', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 color="#00A676" /> Key Features & Points
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {service.keyPoints.map((point, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '1.05rem', color: '#444' }}>
                      <span style={{ color: '#00A676', marginTop: '2px' }}>•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.suggestions && service.suggestions.length > 0 && (
              <div style={{ backgroundColor: '#f0faf6', padding: '1.5rem', borderRadius: '12px', border: '1px solid #ccece0' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#008a62', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem' }}>
                  <Lightbulb size={22} /> Suggestions for Patients
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {service.suggestions.map((sug, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '1rem', color: '#2b5a4b' }}>
                      <span style={{ opacity: 0.6 }}>-</span>
                      <span>{sug}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Image */}
          <div style={{ flex: '1 1 500px', position: 'sticky', top: '6rem' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <Image 
                src={service.imageUrl} 
                alt={service.name} 
                fill 
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
