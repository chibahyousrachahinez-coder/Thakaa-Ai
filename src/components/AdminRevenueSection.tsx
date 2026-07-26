import React, { useState, useEffect } from 'react';
import { Settings, BarChart2, Download, Trash2, Zap, Edit2, Check, Sparkles } from 'lucide-react';
import { Storage, getAffiliateStats, showToast } from '../utils/storage';
import { RevenueStats } from '../types';

const ADMIN_EMAIL = "chibahyousrachaihnez@gmail.com";
const ADMIN_EMAILS = [
  "chibahyousrachaihnez@gmail.com",
  "chibahyousrachahinez@gmail.com"
];

export const AdminRevenueSection: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string>(() => {
    return Storage.get<string>('adminUserEmail', ADMIN_EMAIL);
  });
  const [emailInput, setEmailInput] = useState(userEmail);
  const [stats, setStats] = useState<RevenueStats>({ clicks: 0, subscribers: 0, submissions: 0, revenue: 0 });
  const [tagline, setTagline] = useState<string>(() => {
    return Storage.get<string>('appTagline', 'Verified AI Directory & Comparison Index');
  });
  const [isEditingTagline, setIsEditingTagline] = useState(false);
  const [tempTagline, setTempTagline] = useState(tagline);

  // User object structure matching Auth standard
  const user = {
    primaryEmailAddress: {
      emailAddress: userEmail
    }
  };

  const isAuthorized = ADMIN_EMAILS.some(
    (e) => e.toLowerCase() === (user?.primaryEmailAddress?.emailAddress || '').trim().toLowerCase()
  );

  const refreshStats = () => {
    const s = getAffiliateStats();
    setStats(s);
  };

  const handleShowStats = () => {
    refreshStats();
    setIsDashboardOpen(!isDashboardOpen);
  };

  const handleSaveTagline = () => {
    const trimmed = tempTagline.trim() || 'Verified AI Directory & Comparison Index';
    setTagline(trimmed);
    Storage.set('appTagline', trimmed);
    setIsEditingTagline(false);
    showToast('Brand tagline updated');
  };

  const handleExportData = () => {
    const data = {
      tagline,
      clicks: Storage.get('affiliateClicks', []),
      subscribers: Storage.get('newsletterSubscribers', []),
      submissions: Storage.get('toolSubmissions', []),
      premiumUsers: Storage.get('premiumUsers', []),
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thakaa-revenue-data.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully.');
  };

  const handleClearData = () => {
    if (confirm('Are you sure? This will delete all analytics data.')) {
      ['affiliateClicks', 'newsletterSubscribers', 'toolSubmissions', 'premiumUsers', 'premiumUnlocked'].forEach(key => Storage.remove(key));
      refreshStats();
      showToast('All data cleared.', 'error');
    }
  };

  const handleSimulateTraffic = () => {
    const toolIds = ['chatgpt','claude','jasper','midjourney','semrush','elevenlabs','notion','canva'];
    for (let i = 0; i < 50; i++) {
      const toolId = toolIds[Math.floor(Math.random() * toolIds.length)];
      Storage.push('affiliateClicks', {
        toolId,
        url: 'https://example.com',
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    }
    for (let i = 0; i < 20; i++) {
      Storage.push('newsletterSubscribers', {
        email: `user${i}@example.com`,
        date: new Date().toISOString()
      });
    }
    refreshStats();
    showToast('Simulated 50 clicks and 20 subscribers.');
  };

  useEffect(() => {
    refreshStats();
    if (typeof window !== 'undefined') {
      (window as any).Thakaa = (window as any).Thakaa || {};
      (window as any).Thakaa.toggleAdmin = () => setIsAdminOpen(!isAdminOpen);
      (window as any).Thakaa.showRevenueStats = () => handleShowStats();
      (window as any).Thakaa.exportData = () => handleExportData();
      (window as any).Thakaa.clearAllData = () => handleClearData();
      (window as any).Thakaa.simulateTraffic = () => handleSimulateTraffic();
    }
  }, [isAdminOpen, isDashboardOpen]);

  return (
    <>
      {/* Admin Panel Floating Toggle */}
      <button
        className="admin-toggle"
        onClick={() => setIsAdminOpen(!isAdminOpen)}
        title="Admin Panel"
        aria-label="Open admin revenue dashboard"
      >
        <Settings className="w-4 h-4 mx-auto" />
      </button>

      {/* Admin Panel Popover */}
      <div className={`admin-panel ${isAdminOpen ? 'active' : ''}`} id="adminPanel">
        <h4>Analytics & Admin</h4>
        <button onClick={handleShowStats}><BarChart2 className="w-4 h-4 inline mr-1" /> View Dashboard</button>
        <button onClick={handleExportData}><Download className="w-4 h-4 inline mr-1" /> Export JSON</button>
        <button onClick={handleClearData}><Trash2 className="w-4 h-4 inline mr-1" /> Clear Storage</button>
        <button onClick={handleSimulateTraffic}><Zap className="w-4 h-4 inline mr-1" /> Sample Data</button>
      </div>

      {/* Analytics & Brand Dashboard */}
      <div className={`revenue-dashboard ${isDashboardOpen ? 'active' : ''}`} id="revenueDashboard">
        <div className="container">
          {!isAuthorized ? (
            <div className="p-8 bg-slate-900 border border-rose-500/30 rounded-2xl shadow-xl text-center max-w-lg mx-auto my-6">
              <p className="text-rose-400 font-bold text-base mb-3">
                Access Denied: You are not authorized to view this page.
              </p>
              <p className="text-slate-400 text-xs mb-5">
                Admin functions and metrics are restricted strictly to <span className="font-mono text-slate-200">{ADMIN_EMAIL}</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="Enter authorized email..."
                  className="bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                <button
                  onClick={() => {
                    setUserEmail(emailInput);
                    Storage.set('adminUserEmail', emailInput);
                  }}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Verify
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Brand Identity & Preview Section */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 mb-6 rounded-xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  {/* Circular Logo Preview Container */}
                  <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center shadow-inner flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="none">
                      <rect x="2" y="4" width="28" height="7" rx="3.5" fill="#2563EB"/>
                      <rect x="12" y="13" width="8" height="15" rx="3.5" fill="currentColor" className="text-white"/>
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-white">Thakaa AI</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        Admin Active
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 ml-2">
                        ({user.primaryEmailAddress.emailAddress})
                      </span>
                    </div>

                    {/* Tagline Preview or Inline Editor */}
                    {isEditingTagline ? (
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="text"
                          className="text-xs bg-slate-950 border border-blue-500 rounded px-2 py-1 text-slate-100 outline-none w-64"
                          value={tempTagline}
                          onChange={(e) => setTempTagline(e.target.value)}
                          placeholder="Enter brand tagline..."
                        />
                        <button
                          onClick={handleSaveTagline}
                          className="p-1 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                          title="Save Tagline"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                        <Sparkles className="w-3 h-3 text-blue-400 flex-shrink-0" />
                        <span>{tagline}</span>
                        <button
                          onClick={() => { setTempTagline(tagline); setIsEditingTagline(true); }}
                          className="p-0.5 text-slate-500 hover:text-slate-300 transition-colors"
                          title="Edit Tagline"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Directory System Online</span>
                </div>
              </div>

              <h3 className="text-lg font-bold mb-3">Directory Performance Metrics (30 Days)</h3>
              <div className="revenue-stats">
                <div className="revenue-stat">
                  <div className="number" id="statClicks">{stats.clicks}</div>
                  <div className="label">Outbound Clicks</div>
                </div>
                <div className="revenue-stat">
                  <div className="number" id="statSubs">{stats.subscribers}</div>
                  <div className="label">Email Subscribers</div>
                </div>
                <div className="revenue-stat">
                  <div className="number" id="statTools">{stats.submissions}</div>
                  <div className="label">Tool Submissions</div>
                </div>
                <div className="revenue-stat">
                  <div className="number" id="statRevenue">${Math.round(stats.revenue).toLocaleString()}</div>
                  <div className="label">Est. Value Realized</div>
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                Based on standard referral models and estimated enterprise conversion ratios
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

