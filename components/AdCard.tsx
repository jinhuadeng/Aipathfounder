import React from 'react';
import { ExternalLink, Zap, Crown, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface AdCardProps {
  lang: Language;
}

export const AdCard: React.FC<AdCardProps> = ({ lang }) => {
  const t = {
    zh: {
      tag: "全能神器",
      title: "聚合万能 AI (GPT-4/Claude3...)",
      desc: "无需魔法，国内直接用。集成了全球最顶尖的 LLM 模型，一个账号搞定所有需求。",
      verdictTitle: "WenX 强推",
      verdict: "别再到处买账号了！这个站聚合了 GPT-4o, Claude 3.5, Gemini Pro... 价格还比官网便宜，稳定好用，我的主力工具。",
      btn: "立即体验",
      feature1: "聚合所有顶级模型",
      feature2: "国内直连秒开",
    },
    en: {
      tag: "All-in-One",
      title: "Universal AI Hub",
      desc: "Access GPT-4, Claude 3, and Gemini Pro in one place. No VPN needed.",
      verdictTitle: "WenX Pick",
      verdict: "Stop paying for 5 different subscriptions. This tool aggregates every top model you need into one interface. It's what I use daily.",
      btn: "Try Now",
      feature1: "All Top Models",
      feature2: "Fast Access",
    }
  };

  const text = t[lang];

  return (
    <div className="relative flex flex-col h-full p-6 rounded-3xl transition-all duration-300 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl shadow-slate-200 border border-slate-700 overflow-hidden group">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>

      {/* Header */}
      <div className="relative z-10 mb-4 mt-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold leading-tight flex items-center gap-2">
            <Crown size={20} className="text-yellow-400 fill-yellow-400" />
            {text.title}
          </h3>
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-indigo-600 text-white shrink-0 shadow-lg shadow-indigo-900/50">
            {text.tag}
          </span>
        </div>
        
        <p className="text-xs text-slate-300 font-medium mb-3 opacity-90">
          {text.desc}
        </p>

        <div className="flex gap-3 mb-4">
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                <CheckCircle2 size={10} /> {text.feature1}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                <CheckCircle2 size={10} /> {text.feature2}
            </div>
        </div>
      </div>

      {/* Verdict Section */}
      <div className="relative z-10 rounded-xl p-4 mb-4 flex-grow bg-white/10 backdrop-blur-sm border border-white/10">
        <div className="flex items-center gap-2 mb-2">
           <Zap size={14} className="text-yellow-400 fill-yellow-400" />
           <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">
             {text.verdictTitle}
           </span>
        </div>
        
        <p className="text-sm font-medium leading-relaxed text-slate-100 italic">
          "{text.verdict}"
        </p>
      </div>

      {/* Action Button */}
      <div className="relative z-10 mt-auto">
        <a 
          href="https://x.yuhuawenyu.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white shadow-lg shadow-indigo-900/20 transition-all duration-200 transform hover:-translate-y-0.5"
        >
          {text.btn}
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};
