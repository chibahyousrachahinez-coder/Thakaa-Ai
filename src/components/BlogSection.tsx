import React from 'react';
import { BookOpen, Calendar, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data/thakaaData';
import { Storage } from '../utils/storage';

interface BlogSectionProps {
  onSelectArticle: (articleId: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectArticle }) => {
  const customArticles = Storage.get<any[]>('customArticles', []);
  const allPosts = [...customArticles, ...BLOG_POSTS];

  return (
    <section className="blog-section" id="blog">
      <div className="container">
        <div className="section-title-wrap">
          <BookOpen className="w-6 h-6 text-primary inline mr-2" />
          <h2>Technical Guides & Product Reviews</h2>
        </div>
        <p>In-depth evaluations, benchmarks, and workflow integration guides</p>
        <div className="blog-grid" id="blogGrid">
          {allPosts.map((post, index) => (
            <article
              key={post.articleId || index}
              className="blog-card cursor-pointer hover:border-primary transition-all p-5 rounded-xl border border-border bg-surface"
              onClick={() => onSelectArticle(post.articleId)}
              role="link"
              tabIndex={0}
              aria-label={`Read article: ${post.title}`}
            >
              <div className="blog-content">
                <div className="blog-category text-xs font-semibold text-primary uppercase tracking-wider mb-2">{post.category}</div>
                <h3 className="text-base font-bold text-foreground leading-relaxed mb-2">{post.title}</h3>
                <p className="text-xs md:text-sm text-secondary leading-relaxed mb-4 line-clamp-2">{post.desc}</p>
                <div className="blog-meta flex items-center justify-between text-xs text-secondary border-t border-border/50 pt-3 mt-auto">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-secondary" /> {post.date || 'July 2026'}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-secondary" /> {post.readTime || '8 min'} read
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
