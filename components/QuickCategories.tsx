import React from 'react';
import { PenTool, Image, Video, Code, MessageSquare, Headphones } from 'lucide-react';
import { Category, Language } from '../types';

interface QuickCategoriesProps {
  onSelect: (prompt: string) => void;
  disabled: boolean;
  lang: Language;
}

const getCategories = (lang: Language): Category[] => {
  if (lang === 'zh') {
    return [
      { id: 'writing', label: '写作助手', icon: 'PenTool', prompt: '我需要帮我写作、润色文章或写周报的AI工具' },
      { id: 'image', label: '绘画作图', icon: 'Image', prompt: '我需要生成图片、设计海报或P图的AI工具' },
      { id: 'chat', label: '智能聊天', icon: 'MessageSquare', prompt: '我需要一个聪明的聊天机器人来回答问题或陪聊' },
      { id: 'video', label: '视频创作', icon: 'Video', prompt: '我需要能生成视频或剪辑视频的AI工具' },
      { id: 'code', label: '编程开发', icon: 'Code', prompt: '我需要辅助写代码或解释代码的AI工具' },
      { id: 'audio', label: '音频语音', icon: 'Headphones', prompt: '我需要语音转文字或文字转语音的AI工具' },
    ];
  } else {
    return [
      { id: 'writing', label: 'Writing', icon: 'PenTool', prompt: 'I need AI tools to help me write, polish articles, or write reports.' },
      { id: 'image', label: 'Images', icon: 'Image', prompt: 'I need AI tools to generate images, design posters, or edit photos.' },
      { id: 'chat', label: 'Chat Bots', icon: 'MessageSquare', prompt: 'I need a smart chatbot to answer questions or chat with me.' },
      { id: 'video', label: 'Video', icon: 'Video', prompt: 'I need AI tools to generate or edit videos.' },
      { id: 'code', label: 'Coding', icon: 'Code', prompt: 'I need AI tools to help write or explain code.' },
      { id: 'audio', label: 'Audio', icon: 'Headphones', prompt: 'I need AI tools for speech-to-text or text-to-speech.' },
    ];
  }
};

const IconMap: Record<string, React.FC<any>> = {
  PenTool, Image, Video, Code, MessageSquare, Headphones
};

export const QuickCategories: React.FC<QuickCategoriesProps> = ({ onSelect, disabled, lang }) => {
  const categories = getCategories(lang);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <p className="text-center text-slate-500 mb-4 text-sm font-medium">
        {lang === 'zh' ? '不知道怎么问？试试点击下方分类：' : 'Don\'t know what to ask? Try a category below:'}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const Icon = IconMap[cat.icon];
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.prompt)}
              disabled={disabled}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white transition-colors text-slate-600 group-hover:text-indigo-600">
                <Icon size={20} />
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
