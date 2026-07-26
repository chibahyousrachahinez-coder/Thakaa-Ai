import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Star,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Bookmark,
  Share2,
  Tag,
  Zap,
  Globe,
  DollarSign,
  Cpu,
  Sparkles,
  Layers
} from 'lucide-react';
import { INITIAL_TOOLS } from '../data/thakaaData';
import { ToolLogo } from './ToolLogo';
import { findToolBySlug, getToolSlug, getCategorySlug } from '../utils/slug';
import { updateHeadSEO, generateToolJsonLd } from '../utils/seo';
import { Storage, showToast } from '../utils/storage';

interface ToolDetailPageProps {
  savedToolIds: number[];
  onToggleBookmark: (toolId: number) => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({
  savedToolIds,
  onToggleBookmark
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const tool = slug ? findToolBySlug(slug) : undefined;

  useEffect(() => {
    if (tool) {
      const toolSlug = getToolSlug(tool);
      const jsonLd = generateToolJsonLd(tool);
      updateHeadSEO({
        title: tool.metaTitle || `${tool.name} Review, Pricing & Alternatives | Thakaa AI Directory`,
        description: tool.metaDescription || `In-depth technical breakdown of ${tool.name}. ${tool.desc} Compare pricing (${tool.price}), ratings, and top alternatives.`,
        canonicalUrl: `https://thakaa.ai/tools/${toolSlug}`,
        ogType: 'product',
        jsonLd
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      updateHeadSEO({
        title: 'Tool Not Found | Thakaa AI Directory',
        description: 'The requested AI tool or software utility could not be found.'
      });
    }
  }, [tool]);

  if (!tool) {
    return (
      <div className="container py-16 text-center" style={{ minHeight: '60vh' }}>
        <h2 className="text-2xl font-bold mb-4">Tool Not Found</h2>
        <p className="text-secondary mb-6">
          We couldn't locate an AI tool matching "<span className="text-primary">{slug}</span>".
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Directory
        </Link>
      </div>
    );
  }

  const isSaved = savedToolIds.includes(tool.id);

  // Find alternatives (tools in the same category or with matching pricing)
  const alternatives = INITIAL_TOOLS.filter(
    (t) => t.id !== tool.id && (t.category === tool.category || t.pricing === tool.pricing)
  ).slice(0, 4);

  // Generate pros and cons based on tool properties
  const pros = [
    `${tool.name} delivers ${tool.desc.toLowerCase()}`,
    `Flexible pricing tier: ${tool.price}`,
    tool.rating >= 4.5 ? `High community satisfaction score (${tool.rating}/5.0)` : `Standard rating of ${tool.rating}/5.0`,
    tool.arabic === 'yes' ? 'Full Arabic regional language localization' : tool.arabic === 'partial' ? 'Partial Arabic prompt & UI support' : 'Optimized multi-language performance',
    tool.opensource ? 'Open-source repository available for self-hosting and customization' : 'Cloud-managed infrastructure with instant uptime'
  ];

  const cons = [
    tool.pricing === 'paid' ? 'Requires paid subscription with no permanent free plan' : 'Free tier limits usage during peak traffic',
    'Requires active internet connection for model inference API calls'
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tool.name} on Thakaa AI Directory`,
        text: tool.desc,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Page URL copied to clipboard');
    }
  };

  const handleAffiliateClick = () => {
    Storage.push('affiliateClicks', {
      toolId: tool.id,
      name: tool.name,
      url: tool.url,
      timestamp: new Date().toISOString(),
      source: 'tool_detail'
    });
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container py-8 max-w-5xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-secondary mb-6 flex-wrap">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/category/${getCategorySlug(tool.category)}`} className="hover:text-primary transition-colors capitalize">
          {tool.category}
        </Link>
        <span>/</span>
        <span className="text-primary font-medium">{tool.name}</span>
      </nav>

      {/* Main Header Card */}
      <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <ToolLogo name={tool.name} domain={tool.domain} size={64} className="flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{tool.name}</h1>
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
                {tool.featured && (
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-medium border border-amber-500/20">
                    <Sparkles className="w-3.5 h-3.5" /> Featured
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-secondary flex-wrap mt-2">
                <Link
                  to={`/category/${getCategorySlug(tool.category)}`}
                  className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider text-primary hover:underline"
                >
                  <Tag className="w-3 h-3" /> {tool.category}
                </Link>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {tool.rating.toFixed(1)} / 5.0
                </span>
                <span>•</span>
                <span className="capitalize px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                  {tool.price}
                </span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
            <button
              onClick={() => onToggleBookmark(tool.id)}
              className={`p-2.5 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                  : 'bg-surface border-border hover:border-primary text-secondary'
              }`}
              title={isSaved ? 'Remove Bookmark' : 'Bookmark Tool'}
              aria-label="Bookmark tool"
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-amber-500' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-border hover:border-primary text-secondary transition-all"
              title="Share Tool"
              aria-label="Share tool page"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <a
              href={tool.url}
              target="_blank"
              rel="nofollow sponsored"
              onClick={(e) => {
                e.preventDefault();
                handleAffiliateClick();
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-md w-full md:w-auto text-sm"
            >
              Visit Official Site <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Short Summary Banner */}
        <div className="mt-6 pt-6 border-t border-border space-y-2">
          {tool.tagline && (
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              ⚡ {tool.tagline}
            </div>
          )}
          <p className="text-base text-secondary leading-relaxed">
            {tool.desc}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Features */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> Key Features & Strengths
            </h2>
            <ul className="space-y-3 text-sm text-secondary">
              {tool.keyFeatures && tool.keyFeatures.length > 0 ? (
                tool.keyFeatures.map((kf, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{kf}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Core Capabilities:</strong> Designed specifically for high-speed {tool.category} workflows with intelligent context processing.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Pricing Model:</strong> Offers {tool.pricing} tier structure ({tool.price}).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Arabic Support:</strong> {tool.arabic === 'yes' ? 'Native Arabic support' : tool.arabic === 'partial' ? 'Partial Arabic support' : 'English / Global interface'}.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Source Model:</strong> {tool.opensource ? 'Open-source code base' : 'Proprietary enterprise cloud engine'}.</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-emerald-500/20 rounded-2xl p-6">
              <h3 className="text-base font-bold text-emerald-500 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Pros
              </h3>
              <ul className="space-y-2.5 text-xs text-secondary">
                {pros.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface border border-amber-500/20 rounded-2xl p-6">
              <h3 className="text-base font-bold text-amber-500 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Considerations & Cons
              </h3>
              <ul className="space-y-2.5 text-xs text-secondary">
                {cons.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Outbound Link Box */}
          <div className="bg-gradient-to-r from-primary/10 to-emerald-500/10 border border-primary/20 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-bold mb-2">Ready to try {tool.name}?</h3>
            <p className="text-xs text-secondary mb-4 max-w-md mx-auto">
              Access the official website directly. External link is verified for security and user privacy.
            </p>
            <a
              href={tool.url}
              target="_blank"
              rel="nofollow sponsored"
              onClick={(e) => {
                e.preventDefault();
                handleAffiliateClick();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all text-sm shadow-md"
            >
              Go to {tool.name} <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Alternatives & Similar Tools */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" /> Alternatives to {tool.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {alternatives.map((alt) => (
                <div
                  key={alt.id}
                  onClick={() => navigate(`/tools/${getToolSlug(alt)}`)}
                  className="bg-surface border border-border hover:border-primary rounded-xl p-4 cursor-pointer transition-all flex items-start gap-3 group"
                >
                  <ToolLogo name={alt.name} domain={alt.domain} size={36} className="flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{alt.name}</h4>
                      <span className="text-xs text-amber-400 flex items-center">
                        <Star className="w-3 h-3 fill-amber-400 mr-0.5" /> {alt.rating}
                      </span>
                    </div>
                    <p className="text-xs text-secondary line-clamp-2 mt-1">{alt.desc}</p>
                    <div className="mt-2 text-xs font-mono text-primary flex items-center gap-1">
                      View Alternative <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Specifications */}
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-2xl p-6 sticky top-24">
            <h3 className="text-base font-bold mb-4 pb-3 border-b border-border flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" /> Tool Specifications
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-secondary block mb-0.5">Category</span>
                <Link
                  to={`/category/${getCategorySlug(tool.category)}`}
                  className="font-bold text-primary hover:underline capitalize"
                >
                  {tool.category}
                </Link>
              </div>

              <div>
                <span className="text-secondary block mb-0.5">Pricing Tier</span>
                <span className="font-semibold text-foreground uppercase">{tool.pricing} ({tool.price})</span>
              </div>

              <div>
                <span className="text-secondary block mb-0.5">Rating</span>
                <span className="font-semibold text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {tool.rating} / 5.0
                </span>
              </div>

              <div>
                <span className="text-secondary block mb-0.5">Arabic Language</span>
                <span className="font-medium text-foreground capitalize">{tool.arabic}</span>
              </div>

              <div>
                <span className="text-secondary block mb-0.5">License Type</span>
                <span className="font-medium text-foreground">{tool.opensource ? 'Open Source' : 'Proprietary'}</span>
              </div>

              <div>
                <span className="text-secondary block mb-0.5">Official Website</span>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="nofollow sponsored"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAffiliateClick();
                  }}
                  className="text-primary font-mono truncate block hover:underline"
                >
                  {tool.domain || tool.url.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <button
                onClick={() => navigate('/comparisons')}
                className="w-full py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                Compare {tool.name} Side-by-Side
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
