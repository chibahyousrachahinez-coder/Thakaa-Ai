import React, { useState, useEffect } from 'react';
import { Bookmark, Star, ArrowUpRight, Search } from 'lucide-react';
import { Tool } from '../types';
import { Storage, showToast } from '../utils/storage';
import { ToolLogo } from './ToolLogo';
import { AdSenseUnit } from './AdSenseUnit';

interface ToolsGridProps {
  tools: Tool[];
  onShowDetails: (tool: Tool) => void;
  savedToolIds?: number[];
  onToggleBookmark?: (toolId: number) => void;
}

export const ToolsGrid: React.FC<ToolsGridProps> = ({
  tools,
  onShowDetails,
  savedToolIds: externalSavedToolIds,
  onToggleBookmark: externalOnToggleBookmark
}) => {
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

  const handleTryTool = (tool: Tool) => {
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

                return (
                  <div key={tool.id} className="tool-card" data-tool-id={tool.id}>
                    <div className="tool-card-top">
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

                    <div className="tool-header">
                      <ToolLogo name={tool.name} domain={tool.domain} url={tool.url} size={42} />
                      <div className="tool-info">
                        <div className="tool-name">{tool.name}</div>
                        <div className="tool-category">{tool.category}</div>
                      </div>
                    </div>
                    <div className="tool-desc">{tool.desc}</div>
                    <div className="tool-meta">
                      <span className={`tool-tag tag-${tool.pricing}`}>{pricingLabel}</span>
                      {tool.arabic !== 'no' && (
                        <span className="tool-tag tag-arabic">Arabic</span>
                      )}
                      {tool.opensource && (
                        <span className="tool-tag tag-opensource">Open Source</span>
                      )}
                    </div>
                    <div className="tool-footer">
                      <div className="tool-price">
                        <span className={priceClass}>{tool.price}</span>
                      </div>
                      <div className="tool-rating" aria-label={`Rating: ${tool.rating} out of 5`}>
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 inline mr-1" />
                        {tool.rating}
                      </div>
                    </div>
                    <div className="tool-actions">
                      <button
                        className="btn btn-primary"
                        style={{ flex: 1, justifyContent: 'center' }}
                        onClick={() => handleTryTool(tool)}
                      >
                        Visit Tool <ArrowUpRight className="w-4 h-4 ml-1" />
                      </button>
                      <button
                        className="btn btn-ghost"
                        onClick={() => onShowDetails(tool)}
                        aria-label={`View details for ${tool.name}`}
                      >
                        Details
                      </button>
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
