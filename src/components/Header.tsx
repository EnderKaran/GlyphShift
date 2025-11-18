
const Header = () => {
  const languages = ['EN', 'TR', 'FR', 'ES', 'DE', 'CN'];

  return (
    <header className="fixed top-0 left-0 right-0 p-4 border-b border-gray-100 bg-white z-20">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Logo Alanı */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            G
          </div>
          <span className="text-xl font-bold text-gray-800">GlyphShift</span>
        </div>

        {/* Dil Linkleri */}
        <nav className="hidden sm:flex text-sm text-gray-500 space-x-4 font-medium">
          {languages.map(lang => (
            <button 
              key={lang} 
              className="hover:text-blue-600 transition-colors"
            >
              {lang}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;