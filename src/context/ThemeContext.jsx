import { createContext, useContext, useState, useEffect } from 'react';

const themes = {
  glass: {
    name: 'Glassmorphism',
    class: 'theme-glass',
    styles: {
      bg: 'bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900',
      card: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl',
      text: 'text-white',
      textMuted: 'text-white/60',
      button: 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-105',
      accent: '#a78bfa',
    }
  },
  brutal: {
    name: 'Neo-Brutalism',
    class: 'theme-brutal',
    styles: {
      bg: 'bg-white',
      card: 'bg-yellow-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
      text: 'text-black',
      textMuted: 'text-black/60',
      button: 'bg-pink-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150',
      accent: '#FF0055',
    }
  },
  zen: {
    name: 'Minimalist Zen',
    class: 'theme-zen',
    styles: {
      bg: 'bg-stone-100',
      card: 'bg-white border border-stone-200 shadow-sm',
      text: 'text-stone-800',
      textMuted: 'text-stone-400',
      button: 'bg-stone-200 hover:bg-stone-300 text-stone-700 transition-all duration-500 ease-out hover:shadow-lg',
      accent: '#78716c',
    }
  },
  terminal: {
    name: 'Retro Terminal',
    class: 'theme-terminal',
    styles: {
      bg: 'bg-black',
      card: 'bg-black border-2 border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.3)]',
      text: 'text-green-400',
      textMuted: 'text-green-600',
      button: 'bg-green-900/50 border-2 border-green-500 text-green-400 hover:bg-green-800 hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] transition-all duration-200',
      accent: '#00FF00',
    }
  },
  modern: {
    name: 'Modern Dark',
    class: 'theme-modern',
    styles: {
      bg: 'bg-slate-900',
      card: 'bg-slate-800/80 border border-slate-700 shadow-lg shadow-indigo-500/10',
      text: 'text-white',
      textMuted: 'text-slate-400',
      button: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/50 hover:scale-105',
      accent: '#6366f1',
    }
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('modern');
  const [isClawMode, setIsClawMode] = useState(false);

  useEffect(() => {
    // Dark/Light Scheduler - check system preference and time
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const now = new Date();
    const hour = now.getHours();
    const isAfter8PM = hour >= 20;

    if (prefersDark || isAfter8PM) {
      setCurrentTheme('modern');
    }

    // Keyboard Easter Egg - press "C" for Claw Mode
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setIsClawMode(true);
        setTimeout(() => setIsClawMode(false), 2000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, theme, themes, isClawMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export { themes };
