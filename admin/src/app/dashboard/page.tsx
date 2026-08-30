'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Image as ImageIcon, MapPin, Users, Settings, LogOut, UploadCloud, Link as LinkIcon, CheckCircle2, Stethoscope, Award, MessageSquare, PhoneCall, Newspaper } from 'lucide-react';
import { api } from '../../lib/api';
import LocationsManager from './LocationsManager';
import ServicesManager from './ServicesManager';
import WhyChooseManager from './WhyChooseManager';
import DoctorsManager from './DoctorsManager';
import TestimonialsManager from './TestimonialsManager';
import PartnersManager from './PartnersManager';
import FaqsManager from './FaqsManager';
import EnquiriesManager from './EnquiriesManager';
import NewsManager from './NewsManager';
import OverviewManager from './discover/OverviewManager';
import DayAtMidtownManager from './discover/DayAtMidtownManager';
import VisionMissionManager from './discover/VisionMissionManager';
import AnthemManager from './discover/AnthemManager';
import CareersManager from './discover/CareersManager';
import BoardOfDirectorsManager from './leadership/BoardOfDirectorsManager';
import ExecutiveTeamManager from './leadership/ExecutiveTeamManager';
import MedicalCouncilManager from './leadership/MedicalCouncilManager';
import GroupBrandsManager from './discover/GroupBrandsManager';
import AwardsManager from './discover/AwardsManager';
import AlliancesManager from './discover/AlliancesManager';
import AchievementsManager from './discover/AchievementsManager';
import BoardCommitteesManager from './corporate-governance/BoardCommitteesManager';
import PoliciesGuidelinesManager from './corporate-governance/PoliciesGuidelinesManager';
import EthicsComplianceManager from './corporate-governance/EthicsComplianceManager';
import FinancialResultsManager from './investor-relations/FinancialResultsManager';
import AnnualReportsManager from './investor-relations/AnnualReportsManager';
import ShareholderInfoManager from './investor-relations/ShareholderInfoManager';
import CorporateAnnouncementsManager from './investor-relations/CorporateAnnouncementsManager';
import StockInformationManager from './investor-relations/StockInformationManager';
import NursingExcellenceManager from './healers-circle/NursingExcellenceManager';
import DoctorAwardsManager from './healers-circle/DoctorAwardsManager';
import ParamedicalStaffManager from './healers-circle/ParamedicalStaffManager';
import EmployeeSpotlightsManager from './healers-circle/EmployeeSpotlightsManager';
import QualityCertificationsManager from './clinical-quality/QualityCertificationsManager';
import InfectionControlManager from './clinical-quality/InfectionControlManager';
import PatientSafetyManager from './clinical-quality/PatientSafetyManager';
import ClinicalIndicatorsManager from './clinical-quality/ClinicalIndicatorsManager';
import FeedbackMechanismManager from './clinical-quality/FeedbackMechanismManager';

import PressReleasesManager from './media-centre/PressReleasesManager';
import InTheNewsManager from './media-centre/InTheNewsManager';
import MediaKitManager from './media-centre/MediaKitManager';
import BrandGuidelinesManager from './media-centre/BrandGuidelinesManager';
import EventGalleryManager from './media-centre/EventGalleryManager';

import CorporateTieUpsManager from './corporate-partnerships/CorporateTieUpsManager';
import WellnessProgramsManager from './corporate-partnerships/WellnessProgramsManager';
import InsurancePartnersManager from './corporate-partnerships/InsurancePartnersManager';
import TpaDeskManager from './corporate-partnerships/TpaDeskManager';
import MedicalEducationManager from './academics/MedicalEducationManager';
import NursingEducationManager from './academics/NursingEducationManager';
import ResearchInstitutesManager from './academics/ResearchInstitutesManager';
import ClinicalTrialsManager from './academics/ClinicalTrialsManager';
import PublicationsManager from './academics/PublicationsManager';
import FellowshipsManager from './academics/FellowshipsManager';

