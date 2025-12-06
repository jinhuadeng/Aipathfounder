import React from 'react';
import { AITool, Language } from '../types';
import { ExternalLink, Quote, Trophy, Star, AlertTriangle, Info } from 'lucide-react';

interface ToolCardProps {
  tool: AITool;
  lang: Language;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, lang }) => {
  const isBest = tool.isBestChoice;

  const getPricingColor = (model: string) => {
    switch (model) {
      case 'Free': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Freemium': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Paid': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPricingText = (model: string) => {
    if (lang === 'en') return model;
     switch (model) {
      case 'Free': return '完全免费';
      case 'Freemium': return '免费试用';
      case 'Paid': return '需要付费';
      default: return model;
    }
  };

  return (
    <div className={`
      relative flex flex-col h-full p-6 rounded-3xl transition-all duration-300
      ${isBest 
        ? 'bg-white border-2 border-indigo-500 shadow-xl shadow-indigo-100 scale-100 md:scale-105 z-10' 
        : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200'
      }
    `}>
      {/* Best Choice Badge */}
      {isBest && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap z-20">
          <Trophy size={14} className="text-yellow-300" />
          {lang === 'zh' ? 'WenX 首选' : 'WenX Top Pick'}
        </div>
      )}

      {/* Header */}
      <div className="mb-4 mt-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-slate-900 leading-tight">
            {tool.name}
          </h3>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ml-2 shrink-0 ${getPricingColor(tool.pricingModel)}`}>
            {getPricingText(tool.pricingModel)}
          </span>
        </div>
        {/* Subtle Functional Description */}
        <p className="text-xs text-slate-400 font-medium mt-1 mb-3">
          {tool.description}
        </p>
        
        {/* Humanized Tags */}
        <div className="flex flex-wrap gap-2">
          {tool.tags.map(tag => (
            <span 
              key={tag} 
              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide
                ${isBest ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'}
              `}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* WenX Verdict Section - The Main Content */}
      <div className={`
        relative rounded-xl p-4 mb-4 flex-grow
        ${isBest ? 'bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100' : 'bg-slate-50 border border-slate-100'}
      `}>
        <div className="flex items-center gap-2 mb-2">
           {isBest ? <Star size={14} className="text-indigo-600 fill-indigo-600" /> : <Quote size={14} className="text-slate-400" />}
           <span className={`text-xs font-bold uppercase tracking-wider ${isBest ? 'text-indigo-700' : 'text-slate-500'}`}>
             {lang === 'zh' ? 'WenX 锐评' : 'The Verdict'}
           </span>
        </div>
        
        <p className={`text-sm font-medium leading-relaxed
          ${isBest ? 'text-indigo-900' : 'text-slate-700'}
        `}>
          {tool.reasonForRecommendation}
        </p>
      </div>

      {/* Pitfalls / Cons Section */}
      <div className="rounded-xl p-3 mb-6 bg-orange-50 border border-orange-100">
        <div className="flex items-center gap-1.5 mb-1 text-orange-700">
          <AlertTriangle size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {lang === 'zh' ? '避坑指南' : 'Watch Out'}
          </span>
        </div>
        <p className="text-xs text-orange-800 leading-relaxed">
          {tool.cons}
        </p>
      </div>

      {/* Footer Action */}
      <div className="mt-auto">
        <a 
          href={tool.websiteUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`
            w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-200 group
            ${isBest 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' 
              : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600'
            }
          `}
        >
          {lang === 'zh' ? '直达现场' : 'Visit Site'}
          <ExternalLink size={16} className={`transition-transform duration-300 group-hover:translate-x-1 ${!isBest && 'text-slate-400 group-hover:text-indigo-500'}`} />
        </a>
      </div>
    </div>
  );
};
