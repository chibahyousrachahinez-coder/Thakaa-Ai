import React from 'react';
import { DollarSign, ArrowUpRight } from 'lucide-react';
import { Storage } from '../utils/storage';
import { ToolLogo } from './ToolLogo';

export const PriceTableSection: React.FC = () => {
  const handleTrackClick = (tag: string, url: string) => {
    Storage.push('affiliateClicks', {
      toolId: tag,
      url,
      timestamp: new Date().toISOString(),
      source: 'price-table'
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="price-table-section" id="priceTables">
      <div className="container">
        <div className="section-title-wrap">
          <DollarSign className="w-6 h-6 text-primary inline mr-2" />
          <h2>AI Writing Tools Pricing Matrix</h2>
        </div>
        <p>Comprehensive breakdown of pricing tiers, free quotas, and subscription costs</p>
        <div className="price-table">
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Free Tier Access</th>
                <th>Paid Tier</th>
                <th>Primary Use Case</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="best-value">
                <td>
                  <div className="tool-cell">
                    <ToolLogo name="ChatGPT" domain="openai.com" size={32} />
                    <div>
                      <span className="t-name">ChatGPT</span>
                      <span className="t-domain">OpenAI</span>
                    </div>
                  </div>
                </td>
                <td className="price-cell"><span className="free">Available</span></td>
                <td className="price-cell"><span className="paid">$20 / mo</span></td>
                <td>General AI & Coding</td>
                <td className="cta-cell">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleTrackClick('chatgpt-price-table', 'https://chat.openai.com')}
                  >
                    Visit <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="tool-cell">
                    <ToolLogo name="Claude" domain="anthropic.com" size={32} />
                    <div>
                      <span className="t-name">Claude</span>
                      <span className="t-domain">Anthropic</span>
                    </div>
                  </div>
                </td>
                <td className="price-cell"><span className="free">Available</span></td>
                <td className="price-cell"><span className="paid">$20 / mo</span></td>
                <td>Long Documents & Analysis</td>
                <td className="cta-cell">
                  <button
                    className="btn btn-ghost"
                    onClick={() => handleTrackClick('claude-price-table', 'https://claude.ai')}
                  >
                    Visit <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="tool-cell">
                    <ToolLogo name="Jasper AI" domain="jasper.ai" size={32} />
                    <div>
                      <span className="t-name">Jasper AI</span>
                      <span className="t-domain">Jasper</span>
                    </div>
                  </div>
                </td>
                <td className="price-cell"><span className="paid">Trial Only</span></td>
                <td className="price-cell"><span className="paid">$49 / mo</span></td>
                <td>Enterprise Marketing</td>
                <td className="cta-cell">
                  <button
                    className="btn btn-ghost"
                    onClick={() => handleTrackClick('jasper-price-table', 'https://jasper.ai')}
                  >
                    Visit <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="tool-cell">
                    <ToolLogo name="Copy.ai" domain="copy.ai" size={32} />
                    <div>
                      <span className="t-name">Copy.ai</span>
                      <span className="t-domain">Copy.ai</span>
                    </div>
                  </div>
                </td>
                <td className="price-cell"><span className="free">2,000 words/mo</span></td>
                <td className="price-cell"><span className="paid">$36 / mo</span></td>
                <td>Outbound Content</td>
                <td className="cta-cell">
                  <button
                    className="btn btn-ghost"
                    onClick={() => handleTrackClick('copyai-price-table', 'https://copy.ai')}
                  >
                    Visit <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="tool-cell">
                    <ToolLogo name="Writesonic" domain="writesonic.com" size={32} />
                    <div>
                      <span className="t-name">Writesonic</span>
                      <span className="t-domain">Writesonic</span>
                    </div>
                  </div>
                </td>
                <td className="price-cell"><span className="free">10,000 words/mo</span></td>
                <td className="price-cell"><span className="paid">$13 / mo</span></td>
                <td>SEO Copywriting</td>
                <td className="cta-cell">
                  <button
                    className="btn btn-ghost"
                    onClick={() => handleTrackClick('writesonic-price-table', 'https://writesonic.com')}
                  >
                    Visit <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
