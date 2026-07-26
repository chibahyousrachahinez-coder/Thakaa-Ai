import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tag, Filter, Star, ArrowLeft } from 'lucide-react';
import { INITIAL_TOOLS, TOOL_CATEGORIES, SUB_FILTERS } from '../data/thakaaData';
import { ToolsGrid } from './ToolsGrid';
import { findCategoryBySlug, getCategorySlug } from '../utils/slug';
import { updateHeadSEO } from '../utils/seo';

interface CategoryPageProps {
  savedToolIds: number[];
  onToggleBookmark: (toolId: number) => void;
  onShowDetails: (tool: any) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  savedToolIds,
  onToggleBookmark,
  onShowDetails
}) => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [activeSubFilter, setActiveSubFilter] = useState('all');

  const catObj = categorySlug ? findCategoryBySlug(categorySlug) : undefined;
  const categoryId = catObj ? catObj.id : 'all';

  useEffect(() => {
    if (catObj) {
      const catName = catObj.label;
      updateHeadSEO({
        title: `Best AI Tools for ${catName} (2026 Index) | Thakaa AI Directory`,
        description: `Explore top-rated artificial intelligence tools, software, and budget alternatives in the ${catName} category. Verified benchmarks and features.`,
        canonicalUrl: `https://thakaa.ai/category/${getCategorySlug(catObj.id)}`
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [catObj]);

  const categoryTools = useMemo(() => {
    return INITIAL_TOOLS.filter((t) => {
      const matchCat = categoryId === 'all' || t.category === categoryId;
      let matchSub = activeSubFilter === 'all';
      if (activeSubFilter === 'saved') {
        matchSub = savedToolIds.includes(t.id);
      } else if (activeSubFilter !== 'all') {
        matchSub = t.tags.includes(activeSubFilter);
      }
      return matchCat && matchSub;
    });
  }, [categoryId, activeSubFilter, savedToolIds]);

  if (!catObj && categorySlug !== 'all') {
    return (
      <div className="container py-16 text-center" style={{ minHeight: '60vh' }}>
        <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
        <p className="text-secondary mb-6">
          The requested tool category "<span className="text-primary">{categorySlug}</span>" does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Directory
        </Link>
      </div>
    );
  }

  const categoryName = catObj ? catObj.label : 'All Tools';

  return (
    <div className="py-8">
      {/* Category Header Banner */}
      <div className="container mb-8">
        <div className="bg-gradient-to-r from-primary/10 via-surface to-surface border border-border rounded-2xl p-6 md:p-8">
          <nav className="flex items-center gap-2 text-xs text-secondary mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary font-medium">Category</span>
            <span>/</span>
            <span className="text-foreground capitalize">{categoryName}</span>
          </nav>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Tag className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {categoryName} AI Tools & Software
            </h1>
          </div>

          <p className="text-secondary text-sm max-w-2xl mt-2">
            Curated list of verified artificial intelligence software, developer utilities, and free alternatives for {categoryName.toLowerCase()}.
          </p>

          {/* Sub Filters */}
          <div className="flex items-center gap-2 mt-6 flex-wrap">
            <span className="text-xs text-secondary font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {SUB_FILTERS.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubFilter(sub.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeSubFilter === sub.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-surface border border-border hover:border-primary text-secondary'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Tools Count */}
      <div className="container mb-4 flex items-center justify-between text-xs text-secondary">
        <span>Showing <strong>{categoryTools.length}</strong> verified tools in {categoryName}</span>
        <Link to="/" className="text-primary hover:underline">View All Categories →</Link>
      </div>

      {/* Tools Grid */}
      <ToolsGrid
        tools={categoryTools}
        onShowDetails={onShowDetails}
        savedToolIds={savedToolIds}
        onToggleBookmark={onToggleBookmark}
      />
    </div>
  );
};
