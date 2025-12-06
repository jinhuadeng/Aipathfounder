import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  lang: Language;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading, lang }) => {
  const [input, setInput] = useState('');

  const translations = {
    zh: {
      placeholder: "你想用AI完成什么任务？（例如：帮我做个PPT）",
      button: "搜索工具",
      loading: "思考中..."
    },
    en: {
      placeholder: "What do you want to do? (e.g., Create a presentation)",
      button: "Search",
      loading: "Thinking..."
    }
  };

  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative z-10">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
        <div className="relative flex items-center bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
          <div className="pl-4 text-slate-400">
            <Search size={22} />
          </div>
          <input
            type="text"
            className="w-full px-4 py-4 text-lg text-slate-700 placeholder-slate-400 focus:outline-none bg-transparent"
            placeholder={t.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="mr-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          >
            {isLoading ? t.loading : t.button}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
};
