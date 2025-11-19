import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (text: string) => void;
  onToggleSettings: () => void;
  isSettingsOpen: boolean;
  onClear: () => void;
  t: any; // Çeviri nesnesi
}

const TextInput: React.FC<TextInputProps> = ({ 
  value, 
  onChange, 
  onToggleSettings, 
  isSettingsOpen, 
  onClear,
  t 
}) => {
  return (
    <div className="relative mb-4 group">
      <textarea
        className="w-full p-5 pr-24 h-36 text-lg border border-gray-200 rounded-xl shadow-sm resize-none 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   bg-white text-gray-700 placeholder-gray-400 transition-all duration-200"
        placeholder={t.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      
      <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-white/80 backdrop-blur-sm p-1 rounded-lg border border-gray-100 shadow-sm">
        {value && (
          <button 
            onClick={onClear}
            className="text-gray-400 hover:text-red-500 p-1.5 rounded-md transition-colors"
            title={t.clear}
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={onToggleSettings}
          className={`p-1.5 rounded-md transition-all duration-200 flex items-center gap-2 font-medium text-sm
            ${isSettingsOpen 
              ? 'bg-gray-800 text-white shadow-md' 
              : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}
          title={t.settingsBtn}
        >
          <Sparkles className={`w-5 h-5 ${isSettingsOpen ? 'text-yellow-300 fill-current' : ''}`} />
          {isSettingsOpen && <span className="pr-1">{t.settingsBtn}</span>}
        </button>
      </div>
    </div>
  );
};

export default TextInput;