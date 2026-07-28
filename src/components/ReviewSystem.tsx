import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, Plus, User, ShieldCheck, X, MessageSquare, Check, Sparkles } from 'lucide-react';
import { IToolReview } from '../types';
import { Storage, showToast } from '../utils/storage';

interface ReviewSystemProps {
  toolId: number;
  toolName: string;
  initialRating?: number;
}

// Default initial reviews for popular tools
const DEFAULT_INITIAL_REVIEWS: Record<number, IToolReview[]> = {
  1: [
    {
      id: 'rev-101',
      toolId: 1,
      userName: 'Alexander Wright',
      userRole: 'Founder / CEO @ TechFlow',
      rating: 5,
      date: '2026-07-20',
      reviewText: 'ChatGPT 4.5 has completely transformed our product strategy documentation. Web search grounding and memory capabilities make it an indispensable assistant for daily operations.',
      helpfulCount: 24,
      verifiedUser: true
    },
    {
      id: 'rev-102',
      toolId: 1,
      userName: 'Fatima Al-Hassan',
      userRole: 'Lead Content Strategist',
      rating: 4,
      date: '2026-07-15',
      reviewText: 'Great for ideation and bilingual Arabic-English copy generation. Free tier limits hit quickly during peak hours, but Plus subscription is worth every penny.',
      helpfulCount: 12,
      verifiedUser: true
    }
  ],
  2: [
    {
      id: 'rev-201',
      toolId: 2,
      userName: 'David Miller',
      userRole: 'Principal QA Engineer',
      rating: 5,
      date: '2026-07-22',
      reviewText: 'The 200k context window in Claude 3.5 Sonnet is unrivaled. I can feed 50-page PDF specifications and receive zero hallucination bug reports.',
      helpfulCount: 31,
      verifiedUser: true
    },
    {
      id: 'rev-202',
      toolId: 2,
      userName: 'Youssef Mansour',
      userRole: 'Senior Full Stack Dev',
      rating: 5,
      date: '2026-07-18',
      reviewText: 'Artifacts canvas makes web component iteration effortless. Perfect instruction following and clean TypeScript outputs.',
      helpfulCount: 19,
      verifiedUser: true
    }
  ]
};

