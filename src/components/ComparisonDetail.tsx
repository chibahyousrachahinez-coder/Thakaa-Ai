import React from 'react';
import { ArrowLeft, Check, X, Award, Star } from 'lucide-react';
import { COMPARISONS_DATA } from '../data/thakaaData';
import { ToolLogo } from './ToolLogo';

interface ComparisonDetailProps {
  comparisonKey: string;
  onBack: () => void;
}

export const ComparisonDetail: React.FC<ComparisonDetailProps> = ({ comparisonKey, onBack }) => {
  const data = COMPARISONS_DATA[comparisonKey];

  if (!data) return null;

  return (
    <section className="comparison-detail active" id="comparisonDetail">
      <div className="container">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 inline mr-1" /> Back to Comparisons
        </button>

        <div id="comparisonContent">
          <div className="comparison-detail-header">
            <h2>{data.title}</h2>
            <p>{data.subtitle}</p>
          </div>

          <div className="comparison-detail-grid">
            {data.tools.map((tool, index) => (
              <div key={index} className={`comparison-tool-card ${index === 0 ? 'winner' : ''}`}>
                <div className="tool-header-big">
                  <ToolLogo name={tool.name} domain={tool.domain} size={48} />
                  <div>
                    <div className="tool-title">{tool.name}</div>
                    <div className="tool-subtitle">{tool.company}</div>
                  </div>
                </div>

                <div className="rating-big" aria-label={`Rating: ${tool.rating} out of 5`}>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 inline mr-1" />
                  <span className="score">{tool.rating} / 5.0</span>
                </div>

                <div className="spec-row">
                  <span className="spec-label">Pricing</span>
                  <span className="spec-value">{tool.pricing}</span>
                </div>

                <div className="spec-row">
                  <span className="spec-label">Best For</span>
                  <span className="spec-value">{tool.bestFor}</span>
                </div>

                {Object.entries(tool.specs).map(([k, v], sIdx) => (
                  <div key={sIdx} className="spec-row">
                    <span className="spec-label">{k}</span>
                    <span className="spec-value">{v}</span>
                  </div>
                ))}

                <div className="pros-cons">
                  <h4 className="pros">
                    <Check className="w-4 h-4 text-emerald-500 inline mr-1" /> Key Advantages
                  </h4>
                  <ul>
                    {tool.pros.map((p, pIdx) => (
                      <li key={pIdx}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="pros-cons">
                  <h4 className="cons">
                    <X className="w-4 h-4 text-red-400 inline mr-1" /> Limitations
                  </h4>
                  <ul>
                    {tool.cons.map((c, cIdx) => (
                      <li key={cIdx}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>{data.tools[0].name}</th>
                  <th>{data.tools[1].name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pricing Model</td>
                  <td>{data.tools[0].pricing}</td>
                  <td>{data.tools[1].pricing}</td>
                </tr>
                <tr>
                  <td>Best Use Case</td>
                  <td>{data.tools[0].bestFor}</td>
                  <td>{data.tools[1].bestFor}</td>
                </tr>
                <tr>
                  <td>User Rating</td>
                  <td><span className="check">{data.tools[0].rating} / 5.0</span></td>
                  <td><span className="check">{data.tools[1].rating} / 5.0</span></td>
                </tr>
                <tr>
                  <td>Free Tier</td>
                  <td>
                    {data.tools[0].pricing.includes('Free') ? (
                      <span className="check">Available</span>
                    ) : (
                      <span className="cross">Not Available</span>
                    )}
                  </td>
                  <td>
                    {data.tools[1].pricing.includes('Free') ? (
                      <span className="check">Available</span>
                    ) : (
                      <span className="cross">Not Available</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="verdict-banner">
            <Award className="w-6 h-6 text-primary mb-2" />
            <h3>Summary & Recommendation</h3>
            <p>{data.verdict}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
