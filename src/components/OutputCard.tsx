import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { transformText } from '../utils/textConverter';

export interface ConversionSettings {
  properNounsOnly: boolean;
  excludeAcronyms: boolean;
  excludeUrls: boolean;
}

interface OutputCardProps {
  inputText: string;
  fontKey: string;
  fontLabel: string;
  example: string;
  settings: ConversionSettings;
}

const OutputCard: React.FC<OutputCardProps> = ({ 
  inputText, 
  fontKey, 
  fontLabel, 
  example,
  settings 
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const finalText = inputText 
    ? transformText(inputText, fontKey, settings) 
    : transformText(example, fontKey, settings);

  const handleCopy = () => {
    if (!finalText) return;
    
    navigator.clipboard.writeText(finalText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Kopyalama hatası:', err));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-200 flex flex-col h-full group">
      
      {/* Başlık */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-blue-500 transition-colors">
          {fontLabel}
        </h3>
      </div>

      {/* Çıktı Metni */}
      <div className="flex-grow min-h-[3rem]">
        <p className="text-xl text-gray-800 break-words leading-relaxed font-medium">
          {finalText}
        </p>
      </div>

      {/* Kopyalama Butonu */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
        <button 
          onClick={handleCopy}
          className={`flex items-center text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200 
            ${copied 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-700 border border-transparent'}`}
        >
          {copied ? (
            <>
              <Check className="mr-1.5 w-4 h-4" /> Copied!
            </>
          ) : (
            <>
              <Copy className="mr-1.5 w-4 h-4" /> Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OutputCard;