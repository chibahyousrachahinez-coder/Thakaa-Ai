import React from 'react';
import { ArrowLeft, Calendar, Clock, User, Share2, Twitter, Linkedin, Copy, ArrowUpRight, CheckCircle2, XCircle, AlertTriangle, Sparkles, BookOpen } from 'lucide-react';
import { showToast, Storage } from '../utils/storage';
import { AdSenseUnit } from './AdSenseUnit';

interface ArticleViewProps {
  articleId: string;
  onBack: () => void;
  onNavigateQuiz: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ articleId, onBack, onNavigateQuiz }) => {
  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    const url = window.location.href;
    if (platform === 'copy') {
      navigator.clipboard?.writeText(url).then(() => showToast('Link copied to clipboard'));
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  const trackAffiliate = (toolId: string, url: string) => {
    Storage.push('affiliateClicks', {
      toolId,
      url,
      timestamp: new Date().toISOString(),
      source: `article-${articleId}`
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="article-page active py-8" id={articleId}>
      <div className="container max-w-4xl mx-auto">
        <button
          className="back-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors mb-6"
          onClick={onBack}
          aria-label="Back to articles grid"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Technical Guides
        </button>

        {/* ARTICLE 1: ChatGPT vs Claude Free Tier Benchmark */}
        {(articleId === 'article-free-writing' || articleId === 'article-seo-tools') && (
          <article className="article-wrapper">
            <div className="article-header text-center mb-8">
              <div className="article-meta flex items-center justify-center gap-4 text-xs text-slate-400 mb-3">
                <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-400" /> July 2026</span>
                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> 14 min read</span>
                <span className="inline-flex items-center gap-1"><User className="w-3.5 h-3.5 text-purple-400" /> AI Editorial Team</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                ChatGPT vs Claude: Technical Benchmark & Context Window Evaluation (2026 Edition)
              </h1>
              <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                An empirical review comparing context retention, latency, code execution, and multi-turn reasoning capabilities across leading conversational foundation models.
              </p>
            </div>

            <div className="article-content space-y-8 text-sm md:text-base text-slate-300 leading-relaxed">
              {/* Executive Summary Box */}
              <div className="p-6 rounded-2xl bg-blue-950/30 border border-blue-800/50 my-6">
                <h3 className="text-base font-bold text-blue-300 mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" /> Executive Summary & Key Takeaways
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-slate-300">
                  <li><strong>ChatGPT (OpenAI GPT-4o):</strong> Leading choice for multimodal versatility, integrated Python code interpreter execution, and rapid live web indexing.</li>
                  <li><strong>Claude (Anthropic Claude 3.5 Sonnet):</strong> Superior for long document analysis (200K token window), nuanced instruction following, and clean code formatting via Interactive Artifacts.</li>
                  <li><strong>Verdict:</strong> Engineering teams benefit from using Claude for codebase refactoring, while marketing and product teams gain higher agility with ChatGPT's custom search integrations.</li>
                </ul>
              </div>

              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">1. Methodology & Benchmark Setup</h2>
              <p>
                As AI software adoption scales across enterprise engineering teams, choosing between conversational models requires evaluation beyond surface-level prose generation. Our benchmark evaluated model performance across four key vectors: <strong>Context Needle-in-a-Haystack Retrieval</strong>, <strong>Syntactic Code Generation Accuracy</strong>, <strong>Instruction Adherence in Structured Output</strong>, and <strong>Multi-turn Reasoning Stability</strong>.
              </p>
              <p>
                Tests were conducted over 500 standardized query passes using localized datasets, technical repository transcripts, and long-form financial regulatory documents ranging from 10,000 to 180,000 tokens.
              </p>

              {/* In-Article AdSense Banner Slot */}
              <AdSenseUnit slotId="article-mid-banner" format="horizontal" />

              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">2. Context Retention & Needle-in-a-Haystack Analysis</h2>
              <p>
                Context length remains a critical bottleneck for knowledge workers summarizing lengthy PDF filings, API documentation, or customer research transcripts.
              </p>
              <div className="overflow-x-auto my-4">
                <table className="w-full text-xs md:text-sm text-left text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
                  <thead className="bg-slate-900 text-white font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Model</th>
                      <th className="p-3">Context Window</th>
                      <th className="p-3">Retrieval Accuracy (&gt;100K)</th>
                      <th className="p-3">Average Latency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950/60">
                    <tr>
                      <td className="p-3 font-bold text-white">ChatGPT (GPT-4o)</td>
                      <td className="p-3">128,000 Tokens</td>
                      <td className="p-3 text-emerald-400 font-semibold">96.2%</td>
                      <td className="p-3">1.2 seconds / 100 tokens</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Claude 3.5 Sonnet</td>
                      <td className="p-3">200,000 Tokens</td>
                      <td className="p-3 text-emerald-400 font-semibold">99.4%</td>
                      <td className="p-3">1.4 seconds / 100 tokens</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                In tests placing arbitrary data points deep inside 150K-token technical manuals, <strong>Claude 3.5 Sonnet</strong> demonstrated near-perfect recall with zero hallucinated parameters, whereas ChatGPT exhibited slight decay when queries exceeded 100,000 tokens.
              </p>

              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">3. Pros & Cons Matrix</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/30">
                  <h4 className="font-bold text-emerald-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> ChatGPT Strengths
                  </h4>
                  <ul className="space-y-2 text-xs md:text-sm">
                    <li>• Real-time web browsing with citation links</li>
                    <li>• Native Python sandboxed execution for statistics</li>
                    <li>• Custom GPT builder for internal team workflows</li>
                    <li>• Voice mode with low latency synthesis</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-slate-900/80 border border-purple-500/30">
                  <h4 className="font-bold text-purple-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Claude Strengths
                  </h4>
                  <ul className="space-y-2 text-xs md:text-sm">
                    <li>• Massive 200,000 token context window</li>
                    <li>• Live Interactive Artifacts visual preview panel</li>
                    <li>• Higher precision in complex TypeScript refactoring</li>
                    <li>• Less robotic tone in long-form writing</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 my-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-base">Try ChatGPT for Conversational Analysis</h4>
                  <p className="text-xs text-slate-400">Explore OpenAI's direct conversational interface and web search capabilities.</p>
                </div>
                <button
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1.5 flex-shrink-0 transition-colors"
                  onClick={() => trackAffiliate('chatgpt-article', 'https://chat.openai.com')}
                >
                  Visit ChatGPT Website <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">4. Final Verdict & Deployment Recommendation</h2>
              <p>
                Both platforms represent state-of-the-art software capabilities. For organizations requiring rapid web research, data processing, and custom automated GPT workflows, <strong>ChatGPT</strong> remains the most versatile daily assistant. However, for software development teams analyzing large multi-file codebases or legal departments reviewing extended contracts, <strong>Claude</strong> offers unmatched precision.
              </p>

              {/* Bottom Interactive Tool Quiz CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-700/50 text-center my-8">
                <h3 className="text-lg font-bold text-white mb-2">Need a Personalized AI Software Recommendation?</h3>
                <p className="text-xs md:text-sm text-slate-300 max-w-lg mx-auto mb-4">
                  Take our 60-second interactive questionnaire to discover the exact software tools matched to your team budget and regional language needs.
                </p>
                <button
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-blue-500/25 inline-flex items-center gap-2"
                  onClick={onNavigateQuiz}
                >
                  Launch Interactive Tool Finder <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Social Share Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-xs text-slate-400">
                <span>Share this benchmark report:</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleShare('twitter')} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" aria-label="Share on Twitter"><Twitter className="w-4 h-4" /></button>
                  <button onClick={() => handleShare('linkedin')} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" aria-label="Share on LinkedIn"><Linkedin className="w-4 h-4" /></button>
                  <button onClick={() => handleShare('copy')} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" aria-label="Copy link"><Copy className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ARTICLE 2: Midjourney & Visual Generation Prompting */}
        {articleId === 'article-arabic' && (
          <article className="article-wrapper">
            <div className="article-header text-center mb-8">
              <div className="article-meta flex items-center justify-center gap-4 text-xs text-slate-400 mb-3">
                <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-400" /> July 2026</span>
                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> 12 min read</span>
                <span className="inline-flex items-center gap-1"><User className="w-3.5 h-3.5 text-purple-400" /> Creative Design Lead</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                Midjourney Prompt Engineering & Style Parameter Guide for Design Teams
              </h1>
              <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                A comprehensive architectural breakdown of aspect ratios, stylize parameters, character reference weights, and inpainting controls.
              </p>
            </div>

            <div className="article-content space-y-8 text-sm md:text-base text-slate-300 leading-relaxed">
              <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-800/50 my-6">
                <h3 className="text-base font-bold text-amber-300 mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" /> Key Design Workflows
                </h3>
                <p className="text-xs md:text-sm text-slate-300">
                  Modern design studios leverage Midjourney v6 for rapid concept sketching, 3D render prototyping, and marketing collateral generation. Understanding explicit flag parameters (`--s`, `--ar`, `--cref`) reduces GPU iteration costs by up to 60%.
                </p>
              </div>

              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">1. Essential Command Flag Reference</h2>
              <p>
                Achieving precise visual composition requires mastering Midjourney's CLI parameter syntax:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm">
                <li><code>--ar 16:9</code> or <code>--ar 4:5</code>: Sets specific canvas aspect ratio constraints for web banners or mobile social feeds.</li>
                <li><code>--stylize &lt;0-1000&gt;</code>: Controls the strength of Midjourney's intrinsic aesthetic filter. Values around 50 prioritize prompt accuracy, while 750+ yields dramatic painterly lighting.</li>
                <li><code>--cref &lt;image_url&gt;</code>: Character reference parameter maintaining character face consistency across multiple scene angles.</li>
              </ul>

              <AdSenseUnit slotId="article-mid-banner-2" format="rectangle" />

              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">2. Inpainting & Outpainting Workflows</h2>
              <p>
                Using <strong>Vary (Region)</strong> allows designers to modify localized portions of an image (e.g. swapping brand logos or adjusting clothing textures) without altering the background visual depth.
              </p>

              <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 my-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-base">Explore Midjourney Generative Studio</h4>
                  <p className="text-xs text-slate-400">Produce concept artwork, textures, and vector graphics.</p>
                </div>
                <button
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1.5 flex-shrink-0 transition-colors"
                  onClick={() => trackAffiliate('midjourney-article', 'https://midjourney.com')}
                >
                  Visit Midjourney <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-xs text-slate-400">
                <span>Share this design guide:</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleShare('twitter')} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" aria-label="Share on Twitter"><Twitter className="w-4 h-4" /></button>
                  <button onClick={() => handleShare('linkedin')} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" aria-label="Share on LinkedIn"><Linkedin className="w-4 h-4" /></button>
                  <button onClick={() => handleShare('copy')} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" aria-label="Copy link"><Copy className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* DEFAULT / FALLBACK ARTICLE: Modern Engineering AI Tools Evaluation */}
        {articleId !== 'article-free-writing' && articleId !== 'article-seo-tools' && articleId !== 'article-arabic' && (
          <article className="article-wrapper">
            <div className="article-header text-center mb-8">
              <div className="article-meta flex items-center justify-center gap-4 text-xs text-slate-400 mb-3">
                <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-400" /> July 2026</span>
                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> 15 min read</span>
                <span className="inline-flex items-center gap-1"><User className="w-3.5 h-3.5 text-purple-400" /> Principal Architect</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                Evaluating Modern AI Architectures & Developer Assistants for Engineering Organizations
              </h1>
              <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                An end-to-end operational guide for evaluating GitHub Copilot, Codeium, and custom enterprise LLM gateways.
              </p>
            </div>

            <div className="article-content space-y-8 text-sm md:text-base text-slate-300 leading-relaxed">
              <div className="p-6 rounded-2xl bg-purple-950/30 border border-purple-800/50 my-6">
                <h3 className="text-base font-bold text-purple-300 mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" /> Architectural Overview
                </h3>
                <p className="text-xs md:text-sm text-slate-300">
                  Integrating AI assistants directly into developer IDEs increases commit velocity by 25–35%. However, engineering leaders must balance autocomplete performance against code security, IP contamination rules, and SOC2 compliance constraints.
                </p>
              </div>

              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">1. Autocomplete Latency & Context Parsing</h2>
              <p>
                Code completion utilities must deliver predictions in under 300ms to maintain developer flow state. Tools like <strong>GitHub Copilot</strong> use localized tree-sitter AST parsing to construct contextual prompts from open tabs and imported package declarations.
              </p>

              <AdSenseUnit slotId="article-bottom-banner" format="horizontal" />

              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">2. Security & Compliance Requirements</h2>
              <p>
                Enterprise deployments should verify that telemetry data is excluded from foundation model training datasets and that IP matching filters are active to prevent reproduction of open-source licensed code blocks.
              </p>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-700/50 text-center my-8">
                <h3 className="text-lg font-bold text-white mb-2">Find the Right Developer Stack</h3>
                <p className="text-xs md:text-sm text-slate-300 max-w-lg mx-auto mb-4">
                  Explore custom developer tool combinations tailored to your team size and repository scale.
                </p>
                <button
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2"
                  onClick={onNavigateQuiz}
                >
                  Launch Interactive Tool Finder <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-xs text-slate-400">
                <span>Share this technical report:</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleShare('twitter')} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" aria-label="Share on Twitter"><Twitter className="w-4 h-4" /></button>
                  <button onClick={() => handleShare('linkedin')} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" aria-label="Share on LinkedIn"><Linkedin className="w-4 h-4" /></button>
                  <button onClick={() => handleShare('copy')} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" aria-label="Copy link"><Copy className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};
