import React from 'react';
import { Search, X, Bookmark } from 'lucide-react';
import { TOOL_CATEGORIES, SUB_FILTERS } from '../data/thakaaData';
import { AetherFlowHero } from './ui/aether-flow-hero';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeSubFilter: string;
  setActiveSubFilter: (sub: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  activeSubFilter,
  setActiveSubFilter
}) => {
  return (
    <section className="hero py-2 px-0 bg-transparent text-center">
      <AetherFlowHero
        badgeText="Thakaa AI • Smart AI Tools Directory"
        title="Discover & Compare AI Tools"
        subtitle="Evaluate 100+ verified AI applications by pricing model, capability benchmarks, regional language support, and real-world workflows with dynamic particle rendering."
      >
        {/* Search Box */}
        <div className="search-box w-full max-w-xl mx-auto mb-8 relative z-20">
          <Search className="search-icon w-5 h-5 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            id="searchInput"
            placeholder="Search tools, capabilities, or pricing models... (Press / to focus)"
            title="Press / to focus search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search AI tools"
            autoComplete="off"
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-purple-500/30 bg-slate-900/80 backdrop-blur-md text-white placeholder-slate-400 text-sm md:text-base outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 shadow-xl transition-all"
          />
          {searchQuery && (
            <button
              className="search-clear visible absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              id="searchClear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Key Metrics */}
        <div className="hero-stats flex flex-wrap justify-center gap-6 md:gap-12 mb-8 z-20">
          <div className="hero-stat text-center">
            <div className="number text-xl md:text-3xl font-extrabold text-white">100+</div>
            <div className="label text-xs text-purple-200/80 uppercase tracking-wider font-semibold">Verified Tools</div>
          </div>
          <div className="hero-stat text-center">
            <div className="number text-xl md:text-3xl font-extrabold text-white">12</div>
            <div className="label text-xs text-purple-200/80 uppercase tracking-wider font-semibold">Categories</div>
          </div>
          <div className="hero-stat text-center">
            <div className="number text-xl md:text-3xl font-extrabold text-white">40+</div>
            <div className="label text-xs text-purple-200/80 uppercase tracking-wider font-semibold">Free Tiers</div>
          </div>
          <div className="hero-stat text-center">
            <div className="number text-xl md:text-3xl font-extrabold text-white">100%</div>
            <div className="label text-xs text-purple-200/80 uppercase tracking-wider font-semibold">Unbiased Reviews</div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="filters flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-4 z-20" id="categoryFilters">
          {TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`filter-chip px-3.5 py-1.5 rounded-full border text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:border-purple-400/50 hover:text-white'
              }`}
              data-cat={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sub Filters */}
        <div className="sub-filters flex flex-wrap justify-center gap-2 max-w-3xl mx-auto z-20" id="subFilters">
          {SUB_FILTERS.map((sub) => (
            <button
              key={sub.id}
              className={`sub-filter px-3 py-1 rounded-lg border text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeSubFilter === sub.id
                  ? 'bg-purple-500/20 border-purple-400 text-purple-200'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              data-sub={sub.id}
              onClick={() => setActiveSubFilter(sub.id)}
              aria-pressed={activeSubFilter === sub.id}
            >
              {sub.id === 'saved' && <Bookmark className="w-3.5 h-3.5 inline-block mr-1 text-purple-400" />}
              {sub.label}
            </button>
          ))}
        </div>
      </AetherFlowHero>
    </section>
  );
};
