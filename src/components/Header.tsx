import React from 'react';
import { History } from 'lucide-react';
import type { Language } from '../utils/types';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  onHistoryClick: () => void;
  t: any;
}

const Header: React.FC<HeaderProps> = ({ 
  currentLang, setLang, onHistoryClick, t 
}) => {
  const languages: Language[] = ['EN', 'TR', 'FR', 'ES', 'DE'];

  return (
    <header className="fixed top-0 left-0 right-0 p-4 border-b border-gray-200/50 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md z-50 transition-colors duration-300">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
            G
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            GlyphShift
          </span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle t={t} />

          <button 
            onClick={onHistoryClick}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-full transition-all"
            title={t.historyBtn}
          >
            <History className="w-5 h-5" />
          </button>

          <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

          <nav className="hidden sm:flex text-sm text-gray-500 dark:text-gray-400 space-x-1 font-medium">
            {languages.map(lang => (
              <button 
                key={lang}
                onClick={() => setLang(lang)}
                className={`px-3 py-1 rounded-full transition-all duration-200 
                  ${currentLang === lang 
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold' 
                    : 'hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'}`}
              >
                {lang}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;