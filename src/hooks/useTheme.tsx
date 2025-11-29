import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark'; 

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (document.documentElement.classList.contains('dark')) {
      return 'dark';
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    console.log('useEffect running, theme:', theme);
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      console.log('Added dark class');
    } else {
      root.classList.remove('dark');
      console.log('Removed dark class');
    }
    
    console.log('Final classes:', root.classList.toString());
    console.log('Has dark:', root.classList.contains('dark'));
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return [theme, toggleTheme] as const;
}