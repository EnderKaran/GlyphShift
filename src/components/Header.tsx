import React from 'react';
import type { Language } from '../utils/types';

interface HeaderProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ currentLang, setLang }) => {
  const languages: Language[] = ['EN', 'TR', 'FR', 'ES', 'DE'];

  return (
    <header className="fixed top-0 left-0 right-0 p-4 border-b border-gray-200/50 bg-white/70 backdrop-blur-md z-50 transition-all duration-300">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
            G
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors">
            GlyphShift
          </span>
        </div>
        <nav className="hidden sm:flex text-sm text-gray-500 space-x-1 font-medium">
          {languages.map(lang => (
            <button 
              key={lang}
              onClick={() => setLang(lang)}
              className={`px-3 py-1 rounded-full transition-all duration-200 
                ${currentLang === lang 
                  ? 'bg-blue-100 text-blue-700 font-bold' 
                  : 'hover:bg-gray-100 hover:text-blue-600'}`}
            >
              {lang}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;