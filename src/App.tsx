import React, { useState } from 'react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import SettingsPanel from './components/SettingsPanel';
import OutputCard from './components/OutputCard';

export interface ConversionSettings {
  properNounsOnly: boolean;
  excludeAcronyms: boolean;
  excludeUrls: boolean;
}

interface FontStyle {
  key: string;
  label: string;
  example: string;
}

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const [settings, setSettings] = useState<ConversionSettings>({
    properNounsOnly: false, // Başlangıçta kapalı olsun
    excludeAcronyms: true,
    excludeUrls: false
  });

  const toggleSetting = (key: keyof ConversionSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const styles: FontStyle[] = [
    { key: 'cursive', label: 'Cursive', example: 'Cursive Style' },
    { key: 'bold', label: 'Bold Seriffed', example: 'Bold Style' },
    { key: 'doubleStruck', label: 'Double Struck', example: 'Double Struck' },
    { key: 'monospace', label: 'Monospace', example: 'Monospace' },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 font-sans">
      <Header />

      <main className="max-w-3xl mx-auto px-4 pt-24 sm:pt-32">
        
        {/* Başlık Alanı */}
        <section className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Unicode Text Converter
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Transform your text into unique Unicode styles for social media, bios, and beyond.
          </p>
        </section>

        {/* Giriş Input Bileşeni */}
        <TextInput 
          value={inputText}
          onChange={setInputText}
          onClear={() => setInputText('')}
          isSettingsOpen={isSettingsOpen}
          onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
        />

        {/* Ayarlar Paneli */}
        {isSettingsOpen && (
          <SettingsPanel 
            settings={settings} 
            onToggle={toggleSetting} 
          />
        )}

        {/* Çıktı Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {styles.map((style) => (
            <OutputCard 
              key={style.key}
              fontKey={style.key}
              fontLabel={style.label}
              example={style.example}
              inputText={inputText}
              settings={settings} 
            />
          ))}
        </div>

      </main>
    </div>
  );
}

export default App;