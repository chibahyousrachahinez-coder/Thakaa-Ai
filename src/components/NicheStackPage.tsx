import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Layers,
  ArrowLeft,
  DollarSign,
  Zap,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Code,
  PenTool,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { STACK_BUNDLES, INITIAL_TOOLS } from '../data/thakaaData';
import { ToolLogo } from './ToolLogo';
import { updateHeadSEO } from '../utils/seo';
import { getToolSlug } from '../utils/slug';

// Custom Budget Alternatives Stack definition
const BUDGET_ALTERNATIVES_STACK = {
  name: "Free & Budget AI Tools Stack",
  desc: "High-performance, low-cost or zero-cost alternatives to expensive proprietary AI subscriptions.",
  tools: [
    { name: "Codeium", icon: "", domain: "codeium.com", desc: "Free AI code auto-completion alternative to GitHub Copilot", price: "Free", url: "https://codeium.com", affiliate: "codeium" },
    { name: "Andi", icon: "", domain: "andisearch.com", desc: "Generative AI search providing direct answers without ads", price: "Free", url: "https://andisearch.com", affiliate: "andi" },
    { name: "Stable Diffusion", icon: "", domain: "stability.ai", desc: "Open-source image synthesis alternative to Midjourney", price: "Free", url: "https://stability.ai", affiliate: "stable-diffusion" },
    { name: "OSS Insight", icon: "", domain: "ossinsight.io", desc: "Free AI-powered SQL data analysis for GitHub insights", price: "Free", url: "https://ossinsight.io", affiliate: "oss-insight" }
  ],
  total: "$0/mo",
  savings: "Save $60+/mo compared to paid proprietary alternatives"
};

export const NicheStackPage: React.FC = () => {
  const { stackSlug } = useParams<{ stackSlug: string }>();
  const navigate = useNavigate();

  const stackKey = stackSlug ? stackSlug.toLowerCase().trim() : '';

  let stack = STACK_BUNDLES[stackKey];
  if (!stack && stackKey === 'budget-alternatives') {
    stack = BUDGET_ALTERNATIVES_STACK;
  }

  useEffect(() => {
    if (stack) {
      updateHeadSEO({
        title: `${stack.name} — Curated AI Software Collection | Thakaa AI`,
        description: `${stack.desc}. Estimated cost: ${stack.total}. ${stack.savings}`,
        canonicalUrl: `https://thakaa.ai/stack/${stackKey}`
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [stack, stackKey]);

  if (!stack) {
    return (
      <div className="container py-16 text-center" style={{ minHeight: '60vh' }}>
        <h2 className="text-2xl font-bold mb-4">Stack Not Found</h2>
        <p className="text-secondary mb-6">
          We couldn't locate a curated AI stack matching "<span className="text-primary">{stackSlug}</span>".
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" /> Return Home
        </Link>
      </div>
    );
  }

  const getStackIcon = (key: string) => {
    switch (key) {
      case 'developer': return <Code className="w-6 h-6 text-primary" />;
      case 'creator': return <PenTool className="w-6 h-6 text-emerald-500" />;
      case 'marketer': return <TrendingUp className="w-6 h-6 text-amber-500" />;
      case 'business': return <Briefcase className="w-6 h-6 text-blue-500" />;
      case 'student': return <GraduationCap className="w-6 h-6 text-purple-500" />;
      default: return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="container py-8 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-secondary mb-6">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-primary font-medium">Niche Stacks</span>
        <span>/</span>
        <span className="text-foreground capitalize">{stack.name}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-surface to-surface border border-border rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-surface border border-border shadow-sm flex-shrink-0">
            {getStackIcon(stackKey)}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-relaxed">{stack.name}</h1>
            <span className="text-xs text-emerald-500 font-semibold uppercase tracking-wider leading-relaxed">Curated Workflow Solution</span>
          </div>
        </div>

        <p className="text-secondary text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          {stack.desc}
        </p>

        <div className="mt-6 pt-6 border-t border-border flex items-center justify-between flex-wrap gap-4 text-xs leading-relaxed">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            <span>Estimated Cost: <strong className="text-foreground text-sm">{stack.total}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-amber-500 font-medium">
            <Zap className="w-4 h-4" />
            <span>{stack.savings}</span>
          </div>
        </div>
      </div>

      {/* Other Niche Stacks Switcher Bar */}
      <div className="flex flex-wrap gap-2 items-center mt-4 mb-6 text-xs">
        <span className="text-secondary font-semibold whitespace-nowrap mr-2 leading-relaxed">Explore Stacks:</span>
        {[
          { key: 'developer', name: 'Developer Stack' },
          { key: 'creator', name: 'Creator Stack' },
          { key: 'budget-alternatives', name: 'Free & Budget Stack' },
          { key: 'marketer', name: 'Growth Marketing' },
          { key: 'business', name: 'Enterprise Ops' },
          { key: 'student', name: 'Academic Research' }
        ].map((s) => (
          <Link
            key={s.key}
            to={`/stack/${s.key}`}
            className={`px-3.5 py-2 rounded-xl font-medium whitespace-nowrap transition-all border leading-relaxed ${
              stackKey === s.key
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-surface border-border hover:border-primary text-secondary'
            }`}
          >
            {s.name}
          </Link>
        ))}
      </div>

      {/* Tools Included in Stack */}
      <h2 className="text-xl font-bold mb-4 leading-relaxed flex items-center gap-2">
        <Layers className="w-5 h-5 text-primary" /> Included Software in this Suite
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {stack.tools.map((stTool, idx) => {
          // Check if we have matching tool in INITIAL_TOOLS for internal link
          const matchTool = INITIAL_TOOLS.find(
            (t) => t.name.toLowerCase() === stTool.name.toLowerCase()
          );

          return (
            <div
              key={idx}
              className="bg-surface border border-border rounded-xl p-5 md:p-6 hover:border-primary transition-all flex flex-col justify-between min-h-[160px] group shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <ToolLogo name={stTool.name} domain={stTool.domain} size={42} />
                    <div>
                      <h3 className="font-bold text-base leading-relaxed group-hover:text-primary transition-colors">
                        {stTool.name}
                      </h3>
                      <span className="text-xs text-secondary font-mono leading-relaxed">{stTool.price}</span>
                    </div>
                  </div>

                  {matchTool && (
                    <button
                      onClick={() => navigate(`/tools/${getToolSlug(matchTool)}`)}
                      className="text-xs text-primary font-medium hover:underline flex items-center gap-1 leading-relaxed"
                    >
                      View Specs →
                    </button>
                  )}
                </div>

                <p className="text-xs md:text-sm text-secondary leading-relaxed mb-4">
                  {stTool.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between gap-2 mt-auto">
                <span className="text-xs text-emerald-500 font-medium flex items-center gap-1 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Integration
                </span>

                <a
                  href={stTool.url}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline leading-relaxed"
                >
                  Visit Website <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
