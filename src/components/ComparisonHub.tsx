import React from 'react';
import { GitCompare, Star, ArrowRight } from 'lucide-react';
import { COMPARISONS_DATA } from '../data/thakaaData';
import { ToolLogo } from './ToolLogo';

interface ComparisonHubProps {
  onSelectComparison: (key: string) => void;
}

export const ComparisonHub: React.FC<ComparisonHubProps> = ({ onSelectComparison }) => {
  return (
    <section className="comparison-hub" id="comparisons">
      <div className="container">
        <div className="section-title-wrap">
          <GitCompare className="w-6 h-6 text-primary inline mr-2" />
          <h2>AI Tool Comparisons</h2>
        </div>
        <p>Side-by-side analysis of features, capabilities, and pricing</p>
        <div className="comparison-grid" id="comparisonGrid">
          {Object.entries(COMPARISONS_DATA).map(([key, data]) => (
            <div
              key={key}
              className="comparison-card"
              onClick={() => onSelectComparison(key)}
              role="button"
              tabIndex={0}
              aria-label={`Compare ${data.title}`}
            >
              <div className="vs-badge">
                <ToolLogo name={data.tools[0].name} domain={data.tools[0].domain} size={36} />
                <span className="vs-text">VS</span>
                <ToolLogo name={data.tools[1].name} domain={data.tools[1].domain} size={36} />
              </div>
              <h3>{data.title}</h3>
              <p>{data.subtitle}</p>
              <div className="meta">
                <span className="inline-flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {data.tools[0].rating} vs {data.tools[1].rating}
                </span>
                <span aria-hidden="true">•</span>
                <span>{data.tools[0].pricing.split('/')[0]} vs {data.tools[1].pricing.split('/')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
