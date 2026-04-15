import { useTheme } from '../context/ThemeContext';
import { Sparkles, Zap, Leaf, Monitor, MonitorDot } from 'lucide-react';

const themeIcons = {
  glass: Sparkles,
  brutal: Zap,
  zen: Leaf,
  terminal: MonitorDot,
  modern: Monitor,
};

export function ThemeSwitcher() {
  const { currentTheme, setCurrentTheme, themes } = useTheme();

  return (
    <div className="flex gap-1.5">
      {Object.entries(themes).map(([key, t]) => {
        const Icon = themeIcons[key];
        const isActive = currentTheme === key;
        return (
          <button
            key={key}
            onClick={() => setCurrentTheme(key)}
            title={t.name}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isActive
                ? `${t.styles.button} ${t.styles.accent === '#a78bfa' ? 'ring-2 ring-purple-400' : ''}`
                : 'opacity-50 hover:opacity-100'
            }`}
            style={isActive && t.accent ? { backgroundColor: `${t.accent}40` } : {}}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
}
