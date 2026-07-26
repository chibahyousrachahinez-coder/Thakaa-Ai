import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bookmark, Star, ArrowUpRight, Search, Info } from 'lucide-react';
import { Tool } from '../types';
import { Storage, showToast } from '../utils/storage';
import { ToolLogo } from './ToolLogo';
import { AdSenseUnit } from './AdSenseUnit';
import { getToolSlug } from '../utils/slug';

interface ToolsGridProps {
  tools: Tool[];
  onShowDetails?: (tool: Tool) => void;
  savedToolIds?: number[];
  onToggleBookmark?: (toolId: number) => void;
}

export const ToolsGrid: React.FC<ToolsGridProps> = ({
  tools,
  onShowDetails,
  savedToolIds: externalSavedToolIds,
  onToggleBookmark: externalOnToggleBookmark
}) => {
  const navigate = useNavigate();
  const [internalSavedIds, setInternalSavedIds] = useState<number[]>(() => Storage.getSavedTools());

  useEffect(() => {
    if (externalSavedToolIds) {
      setInternalSavedIds(externalSavedToolIds);
    }
  }, [externalSavedToolIds]);

  const handleToggleBookmark = (e: React.MouseEvent, tool: Tool) => {
    e.stopPropagation();
    if (externalOnToggleBookmark) {
      externalOnToggleBookmark(tool.id);
    } else {
      const isSaved = Storage.toggleSavedTool(tool.id);
      setInternalSavedIds(Storage.getSavedTools());
      showToast(
        isSaved
          ? `Added "${tool.name}" to your bookmarks`
          : `Removed "${tool.name}" from bookmarks`
      );
    }
  };

  const savedIds = externalSavedToolIds || internalSavedIds;

  const handleTryTool = (e: React.MouseEvent, tool: Tool) => {
    e.stopPropagation();
    Storage.push('affiliateClicks', {
      toolId: tool.id,
      name: tool.name,
      url: tool.url,
      timestamp: new Date().toISOString(),
      source: 'tool-card'
    });
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="tools">
      <div className="container">
        {tools.length === 0 ? (
          <div className="no-results visible" id="noResults">
            <Search className="w-8 h-8 text-secondary mb-3 mx-auto" />
            <h3>No matching tools found</h3>
            <p>Try refining your search terms or clearing selected filter criteria.</p>
          </div>
        ) : (
          <>
            <div className="tools-grid" id="toolsGrid">
              {tools.map((tool) => {
                const isBookmarked = savedIds.includes(tool.id);
                const pricingLabel = {
                  free: 'Free Tier',
                  freemium: 'Freemium',
                  paid: 'Paid'
                }[tool.pricing] || tool.pricing;

                const priceClass = tool.pricing === 'free' ? 'free' : 'paid';
                const toolSlug = getToolSlug(tool);

                return (
                  <div
                    key={tool.id}
                    className="tool-card cursor-pointer hover:border-primary transition-all flex flex-col justify-between min-h-[160px] p-5 border rounded-xl bg-surface border-border shadow-sm"
                    data-tool-id={tool.id}
                    onClick={() => navigate(`/tools/${toolSlug}`)}
                  >
                    <div>
                      <div className="tool-card-top flex items-center justify-between mb-2">
                        {tool.featured ? (
                          <div className="featured-badge" aria-label="Featured tool">
                            Featured
                          </div>
                        ) : (
                          <div />
                        )}
                        <button
                          className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
                          onClick={(e) => handleToggleBookmark(e, tool)}
                          title={isBookmarked ? 'Remove bookmark' : 'Bookmark tool'}
                          aria-label={`${isBookmarked ? 'Remove' : 'Save'} ${tool.name} to bookmarks`}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-primary' : ''}`} />
                        </button>
                      </div>

                      <div className="tool-header flex items-center gap-3 mb-3">
                        <ToolLogo name={tool.name} domain={tool.domain} url={tool.url} size={42} />
                        <div className="tool-info flex flex-col">
                          <Link
                            to={`/tools/${toolSlug}`}
                            className="tool-name font-bold text-base hover:text-primary transition-colors leading-relaxed"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {tool.name}
                          </Link>
                          <Link
                            to={`/category/${tool.category.toLowerCase()}`}
                            className="tool-category text-xs text-secondary hover:underline capitalize leading-relaxed"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {tool.category}
                          </Link>
                        </div>
                      </div>

                      <div className="tool-desc text-xs md:text-sm text-secondary leading-relaxed mb-3 line-clamp-2">{tool.desc}</div>

                      <div className="tool-meta flex flex-wrap gap-1.5 mb-3">
                        <span className={`tool-tag tag-${tool.pricing}`}>{pricingLabel}</span>
                        {tool.arabic !== 'no' && (
                          <span className="tool-tag tag-arabic">Arabic</span>
                        )}
                        {tool.opensource && (
                          <span className="tool-tag tag-opensource">Open Source</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-3 border-t border-border/60">
                      <div className="tool-footer flex items-center justify-between mb-3">
                        <div className="tool-price text-xs font-semibold">
                          <span className={priceClass}>{tool.price}</span>
                        </div>
                        <div className="tool-rating text-xs font-semibold flex items-center gap-1" aria-label={`Rating: ${tool.rating} out of 5`}>
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 inline" />
                          {tool.rating}
                        </div>
                      </div>
                      <div className="tool-actions flex items-center gap-2">
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="nofollow sponsored"
                          className="btn btn-primary flex-1 justify-center py-2 text-xs font-bold"
                          onClick={(e) => handleTryTool(e, tool)}
                        >
                          Visit Site <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                        </a>
                        <Link
                          to={`/tools/${toolSlug}`}
                          className="btn btn-ghost px-3 py-2 text-xs font-semibold"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`View details for ${tool.name}`}
                        >
                          Specs
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AdSense Placement below directory tools grid */}
            <AdSenseUnit slotId="directory-grid-banner" format="horizontal" className="max-w-4xl mx-auto my-8" />
          </>
        )}
      </div>
    </section>
  );
};

