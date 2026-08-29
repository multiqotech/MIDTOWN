import os

filepath = "/home/krishna-gupta/Desktop/MIDTOWN/admin/src/app/dashboard/page.tsx"
with open(filepath, 'r') as f:
    content = f.read()

# 1. Imports
content = content.replace(
"import NewsManager from './NewsManager';\n",
"""import NewsManager from './NewsManager';
import OverviewManager from './discover/OverviewManager';
import DayAtMidtownManager from './discover/DayAtMidtownManager';
import VisionMissionManager from './discover/VisionMissionManager';
import AnthemManager from './discover/AnthemManager';
import CareersManager from './discover/CareersManager';
import LeadershipManager from './discover/LeadershipManager';
import GroupBrandsManager from './discover/GroupBrandsManager';
import AwardsManager from './discover/AwardsManager';
import AlliancesManager from './discover/AlliancesManager';
import AchievementsManager from './discover/AchievementsManager';
"""
)

# 2. Tabs
content = content.replace(
"    { id: 'settings', label: 'System Settings', icon: <Settings size={20} /> },\n  ];",
"""    { id: 'settings', label: 'System Settings', icon: <Settings size={20} /> },
  ];

  const discoverTabs = [
    { id: 'discover-overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-day', label: 'Day at Midtown', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-vision', label: 'Vision & Mission', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-anthem', label: 'Anthem', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-careers', label: 'Careers', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-leadership', label: 'Leadership', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-brands', label: 'Group Brands', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-awards', label: 'Awards', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-alliances', label: 'Alliances', icon: <LayoutDashboard size={20} /> },
    { id: 'discover-achievements', label: 'Achievements', icon: <LayoutDashboard size={20} /> },
  ];"""
)

# 3. Sidebar header Main
content = content.replace(
"""        <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {tabs.map((tab) => (""",
"""        <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h4 style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 0.5rem 0.5rem' }}>Main</h4>
          {tabs.map((tab) => ("""
)

# 4. Sidebar header Discover
content = content.replace(
"""              {tab.label}
            </button>
          ))}
        </nav>""",
"""              {tab.label}
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
              onMouseOver={(e) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#252525' }}
              onMouseOut={(e) => { if(activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>"""
)

# 5. Dynamic Workspace rendering
content = content.replace(
"""          {activeTab === 'news' && (
            <NewsManager />
          )}

          {activeTab !== 'hero' && activeTab !== 'locations'""",
"""          {activeTab === 'news' && (
            <NewsManager />
          )}

          {activeTab === 'discover-overview' && <OverviewManager />}
          {activeTab === 'discover-day' && <DayAtMidtownManager />}
          {activeTab === 'discover-vision' && <VisionMissionManager />}
          {activeTab === 'discover-anthem' && <AnthemManager />}
          {activeTab === 'discover-careers' && <CareersManager />}
          {activeTab === 'discover-leadership' && <LeadershipManager />}
          {activeTab === 'discover-brands' && <GroupBrandsManager />}
          {activeTab === 'discover-awards' && <AwardsManager />}
          {activeTab === 'discover-alliances' && <AlliancesManager />}
          {activeTab === 'discover-achievements' && <AchievementsManager />}

          {activeTab !== 'hero' && activeTab !== 'locations'"""
)

# 6. Fallback condition
content = content.replace(
"activeTab !== 'news' && (",
"activeTab !== 'news' && !discoverTabs.find(t => t.id === activeTab) && ("
)

# 7. Fallback title
content = content.replace(
"The {tabs.find(t => t.id === activeTab)?.label} section is currently being built.",
"The {(tabs.find(t => t.id === activeTab) || discoverTabs.find(t => t.id === activeTab))?.label} section is currently being built."
)

# 8. Topbar title
content = content.replace(
"{tabs.find(t => t.id === activeTab)?.label || 'Dashboard'}",
"{(tabs.find(t => t.id === activeTab) || discoverTabs.find(t => t.id === activeTab))?.label || 'Dashboard'}"
)

with open(filepath, 'w') as f:
    f.write(content)

print("page.tsx modified successfully")
