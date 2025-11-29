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
      <div 
        className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl p-6 flex flex-col transition-all duration-300">
        
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
          <div className="flex items-center gap-2 text-gray-800 dark:text-white transition-colors duration-300">
            <History className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
            <h2 className="text-xl font-bold">{t.historyTitle}</h2>
          </div>
          <button 
            type="button"
            onClick={onClose}
            title={t.close}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors duration-200 text-gray-500 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
          {history.length === 0 ? (
            <div className="text-center text-gray-400 dark:text-gray-500 py-20 flex flex-col items-center transition-colors duration-300">
              <History className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-medium">{t.historyEmpty}</p>
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-slate-700/50 transition-all duration-200 group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors duration-300">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1 transition-colors duration-300">
                    <Clock className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-lg text-gray-800 dark:text-gray-200 font-medium break-words font-sans selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-300">
                  {item.text}
                </p>
                <div className="mt-2 pt-2 border-t border-gray-200/50 dark:border-slate-700 text-xs text-gray-400 dark:text-gray-500 truncate transition-colors duration-300">
                  Orjinal: <span className="italic">{item.originalText}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {history.length > 0 && (
          <div className="pt-4 border-t border-gray-100 dark:border-slate-800 mt-4 transition-colors duration-300">
            <button 
              type="button"
              onClick={onClearHistory}
              className="w-full py-3 flex items-center justify-center gap-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200 font-medium border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
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