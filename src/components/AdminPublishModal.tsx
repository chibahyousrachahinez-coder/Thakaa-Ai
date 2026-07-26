import React, { useState } from 'react';
import { X, PlusCircle, FileText, Wrench, CheckCircle2, Sparkles } from 'lucide-react';
import { Storage, showToast } from '../utils/storage';

const ADMIN_EMAILS = [
  "chibahyousrachaihnez@gmail.com",
  "chibahyousrachahinez@gmail.com"
];

interface AdminPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishSuccess: () => void;
}

export const AdminPublishModal: React.FC<AdminPublishModalProps> = ({
  isOpen,
  onClose,
  onPublishSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'article' | 'tool'>('article');
  const [userEmail, setUserEmail] = useState<string>(() => {
    return Storage.get<string>('adminUserEmail', 'chibahyousrachaihnez@gmail.com');
  });

  // Article Form State
  const [articleTitle, setArticleTitle] = useState('');
  const [articleSlug, setArticleSlug] = useState('');
  const [articleCategory, setArticleCategory] = useState('Guide');
  const [articleReadTime, setArticleReadTime] = useState('8 min');
  const [articleDesc, setArticleDesc] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleThumbnail, setArticleThumbnail] = useState('');

  // Tool Form State
  const [toolName, setToolName] = useState('');
  const [toolUrl, setToolUrl] = useState('');
  const [toolCategory, setToolCategory] = useState('Writing');
  const [toolPricing, setToolPricing] = useState<'free' | 'freemium' | 'paid'>('freemium');
  const [toolPrice, setToolPrice] = useState('Free / $10 mo');
  const [toolRating, setToolRating] = useState('4.8');
  const [toolArabic, setToolArabic] = useState('yes');
  const [toolOpenSource, setToolOpenSource] = useState(false);
  const [toolDesc, setToolDesc] = useState('');

  if (!isOpen) return null;

  const isAuthorized = ADMIN_EMAILS.some(
    (e) => e.toLowerCase() === userEmail.trim().toLowerCase()
  );

  const handlePublishArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTitle.trim() || !articleDesc.trim()) {
      showToast('Please fill in the article title and description.', 'error');
      return;
    }

    const slug = articleSlug.trim()
      ? articleSlug.trim()
      : `article-${articleTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

    const newArticle = {
      title: articleTitle,
      articleId: slug,
      category: articleCategory,
      readTime: articleReadTime,
      desc: articleDesc,
      content: articleContent,
      thumbnail: articleThumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    Storage.push('customArticles', newArticle);
    showToast(`Published article: "${articleTitle}"`);
    
    // Reset
    setArticleTitle('');
    setArticleSlug('');
    setArticleDesc('');
    setArticleContent('');
    setArticleThumbnail('');

    onPublishSuccess();
    onClose();
  };

  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolName.trim() || !toolUrl.trim() || !toolDesc.trim()) {
      showToast('Please fill in tool name, URL, and description.', 'error');
      return;
    }

    let domain = '';
    try {
      const parsed = new URL(toolUrl.startsWith('http') ? toolUrl : `https://${toolUrl}`);
      domain = parsed.hostname.replace('www.', '');
    } catch {
      domain = toolName.toLowerCase().replace(/\s+/g, '') + '.com';
    }

    const newTool = {
      id: Date.now(),
      name: toolName,
      category: toolCategory,
      pricing: toolPricing,
      price: toolPrice,
      rating: parseFloat(toolRating) || 4.5,
      arabic: toolArabic,
      opensource: toolOpenSource,
      desc: toolDesc,
      domain: domain,
      url: toolUrl.startsWith('http') ? toolUrl : `https://${toolUrl}`,
      featured: true
    };

    Storage.push('customTools', newTool);
    showToast(`Added new AI Tool: "${toolName}"`);

    // Reset
    setToolName('');
    setToolUrl('');
    setToolDesc('');

    onPublishSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Admin Publishing Workflow</h2>
              <p className="text-xs text-slate-400">Publish custom technical articles or list new AI tools live</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verification Check */}
        {!isAuthorized ? (
          <div className="p-6 text-center space-y-4">
            <p className="text-rose-400 font-bold text-sm">
              Unauthorized: Admin publishing access requires a verified email address.
            </p>
            <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
              <input
                type="email"
                className="bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs p-2.5 rounded-lg outline-none flex-1"
                placeholder="Enter admin email..."
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <button
                onClick={() => Storage.set('adminUserEmail', userEmail)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
              >
                Set
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/30">
              <button
                onClick={() => setActiveTab('article')}
                className={`flex-1 py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition-colors ${
                  activeTab === 'article'
                    ? 'border-blue-500 text-blue-400 bg-slate-800/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" /> Publish Blog Article / Guide
              </button>
              <button
                onClick={() => setActiveTab('tool')}
                className={`flex-1 py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition-colors ${
                  activeTab === 'tool'
                    ? 'border-emerald-500 text-emerald-400 bg-slate-800/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Wrench className="w-4 h-4" /> Add AI Tool to Directory
              </button>
            </div>

            {/* Article Publisher Form */}
            {activeTab === 'article' && (
              <form onSubmit={handlePublishArticle} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">Article Title *</label>
                    <input
                      type="text"
                      className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Best Free & Cheap Alternatives to Midjourney in 2026"
                      value={articleTitle}
                      onChange={(e) => setArticleTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">Category</label>
                    <select
                      className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
                      value={articleCategory}
                      onChange={(e) => setArticleCategory(e.target.value)}
                    >
                      <option value="Comparison">Comparison</option>
                      <option value="Guide">Guide</option>
                      <option value="Tutorial">Tutorial</option>
                      <option value="Benchmark">Benchmark</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">Slug / Custom Article ID</label>
                    <input
                      type="text"
                      className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. article-midjourney-alternatives"
                      value={articleSlug}
                      onChange={(e) => setArticleSlug(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">Estimated Read Time</label>
                    <input
                      type="text"
                      className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. 8 min"
                      value={articleReadTime}
                      onChange={(e) => setArticleReadTime(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">Short Description / Excerpt *</label>
                  <textarea
                    rows={2}
                    className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Brief summary of what this article covers..."
                    value={articleDesc}
                    onChange={(e) => setArticleDesc(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">Full Content (Markdown / HTML)</label>
                  <textarea
                    rows={6}
                    className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    placeholder="Write or paste your article content here..."
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-900/30"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Publish Article Now
                  </button>
                </div>
              </form>
            )}

            {/* Tool Publisher Form */}
            {activeTab === 'tool' && (
              <form onSubmit={handleAddTool} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">Tool Name *</label>
                    <input
                      type="text"
                      className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g. Cursor AI"
                      value={toolName}
                      onChange={(e) => setToolName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">Website URL *</label>
                    <input
                      type="text"
                      className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g. https://cursor.com"
                      value={toolUrl}
                      onChange={(e) => setToolUrl(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">Category</label>
                    <select
                      className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                      value={toolCategory}
                      onChange={(e) => setToolCategory(e.target.value)}
                    >
                      <option value="Coding">Coding</option>
                      <option value="Writing">Writing</option>
                      <option value="Image Gen">Image Gen</option>
                      <option value="Video">Video</option>
                      <option value="Audio">Audio</option>
                      <option value="Research">Research</option>
                      <option value="Productivity">Productivity</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">Pricing Model</label>
                    <select
                      className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                      value={toolPricing}
                      onChange={(e) => setToolPricing(e.target.value as any)}
                    >
                      <option value="free">Free</option>
                      <option value="freemium">Freemium</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">Price Label</label>
                    <input
                      type="text"
                      className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g. Free / $20 mo"
                      value={toolPrice}
                      onChange={(e) => setToolPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">Tool Description *</label>
                  <textarea
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    placeholder="Short overview of features and capabilities..."
                    value={toolDesc}
                    onChange={(e) => setToolDesc(e.target.value)}
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-900/30"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Add Tool to Directory
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
