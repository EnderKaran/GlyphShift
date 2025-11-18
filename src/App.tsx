import React, { useState } from 'react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import SettingsPanel from './components/SettingsPanel';

// Stil nesnesi için Tip Tanımlaması (Type Definition)
interface FontStyle {
  key: string;
  label: string;
  example: string;
}

const App: React.FC = () => {
  // State tanımlarında tip çıkarımı (inference) otomatik yapılır, 
  // ama açıkça belirtmek öğrenme aşamasında iyidir.
  const [inputText, setInputText] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Stil listesi (Artık FontStyle tipine uymak zorunda)
  const styles: FontStyle[] = [
    { key: 'cursive', label: 'Cursive', example: 'Cursive Style' },
    { key: 'bold', label: 'Bold Seriffed', example: 'Bold Style' },
    { key: 'doubleStruck', label: 'Double Struck', example: 'Double Struck' },
    { key: 'monospace', label: 'Monospace', example: 'Monospace' },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      <Header />

      <main className="max-w-3xl mx-auto px-4 pt-24 sm:pt-32">
        
        {/* Başlık ve Açıklama Bölümü */}
        <section className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Unicode Text Converter
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Transform your text into unique Unicode styles.
          </p>
        </section>

        {/* Giriş Alanı Bileşeni */}
        <TextInput 
          value={inputText}
          onChange={setInputText}
          onClear={() => setInputText('')}
          isSettingsOpen={isSettingsOpen}
          onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
        />

        {/* Ayarlar Paneli (Toggle) */}
        {isSettingsOpen && <SettingsPanel />}

        {/* Dinamik Çıktı Kartları */}
        

      </main>
    </div>
  );
}

export default App;