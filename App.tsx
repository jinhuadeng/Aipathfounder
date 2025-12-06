import React, { useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import { SearchBar } from './components/SearchBar';
import { QuickCategories } from './components/QuickCategories';
import { ToolCard } from './components/ToolCard';
import { AdCard } from './components/AdCard';
import { getAIRecommendations } from './services/geminiService';
import { AITool, LoadingState, Language } from './types';
import { Bot, Loader2, AlertCircle, Globe, Download, QrCode } from 'lucide-react';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [tools, setTools] = useState<AITool[]>([]);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [lang, setLang] = useState<Language>('zh');
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setInstallPrompt(null);
        }
      });
    } else {
      alert(lang === 'zh' 
        ? "请使用浏览器菜单中的'添加到主屏幕'功能来安装应用。" 
        : "Please use the 'Add to Home Screen' option in your browser menu to install.");
    }
  };

  const handleSearch = async (query: string) => {
    setLoadingState('loading');
    setCurrentQuery(query);
    setTools([]); 
    
    try {
      const results = await getAIRecommendations(query, lang);
      setTools(results);
      setLoadingState('success');
    } catch (error) {
      console.error(error);
      setLoadingState('error');
    }
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
    // Clear results on language switch to avoid confusion
    setTools([]);
    setLoadingState('idle');
  };

  const t = {
    zh: {
      subtitle: "专为小白打造的AI推荐站",
      heroTitlePrefix: "别让",
      heroTitleHighlight: "AI工具",
      heroTitleSuffix: "挑花了眼",
      heroDesc: "无论你是想画画、写作、做PPT还是学外语，告诉 WenX 你的需求，立即为你匹配最适合、最简单的AI工具。",
      loadingTitle: "WenX 正在分析你的需求...",
      loadingDesc: "正在对比全网工具，筛选最佳方案...",
      errorTitle: "出了一点小问题",
      errorDesc: "获取推荐时遇到了错误，请稍后再试或检查网络。",
      retry: "重试",
      resultTitle: "WenX 为你精选了",
      resultSuffix: "款神器",
      searchOther: "换个需求问问",
      empty: "抱歉，我没有找到匹配这个需求的工具，请换个说法试试。",
      install: "下载应用",
      footerTitle: "订阅 WenX 公众号",
      footerDesc: "获取最新的 AI 避坑指南和保姆级教程，拒绝信息差。",
      footerAction: "微信搜索：WenX 进化论"
    },
    en: {
      subtitle: "AI Recommendation Station for Beginners",
      heroTitlePrefix: "Don't get lost in",
      heroTitleHighlight: "AI Tools",
      heroTitleSuffix: "",
      heroDesc: "Whether you want to draw, write, make slides, or learn a language, tell WenX your need, and get the simplest, most suitable AI tools instantly.",
      loadingTitle: "WenX is analyzing your request...",
      loadingDesc: "Comparing tools to find your best match...",
      errorTitle: "Something went wrong",
      errorDesc: "Encountered an error while fetching recommendations. Please try again.",
      retry: "Retry",
      resultTitle: "WenX selected",
      resultSuffix: "tools for you",
      searchOther: "Ask something else",
      empty: "Sorry, I couldn't find any tools matching that request. Please try rephrasing.",
      install: "Download App",
      footerTitle: "Stay Updated",
      footerDesc: "Get the latest AI guides and tutorials.",
      footerAction: "Follow us for more."
    }
  };

  const text = t[lang];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo lang={lang} />
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-slate-500 font-medium">
              {text.subtitle}
            </div>
            
            <button 
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              title={text.install}
            >
              <Download size={16} />
              <span className="hidden sm:inline">{text.install}</span>
            </button>

            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              <Globe size={16} />
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center px-4 sm:px-6 pt-12 pb-20 w-full max-w-7xl mx-auto">
        
        {/* Hero Section - SEO Optimized semantic HTML */}
        <section className={`text-center transition-all duration-500 w-full ${loadingState === 'idle' ? 'mb-12 mt-8' : 'mb-8'}`}>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            {text.heroTitlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{text.heroTitleHighlight}</span> {text.heroTitleSuffix}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            {text.heroDesc}
          </p>
        </section>

        {/* Search & Categories */}
        <div className="w-full flex flex-col items-center gap-6 relative z-10">
          <SearchBar onSearch={handleSearch} isLoading={loadingState === 'loading'} lang={lang} />
          
          {loadingState === 'idle' && (
            <QuickCategories onSelect={handleSearch} disabled={loadingState === 'loading'} lang={lang} />
          )}
        </div>

        {/* Results Section */}
        <section className="w-full mt-12 min-h-[300px]">
          {/* Loading State */}
          {loadingState === 'loading' && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 animate-in fade-in duration-500">
              <Loader2 size={48} className="animate-spin text-indigo-500 mb-4" />
              <p className="text-lg font-medium text-slate-600">{text.loadingTitle}</p>
              <p className="text-sm">{text.loadingDesc}</p>
            </div>
          )}

          {/* Error State */}
          {loadingState === 'error' && (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in-95 duration-300">
               <div className="bg-red-50 p-4 rounded-full mb-4 text-red-500">
                 <AlertCircle size={40} />
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">{text.errorTitle}</h3>
               <p className="text-slate-600 mb-6">{text.errorDesc}</p>
               <button 
                 onClick={() => handleSearch(currentQuery)}
                 className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
               >
                 {text.retry}
               </button>
            </div>
          )}

          {/* Success State */}
          {loadingState === 'success' && tools.length > 0 && (
            <div className="animate-in slide-in-from-bottom-10 duration-700">
              <div className="flex items-center gap-2 mb-8 ml-1">
                <Bot className="text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-800">
                  {text.resultTitle} {tools.length} {text.resultSuffix}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 
                   Render Logic:
                   1. If Best Choice exists, render it first.
                   2. Render the "AdCard" as the second item (high visibility).
                   3. Render the rest of the tools.
                */}
                
                {/* Render the Best Choice first */}
                {tools.filter(t => t.isBestChoice).map((tool, index) => (
                   <ToolCard key={`best-${index}`} tool={tool} lang={lang} />
                ))}

                {/* Render the Ad Card */}
                <AdCard lang={lang} />

                {/* Render remaining tools */}
                {tools.filter(t => !t.isBestChoice).map((tool, index) => (
                  <ToolCard key={`tool-${index}`} tool={tool} lang={lang} />
                ))}
              </div>
              
              <div className="mt-12 text-center">
                 <button 
                   onClick={() => setLoadingState('idle')} 
                   className="text-indigo-600 hover:text-indigo-800 font-medium underline underline-offset-4"
                 >
                   {text.searchOther}
                 </button>
              </div>
            </div>
          )}

           {/* Empty Result State */}
           {loadingState === 'success' && tools.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">{text.empty}</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer - Redesigned for WeChat Subscription */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Brand Info */}
            <div className="text-center md:text-left">
               <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                 <div className="bg-indigo-600 p-1.5 rounded-md text-white">
                   <Bot size={20} />
                 </div>
                 <span className="text-xl font-bold text-slate-800">WenX</span>
               </div>
               <p className="text-slate-500 text-sm max-w-sm mx-auto md:mx-0">
                 © 2024 WenX. Powered by Google Gemini.<br/>
                 AI recommendations are for reference only.
               </p>
            </div>

            {/* Subscription Box */}
            <div className="bg-indigo-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 border border-indigo-100">
               <div className="bg-white p-2 rounded-xl shadow-sm border border-indigo-100 shrink-0">
                  {/* Placeholder for QR Code */}
                  <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-indigo-200">
                     <QrCode size={48} />
                  </div>
               </div>
               <div className="text-center sm:text-left">
                  <h4 className="text-lg font-bold text-indigo-900 mb-1">{text.footerTitle}</h4>
                  <p className="text-indigo-700 text-sm mb-3">
                    {text.footerDesc}
                  </p>
                  <div className="inline-block px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-sm">
                    {text.footerAction}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
