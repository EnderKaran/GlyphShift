import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import SettingsPanel from './components/SettingsPanel';
import OutputCard from './components/OutputCard';
import HistoryModal from './components/HistoryModal';
import { TRANSLATIONS } from './utils/translations';
import type { Language, ConversionSettings, FontStyle, HistoryItem } from './utils/types';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  
  // --- 1. DİL YÖNETİMİ ---
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('glyphShift_lang');
    return (savedLang as Language) || 'TR';
  });

  useEffect(() => {
    localStorage.setItem('glyphShift_lang', language);
  }, [language]);

  const t = TRANSLATIONS[language];
  
  // --- 2. AYARLAR ---
  const [settings, setSettings] = useState<ConversionSettings>(() => {
    const savedSettings = localStorage.getItem('glyphShift_settings');
    return savedSettings ? JSON.parse(savedSettings) : {
      properNounsOnly: false,
      excludeAcronyms: true,
      excludeUrls: false
    };
  });

  useEffect(() => {
    localStorage.setItem('glyphShift_settings', JSON.stringify(settings));
  }, [settings]);

  // --- 3. GEÇMİŞ YÖNETİMİ ---
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('glyphShift_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Geçmiş okunamadı", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('glyphShift_history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (convertedText: string, label: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      text: convertedText,
      originalText: inputText,
      label: label,
      timestamp: Date.now()
    };

    setHistory(prev => {
      if (prev.length > 0 && prev[0].text === newItem.text) return prev;
      return [newItem, ...prev].slice(0, 20);
    });
  };

  const clearHistory = () => setHistory([]);

  // --- 4. TEMA YÖNETİMİ ---
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('glyphShift_theme');
    if (savedTheme) return savedTheme === 'dark';
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
      localStorage.setItem('glyphShift_theme', 'dark');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('glyphShift_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleSetting = (key: keyof ConversionSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const styles: FontStyle[] = [
    { key: 'cursive', label: 'Script', example: 'Script Style' },
    { key: 'bold', label: 'Bold', example: 'Bold Style' },
    { key: 'boldItalic', label: 'Bold Italic', example: 'Bold Italic' },
    { key: 'doubleStruck', label: 'Double Struck', example: 'Double Struck' },
    { key: 'gothic', label: 'Gothic', example: 'Gothic Style' },
    { key: 'monospace', label: 'Monospace', example: 'Monospace' },
    { key: 'bubble', label: 'Bubble', example: 'Bubble Text' },
    { key: 'square', label: 'Square', example: 'Square Text' },
    { key: 'smallCaps', label: 'Small Caps', example: 'Small Caps' },
    { key: 'upsideDown', label: 'Upside Down', example: 'uʍop ǝpısdn' },
    { key: 'emojiMix', label: 'Emoji Mix', example: 'E✨m🔥o👻j👽i' },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 ease-in-out bg-slate-50 dark:bg-slate-950 pb-20 font-sans relative selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
      
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-200/30 dark:bg-purple-900/20 blur-[100px] transition-colors duration-500"></div>
        <div className="absolute top-[20%] right-[0%] w-[30%] h-[30%] rounded-full bg-blue-200/30 dark:bg-blue-900/20 blur-[100px] transition-colors duration-500"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-indigo-200/30 dark:bg-indigo-900/20 blur-[100px] transition-colors duration-500"></div>
      </div>

      <Header 
        currentLang={language} 
        setLang={setLanguage} 
        onHistoryClick={() => setIsHistoryOpen(true)}
        t={t}
      />

      <HistoryModal 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={clearHistory}
        t={t}
      />

      <main className="max-w-4xl mx-auto px-4 pt-28 sm:pt-36 relative z-10">
        
        <section className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-900 dark:from-white dark:via-blue-400 dark:to-indigo-400 animate-gradient-x transition-colors duration-300">
              {t.title}
            </span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            {t.subtitle}
          </p>
        </section>

        <TextInput 
          value={inputText}
          onChange={setInputText}
          onClear={() => setInputText('')}
          isSettingsOpen={isSettingsOpen}
          onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
          t={t}
        />

        {isSettingsOpen && (
          <SettingsPanel 
            settings={settings} 
            onToggle={toggleSetting} 
            t={t}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {styles.map((style) => (
            <OutputCard 
              key={style.key}
              fontKey={style.key}
              fontLabel={style.label}
              example={style.example}
              inputText={inputText}
              settings={settings}
              t={t}
              onCopySuccess={addToHistory}
            />
          ))}
        </div>

      </main>
    </div>
  );
}

export default App;