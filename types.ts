export type Language = 'zh' | 'en';

export interface AITool {
  name: string;
  description: string;
  websiteUrl: string;
  pricingModel: 'Free' | 'Freemium' | 'Paid';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  reasonForRecommendation: string;
  cons: string; // New field for "Pitfalls/Watch Out"
  tags: string[];
  isBestChoice: boolean;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  prompt: string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
