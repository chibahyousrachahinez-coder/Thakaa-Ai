import React from 'react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/thakaaData';

interface BlogSectionProps {
  onSelectArticle: (articleId: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectArticle }) => {
  return (
    <section className="blog-section" id="blog">
      <div className="container">
        <div className="section-title-wrap">
          <BookOpen className="w-6 h-6 text-primary inline mr-2" />
          <h2>Technical Guides & Product Reviews</h2>
        </div>
        <p>In-depth evaluations, benchmarks, and workflow integration guides</p>
        <div className="blog-grid" id="blogGrid">
          {BLOG_POSTS.map((post, index) => (
            <article
              key={index}
              className="blog-card"
              onClick={() => onSelectArticle(post.articleId)}
              role="link"
              tabIndex={0}
              aria-label={`Read article: ${post.title}`}
            >
              <div className="blog-content">
                <div className="blog-category">{post.category}</div>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <div className="blog-meta">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-secondary" /> {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-secondary" /> {post.readTime} read
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
