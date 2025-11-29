import React from 'react';
import { Moon, Sun } from 'lucide-react';
import useTheme from '../hooks/useTheme';

interface ThemeToggleProps {
  t: any;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ t }) => {
  const [theme, toggleTheme] = useTheme();

  const handleClick = () => {
    console.log('Button clicked, current theme:', theme);
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-yellow-300 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-full transition-all"
      title={t.themeBtn}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;