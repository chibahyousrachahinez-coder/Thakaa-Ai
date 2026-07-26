import { INITIAL_TOOLS, TOOL_CATEGORIES } from '../data/thakaaData';
import { Tool } from '../types';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getToolSlug(tool: Tool): string {
  return slugify(tool.name);
}

export function findToolBySlug(slug: string): Tool | undefined {
  const normalized = slug.toLowerCase().trim();
  return INITIAL_TOOLS.find(
    (t) => getToolSlug(t) === normalized || String(t.id) === normalized
  );
}

export function getCategorySlug(category: string): string {
  return slugify(category);
}

export function findCategoryBySlug(slug: string) {
  const normalized = slug.toLowerCase().trim();
  return TOOL_CATEGORIES.find(
    (c) => slugify(c.id) === normalized || slugify(c.label) === normalized
  );
}
