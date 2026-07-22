import React from 'react';
import { Search, X, Bookmark } from 'lucide-react';
import { TOOL_CATEGORIES, SUB_FILTERS } from '../data/thakaaData';

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
    <section className="hero">
      <div className="container">
        <div className="hero-badge flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
          <span>Smart AI Directory</span>
        </div>
        <h1>
          Discover & Compare <span>AI Tools</span><br />for Every Workflow
        </h1>
        <p>
          Evaluate verified AI applications by pricing model, capability, regional language support, and technical features.
        </p>

        {/* Search Box */}
        <div className="search-box">
          <Search className="search-icon w-4 h-4 text-secondary" />
          <input
            type="text"
            id="searchInput"
            placeholder="Search tools, capabilities, or pricing models... (Press / to focus)"
            title="Press / to focus search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search AI tools"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              className="search-clear visible"
              id="searchClear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Key Metrics */}
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="number">100+</div>
            <div className="label">Verified Tools</div>
          </div>
          <div className="hero-stat">
            <div className="number">12</div>
            <div className="label">Categories</div>
          </div>
          <div className="hero-stat">
            <div className="number">40+</div>
            <div className="label">Free Tiers</div>
          </div>
          <div className="hero-stat">
            <div className="number">100%</div>
            <div className="label">Unbiased Reviews</div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="filters" id="categoryFilters">
          {TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
              data-cat={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sub Filters */}
        <div className="sub-filters" id="subFilters">
          {SUB_FILTERS.map((sub) => (
            <button
              key={sub.id}
              className={`sub-filter ${activeSubFilter === sub.id ? 'active' : ''}`}
              data-sub={sub.id}
              onClick={() => setActiveSubFilter(sub.id)}
              aria-pressed={activeSubFilter === sub.id}
            >
              {sub.id === 'saved' && <Bookmark className="w-3.5 h-3.5 inline-block mr-1 text-primary" />}
              {sub.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
