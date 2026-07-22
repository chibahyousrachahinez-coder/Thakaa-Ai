import {
  Tool,
  ToolCategory,
  SubFilter,
  ComparisonData,
  BlogPost,
  StackBundle,
  QuizQuestion
} from '../types';

export const TOOL_CATEGORIES: ToolCategory[] = [
  { id: 'all',          label: 'All Tools',     emoji: '' },
  { id: 'writing',      label: 'Writing',       emoji: '' },
  { id: 'image',        label: 'Image',         emoji: '' },
  { id: 'video',        label: 'Video',         emoji: '' },
  { id: 'code',         label: 'Code',          emoji: '' },
  { id: 'audio',        label: 'Audio',         emoji: '' },
  { id: 'marketing',    label: 'Marketing',     emoji: '' },
  { id: 'productivity', label: 'Productivity', emoji: '' },
  { id: 'business',     label: 'Business',     emoji: '' },
  { id: 'education',    label: 'Education',    emoji: '' },
  { id: 'data',         label: 'Data',          emoji: '' },
  { id: 'design',       label: 'Design',        emoji: '' },
];

export const SUB_FILTERS: SubFilter[] = [
  { id: 'all',        label: 'All',        emoji: '' },
  { id: 'saved',      label: 'Bookmarked', emoji: '' },
  { id: 'free',       label: 'Free Tier',  emoji: '' },
  { id: 'freemium',   label: 'Freemium',   emoji: '' },
  { id: 'paid',       label: 'Paid',       emoji: '' },
  { id: 'arabic',     label: 'Arabic',     emoji: '' },
  { id: 'opensource', label: 'Open Source', emoji: '' },
];

