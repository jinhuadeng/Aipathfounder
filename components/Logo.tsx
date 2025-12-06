import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language } from '../types';

interface LogoProps {
  lang: Language;
}

export const Logo: React.FC<LogoProps> = ({ lang }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2 rounded-lg text-white shadow-lg">
        <Sparkles size={24} />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-700 leading-none">
          WenX
        </span>
        <span className="text-[10px] text-slate-400 font-medium tracking-wide">
          {lang === 'zh' ? 'AI 推荐官' : 'AI Advisor'}
        </span>
      </div>
    </div>
  );
};
