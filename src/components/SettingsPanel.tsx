import { FiZap } from 'react-icons/fi'; // Sihirli değnek hissi için şimşek ikonu

const SettingsPanel = () => {
  // Şimdilik statik ayarlar listesi
  const settings = [
    { id: 1, label: 'Convert only Proper Nouns', active: true },
    { id: 2, label: 'Exclude all Capitalized Acronyms', active: true },
    { id: 3, label: 'Exclude URLs and Emails', active: false },
  ];

  return (
    <div className="bg-white p-6 mb-6 rounded-xl shadow-lg border border-gray-100 animate-fade-in-down">
      {/* Başlık */}
      <div className="flex items-center mb-4 pb-2 border-b border-gray-50">
        <span className="bg-blue-100 p-1.5 rounded-md text-blue-600 mr-3">
          <FiZap className="w-5 h-5" />
        </span>
        <h2 className="text-lg font-semibold text-gray-800">
          Smart Conversion Settings
        </h2>
      </div>

      {/* Toggle Listesi */}
      <div className="space-y-4">
        {settings.map((item) => (
          <div key={item.id} className="flex items-center justify-between group cursor-pointer">
            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
              {item.label}
            </span>
            
            {/* Custom Toggle Switch Tasarımı */}
            <div className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 cursor-pointer ${item.active ? 'bg-gray-800' : 'bg-gray-300'}`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${item.active ? 'translate-x-6' : ''}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPanel;