import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import SettingsPanel from './components/SettingsPanel';
import OutputCard from './components/OutputCard';
import HistoryModal from './components/HistoryModal'; //Modal importu
import { TRANSLATIONS } from './utils/translations';
import type { Language, ConversionSettings, FontStyle, HistoryItem } from './utils/types';

const App: React.FC = () => {
  // --- TEMEL STATE'LER ---
  const [inputText, setInputText] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('TR');
  
  // --- YENİ: GEÇMİŞ VE MODAL STATE'LERİ ---
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Dil seçimine göre çeviri paketini al
  const t = TRANSLATIONS[language];
  
  // Dönüştürme Ayarları
  const [settings, setSettings] = useState<ConversionSettings>({
    properNounsOnly: false,
    excludeAcronyms: true,
    excludeUrls: false
  });


  // 1. Uygulama ilk açıldığında localStorage'dan veriyi çek
  useEffect(() => {
    const savedHistory = localStorage.getItem('glyphShift_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Geçmiş verisi okunamadı:", e);
      }
    }
  }, []);

  // 2. 'history' state'i her değiştiğinde localStorage'ı güncelle
  useEffect(() => {
    localStorage.setItem('glyphShift_history', JSON.stringify(history));
  }, [history]);

  // 3. Yeni bir kopyalama işlemi yapıldığında listeye ekle
  const addToHistory = (convertedText: string, label: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(), // Benzersiz ID (zaman damgası)
      text: convertedText,
      originalText: inputText,
      label: label,
      timestamp: Date.now()
    };

    setHistory(prev => {
      // Eğer en son kopyalanan metin aynısıysa tekrar ekleme (Spam önleme)
      if (prev.length > 0 && prev[0].text === newItem.text) {
        return prev;
      }
      
      // Yeni öğeyi en başa ekle ve listeyi son 20 öğe ile sınırla (Performans)
      const newHistory = [newItem, ...prev].slice(0, 20);
      return newHistory;
    });
  };

  // 4. Geçmişi temizle
  const clearHistory = () => {
    setHistory([]);
  };

  // Ayarları değiştirme fonksiyonu
  const toggleSetting = (key: keyof ConversionSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Font Stilleri Listesi
  const styles: FontStyle[] = [
    { key: 'cursive', label: 'Script', example: 'Script Style' },
    { key: 'bold', label: 'Bold', example: 'Bold Style' },
    { key: 'boldItalic', label: 'Bold Italic', example: 'Bold Italic' },
    { key: 'doubleStruck', label: 'Double Struck', example: 'Double Struck' },
    { key: 'gothic', label: 'Gothic', example: 'Gothic Style' },
    { key: 'monospace', label: 'Monospace', example: 'Monospace' },
    { key: 'bubble', label: 'Bubble', example: 'Bubble Text' },
    { key: 'square', label: 'Square', example: 'Square Text' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans relative selection:bg-blue-200 selection:text-blue-900">
      
      {/* Dekoratif Arka Plan Elementleri (Mesh Gradient) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-200/30 blur-[100px]"></div>
        <div className="absolute top-[20%] right-[0%] w-[30%] h-[30%] rounded-full bg-blue-200/30 blur-[100px]"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-indigo-200/30 blur-[100px]"></div>
      </div>

      {/* Header */}
      <Header 
        currentLang={language} 
        setLang={setLanguage} 
        onHistoryClick={() => setIsHistoryOpen(true)} // Modalı açan olay
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
        
        {/* Başlık Alanı */}
        <section className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-900 animate-gradient-x">
              {t.title}
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </section>

        {/* Metin Giriş Alanı */}
        <TextInput 
          value={inputText}
          onChange={setInputText}
          onClear={() => setInputText('')}
          isSettingsOpen={isSettingsOpen}
          onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
          t={t}
        />

        {/* Ayarlar Paneli (Sadece açıkken görünür) */}
        {isSettingsOpen && (
          <SettingsPanel 
            settings={settings} 
            onToggle={toggleSetting} 
            t={t}
          />
        )}

        {/* Çıktı Kartları Listesi */}
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