export const ToolReviewsSection: React.FC<ReviewSystemProps> = ({
  toolId,
  toolName,
  initialRating = 4.8
}) => {
  const [reviews, setReviews] = useState<IToolReview[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [upvotedReviewIds, setUpvotedReviewIds] = useState<string[]>(() => 
    Storage.get<string[]>(`upvoted_reviews_${toolId}`, [])
  );

  // Load reviews from Storage or Defaults
  useEffect(() => {
    const stored = Storage.get<IToolReview[]>(`reviews_tool_${toolId}`, []);
    if (stored && stored.length > 0) {
      setReviews(stored);
    } else {
      const defaultForTool = DEFAULT_INITIAL_REVIEWS[toolId] || [
        {
          id: `rev-default-1-${toolId}`,
          toolId,
          userName: 'Sarah Jenkins',
          userRole: 'AI Product Specialist',
          rating: 5,
          date: '2026-07-25',
          reviewText: `${toolName} provides exceptional speed and reliable workflow accuracy. Highly recommended for production engineering teams.`,
          helpfulCount: 8,
          verifiedUser: true
        }
      ];
      setReviews(defaultForTool);
      Storage.set(`reviews_tool_${toolId}`, defaultForTool);
    }
  }, [toolId, toolName]);

  const handleAddReview = (newReview: Omit<IToolReview, 'id' | 'toolId' | 'date' | 'helpfulCount' | 'verifiedUser'>) => {
    const created: IToolReview = {
      ...newReview,
      id: `rev-${Date.now()}`,
      toolId,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
      verifiedUser: true
    };

    const updated = [created, ...reviews];
    setReviews(updated);
    Storage.set(`reviews_tool_${toolId}`, updated);
    setIsModalOpen(false);
    showToast(`Thank you! Your review for ${toolName} has been published.`);
  };

  const handleToggleHelpful = (reviewId: string) => {
    const isUpvoted = upvotedReviewIds.includes(reviewId);
    let nextUpvoted: string[];

    if (isUpvoted) {
      nextUpvoted = upvotedReviewIds.filter(id => id !== reviewId);
    } else {
      nextUpvoted = [...upvotedReviewIds, reviewId];
    }

    setUpvotedReviewIds(nextUpvoted);
    Storage.set(`upvoted_reviews_${toolId}`, nextUpvoted);

    const updated = reviews.map(rev => {
      if (rev.id === reviewId) {
        return {
          ...rev,
          helpfulCount: rev.helpfulCount + (isUpvoted ? -1 : 1)
        };
      }
      return rev;
    });

    setReviews(updated);
    Storage.set(`reviews_tool_${toolId}`, updated);
  };

  // Calculations
  const totalCount = reviews.length;
  const avgRating = totalCount > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalCount).toFixed(1)
    : initialRating.toFixed(1);

  const starCounts = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => Math.round(r.rating) === stars).length;
    const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : stars === 5 ? 80 : stars === 4 ? 20 : 0;
    return { stars, count, percentage };
  });

  return (
    <div className="bg-slate-950 border border-purple-900/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-purple-900/20 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Verified User Reviews
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Community Ratings & Feedback
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Real experiences and QA evaluations submitted by tech founders and developers.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/40 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Write a Review
        </button>
      </div>

      {/* Rating Breakdown Component */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8 bg-slate-900/60 p-6 rounded-xl border border-slate-800/80">
        <div className="md:col-span-4 text-center md:text-left flex flex-col items-center md:items-start justify-center border-b md:border-b-0 md:border-r border-slate-800/80 pb-6 md:pb-0 md:pr-6">
          <div className="text-5xl font-black text-white tracking-tight flex items-baseline gap-1">
            {avgRating}
            <span className="text-lg text-slate-500 font-normal">/ 5.0</span>
          </div>

          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(Number(avgRating))
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Based on <strong className="text-slate-200">{totalCount}</strong> community reviews
          </div>
        </div>

        <div className="md:col-span-8 space-y-2">
          {starCounts.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 font-semibold text-slate-300 flex items-center gap-1">
                {stars} <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              </span>
              <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-10 text-right font-mono text-slate-400">{percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Cards List */}
      <div className="space-y-4">
        {reviews.map((rev) => {
          const isUpvoted = upvotedReviewIds.includes(rev.id);
          const avatarInitials = rev.userAvatar || rev.userName.split(' ').map(n => n[0]).join('').substring(0, 2);

          return (
            <div
              key={rev.id}
              className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-purple-500/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-bold text-sm flex items-center justify-center shadow-md">
                    {avatarInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{rev.userName}</h4>
                      {rev.verifiedUser && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                          <ShieldCheck className="w-3 h-3" /> Verified User
                        </span>
                      )}
                    </div>
                    {rev.userRole && (
                      <p className="text-xs text-purple-300 font-medium">{rev.userRole}</p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">{rev.date}</span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                "{rev.reviewText}"
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/50 text-xs">
                <span className="text-slate-500">Was this review helpful?</span>
                <button
                  onClick={() => handleToggleHelpful(rev.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    isUpvoted
                      ? 'bg-purple-600/20 text-purple-300 border-purple-500/50 shadow-sm'
                      : 'bg-slate-800/50 text-slate-400 border-slate-700/60 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'text-purple-400 fill-purple-400' : ''}`} />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Review Modal */}
      {isModalOpen && (
        <AddReviewModal
          toolName={toolName}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddReview}
        />
      )}
    </div>
  );
};

interface AddReviewModalProps {
  toolName: string;
  onClose: () => void;
  onSubmit: (review: { userName: string; userRole?: string; rating: number; reviewText: string }) => void;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  toolName,
  onClose,
  onSubmit
}) => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('Senior Software Engineer');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!reviewText.trim() || reviewText.trim().length < 15) {
      setError('Please write at least 15 characters of detailed feedback.');
      return;
    }

    onSubmit({
      userName: userName.trim(),
      userRole: userRole.trim(),
      rating,
      reviewText: reviewText.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-950 border border-purple-500/30 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors rounded-lg bg-slate-900 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Review {toolName}</h3>
            <p className="text-xs text-slate-400">Share your evaluation with the Thakaa AI community</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Overall Rating
            </label>
            <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-125 cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= (hoverRating || rating)
                        ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                        : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-auto text-sm font-bold text-amber-400 font-mono">
                {(hoverRating || rating)}.0 / 5.0
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g., Alex Rivers"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Role / Title
              </label>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="Founder / CEO">Founder / CEO</option>
                <option value="QA Specialist">QA Specialist</option>
                <option value="Senior Software Engineer">Senior Software Engineer</option>
                <option value="AI Product Specialist">AI Product Specialist</option>
                <option value="Content Creator / Writer">Content Creator / Writer</option>
                <option value="Researcher / Student">Researcher / Student</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Review & Inspection Feedback *
            </label>
            <textarea
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Describe your real-world experience, utility performance, response speed, or tier pricing..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
            />
            <div className="text-[11px] text-slate-500 mt-1 text-right">
              {reviewText.length} characters (min 15)
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/40"
            >
              Publish Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
