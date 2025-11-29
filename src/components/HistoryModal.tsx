import React from 'react';
import { X, History, Trash2, Clock } from 'lucide-react';
import type { HistoryItem } from '../utils/types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClearHistory: () => void;
  t: any;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ 
  isOpen, onClose, history, onClearHistory, t 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Arka Plan Karartma */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Yan Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Başlık Alanı */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-800">
            <History className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold">{t.historyTitle}</h2>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            title={t.close}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Geçmiş Listesi */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-200">
          {history.length === 0 ? (
            <div className="text-center text-gray-400 py-20 flex flex-col items-center">
              <History className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-medium">{t.historyEmpty}</p>
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50/30 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-lg text-gray-800 font-medium break-words font-sans selection:bg-blue-200">
                  {item.text}
                </p>
                <div className="mt-2 pt-2 border-t border-gray-200/50 text-xs text-gray-400 truncate">
                  Orjinal: <span className="italic">{item.originalText}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Temizle Butonu */}
        {history.length > 0 && (
          <div className="pt-4 border-t border-gray-100 mt-4">
            <button 
              type="button"
              onClick={onClearHistory}
              className="w-full py-3 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium border border-transparent hover:border-red-100"
            >
              <Trash2 className="w-4 h-4" />
              {t.clearHistory}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;