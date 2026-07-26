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
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300 font-semibold">
                  <th className="p-4 align-middle whitespace-nowrap">Platform</th>
                  <th className="p-4 align-middle whitespace-nowrap">Free Tier Access</th>
                  <th className="p-4 align-middle whitespace-nowrap">Paid Tier</th>
                  <th className="p-4 align-middle whitespace-nowrap">Primary Use Case</th>
                  <th className="p-4 align-middle whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                <tr className="best-value hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <ToolLogo name="ChatGPT" domain="openai.com" size={32} className="w-8 h-8 rounded-full object-contain flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-white leading-tight">ChatGPT</span>
                        <span className="text-xs text-slate-400 leading-tight">OpenAI</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle whitespace-nowrap"><span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-medium text-xs border border-emerald-500/20">Available</span></td>
                  <td className="p-4 align-middle whitespace-nowrap font-mono text-slate-300">$20 / mo</td>
                  <td className="p-4 align-middle whitespace-nowrap text-slate-300">General AI & Coding</td>
                  <td className="p-4 align-middle whitespace-nowrap text-right">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleTrackClick('chatgpt-price-table', 'https://chat.openai.com')}
                    >
                      Visit <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <ToolLogo name="Claude" domain="anthropic.com" size={32} className="w-8 h-8 rounded-full object-contain flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-white leading-tight">Claude</span>
                        <span className="text-xs text-slate-400 leading-tight">Anthropic</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle whitespace-nowrap"><span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-medium text-xs border border-emerald-500/20">Available</span></td>
                  <td className="p-4 align-middle whitespace-nowrap font-mono text-slate-300">$20 / mo</td>
                  <td className="p-4 align-middle whitespace-nowrap text-slate-300">Long Documents & Analysis</td>
                  <td className="p-4 align-middle whitespace-nowrap text-right">
                    <button
                      className="btn btn-ghost"
                      onClick={() => handleTrackClick('claude-price-table', 'https://claude.ai')}
                    >
                      Visit <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <ToolLogo name="Jasper AI" domain="jasper.ai" size={32} className="w-8 h-8 rounded-full object-contain flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-white leading-tight">Jasper AI</span>
                        <span className="text-xs text-slate-400 leading-tight">Jasper</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle whitespace-nowrap"><span className="px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 font-medium text-xs border border-rose-500/20">Trial Only</span></td>
                  <td className="p-4 align-middle whitespace-nowrap font-mono text-slate-300">$49 / mo</td>
                  <td className="p-4 align-middle whitespace-nowrap text-slate-300">Enterprise Marketing</td>
                  <td className="p-4 align-middle whitespace-nowrap text-right">
                    <button
                      className="btn btn-ghost"
                      onClick={() => handleTrackClick('jasper-price-table', 'https://jasper.ai')}
                    >
                      Visit <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <ToolLogo name="Copy.ai" domain="copy.ai" size={32} className="w-8 h-8 rounded-full object-contain flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-white leading-tight">Copy.ai</span>
                        <span className="text-xs text-slate-400 leading-tight">Copy.ai</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle whitespace-nowrap"><span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-medium text-xs border border-emerald-500/20">2,000 words/mo</span></td>
                  <td className="p-4 align-middle whitespace-nowrap font-mono text-slate-300">$36 / mo</td>
                  <td className="p-4 align-middle whitespace-nowrap text-slate-300">Outbound Content</td>
                  <td className="p-4 align-middle whitespace-nowrap text-right">
                    <button
                      className="btn btn-ghost"
                      onClick={() => handleTrackClick('copyai-price-table', 'https://copy.ai')}
                    >
                      Visit <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <ToolLogo name="Writesonic" domain="writesonic.com" size={32} className="w-8 h-8 rounded-full object-contain flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-white leading-tight">Writesonic</span>
                        <span className="text-xs text-slate-400 leading-tight">Writesonic</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle whitespace-nowrap"><span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-medium text-xs border border-emerald-500/20">10,000 words/mo</span></td>
                  <td className="p-4 align-middle whitespace-nowrap font-mono text-slate-300">$13 / mo</td>
                  <td className="p-4 align-middle whitespace-nowrap text-slate-300">SEO Copywriting</td>
                  <td className="p-4 align-middle whitespace-nowrap text-right">
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
