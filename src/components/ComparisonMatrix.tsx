import React from 'react';
import { X, ArrowRight, CheckCircle2, XCircle, ExternalLink, Star, Layers, Sparkles, Scale } from 'lucide-react';
import { Tool } from '../types';
import { ToolLogo } from './ToolLogo';

interface CompareBarProps {
  selectedTools: Tool[];
  onRemoveTool: (toolId: number) => void;
  onClearAll: () => void;
  onOpenCompareModal: () => void;
}

export const CompareBar: React.FC<CompareBarProps> = ({
  selectedTools,
  onRemoveTool,
  onClearAll,
  onOpenCompareModal
}) => {
  if (selectedTools.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl bg-slate-950/95 border border-purple-500/40 rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-xl animate-slideUp flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none flex-1">
        <div className="flex items-center gap-1.5 pr-2 border-r border-slate-800 text-xs font-semibold text-purple-300 flex-shrink-0">
          <Scale className="w-4 h-4 text-purple-400" />
          <span>Compare ({selectedTools.length}/3)</span>
        </div>

        {selectedTools.map((tool) => (
          <div
            key={tool.id}
            className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white flex-shrink-0"
          >
            <ToolLogo name={tool.name} domain={tool.domain} size={20} />
            <span className="font-semibold max-w-[100px] truncate">{tool.name}</span>
            <button
              onClick={() => onRemoveTool(tool.id)}
              className="p-0.5 text-slate-400 hover:text-rose-400 transition-colors"
              title={`Remove ${tool.name}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onClearAll}
          className="text-xs text-slate-400 hover:text-white px-2 py-1 transition-colors"
        >
          Clear
        </button>
        <button
          onClick={onOpenCompareModal}
          disabled={selectedTools.length < 2}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer ${
            selectedTools.length >= 2
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-purple-900/40'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>Compare Matrix</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

interface ComparisonMatrixModalProps {
  tools: Tool[];
  onClose: () => void;
  onRemoveTool: (toolId: number) => void;
}

export const ComparisonMatrixModal: React.FC<ComparisonMatrixModalProps> = ({
  tools,
  onClose,
  onRemoveTool
}) => {
  if (tools.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-950 border border-purple-500/40 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-purple-900/30 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-0.5">
                <Sparkles className="w-3 h-3" /> Side-by-Side Analysis
              </div>
              <h3 className="text-xl font-extrabold text-white">
                AI Tool Feature Comparison Matrix
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg bg-slate-900 border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Matrix Content Table */}
        <div className="p-4 sm:p-6 overflow-x-auto overflow-y-auto flex-1 scrollbar-thin">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-3 text-xs font-bold uppercase text-slate-400 w-1/4">Specification</th>
                {tools.map((tool) => (
                  <th key={tool.id} className="p-3 text-center align-top relative">
                    <button
                      onClick={() => onRemoveTool(tool.id)}
                      className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex flex-col items-center space-y-2 pt-2">
                      <ToolLogo name={tool.name} domain={tool.domain} size={48} />
                      <h4 className="font-extrabold text-white text-base">{tool.name}</h4>
                      <span className="text-[11px] font-medium text-purple-300 capitalize bg-purple-950 px-2 py-0.5 rounded-full border border-purple-800">
                        {tool.category}
                      </span>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="nofollow sponsored"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600/30 text-purple-200 hover:bg-purple-600 hover:text-white text-xs font-bold transition-all mt-1"
                      >
                        Visit Site <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {/* Rating */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/30">Community Rating</td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-3 text-center">
                    <div className="inline-flex items-center gap-1 font-mono font-bold text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{tool.rating} / 5.0</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Pricing Tier */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/30">Pricing Tier</td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-3 text-center">
                    <span className="font-bold text-white uppercase">{tool.pricing}</span>
                    <div className="text-[11px] text-slate-400 mt-0.5">{tool.price}</div>
                  </td>
                ))}
              </tr>

              {/* Arabic Support */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/30">Arabic Support</td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-3 text-center">
                    {tool.arabic === 'yes' ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-4 h-4" /> Full Support
                      </span>
                    ) : tool.arabic === 'partial' ? (
                      <span className="text-amber-400 font-semibold">Partial Prompting</span>
                    ) : (
                      <span className="text-slate-500">Not Optimized</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* License Type */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/30">Source Model</td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-3 text-center font-medium text-slate-200">
                    {tool.opensource ? (
                      <span className="text-indigo-400 font-bold">Open Source</span>
                    ) : (
                      <span>Proprietary Cloud</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Key Description */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/30">Core Functionality</td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-3 text-slate-300 text-left leading-relaxed">
                    {tool.desc}
                  </td>
                ))}
              </tr>

              {/* Key Features */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/30">Key Strengths</td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-3 text-left">
                    <ul className="space-y-1.5 text-slate-300">
                      {tool.keyFeatures && tool.keyFeatures.length > 0 ? (
                        tool.keyFeatures.map((kf, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>{kf}</span>
                          </li>
                        ))
                      ) : (
                        <li className="flex items-start gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>High performance {tool.category} model with {tool.pricing} access.</span>
                        </li>
                      )}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/40 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
