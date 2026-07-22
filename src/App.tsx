import React, { useState, useEffect, useMemo } from 'react';
import { Tag, Star, Award, Users, X, ArrowUpRight, MessageSquare } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ToolsGrid } from './components/ToolsGrid';
import { ComparisonHub } from './components/ComparisonHub';
import { ComparisonDetail } from './components/ComparisonDetail';
import { PriceTableSection } from './components/PriceTableSection';
import { ROICalculatorSection } from './components/ROICalculatorSection';
import { StackBuilderSection } from './components/StackBuilderSection';
import { QuizSection } from './components/QuizSection';
import { ToolSubmissionSection } from './components/ToolSubmissionSection';
import { BlogSection } from './components/BlogSection';
import { ArticleView } from './components/ArticleView';
import { NewsletterSection } from './components/NewsletterSection';
import { AdminRevenueSection } from './components/AdminRevenueSection';
import { EmailPopupModal } from './components/EmailPopupModal';
import { PremiumModal } from './components/PremiumModal';
import { FAB } from './components/FAB';
import { Footer } from './components/Footer';
import { ToolLogo } from './components/ToolLogo';
import { LegalPages } from './components/LegalPages';

import { INITIAL_TOOLS, USER_REVIEWS } from './data/thakaaData';
import { Tool } from './types';
import { Storage, showToast } from './utils/storage';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return Storage.get<'dark' | 'light'>('theme', 'dark');
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubFilter, setActiveSubFilter] = useState('all');

  const [activeView, setActiveView] = useState<
    'home' | 'comparisons' | 'submit' | 'quiz' | 'privacy' | 'terms' | 'contact' | 'about'
  >('home');

  const [activeComparisonKey, setActiveComparisonKey] = useState<string | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  const [selectedToolDetail, setSelectedToolDetail] = useState<Tool | null>(null);

  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(() => {
    return Storage.get<boolean>('premiumUnlocked', false);
  });

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    Storage.set('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(`Switched to ${nextTheme} mode`);
  };

  // Dynamic Metadata & SEO
  useEffect(() => {
    let title = 'Thakaa AI — Verified AI Directory & Software Comparison Index';
    let metaDesc = 'Discover, compare, and evaluate verified artificial intelligence tools, LLM benchmarks, and enterprise software suites.';

    if (activeArticleId) {
      title = 'Technical Benchmark Report | Thakaa AI Directory';
      metaDesc = 'Read in-depth technical analysis, context retention benchmarks, and pros/cons evaluation.';
    } else if (activeView === 'comparisons') {
      title = 'AI Tool Side-by-Side Comparisons & Matrix | Thakaa AI';
      metaDesc = 'Compare ChatGPT vs Claude, Midjourney vs DALL-E 3, Gemini vs Copilot across features, pricing, and latency.';
    } else if (activeView === 'submit') {
      title = 'Submit AI Software | Thakaa AI Index';
      metaDesc = 'Submit your artificial intelligence software or developer tool for review and inclusion in our directory.';
    } else if (activeView === 'quiz') {
      title = 'AI Tool Recommendation Quiz | Thakaa AI';
      metaDesc = 'Interactive tool finder helping you discover software matching your budget, workflow, and language needs.';
    } else if (activeView === 'privacy') {
      title = 'Privacy Policy | Thakaa AI Directory';
      metaDesc = 'Learn how Thakaa AI collects, stores, and protects user data and adheres to Google AdSense privacy standards.';
    } else if (activeView === 'terms') {
      title = 'Terms of Service | Thakaa AI Directory';
      metaDesc = 'Read the terms of service, editorial policies, and software directory usage agreements for Thakaa AI.';
    } else if (activeView === 'contact') {
      title = 'Contact Us & Support | Thakaa AI';
      metaDesc = 'Get in touch with the Thakaa AI research team for listing requests, partnerships, and technical support.';
    } else if (activeView === 'about') {
      title = 'About Us — Independent AI Benchmark Directory | Thakaa AI';
      metaDesc = 'Learn about Thakaa AI mission, empirical testing methodology, and regional language evaluation team.';
    }

    document.title = title;
    let metaEl = document.querySelector('meta[name="description"]');
    if (!metaEl) {
      metaEl = document.createElement('meta');
      metaEl.setAttribute('name', 'description');
      document.head.appendChild(metaEl);
    }
    metaEl.setAttribute('content', metaDesc);
  }, [activeView, activeArticleId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isEditing = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT' ||
        (activeEl as HTMLElement).isContentEditable
      );

      if ((e.key === '/' && !isEditing) || ((e.ctrlKey || e.metaKey) && e.key === 'k')) {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
      if (e.key === 'Escape') {
        setSelectedToolDetail(null);
        setIsEmailPopupOpen(false);
        setIsPremiumModalOpen(false);
        const searchInput = document.getElementById('searchInput');
        if (searchInput && document.activeElement === searchInput) {
          searchInput.blur();
        }
      }
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [theme]);

  // Exit intent mouse listener
  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      const hasSeen = localStorage.getItem('newsletter_dismissed');
      if (hasSeen === 'true') return;
      if (e.clientY < 10 && !isEmailPopupOpen) {
        setIsEmailPopupOpen(true);
      }
    };
    document.addEventListener('mouseout', handleMouseOut);
    return () => document.removeEventListener('mouseout', handleMouseOut);
  }, [isEmailPopupOpen]);

  // Register Global Thakaa API
  useEffect(() => {
    (window as any).Thakaa = {
      toggleTheme,
      filterCategory: (cat: string) => {
        setActiveCategory(cat);
        setActiveView('home');
      },
      filterSub: (sub: string) => {
        setActiveSubFilter(sub);
        setActiveView('home');
      },
      showDetails: (id: number) => {
        const found = INITIAL_TOOLS.find((t) => t.id === id);
        if (found) setSelectedToolDetail(found);
      },
      showSection: (sec: any) => {
        setActiveView(sec);
        setActiveComparisonKey(null);
        setActiveArticleId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      showComparisonHub: () => {
        setActiveView('comparisons');
        setActiveComparisonKey(null);
      },
      showComparison: (key: string) => {
        setActiveComparisonKey(key);
        setActiveView('comparisons');
      },
      showArticle: (artId: string) => {
        setActiveArticleId(artId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      trackAffiliateClick: (toolId: string, url: string) => {
        Storage.push('affiliateClicks', {
          toolId,
          url,
          timestamp: new Date().toISOString(),
          source: 'direct'
        });
        window.open(url, '_blank', 'noopener,noreferrer');
      },
      closeEmailPopup: () => setIsEmailPopupOpen(false),
      closePremiumModal: () => setIsPremiumModalOpen(false),
      unlockPremium: () => {
        setIsPremiumUnlocked(true);
        Storage.set('premiumUnlocked', true);
        setIsPremiumModalOpen(false);
        showToast('Premium unlocked');
      },
      scrollToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    };
  }, [theme]);

  const [savedToolIds, setSavedToolIds] = useState<number[]>(() => Storage.getSavedTools());

  // Filtered tools query
  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return INITIAL_TOOLS.filter((t) => {
      const catMatch = activeCategory === 'all' || t.category === activeCategory;
      let subMatch = activeSubFilter === 'all';
      if (activeSubFilter === 'saved') {
        subMatch = savedToolIds.includes(t.id);
      } else if (activeSubFilter !== 'all') {
        subMatch = t.tags.includes(activeSubFilter);
      }

      const searchMatch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));
      return catMatch && subMatch && searchMatch;
    });
  }, [searchQuery, activeCategory, activeSubFilter, savedToolIds]);

  const handleToggleBookmark = (toolId: number) => {
    const isSaved = Storage.toggleSavedTool(toolId);
    const updated = Storage.getSavedTools();
    setSavedToolIds(updated);
    const tool = INITIAL_TOOLS.find((t) => t.id === toolId);
    const name = tool ? tool.name : 'Tool';
    showToast(
      isSaved
        ? `Added "${name}" to your saved list`
        : `Removed "${name}" from saved list`
    );
  };

  const handleNavigate = (sec: string) => {
    setActiveArticleId(null);
    if (sec === 'stackBuilder') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById('stackBuilder');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    if (sec === 'newsletter') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById('newsletter');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    if (sec === 'tools' || sec === 'categories') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById('tools');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    if (sec === 'comparisons') {
      setActiveView('comparisons');
      setActiveComparisonKey(null);
    } else if (sec === 'submit') {
      setActiveView('submit');
    } else if (sec === 'quiz') {
      setActiveView('quiz');
    } else if (sec === 'privacy' || sec === 'terms' || sec === 'contact' || sec === 'about') {
      setActiveView(sec as any);
    } else {
      setActiveView('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Reading Progress Line for Articles */}
      {activeArticleId && <div className="reading-progress" style={{ width: '100%' }} />}

      {/* Navigation Header */}
      <Header theme={theme} onToggleTheme={toggleTheme} onNavigate={handleNavigate} />

      {/* Main View Router */}
      <main>
        {activeArticleId ? (
          <ArticleView
            articleId={activeArticleId}
            onBack={() => setActiveArticleId(null)}
            onNavigateQuiz={() => {
              setActiveArticleId(null);
              setActiveView('quiz');
            }}
          />
        ) : (
          <>
            {activeView === 'privacy' || activeView === 'terms' || activeView === 'contact' || activeView === 'about' ? (
              <LegalPages
                type={activeView}
                onBackHome={() => handleNavigate('home')}
              />
            ) : (
              <>
                {activeView === 'home' && (
                  <>
                    {/* Hero Search & Filter Section */}
                    <Hero
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      activeCategory={activeCategory}
                      setActiveCategory={setActiveCategory}
                      activeSubFilter={activeSubFilter}
                      setActiveSubFilter={setActiveSubFilter}
                    />

                    {/* Offer Notice Banner */}
                    <div className="container">
                      <div className="urgency-banner" id="urgencyBanner">
                        <div className="urgency-text flex items-center gap-2">
                          <Tag className="w-4 h-4 text-amber-500" />
                          <span>Promotional Offer:</span> Save 30% on Jasper AI annual subscription plans
                        </div>
                        <button
                          className="urgency-btn flex items-center gap-1"
                          onClick={() => (window as any).Thakaa.trackAffiliateClick('jasper-urgency', 'https://jasper.ai')}
                          aria-label="View Jasper AI discount offer"
                        >
                          View Offer <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Partner Listings */}
                    <div className="container">
                      <div className="sponsored-section">
                        <div className="sponsored-label">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Featured Partners
                        </div>
                        <div className="sponsored-grid">
                          <div className="sponsored-card">
                            <span className="sponsored-tag">PARTNER</span>
                            <h4>Jasper AI</h4>
                            <p>Enterprise AI copywriting and content automation platform.</p>
                            <button
                              className="sponsored-cta"
                              onClick={() => (window as any).Thakaa.trackAffiliateClick('jasper-sponsored', 'https://jasper.ai')}
                              aria-label="Visit Jasper AI"
                            >
                              Visit <ArrowUpRight className="w-3 h-3 ml-1" />
                            </button>
                          </div>
                          <div className="sponsored-card">
                            <span className="sponsored-tag">PARTNER</span>
                            <h4>Semrush</h4>
                            <p>Search engine marketing, keyword analytics, and competitor insights.</p>
                            <button
                              className="sponsored-cta"
                              onClick={() => (window as any).Thakaa.trackAffiliateClick('semrush-sponsored', 'https://semrush.com')}
                              aria-label="Visit Semrush"
                            >
                              Visit <ArrowUpRight className="w-3 h-3 ml-1" />
                            </button>
                          </div>
                          <div className="sponsored-card">
                            <span className="sponsored-tag">PARTNER</span>
                            <h4>ElevenLabs</h4>
                            <p>High-fidelity AI text-to-speech voice generation and cloning.</p>
                            <button
                              className="sponsored-cta"
                              onClick={() => (window as any).Thakaa.trackAffiliateClick('elevenlabs-sponsored', 'https://elevenlabs.io')}
                              aria-label="Visit ElevenLabs"
                            >
                              Visit <ArrowUpRight className="w-3 h-3 ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Main Directory Tools Grid */}
                    <ToolsGrid
                      tools={filteredTools}
                      onShowDetails={(tool) => setSelectedToolDetail(tool)}
                      savedToolIds={savedToolIds}
                      onToggleBookmark={handleToggleBookmark}
                    />

                    {/* Featured Tool of the Month */}
                    <div className="container">
                      <div className="featured-week">
                        <div className="fw-label flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-primary" /> Monthly Highlight
                        </div>
                        <div className="fw-content">
                          <ToolLogo name="Midjourney" domain="midjourney.com" size={48} className="flex-shrink-0" />
                          <div className="fw-info">
                            <h3>Midjourney — Generative Visual Studio</h3>
                            <p>
                              Benchmark evaluation across 15 image synthesis platforms demonstrated highest consistency in architectural rendering and prompt adherence.
                            </p>
                            <button
                              className="fw-cta inline-flex items-center gap-1"
                              onClick={() => (window as any).Thakaa.trackAffiliateClick('midjourney-featured', 'https://midjourney.com')}
                              aria-label="Read Midjourney benchmark evaluation"
                            >
                              Read Benchmark Evaluation <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Social Proof */}
                    <div className="container">
                      <div className="social-proof">
                        <div className="sp-avatars">
                          <div className="avatar"><Users className="w-3.5 h-3.5 mx-auto" /></div>
                        </div>
                        <div className="sp-text">
                          Over <strong>12,000 professional users</strong> researched tools via Thakaa this month
                        </div>
                      </div>
                    </div>

                    {/* Price Comparison Tables */}
                    <PriceTableSection />

                    {/* ROI Calculator Section */}
                    <ROICalculatorSection />

                    {/* AI Stack Builder Section */}
                    <StackBuilderSection />

                    {/* Blog & Guides Section */}
                    <BlogSection onSelectArticle={(artId) => setActiveArticleId(artId)} />

                    {/* Verified Reviews */}
                    <section className="reviews-section" id="reviews">
                      <div className="container">
                        <div className="section-title-wrap">
                          <MessageSquare className="w-6 h-6 text-primary inline mr-2" />
                          <h2>User Evaluations & Feedback</h2>
                        </div>
                        <p>Verified feedback from engineers, founders, and content managers</p>
                        <div className="reviews-grid" id="reviewsGrid">
                          {USER_REVIEWS.map((rev, idx) => (
                            <div key={idx} className="review-card">
                              <div className="review-header">
                                <div className="review-avatar">{rev.avatar}</div>
                                <div className="review-meta">
                                  <div className="review-name">{rev.name}</div>
                                  <div className="review-tool">{rev.tool}</div>
                                </div>
                              </div>
                              <div className="review-stars flex gap-1 text-amber-400 my-1">
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                              </div>
                              <div className="review-text">{rev.text}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* Newsletter Subscription */}
                    <NewsletterSection />
                  </>
                )}

                {activeView === 'comparisons' && (
                  <>
                    {activeComparisonKey ? (
                      <ComparisonDetail
                        comparisonKey={activeComparisonKey}
                        onBack={() => setActiveComparisonKey(null)}
                      />
                    ) : (
                      <ComparisonHub
                        onSelectComparison={(key) => setActiveComparisonKey(key)}
                      />
                    )}
                  </>
                )}

                {activeView === 'submit' && <ToolSubmissionSection />}

                {activeView === 'quiz' && <QuizSection />}
              </>
            )}
          </>
        )}
      </main>

      {/* Admin Panel & Revenue Stats */}
      <AdminRevenueSection />

      {/* Floating Action Button */}
      <FAB
        onNavigateQuiz={() => { setActiveView('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onNavigateStack={() => handleNavigate('stackBuilder')}
        onToggleTheme={toggleTheme}
      />

      {/* Modals */}
      <EmailPopupModal
        isOpen={isEmailPopupOpen}
        onClose={() => setIsEmailPopupOpen(false)}
      />

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        onUnlocked={() => setIsPremiumUnlocked(true)}
      />

      {/* Tool Detail Modal */}
      {selectedToolDetail && (
        <div className="premium-modal-overlay active" onClick={() => setSelectedToolDetail(null)}>
          <div className="premium-modal text-left max-w-lg" onClick={(e) => e.stopPropagation()}>
            <button className="close-x" onClick={() => setSelectedToolDetail(null)} aria-label="Close tool details modal">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <ToolLogo name={selectedToolDetail.name} domain={selectedToolDetail.domain} size={40} />
              <div>
                <h3 className="text-lg font-bold">{selectedToolDetail.name}</h3>
                <span className="text-xs text-secondary uppercase tracking-wider">{selectedToolDetail.category}</span>
              </div>
            </div>
            <p className="text-sm text-secondary mb-4">{selectedToolDetail.desc}</p>
            <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
              <div className="text-xs text-secondary mb-1"><strong>Pricing Model:</strong> {selectedToolDetail.price}</div>
              <div className="text-xs text-secondary mb-1"><strong>User Rating:</strong> {selectedToolDetail.rating} / 5.0</div>
              <div className="text-xs text-secondary mb-1"><strong>Arabic Support:</strong> {selectedToolDetail.arabic}</div>
              <div className="text-xs text-secondary"><strong>Open Source:</strong> {selectedToolDetail.opensource ? 'Yes' : 'No'}</div>
            </div>
            <button
              className="premium-btn flex items-center justify-center gap-1.5"
              onClick={() => {
                (window as any).Thakaa.trackAffiliateClick(selectedToolDetail.id, selectedToolDetail.url);
              }}
              aria-label={`Visit official website for ${selectedToolDetail.name}`}
            >
              Visit Product Website <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        onNavigateSubmit={() => handleNavigate('submit')}
        onNavigateStack={() => handleNavigate('stackBuilder')}
        onNavigateQuiz={() => handleNavigate('quiz')}
        onNavigateLegal={(type) => handleNavigate(type)}
      />
    </div>
  );
}