export const INITIAL_TOOLS: Tool[] = [
  { id: 1,  name: "ChatGPT",        category: "writing",     domain: "openai.com",          icon: "", desc: "AI conversational model for drafting, analysis, and research with web search capabilities.", price: "Free / $20mo", pricing: "freemium", arabic: "partial", opensource: false, rating: 4.8, featured: true,  tags: ["freemium", "arabic"], url: "https://chat.openai.com" },
  { id: 2,  name: "Claude",         category: "writing",     domain: "anthropic.com",       icon: "", desc: "AI assistant focused on long-form document processing, precise analysis, and nuanced writing.", price: "Free / $20mo", pricing: "freemium", arabic: "partial", opensource: false, rating: 4.7, featured: true,  tags: ["freemium", "arabic"], url: "https://claude.ai" },
  { id: 3,  name: "Jasper AI",      category: "writing",     domain: "jasper.ai",           icon: "", desc: "Marketing copy generator tailored for brand voice guidelines and editorial campaigns.", price: "From $49/mo", pricing: "paid",     arabic: "no",      opensource: false, rating: 4.5, featured: false, tags: ["paid"], url: "https://jasper.ai" },
  { id: 4,  name: "Copy.ai",        category: "writing",     domain: "copy.ai",             icon: "", desc: "Content automation tool for outbound campaigns, social posts, and copy variants.", price: "Free / $36mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.4, featured: false, tags: ["freemium"], url: "https://copy.ai" },
  { id: 5,  name: "Midjourney",     category: "image",       domain: "midjourney.com",      icon: "", desc: "Generative image engine producing detailed concept art, illustrations, and photorealistic graphics.", price: "From $10/mo", pricing: "paid",     arabic: "no",      opensource: false, rating: 4.9, featured: true,  tags: ["paid"], url: "https://midjourney.com" },
  { id: 6,  name: "DALL-E 3",       category: "image",       domain: "openai.com",          icon: "", desc: "Image generator by OpenAI with strong prompt adherence and text rendering inside artwork.", price: "Free / $20mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.6, featured: false, tags: ["freemium"], url: "https://openai.com/dall-e-3" },
  { id: 7,  name: "Stable Diffusion", category: "image",     domain: "stability.ai",        icon: "", desc: "Open-source image model support for local weights, ControlNet, and custom finetuning.", price: "Free", pricing: "free",     arabic: "no",      opensource: true,  rating: 4.5, featured: false, tags: ["free", "opensource"], url: "https://stability.ai" },
  { id: 8,  name: "Canva AI",       category: "design",      domain: "canva.com",           icon: "", desc: "Design suite integrating automated background removal, text-to-image, and layout generation.", price: "Free / $13mo", pricing: "freemium", arabic: "partial", opensource: false, rating: 4.7, featured: true,  tags: ["freemium", "arabic"], url: "https://canva.com" },
  { id: 9,  name: "Remove.bg",      category: "image",       domain: "remove.bg",           icon: "", desc: "Automated background isolation utility for product photos and user headshots.", price: "Free / $9mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.8, featured: false, tags: ["freemium"], url: "https://remove.bg" },
  { id: 10, name: "Runway ML",      category: "video",       domain: "runwayml.com",        icon: "", desc: "Video generation and editing suit supporting Gen-2 text-to-video synthesis and motion tracking.", price: "Free / $15mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.6, featured: true,  tags: ["freemium"], url: "https://runwayml.com" },
  { id: 11, name: "Pictory",        category: "video",       domain: "pictory.ai",          icon: "", desc: "Video summarization engine converting long scripts and blogs into short video clips.", price: "From $19/mo", pricing: "paid",     arabic: "no",      opensource: false, rating: 4.3, featured: false, tags: ["paid"], url: "https://pictory.ai" },
  { id: 12, name: "GitHub Copilot", category: "code",        domain: "github.com",          icon: "", desc: "Context-aware code completion and inline suggestion tool powered by Codex models.", price: "$10/mo", pricing: "paid",     arabic: "no",      opensource: false, rating: 4.7, featured: true,  tags: ["paid"], url: "https://github.com/features/copilot" },
  { id: 13, name: "Codeium",        category: "code",        domain: "codeium.com",         icon: "", desc: "AI development assistant offering fast autocomplete, inline refactoring, and multi-IDE support.", price: "Free", pricing: "free",     arabic: "no",      opensource: false, rating: 4.5, featured: false, tags: ["free"], url: "https://codeium.com" },
  { id: 14, name: "Replit Ghostwriter", category: "code",    domain: "replit.com",          icon: "", desc: "Cloud development assistant embedded in Replit IDE for error debugging and code generation.", price: "Free / $7mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.2, featured: false, tags: ["freemium"], url: "https://replit.com" },
  { id: 15, name: "ElevenLabs",     category: "audio",       domain: "elevenlabs.io",       icon: "", desc: "Synthetic voice generation platform offering voice cloning and natural speech synthesis across languages.", price: "Free / $5mo", pricing: "freemium", arabic: "partial", opensource: false, rating: 4.8, featured: true,  tags: ["freemium", "arabic"], url: "https://elevenlabs.io" },
  { id: 16, name: "Descript",       category: "audio",       domain: "descript.com",        icon: "", desc: "Text-based transcript editor for podcasts and videos with filler word removal and voice synthesis.", price: "Free / $12mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.6, featured: false, tags: ["freemium"], url: "https://descript.com" },
  { id: 17, name: "Otter.ai",       category: "audio",       domain: "otter.ai",            icon: "", desc: "Automated meeting transcription and key takeaway generator for video calls.", price: "Free / $10mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.4, featured: false, tags: ["freemium"], url: "https://otter.ai" },
  { id: 18, name: "Semrush",        category: "marketing",   domain: "semrush.com",         icon: "", desc: "Search engine marketing toolkit providing keyword analytics, site audits, and competitor insights.", price: "From $120/mo", pricing: "paid",     arabic: "no",      opensource: false, rating: 4.5, featured: true,  tags: ["paid"], url: "https://semrush.com" },
  { id: 19, name: "Surfer SEO",     category: "marketing",   domain: "surferseo.com",       icon: "", desc: "SERP analysis tool providing real-time keyword density and structure recommendations.", price: "From $69/mo", pricing: "paid",     arabic: "no",      opensource: false, rating: 4.4, featured: false, tags: ["paid"], url: "https://surferseo.com" },
  { id: 20, name: "Buffer AI",      category: "marketing",   domain: "buffer.com",          icon: "", desc: "Social channel management platform with caption optimization and posting schedules.", price: "Free / $6mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.3, featured: false, tags: ["freemium"], url: "https://buffer.com" },
  { id: 21, name: "Notion AI",      category: "productivity", domain: "notion.so",          icon: "", desc: "Connected workspace assistant for document summaries, task extraction, and database querying.", price: "Free / $10mo", pricing: "freemium", arabic: "partial", opensource: false, rating: 4.5, featured: true,  tags: ["freemium", "arabic"], url: "https://notion.so" },
  { id: 22, name: "Grammarly",      category: "writing",     domain: "grammarly.com",       icon: "", desc: "Writing assistant for sentence structure, tone consistency, and grammatical accuracy.", price: "Free / $12mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.6, featured: false, tags: ["freemium"], url: "https://grammarly.com" },
  { id: 23, name: "Zapier AI",      category: "productivity", domain: "zapier.com",          icon: "", desc: "Workflow orchestration tool enabling natural language triggers between web applications.", price: "Free / $20mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.4, featured: false, tags: ["freemium"], url: "https://zapier.com" },
  { id: 24, name: "Make (Integromat)", category: "productivity", domain: "make.com",        icon: "", desc: "Visual automation canvas for multi-step data pipelines and webhook routing.", price: "Free / $9mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.5, featured: false, tags: ["freemium"], url: "https://make.com" },
  { id: 25, name: "Trello AI",      category: "productivity", domain: "trello.com",        icon: "", desc: "Kanban board platform with automated card sorting, label suggestions, and activity summaries.", price: "Free / $5mo", pricing: "freemium", arabic: "partial", opensource: false, rating: 4.2, featured: false, tags: ["freemium", "arabic"], url: "https://trello.com" },
  { id: 26, name: "QuickBooks AI",  category: "business",    domain: "intuit.com",          icon: "", desc: "Small business financial software with automated invoice matching and expense categorization.", price: "From $15/mo", pricing: "paid",     arabic: "no",      opensource: false, rating: 4.3, featured: true,  tags: ["paid"], url: "https://quickbooks.intuit.com" },
  { id: 27, name: "HubSpot AI",     category: "business",    domain: "hubspot.com",         icon: "", desc: "CRM platform integrating lead prioritization, email template generation, and sales pipeline analytics.", price: "Free / $20mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.5, featured: false, tags: ["freemium"], url: "https://hubspot.com" },
  { id: 28, name: "Fireflies.ai",   category: "business",    domain: "fireflies.ai",        icon: "", desc: "Voice assistant recorder for sales meetings, action items extraction, and CRM sync.", price: "Free / $10mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.4, featured: false, tags: ["freemium"], url: "https://fireflies.ai" },
  { id: 29, name: "Khan Academy AI", category: "education",   domain: "khanacademy.org",     icon: "", desc: "Socratic learning assistant guiding students through step-by-step problem solving.", price: "Free", pricing: "free",     arabic: "partial", opensource: false, rating: 4.6, featured: true,  tags: ["free", "arabic"], url: "https://khanacademy.org" },
  { id: 30, name: "Quizlet AI",     category: "education",   domain: "quizlet.com",         icon: "", desc: "Study assistant for automated flashcard creation, active recall testing, and practice tests.", price: "Free / $8mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.3, featured: false, tags: ["freemium"], url: "https://quizlet.com" },
  { id: 31, name: "Duolingo Max",   category: "education",   domain: "duolingo.com",        icon: "", desc: "Language learning platform offering simulated AI conversations and contextual explanation.", price: "Free / $14mo", pricing: "freemium", arabic: "yes",     opensource: false, rating: 4.5, featured: false, tags: ["freemium", "arabic"], url: "https://duolingo.com" },
  { id: 32, name: "Tableau AI",     category: "data",        domain: "tableau.com",         icon: "", desc: "Enterprise business intelligence platform providing natural language querying for dashboard visualisations.", price: "From $70/mo", pricing: "paid",     arabic: "no",      opensource: false, rating: 4.4, featured: true,  tags: ["paid"], url: "https://tableau.com" },
  { id: 33, name: "ChatCSV",        category: "data",        domain: "chatcsv.co",          icon: "", desc: "Data query interface for uploading tabular datasets and asking questions in plain English.", price: "Free / $10mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.2, featured: false, tags: ["freemium"], url: "https://chatcsv.co" },
  { id: 34, name: "Figma AI",       category: "design",      domain: "figma.com",           icon: "", desc: "Collaborative design application with layout auto-generation, vector assistance, and component naming.", price: "Free / $12mo", pricing: "freemium", arabic: "partial", opensource: false, rating: 4.7, featured: true,  tags: ["freemium", "arabic"], url: "https://figma.com" },
  { id: 35, name: "Adobe Firefly",  category: "image",       domain: "adobe.com",           icon: "", desc: "Generative AI model set integrated into Creative Cloud, commercially safe and trained on licensed imagery.", price: "Free / $5mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.3, featured: false, tags: ["freemium"], url: "https://firefly.adobe.com" },
  { id: 36, name: "Synthesia",      category: "video",       domain: "synthesia.io",        icon: "", desc: "Video production software with script-driven photorealistic avatars in 140+ languages.", price: "From $22/mo", pricing: "paid",     arabic: "yes",     opensource: false, rating: 4.5, featured: false, tags: ["paid", "arabic"], url: "https://synthesia.io" },
  { id: 37, name: "HeyGen",         category: "video",       domain: "heygen.com",          icon: "", desc: "Avatar video creator with lip-sync translation and studio voice customization.", price: "Free / $24mo", pricing: "freemium", arabic: "yes",     opensource: false, rating: 4.4, featured: false, tags: ["freemium", "arabic"], url: "https://heygen.com" },
  { id: 38, name: "Murf AI",        category: "audio",       domain: "murf.ai",             icon: "", desc: "Text to voice studio providing vocal pitch control, timing adjustments, and multi-speaker tracks.", price: "Free / $19mo", pricing: "freemium", arabic: "yes",     opensource: false, rating: 4.3, featured: false, tags: ["freemium", "arabic"], url: "https://murf.ai" },
  { id: 39, name: "Perplexity AI",  category: "writing",     domain: "perplexity.ai",       icon: "", desc: "Conversational answer engine with cited source references and topic collection organization.", price: "Free / $20mo", pricing: "freemium", arabic: "partial", opensource: false, rating: 4.6, featured: true,  tags: ["freemium", "arabic"], url: "https://perplexity.ai" },
  { id: 40, name: "Gamma",          category: "productivity", domain: "gamma.app",          icon: "", desc: "Presentation generator converting text prompts into styled slide decks and interactive documents.", price: "Free / $10mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.5, featured: false, tags: ["freemium"], url: "https://gamma.app" },
  { id: 41, name: "Loom AI",        category: "video",       domain: "loom.com",            icon: "", desc: "Video messaging app with automated transcription, title generation, and key takeaway summaries.", price: "Free / $13mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.4, featured: false, tags: ["freemium"], url: "https://loom.com" },
  { id: 42, name: "Beautiful.ai",   category: "design",      domain: "beautiful.ai",        icon: "", desc: "Slide design software with automated layout spacing and design system constraints.", price: "From $12/mo", pricing: "paid",     arabic: "no",      opensource: false, rating: 4.2, featured: false, tags: ["paid"], url: "https://beautiful.ai" },
  { id: 43, name: "Mem.ai",         category: "productivity", domain: "mem.ai",             icon: "", desc: "Knowledge workspace linking notes, calendar events, and action items automatically.", price: "Free / $10mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.1, featured: false, tags: ["freemium"], url: "https://mem.ai" },
  { id: 44, name: "Tome",           category: "productivity", domain: "tome.app",           icon: "", desc: "Visual storytelling tool for pitch decks, project proposals, and mood boards.", price: "Free / $10mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.3, featured: false, tags: ["freemium"], url: "https://tome.app" },
  { id: 45, name: "Writesonic",     category: "writing",     domain: "writesonic.com",      icon: "", desc: "Content generator providing article writer templates, landing page copy, and SEO integrations.", price: "Free / $13mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.3, featured: false, tags: ["freemium"], url: "https://writesonic.com" },
  { id: 46, name: "Rytr",           category: "writing",     domain: "rytr.me",             icon: "", desc: "Compact copywriting assistant with multiple tone presets and multi-language support.", price: "Free / $9mo", pricing: "freemium", arabic: "yes",     opensource: false, rating: 4.1, featured: false, tags: ["freemium", "arabic"], url: "https://rytr.me" },
  { id: 47, name: "NightCafe",      category: "image",       domain: "nightcafe.studio",    icon: "", desc: "Community platform for multi-model AI art creation and prompt experiments.", price: "Free / $6mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.4, featured: false, tags: ["freemium"], url: "https://nightcafe.studio" },
  { id: 48, name: "Leonardo.ai",    category: "image",       domain: "leonardo.ai",         icon: "", desc: "Asset generator providing finetuned style models for game textures, graphics, and concept art.", price: "Free / $12mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.5, featured: false, tags: ["freemium"], url: "https://leonardo.ai" },
  { id: 49, name: "Play.ht",        category: "audio",       domain: "play.ht",             icon: "", desc: "Audio publishing platform providing text to speech conversion and podcast RSS generation.", price: "Free / $31mo", pricing: "freemium", arabic: "yes",     opensource: false, rating: 4.4, featured: false, tags: ["freemium", "arabic"], url: "https://play.ht" },
  { id: 50, name: "Simplified",     category: "marketing",   domain: "simplified.com",      icon: "", desc: "All-in-one graphic design, video editing, social media scheduling, and copy creation suite.", price: "Free / $12mo", pricing: "freemium", arabic: "no",      opensource: false, rating: 4.2, featured: false, tags: ["freemium"], url: "https://simplified.com" },
];

export const COMPARISONS_DATA: Record<string, ComparisonData> = {
  'chatgpt-claude': {
    title: 'ChatGPT vs Claude',
    subtitle: 'Detailed analysis of conversational capabilities, context windows, and performance',
    tools: [
      {
        name: 'ChatGPT', company: 'OpenAI', icon: '', domain: 'openai.com', rating: 4.8,
        pricing: 'Free / $20 mo', bestFor: 'Multimodal interaction, code execution, web browsing',
        pros: ['Extensive plugin & Custom GPT ecosystem', 'Multimodal speech and image reasoning', 'Code interpreter and data analysis built-in', 'High latency optimization'],
        cons: ['Lower context window than Claude Pro', 'Occasional verbose formatting'],
        specs: { 'Context Window': '128K tokens', 'Multimodal': 'Text, Image, Audio', 'API Available': 'Yes', 'Offline Use': 'No', 'Languages': '50+', 'Code Execution': 'Built-in' }
      },
      {
        name: 'Claude', company: 'Anthropic', icon: '', domain: 'anthropic.com', rating: 4.7,
        pricing: 'Free / $20 mo', bestFor: 'Long document processing, nuanced synthesis, safety constraints',
        pros: ['200K token context window', 'High instruction accuracy', 'Interactive Artifacts preview panel', 'Structured document synthesis'],
        cons: ['No live web browsing', 'No native voice mode'],
        specs: { 'Context Window': '200K tokens', 'Multimodal': 'Text, Images (view only)', 'API Available': 'Yes', 'Offline Use': 'No', 'Languages': 'Multiple', 'Code Execution': 'Via Artifacts' }
      }
    ],
    verdict: 'ChatGPT excels in multimodal versatility and tool execution. Claude leads in long-context reading and precise document analysis.'
  },
  'midjourney-dalle': {
    title: 'Midjourney vs DALL-E 3',
    subtitle: 'Comparison of image detail, style flexibility, and prompt adherence',
    tools: [
      {
        name: 'Midjourney', company: 'Midjourney Inc.', icon: '', domain: 'midjourney.com', rating: 4.9,
        pricing: '$10-60 / mo', bestFor: 'Photorealistic textures, artistic concepts, graphic design',
        pros: ['Industry-leading aesthetic fidelity', 'Granular parameter tuning (--v, --ar, --stylize)', 'Vary Region (inpainting) controls', 'Strong character consistency'],
        cons: ['Discord-based input flow', 'Requires paid tier for usage'],
        specs: { 'Resolution': 'Up to 1792x1024', 'Style Control': 'High (parameters)', 'Free Tier': 'No', 'API': 'Limited', 'Speed': 'Fast (GPU)', 'Editing': 'Inpainting, pan, zoom' }
      },
      {
        name: 'DALL-E 3', company: 'OpenAI', icon: '', domain: 'openai.com', rating: 4.5,
        pricing: 'Free (ChatGPT) / API', bestFor: 'Literal prompt adherence, integrated text rendering',
        pros: ['High adherence to complex text prompts', 'Direct integration inside ChatGPT interface', 'Legible text rendering inside imagery'],
        cons: ['Less painterly aesthetic variation', 'Stricter moderation filters'],
        specs: { 'Resolution': '1024x1024', 'Style Control': 'Medium', 'Free Tier': 'Yes (limited)', 'API': 'Yes', 'Speed': 'Medium', 'Editing': 'Select and edit' }
      }
    ],
    verdict: 'Midjourney is optimal for creative and artistic output. DALL-E 3 provides precise prompt matching and effortless ChatGPT integration.'
  },
  'gemini-copilot': {
    title: 'Gemini vs Microsoft Copilot',
    subtitle: 'Evaluation of productivity assistant features and workspace integrations',
    tools: [
      {
        name: 'Gemini', company: 'Google', icon: '', domain: 'google.com', rating: 4.4,
        pricing: 'Free / $20 mo', bestFor: 'Google Workspace ecosystem, multimodal search, large context',
        pros: ['1M+ token context capabilities', 'Native Google Docs and Gmail extensions', 'Real-time Google Search indexing'],
        cons: ['Variable output styling', 'Requires Google Account integration'],
        specs: { 'Context': '1M+ tokens', 'Search': 'Real-time Google', 'Integration': 'Workspace, Android', 'Multimodal': 'Text, Image, Video, Audio', 'Free Tier': 'Generous', 'Model': 'Gemini 1.5 Pro' }
      },
      {
        name: 'Copilot', company: 'Microsoft', icon: '', domain: 'microsoft.com', rating: 4.3,
        pricing: 'Free / $20-30 mo', bestFor: 'Microsoft 365 applications, Word, Excel, PowerPoint',
        pros: ['Direct integration in Word, Excel, and Outlook', 'Bing web index access', 'Enterprise data protection controls'],
        cons: ['Requires Microsoft 365 licensing for full capabilities', 'More rigid prompt boundaries'],
        specs: { 'Context': 'Varies by app', 'Search': 'Bing integration', 'Integration': '365, Windows, Edge', 'Multimodal': 'Text, Image', 'Free Tier': 'Limited', 'Model': 'GPT-4 / Custom' }
      }
    ],
    verdict: 'Gemini provides expansive multimodal context for Google users. Copilot streamlines enterprise workflows across Microsoft 365.'
  },
  'perplexity-grok': {
    title: 'Perplexity vs Grok',
    subtitle: 'Comparative benchmark of real-time search engines and information retrieval',
    tools: [
      {
        name: 'Perplexity', company: 'Perplexity AI', icon: '', domain: 'perplexity.ai', rating: 4.6,
        pricing: 'Free / $20 mo', bestFor: 'Academic research, structured web search, verified citations',
        pros: ['Inline academic and web citations', 'Focus modes (Academic, YouTube, Reddit)', 'Pro search multi-step reasoning'],
        cons: ['Structured tone without conversational variance', 'Rate limits on Pro queries'],
        specs: { 'Sources': 'Cited & linked', 'Search': 'Real-time web', 'Focus Modes': 'Academic, Reddit, Social', 'API': 'Yes', 'Copilot': 'Pro feature', 'Collections': 'Yes' }
      },
      {
        name: 'Grok', company: 'xAI', icon: '', domain: 'x.ai', rating: 4.0,
        pricing: '$8-16 / mo (X Premium)', bestFor: 'Real-time social trends, breaking news, unfiltered topics',
        pros: ['Real-time X platform social data stream', 'Direct access to trending news posts', 'Integrated image generation model'],
        cons: ['X subscription requirement', 'Social data bias'],
        specs: { 'Sources': 'X/Twitter real-time', 'Search': 'Social-first', 'Personality': 'Direct, informal', 'API': 'Limited', 'Images': 'Aurora model', 'Trends': 'Real-time' }
      }
    ],
    verdict: 'Perplexity is the superior choice for factual research and cited reports. Grok is effective for immediate social trend tracking.'
  }
};

export const BLOG_POSTS: BlogPost[] = [
  { category: 'Comparison', icon: '', title: 'ChatGPT vs Claude: Technical Comparison & Use Cases', desc: 'An objective breakdown of context handling, latency, code generation, and price-to-performance metrics.', date: 'Jul 2026', readTime: '8 min', articleId: 'article-free-writing' },
  { category: 'Tutorial', icon: '', title: 'Midjourney Prompt Engineering for Visual Designers', desc: 'Master aspect ratios, stylize parameters, and image-to-image workflows for agency-grade graphics.', date: 'Jul 2026', readTime: '12 min', articleId: 'article-arabic' },
  { category: 'Guide', icon: '', title: 'Evaluating Modern AI Architectures for Engineering Teams', desc: 'A pragmatic review of developer tools, code assistants, and knowledge base search systems.', date: 'Jul 2026', readTime: '15 min', articleId: 'article-image-gen' },
  { category: 'Review', icon: '', title: 'Arabic NLP Tools: Benchmark Results for Localized Copy', desc: 'Empirical review testing Arabic grammar precision, dialect support, and tokenization efficiency.', date: 'Jul 2026', readTime: '10 min', articleId: 'article-built' },
  { category: 'Tutorial', icon: '', title: 'GitHub Copilot vs Codeium: Developer Productivity Study', desc: 'Testing latency, auto-completion accuracy, and IDE integration across complex TypeScript repositories.', date: 'Jul 2026', readTime: '9 min', articleId: 'article-freelancer-stack' },
  { category: 'Guide', icon: '', title: 'Directory SEO Optimization & Revenue Optimization Strategy', desc: 'Architectural patterns for content categorization, metadata optimization, and clean conversion paths.', date: 'Jul 2026', readTime: '11 min', articleId: 'article-free-writing' },
];

export const STACK_BUNDLES: Record<string, StackBundle> = {
  creator: {
    name: "Content Creator Suite",
    desc: "Integrated stack for content production and asset generation",
    tools: [
      { name: "ChatGPT", icon: "", domain: "openai.com", desc: "Text drafting & research", price: "$20/mo", url: "https://chat.openai.com", affiliate: "chatgpt" },
      { name: "Midjourney", icon: "", domain: "midjourney.com", desc: "Visual asset generation", price: "$10/mo", url: "https://midjourney.com", affiliate: "midjourney" },
      { name: "ElevenLabs", icon: "", domain: "elevenlabs.io", desc: "Audio voiceover synthesis", price: "$5/mo", url: "https://elevenlabs.io", affiliate: "elevenlabs" },
      { name: "Descript", icon: "", domain: "descript.com", desc: "Transcript-based video editing", price: "$12/mo", url: "https://descript.com", affiliate: "descript" }
    ],
    total: "$47/mo",
    savings: "Combined workflow efficiency saving ~12 hrs/week"
  },
  developer: {
    name: "Software Developer Suite",
    desc: "AI tools designed for code completion, refactoring, and technical docs",
    tools: [
      { name: "GitHub Copilot", icon: "", domain: "github.com", desc: "IDE auto-completion engine", price: "$10/mo", url: "https://github.com/features/copilot", affiliate: "copilot" },
      { name: "ChatGPT", icon: "", domain: "openai.com", desc: "Code review & debug analysis", price: "$20/mo", url: "https://chat.openai.com", affiliate: "chatgpt" },
      { name: "Notion AI", icon: "", domain: "notion.so", desc: "Technical documentation", price: "$10/mo", url: "https://notion.so", affiliate: "notion" },
      { name: "Perplexity", icon: "", domain: "perplexity.ai", desc: "Technical API search & docs", price: "Free / $20mo", url: "https://perplexity.ai", affiliate: "perplexity" }
    ],
    total: "$40/mo",
    savings: "Estimated 2.5x increase in code velocity"
  },
  marketer: {
    name: "Growth Marketing Suite",
    desc: "SEO analysis, content variation, and social planning tools",
    tools: [
      { name: "Jasper AI", icon: "", domain: "jasper.ai", desc: "Brand copy generation", price: "$49/mo", url: "https://jasper.ai", affiliate: "jasper" },
      { name: "Semrush", icon: "", domain: "semrush.com", desc: "SEO keyword analysis", price: "$120/mo", url: "https://semrush.com", affiliate: "semrush" },
      { name: "Canva AI", icon: "", domain: "canva.com", desc: "Social graphic templates", price: "$13/mo", url: "https://canva.com", affiliate: "canva" },
      { name: "Buffer AI", icon: "", domain: "buffer.com", desc: "Post queue optimization", price: "$6/mo", url: "https://buffer.com", affiliate: "buffer" }
    ],
    total: "$188/mo",
    savings: "Comprehensive analytics and campaign scheduling"
  },
  business: {
    name: "Enterprise Operations Suite",
    desc: "Operational automation, CRM intelligence, and finance tools",
    tools: [
      { name: "HubSpot AI", icon: "", domain: "hubspot.com", desc: "CRM lead scoring", price: "Free / $20mo", url: "https://hubspot.com", affiliate: "hubspot" },
      { name: "Zapier AI", icon: "", domain: "zapier.com", desc: "App integration pipelines", price: "Free / $20mo", url: "https://zapier.com", affiliate: "zapier" },
      { name: "QuickBooks AI", icon: "", domain: "intuit.com", desc: "Financial reconciliation", price: "$15/mo", url: "https://quickbooks.intuit.com", affiliate: "quickbooks" },
      { name: "Fireflies.ai", icon: "", domain: "fireflies.ai", desc: "Meeting transcript summaries", price: "Free / $10mo", url: "https://fireflies.ai", affiliate: "fireflies" }
    ],
    total: "$45/mo",
    savings: "Reduces repetitive administrative overhead"
  },
  student: {
    name: "Academic Research Suite",
    desc: "Accessible search, tutoring, and note organization tools",
    tools: [
      { name: "ChatGPT", icon: "", domain: "openai.com", desc: "Concept explanation & drafting", price: "Free", url: "https://chat.openai.com", affiliate: "chatgpt" },
      { name: "Khan Academy AI", icon: "", domain: "khanacademy.org", desc: "Step-by-step learning tutor", price: "Free", url: "https://khanacademy.org", affiliate: "khan" },
      { name: "Notion AI", icon: "", domain: "notion.so", desc: "Note organization & summary", price: "Free / $10mo", url: "https://notion.so", affiliate: "notion" },
      { name: "Duolingo Max", icon: "", domain: "duolingo.com", desc: "Conversational language practice", price: "Free / $14mo", url: "https://duolingo.com", affiliate: "duolingo" }
    ],
    total: "Free / $24mo",
    savings: "High utility academic stack with free tier access"
  }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What primary task are you solving?",
    options: [
      { icon: "", text: "Content writing, copy, or research", value: "writing" },
      { icon: "", text: "Image generation or graphic design", value: "image" },
      { icon: "", text: "Software development & code completion", value: "code" },
      { icon: "", text: "Data analysis or business intelligence", value: "data" },
      { icon: "", text: "Video editing or voice audio generation", value: "video" },
      { icon: "", text: "Workflow automation & project tracking", value: "productivity" }
    ]
  },
  {
    question: "What is your pricing requirement?",
    options: [
      { icon: "", text: "Free Tier Only — Zero software cost", value: "free" },
      { icon: "", text: "Freemium — Free starter, open to paid tiers", value: "freemium" },
      { icon: "", text: "Paid / Enterprise — Dedicated professional features", value: "paid" }
    ]
  },
  {
    question: "Do you require regional language support?",
    options: [
      { icon: "", text: "Yes, verified Arabic language support is essential", value: "arabic" },
      { icon: "", text: "No, standard English interface is sufficient", value: "any" }
    ]
  },
  {
    question: "What level of technical complexity do you prefer?",
    options: [
      { icon: "", text: "Turnkey & Intuitive — Simple user interface", value: "easy" },
      { icon: "", text: "Balanced — Configurable options and parameters", value: "medium" },
      { icon: "", text: "Advanced — API access, code customization, local execution", value: "hard" }
    ]
  },
  {
    question: "What environment will you use this tool in?",
    options: [
      { icon: "", text: "Corporate / Enterprise Business", value: "business" },
      { icon: "", text: "Academic / Education", value: "education" },
      { icon: "", text: "Independent Creative / Studio", value: "creative" },
      { icon: "", text: "Freelance & Consulting", value: "freelance" }
    ]
  }
];

export const USER_REVIEWS = [
  { name: "Sami K.", tool: "ChatGPT & Claude", text: "Thakaa provided an objective side-by-side comparison between ChatGPT and Claude for our localization workflow.", avatar: "SK" },
  { name: "Lina M.", tool: "Midjourney", text: "The structured comparison matrix made it straightforward to pick the right image generator for client assets.", avatar: "LM" },
  { name: "Tariq H.", tool: "GitHub Copilot", text: "Clear documentation on context limits and pricing helped us evaluate Copilot for our engineering team.", avatar: "TH" }
];
