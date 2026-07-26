import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  Bookmark, 
  ChevronRight, 
  Filter, 
  ArrowRight,
  Zap,
  Globe2,
  Code2,
  Coins,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';

interface CategoryHeaderProps {
  categoryName?: string;
  categoryDescription?: string;
  toolCount?: number;
  activeFilter?: string;
  onFilterChange?: (filterId: string) => void;
  savedCount?: number;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categoryName = "Writing",
  categoryDescription = "Explore top-rated artificial intelligence software, AI copywriters, document processors, and language models verified for accuracy, speed, and workflow automation.",
  toolCount = 8,
  activeFilter = "all",
  onFilterChange,
  savedCount = 0
}) => {
  const [selectedFilter, setSelectedFilter] = useState(activeFilter);

  const handleFilterClick = (id: string) => {
    setSelectedFilter(id);
    if (onFilterChange) {
      onFilterChange(id);
    }
  };

  const filters = [
    { id: 'all', label: 'All', icon: Zap },
    { id: 'saved', label: 'Bookmarked', icon: Bookmark, badge: savedCount > 0 ? savedCount : undefined },
    { id: 'free', label: 'Free Tier', icon: CheckCircle2 },
    { id: 'freemium', label: 'Freemium', icon: Coins },
    { id: 'paid', label: 'Paid', icon: Coins },
    { id: 'arabic', label: 'Arabic', icon: Globe2 },
    { id: 'opensource', label: 'Open Source', icon: Code2 },
  ];

  return (
    <div className="w-full bg-[#090d16] text-slate-100 pt-20 md:pt-24 pb-8 px-4 sm:px-6 lg:px-8 border-b border-purple-900/30 relative overflow-hidden">
      {/* Ambient Cyberpunk Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6 flex-wrap font-medium">
          <a href="/" className="hover:text-purple-400 transition-colors flex items-center gap-1">
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
          <a href="/category/all" className="hover:text-purple-400 transition-colors">
            Categories
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
          <span className="text-purple-300 font-semibold flex items-center gap-1.5 bg-purple-950/60 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
            <FolderOpen className="w-3 h-3 text-purple-400" />
            {categoryName}
          </span>
        </nav>

        {/* Category Hero Title & Icon */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              Verified Category Benchmark
            </div>

            <div className="flex items-center gap-3.5 flex-wrap">
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-600/30 to-indigo-600/20 border border-purple-500/40 text-purple-300 shadow-lg shadow-purple-900/30 flex items-center justify-center">
                <PenTool className="w-7 h-7 text-purple-300" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {categoryName} <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-200">AI Tools & Software</span>
              </h1>
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-2xl pt-1">
              {categoryDescription}
            </p>
          </div>

          {/* Quick Stats Widget */}
          <div className="flex items-center gap-4 bg-slate-900/80 border border-purple-500/20 p-4 rounded-2xl backdrop-blur-md shadow-xl self-start md:self-auto">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{toolCount}</div>
              <div className="text-xs text-slate-400 font-medium">Verified Solutions</div>
            </div>
          </div>
        </div>

        {/* Filter Bar with Pill-Style Buttons */}
        <div className="pt-2 pb-6 border-t border-purple-900/20">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Filter by Capability & Pricing
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = selectedFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => handleFilterClick(filter.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-lg shadow-purple-600/30 scale-[1.02]'
                      : 'bg-slate-900/70 border-slate-800/80 text-slate-300 hover:text-white hover:border-purple-500/50 hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                  <span>{filter.label}</span>
                  {filter.badge !== undefined && (
                    <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-purple-900/50 text-purple-300'
                    }`}>
                      {filter.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-4 border-t border-purple-900/20 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Showing <strong className="text-white font-semibold">{toolCount}</strong> verified tools in <strong className="text-purple-300 font-semibold">{categoryName}</strong>
            </span>
          </div>
          <a
            href="/category/all"
            className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-medium transition-colors hover:underline group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
