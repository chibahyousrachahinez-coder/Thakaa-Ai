import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { INITIAL_TOOLS } from '../data/thakaaData';
import { ToolsGrid } from './ToolsGrid';
import { CategoryHeader } from './CategoryHeader';
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
  const categoryId = catObj ? catObj.id : (categorySlug === 'all' ? 'all' : 'writing');

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

  if (!catObj && categorySlug && categorySlug !== 'all') {
    return (
      <div className="container py-24 text-center" style={{ minHeight: '60vh' }}>
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

  const categoryName = catObj ? catObj.label : 'Writing';

  return (
    <div className="min-h-screen bg-[#090d16]">
      {/* Category Header Banner */}
      <CategoryHeader
        categoryName={categoryName}
        categoryDescription={`Explore top-rated artificial intelligence software, AI copywriters, document processors, and language models verified for accuracy, speed, and workflow automation in ${categoryName.toLowerCase()}.`}
        toolCount={categoryTools.length}
        activeFilter={activeSubFilter}
        onFilterChange={setActiveSubFilter}
        savedCount={savedToolIds.length}
      />

      {/* Tools Grid Section */}
      <div className="py-8">
        <ToolsGrid
          tools={categoryTools}
          onShowDetails={onShowDetails}
          savedToolIds={savedToolIds}
          onToggleBookmark={onToggleBookmark}
        />
      </div>
    </div>
  );
};

