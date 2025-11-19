import React from 'react';
import { Zap } from 'lucide-react';
import type { ConversionSettings } from '../utils/types';

interface SettingsPanelProps {
  settings: ConversionSettings;
  onToggle: (key: keyof ConversionSettings) => void;
  t: any; // Çeviri nesnesi
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onToggle, t }) => {
  const settingItems: { id: keyof ConversionSettings; label: string }[] = [
    { id: 'properNounsOnly', label: t.settingProper },
    { id: 'excludeAcronyms', label: t.settingAcronyms },
    { id: 'excludeUrls', label: t.settingUrls },
  ];

  return (
    <div className="bg-white p-6 mb-6 rounded-xl shadow-lg border border-gray-100 animate-fade-in-down">
      <div className="flex items-center mb-4 pb-2 border-b border-gray-50">
        <span className="bg-blue-100 p-1.5 rounded-md text-blue-600 mr-3">
          <Zap className="w-5 h-5" />
        </span>
        <h2 className="text-lg font-semibold text-gray-800">
          {t.settingsTitle}
        </h2>
      </div>

      <div className="space-y-4">
        {settingItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onToggle(item.id)} 
            className="flex items-center justify-between group cursor-pointer select-none"
          >
            <span className="text-gray-600 group-hover:text-gray-900 transition-colors font-medium">
              {item.label}
            </span>
            <div 
              className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 cursor-pointer 
              ${settings[item.id] ? 'bg-gray-800' : 'bg-gray-300'}`}
            >
              <div 
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 
                ${settings[item.id] ? 'translate-x-6' : ''}`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPanel;