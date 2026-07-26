import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read tools.json or fallback list
const toolsJsonPath = path.resolve(__dirname, '../src/data/tools.json');
let tools = [];

if (fs.existsSync(toolsJsonPath)) {
  try {
    const raw = fs.readFileSync(toolsJsonPath, 'utf8');
    tools = JSON.parse(raw);
  } catch (err) {
    console.error('Error parsing tools.json:', err);
  }
}

// Fallback known tools if tools.json is empty or partial
const fallbackSlugs = [
  'chatgpt', 'claude', 'jasper-ai', 'copy-ai', 'midjourney', 'dall-e-3',
  'stable-diffusion', 'canva-ai', 'remove-bg', 'runway-ml', 'pictory',
  'github-copilot', 'codeium', 'replit-ghostwriter', 'elevenlabs', 'descript',
  'otter-ai', 'semrush', 'surfer-seo', 'buffer-ai', 'notion-ai', 'grammarly',
  'zapier-ai', 'make-integromat', 'trello-ai', 'quickbooks-ai', 'hubspot-ai',
  'fireflies-ai', 'khan-academy-ai', 'quizlet-ai', 'duolingo-max', 'tableau-ai',
  'chatcsv', 'figma-ai', 'adobe-firefly', 'synthesia', 'heygen', 'murf-ai',
  'perplexity-ai', 'gamma', 'loom-ai', 'beautiful-ai', 'mem-ai', 'tome',
  'writesonic', 'rytr', 'nightcafe', 'leonardo-ai', 'play-ht', 'simplified',
  'andi', 'cody', 'reimagine-home', 'cursor', 'tabnine', 'qodo', 'windsurf',
  'rok-solution', 'amazon-sagemaker', 'akkio', 'browse-ai', 'insightbase',
  'blaze-sql', 'ai2sql', 'oss-insight'
];

const toolSlugs = new Set();
tools.forEach(t => {
  if (t.id) toolSlugs.add(t.id);
  else if (t.name) toolSlugs.add(t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
});
fallbackSlugs.forEach(s => toolSlugs.add(s));

const categories = [
  'writing', 'image', 'video', 'code', 'audio', 'marketing',
  'productivity', 'business', 'education', 'data', 'design',
  'low-code', 'sql'
];

const stacks = [
  'developer', 'creator', 'marketer', 'business', 'student', 'budget-alternatives'
];

const staticPages = [
  '', 'comparisons', 'quiz', 'submit', 'about', 'privacy', 'terms', 'contact'
];

const baseUrl = 'https://thakaa.ai';
const date = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Static Pages
staticPages.forEach(p => {
  const loc = p ? `${baseUrl}/${p}` : baseUrl;
  const priority = p === '' ? '1.0' : '0.8';
  xml += `  <url>\n`;
  xml += `    <loc>${loc}</loc>\n`;
  xml += `    <lastmod>${date}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>${priority}</priority>\n`;
  xml += `  </url>\n`;
});

// Categories
categories.forEach(cat => {
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/category/${cat}</loc>\n`;
  xml += `    <lastmod>${date}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>0.8</priority>\n`;
  xml += `  </url>\n`;
});

// Stacks
stacks.forEach(st => {
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/stack/${st}</loc>\n`;
  xml += `    <lastmod>${date}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>0.8</priority>\n`;
  xml += `  </url>\n`;
});

// Tool Detail Pages
toolSlugs.forEach(slug => {
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/tools/${slug}</loc>\n`;
  xml += `    <lastmod>${date}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>0.9</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>`;

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
console.log(`✅ Generated sitemap.xml with ${staticPages.length + categories.length + stacks.length + toolSlugs.size} URLs in public/sitemap.xml`);
