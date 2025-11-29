import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { transformText } from '../utils/textConverter';
import type { ConversionSettings } from '../utils/types';

interface OutputCardProps {
  inputText: string;
  fontKey: string;
  fontLabel: string;
  example: string;
  settings: ConversionSettings;
  t: any;
  onCopySuccess: (text: string, label: string) => void;
}

const OutputCard: React.FC<OutputCardProps> = ({ 
  inputText, fontKey, fontLabel, example, settings, t, onCopySuccess
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
        if (inputText.trim().length > 0) {
          onCopySuccess(finalText, fontLabel);
        }
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Kopyalama hatası:', err));
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 
                    hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-500/30 hover:-translate-y-1 
                    transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex justify-between items-start mb-3 relative z-10">
        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {fontLabel}
        </h3>
      </div>

      <div className="flex-grow min-h-[3rem] relative z-10">
        <p className="text-xl text-gray-800 dark:text-gray-100 break-words leading-relaxed font-medium selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
          {finalText}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-50 dark:border-slate-700 flex justify-end relative z-10">
        <button 
          onClick={handleCopy}
          className={`flex items-center text-sm font-bold px-4 py-2 rounded-xl transition-all duration-200 transform active:scale-95
            ${copied 
              ? 'bg-green-500 text-white shadow-lg shadow-green-200 dark:shadow-none ring-2 ring-green-100 dark:ring-green-900' 
              : 'bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/50'}`}
        >
          {copied ? (
            <> <Check className="mr-1.5 w-4 h-4" /> {t.copied} </>
          ) : (
            <> <Copy className="mr-1.5 w-4 h-4" /> {t.copy} </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OutputCard;