import HealthCampsManager from './csr/HealthCampsManager';
import CommunityOutreachManager from './csr/CommunityOutreachManager';
import EnvironmentalInitiativesManager from './csr/EnvironmentalInitiativesManager';
import WasteManagementManager from './csr/WasteManagementManager';
import GreenHospitalsManager from './csr/GreenHospitalsManager';

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
    { id: 'doctors', label: 'Doctors', icon: <Users size={20} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={20} /> },
    { id: 'whychoose', label: 'Why Choose Us', icon: <Award size={20} /> },
    { id: 'partners', label: 'Partners', icon: <MapPin size={20} /> },
    { id: 'faqs', label: 'FAQs', icon: <MessageSquare size={20} /> },
    { id: 'enquiries', label: 'Enquiries', icon: <PhoneCall size={20} /> },
    { id: 'news', label: 'News & Updates', icon: <Newspaper size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'settings', label: 'System Settings', icon: <Settings size={20} /> },
  ];

  const discoverTabs = [
    { id: 'discover-overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-day', label: 'Day at Midtown', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-vision', label: 'Vision & Mission', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-anthem', label: 'Anthem', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-careers', label: 'Careers', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-brands', label: 'Group Brands', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-awards', label: 'Awards', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-alliances', label: 'Alliances', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-achievements', label: 'Achievements', icon: <LayoutDashboard size={20} /> },
  ];

  const corporateGovernanceTabs = [
    { id: 'board-committees', label: 'Board Committees', icon: <LayoutDashboard size={20} /> },
    { id: 'policies-guidelines', label: 'Policies & Guidelines', icon: <LayoutDashboard size={20} /> },
    { id: 'ethics-compliance', label: 'Ethics & Compliance', icon: <LayoutDashboard size={20} /> },
  ];

  const investorRelationsTabs = [
    { id: 'financial-results', label: 'Financial Results', icon: <LayoutDashboard size={20} /> },
    { id: 'annual-reports', label: 'Annual Reports', icon: <LayoutDashboard size={20} /> },
    { id: 'shareholder-info', label: 'Shareholder Info', icon: <LayoutDashboard size={20} /> },
    { id: 'corporate-announcements', label: 'Corporate Announcements', icon: <LayoutDashboard size={20} /> },
    { id: 'stock-information', label: 'Stock Information', icon: <LayoutDashboard size={20} /> },
  ];

  const leadershipTabs = [
    { id: 'board-of-directors', label: 'Board of Directors', icon: <LayoutDashboard size={20} /> },
    { id: 'executive-team', label: 'Executive Team', icon: <LayoutDashboard size={20} /> },
    { id: 'medical-council', label: 'Medical Council', icon: <LayoutDashboard size={20} /> },
  ];

  const healersCircleTabs = [
    { id: 'nursing-excellence', label: 'Nursing Excellence', icon: <LayoutDashboard size={20} /> },
    { id: 'doctor-awards', label: 'Doctor Awards', icon: <LayoutDashboard size={20} /> },
    { id: 'paramedical-staff', label: 'Paramedical Staff', icon: <LayoutDashboard size={20} /> },
    { id: 'employee-spotlights', label: 'Employee Spotlights', icon: <LayoutDashboard size={20} /> },
  ];

  const clinicalQualityTabs = [
    { id: 'quality-certifications', label: 'Quality Certifications', icon: <LayoutDashboard size={20} /> },
    { id: 'infection-control', label: 'Infection Control', icon: <LayoutDashboard size={20} /> },
    { id: 'patient-safety', label: 'Patient Safety', icon: <LayoutDashboard size={20} /> },
    { id: 'clinical-indicators', label: 'Clinical Indicators', icon: <LayoutDashboard size={20} /> },
    { id: 'feedback-mechanism', label: 'Feedback Mechanism', icon: <LayoutDashboard size={20} /> },
  ];

  const mediaCentreTabs = [
    { id: 'mc-press-releases', label: 'Press Releases', icon: <Newspaper size={20} /> },
    { id: 'mc-in-the-news', label: 'In The News', icon: <Newspaper size={20} /> },
    { id: 'mc-media-kit', label: 'Media Kit', icon: <ImageIcon size={20} /> },
    { id: 'mc-brand-guidelines', label: 'Brand Guidelines', icon: <LayoutDashboard size={20} /> },
    { id: 'mc-event-gallery', label: 'Event Gallery', icon: <ImageIcon size={20} /> },
  ];

  const corporatePartnershipsTabs = [
    { id: 'cp-corporate-tie-ups', label: 'Corporate Tie Ups', icon: <Users size={20} /> },
    { id: 'cp-wellness-programs', label: 'Wellness Programs', icon: <Award size={20} /> },
    { id: 'cp-insurance-partners', label: 'Insurance Partners', icon: <Users size={20} /> },
    { id: 'cp-tpa-desk', label: 'TPA Desk', icon: <LayoutDashboard size={20} /> },
  ];

  const academicsTabs = [
    { id: 'medical-education', label: 'Medical Education', icon: <LayoutDashboard size={20} /> },
    { id: 'nursing-education', label: 'Nursing Education', icon: <LayoutDashboard size={20} /> },
    { id: 'research-institutes', label: 'Research Institutes', icon: <LayoutDashboard size={20} /> },
    { id: 'clinical-trials', label: 'Clinical Trials', icon: <LayoutDashboard size={20} /> },
    { id: 'publications', label: 'Publications', icon: <LayoutDashboard size={20} /> },
    { id: 'fellowships', label: 'Fellowships', icon: <LayoutDashboard size={20} /> },
  ];

  const csrTabs = [
    { id: 'health-camps', label: 'Health Camps', icon: <LayoutDashboard size={20} /> },
    { id: 'community-outreach', label: 'Community Outreach', icon: <LayoutDashboard size={20} /> },
    { id: 'environmental-initiatives', label: 'Environmental Initiatives', icon: <LayoutDashboard size={20} /> },
    { id: 'waste-management', label: 'Waste Management', icon: <LayoutDashboard size={20} /> },
    { id: 'green-hospitals', label: 'Green Hospitals', icon: <LayoutDashboard size={20} /> },
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
          <h4 style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 0.5rem 0.5rem' }}>Main</h4>
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
              onMouseOver={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#252525' }}
              onMouseOut={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          
          <h4 style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '1.5rem 0 0.5rem 0.5rem' }}>Discover Midtown</h4>
          {discoverTabs.map((tab) => (
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
              onMouseOver={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#252525' }}
              onMouseOut={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          
          <h4 style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '1.5rem 0 0.5rem 0.5rem' }}>Leadership</h4>
          {leadershipTabs.map((tab) => (
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
              onMouseOver={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#252525' }}
              onMouseOut={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          <h4 style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '1.5rem 0 0.5rem 0.5rem' }}>Academics & Research</h4>
          {academicsTabs.map((tab) => (
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
              onMouseOver={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#252525' }}
              onMouseOut={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          <h4 style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '1.5rem 0 0.5rem 0.5rem' }}>CSR & Sustainability</h4>
          {csrTabs.map((tab) => (
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
              onMouseOver={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#252525' }}
              onMouseOut={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          
          <h4 style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '1.5rem 0 0.5rem 0.5rem' }}>Media Centre</h4>
          {mediaCentreTabs.map((tab) => (
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
              onMouseOver={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#252525' }}
              onMouseOut={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          <h4 style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '1.5rem 0 0.5rem 0.5rem' }}>Corporate Partnerships</h4>
          {corporatePartnershipsTabs.map((tab) => (
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
              onMouseOver={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#252525' }}
              onMouseOut={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          <h4 style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '1.5rem 0 0.5rem 0.5rem' }}>Healers' Circle</h4>
          {healersCircleTabs.map((tab) => (
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
              onMouseOver={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#252525' }}
              onMouseOut={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          <h4 style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '1.5rem 0 0.5rem 0.5rem' }}>Clinical Quality</h4>
          {clinicalQualityTabs.map((tab) => (
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
              onMouseOver={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#252525' }}
              onMouseOut={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          <h4 style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '1.5rem 0 0.5rem 0.5rem' }}>Corporate Governance</h4>
          {corporateGovernanceTabs.map((tab) => (
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
              onMouseOver={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#252525' }}
              onMouseOut={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          <h4 style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '1.5rem 0 0.5rem 0.5rem' }}>Investor Relations</h4>
          {investorRelationsTabs.map((tab) => (
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
              onMouseOver={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#252525' }}
              onMouseOut={(e: any) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent' }}
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
            onMouseOver={(e: any) => e.currentTarget.style.backgroundColor = 'rgba(255, 77, 79, 0.1)'}
            onMouseOut={(e: any) => e.currentTarget.style.backgroundColor = 'transparent'}
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
            {(tabs.find(t => t.id === activeTab) || discoverTabs.find(t => t.id === activeTab) || leadershipTabs.find(t => t.id === activeTab) || healersCircleTabs.find(t => t.id === activeTab) || clinicalQualityTabs.find(t => t.id === activeTab) || academicsTabs.find(t => t.id === activeTab) || csrTabs.find(t => t.id === activeTab) || mediaCentreTabs.find(t => t.id === activeTab) || corporatePartnershipsTabs.find(t => t.id === activeTab) || corporateGovernanceTabs.find(t => t.id === activeTab) || investorRelationsTabs.find(t => t.id === activeTab))?.label || 'Dashboard'}
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
                      onChange={(e: any) => setHeroImageUrl(e.target.value)}
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
                      onFocus={(e: any) => e.target.style.borderColor = '#00A676'}
                      onBlur={(e: any) => e.target.style.borderColor = '#333'}
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
                        onChange={(e: any) => setUploadPreset(e.target.value)}
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
                      onMouseOver={(e: any) => e.currentTarget.style.borderColor = '#00A676'}
                      onMouseOut={(e: any) => e.currentTarget.style.borderColor = '#333'}
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
                      onMouseOver={(e: any) => !saving && (e.currentTarget.style.backgroundColor = '#00d28c')}
                      onMouseOut={(e: any) => !saving && (e.currentTarget.style.backgroundColor = '#00A676')}
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
                      onError={(e: any) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                </div>
              )}

            </div>
          )}

          {activeTab === 'locations' && <LocationsManager />}
          {activeTab === 'services' && <ServicesManager />}
          {activeTab === 'whychoose' && <WhyChooseManager />}
          {activeTab === 'doctors' && <DoctorsManager />}
          {activeTab === 'testimonials' && <TestimonialsManager />}
          {activeTab === 'partners' && <PartnersManager />}
          {activeTab === 'faqs' && <FaqsManager />}
          {activeTab === 'enquiries' && <EnquiriesManager />}
          {activeTab === 'news' && <NewsManager />}

          {activeTab === 'discover-overview' && <OverviewManager />}
          {activeTab === 'discover-day' && <DayAtMidtownManager />}
          {activeTab === 'discover-vision' && <VisionMissionManager />}
          {activeTab === 'discover-anthem' && <AnthemManager />}
          {activeTab === 'discover-careers' && <CareersManager />}
          {activeTab === 'board-of-directors' && <BoardOfDirectorsManager />}
          {activeTab === 'executive-team' && <ExecutiveTeamManager />}
          {activeTab === 'medical-council' && <MedicalCouncilManager />}
          {activeTab === 'discover-brands' && <GroupBrandsManager />}
          {activeTab === 'discover-awards' && <AwardsManager />}
          {activeTab === 'discover-alliances' && <AlliancesManager />}
          {activeTab === 'discover-achievements' && <AchievementsManager />}
          {activeTab === 'board-committees' && <BoardCommitteesManager />}
          {activeTab === 'policies-guidelines' && <PoliciesGuidelinesManager />}
          {activeTab === 'ethics-compliance' && <EthicsComplianceManager />}
          {activeTab === 'financial-results' && <FinancialResultsManager />}
          {activeTab === 'annual-reports' && <AnnualReportsManager />}
          {activeTab === 'shareholder-info' && <ShareholderInfoManager />}
          {activeTab === 'corporate-announcements' && <CorporateAnnouncementsManager />}
          {activeTab === 'stock-information' && <StockInformationManager />}

          {activeTab === 'medical-education' && <MedicalEducationManager />}
          {activeTab === 'nursing-education' && <NursingEducationManager />}
          {activeTab === 'research-institutes' && <ResearchInstitutesManager />}
          {activeTab === 'clinical-trials' && <ClinicalTrialsManager />}
          {activeTab === 'publications' && <PublicationsManager />}
          {activeTab === 'fellowships' && <FellowshipsManager />}

          {activeTab === 'health-camps' && <HealthCampsManager />}
          {activeTab === 'community-outreach' && <CommunityOutreachManager />}
          {activeTab === 'environmental-initiatives' && <EnvironmentalInitiativesManager />}
          {activeTab === 'waste-management' && <WasteManagementManager />}
          {activeTab === 'green-hospitals' && <GreenHospitalsManager />}

          {activeTab === 'mc-press-releases' && <PressReleasesManager />}
          {activeTab === 'mc-in-the-news' && <InTheNewsManager />}
          {activeTab === 'mc-media-kit' && <MediaKitManager />}
          {activeTab === 'mc-brand-guidelines' && <BrandGuidelinesManager />}
          {activeTab === 'mc-event-gallery' && <EventGalleryManager />}
          
          {activeTab === 'cp-corporate-tie-ups' && <CorporateTieUpsManager />}
          {activeTab === 'cp-wellness-programs' && <WellnessProgramsManager />}
          {activeTab === 'cp-insurance-partners' && <InsurancePartnersManager />}
          {activeTab === 'cp-tpa-desk' && <TpaDeskManager />}

          {activeTab === 'nursing-excellence' && <NursingExcellenceManager />}
          {activeTab === 'doctor-awards' && <DoctorAwardsManager />}
          {activeTab === 'paramedical-staff' && <ParamedicalStaffManager />}
          {activeTab === 'employee-spotlights' && <EmployeeSpotlightsManager />}

          {activeTab === 'quality-certifications' && <QualityCertificationsManager />}
          {activeTab === 'infection-control' && <InfectionControlManager />}
          {activeTab === 'patient-safety' && <PatientSafetyManager />}
          {activeTab === 'clinical-indicators' && <ClinicalIndicatorsManager />}
          {activeTab === 'feedback-mechanism' && <FeedbackMechanismManager />}

          {activeTab !== 'hero' && activeTab !== 'locations' && activeTab !== 'services' && activeTab !== 'whychoose' && activeTab !== 'doctors' && activeTab !== 'testimonials' && activeTab !== 'partners' && activeTab !== 'faqs' && activeTab !== 'enquiries' && activeTab !== 'news' && !discoverTabs.find(t => t.id === activeTab) && !leadershipTabs.find(t => t.id === activeTab) && !academicsTabs.find(t => t.id === activeTab) && !csrTabs.find(t => t.id === activeTab) && !mediaCentreTabs.find(t => t.id === activeTab) && !corporatePartnershipsTabs.find(t => t.id === activeTab) && !healersCircleTabs.find(t => t.id === activeTab) && !clinicalQualityTabs.find(t => t.id === activeTab) && !corporateGovernanceTabs.find(t => t.id === activeTab) && !investorRelationsTabs.find(t => t.id === activeTab) && (
            <div style={{ backgroundColor: '#1A1A1A', borderRadius: '12px', padding: '3rem', border: '1px solid #2a2a2a', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', backgroundColor: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Settings size={24} color="#666" />
              </div>
              <h3 style={{ margin: '0 0 0.5rem', color: '#fff', fontSize: '1.25rem' }}>Module in Development</h3>
              <p style={{ color: '#aaa', margin: 0 }}>The {(tabs.find(t => t.id === activeTab) || discoverTabs.find(t => t.id === activeTab) || leadershipTabs.find(t => t.id === activeTab) || academicsTabs.find(t => t.id === activeTab) || csrTabs.find(t => t.id === activeTab) || mediaCentreTabs.find(t => t.id === activeTab) || corporatePartnershipsTabs.find(t => t.id === activeTab) || healersCircleTabs.find(t => t.id === activeTab) || clinicalQualityTabs.find(t => t.id === activeTab) || corporateGovernanceTabs.find(t => t.id === activeTab) || investorRelationsTabs.find(t => t.id === activeTab))?.label} section is currently being built.</p>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
