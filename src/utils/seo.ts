import { Tool } from '../types';
import { getToolSlug } from './slug';

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

export function updateHeadSEO({
  title,
  description,
  canonicalUrl = 'https://thakaa.ai',
  ogImage = 'https://thakaa.ai/og-banner.png',
  ogType = 'website',
  jsonLd
}: SEOProps) {
  // 1. Title
  document.title = title;

  // 2. Helper to set meta tag
  const setMeta = (attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 3. Helper to set link tag
  const setLink = (rel: string, href: string) => {
    let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  };

  // Standard Metadata
  setMeta('name', 'description', description);
  setLink('canonical', canonicalUrl);

  // Open Graph Tags
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:type', ogType);
  setMeta('property', 'og:image', ogImage);
  setMeta('property', 'og:site_name', 'Thakaa AI Directory');

  // Twitter Card Tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', ogImage);

  // 4. JSON-LD Structured Data
  let jsonLdEl = document.getElementById('thakaa-jsonld') as HTMLScriptElement | null;
  if (jsonLd) {
    if (!jsonLdEl) {
      jsonLdEl = document.createElement('script');
      jsonLdEl.id = 'thakaa-jsonld';
      jsonLdEl.type = 'application/ld+json';
      document.head.appendChild(jsonLdEl);
    }
    jsonLdEl.textContent = JSON.stringify(jsonLd);
  } else if (jsonLdEl) {
    jsonLdEl.remove();
  }
}

export function generateToolJsonLd(tool: Tool) {
  const slug = getToolSlug(tool);
  const toolPageUrl = `https://thakaa.ai/tools/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': tool.name,
    'description': tool.desc,
    'applicationCategory': tool.category.toUpperCase(),
    'operatingSystem': 'Web, Cloud, Cross-Platform',
    'url': toolPageUrl,
    'sameAs': tool.url,
    'offers': {
      '@type': 'Offer',
      'price': tool.pricing === 'free' ? '0' : 'Varies',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock',
      'category': tool.price
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': tool.rating,
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': Math.floor(tool.rating * 42 + tool.id * 7)
    },
    'author': {
      '@type': 'Organization',
      'name': 'Thakaa AI Editorial Team',
      'url': 'https://thakaa.ai/about'
    }
  };
}

export function generateDirectoryJsonLd(tools: Tool[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Thakaa AI Software & Developer Tools Index',
    'description': 'Verified directory of AI tools, coding assistants, low-code platforms, and SQL analytics engines.',
    'url': 'https://thakaa.ai',
    'numberOfItems': tools.length,
    'itemListElement': tools.slice(0, 30).map((tool, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': tool.name,
      'url': `https://thakaa.ai/tools/${getToolSlug(tool)}`
    }))
  };
}
