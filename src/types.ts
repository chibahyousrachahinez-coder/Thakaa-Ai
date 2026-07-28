export interface Tool {
  id: number;
  name: string;
  category: string;
  icon: string;
  domain?: string;
  desc: string;
  price: string;
  pricing: 'free' | 'freemium' | 'paid';
  arabic: 'no' | 'partial' | 'yes';
  opensource: boolean;
  rating: number;
  featured: boolean;
  tags: string[];
  url: string;
  tagline?: string;
  keyFeatures?: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface ToolCategory {
  id: string;
  label: string;
  emoji: string;
}

export interface SubFilter {
  id: string;
  label: string;
  emoji: string;
}

export interface ComparisonToolSpec {
  name: string;
  company: string;
  icon: string;
  domain?: string;
  rating: number;
  pricing: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  specs: Record<string, string>;
}

export interface ComparisonData {
  title: string;
  subtitle: string;
  tools: ComparisonToolSpec[];
  verdict: string;
}

export interface BlogPost {
  category: string;
  icon: string;
  title: string;
  desc: string;
  date: string;
  readTime: string;
  articleId: string;
}

export interface StackTool {
  name: string;
  icon: string;
  domain?: string;
  desc: string;
  price: string;
  url: string;
  affiliate: string;
}

export interface StackBundle {
  name: string;
  desc: string;
  tools: StackTool[];
  total: string;
  savings: string;
}

export interface QuizOption {
  icon: string;
  text: string;
  value: string;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export interface RevenueStats {
  clicks: number;
  subscribers: number;
  submissions: number;
  revenue: number;
}

export interface IToolReview {
  id: string;
  toolId: number;
  userName: string;
  userAvatar?: string;
  userRole?: string;
  rating: number; // 1 to 5
  date: string;
  reviewText: string;
  helpfulCount: number;
  userUpvoted?: boolean;
  verifiedUser?: boolean;
}

export interface IVerificationMetrics {
  qualityScore: number;
  realUtilityScore: number;
  pricingTransparencyScore: number;
  activeMaintenanceStatus: 'Active & Verified' | 'Updated Recently' | 'Under Review';
  lastTestedDate: string;
  workingStatus: '100% Operational' | 'Partial Service' | 'Maintenance';
  criteriaChecklist: {
    title: string;
    passed: boolean;
    details: string;
  }[];
}

export interface ICurationCriteria {
  id: string;
  title: string;
  description: string;
  iconName: string;
  weight: string;
}

export interface IToolComparison {
  selectedToolIds: number[];
}
