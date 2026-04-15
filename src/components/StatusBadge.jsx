import { useTheme } from '../context/ThemeContext';
import data from '../data.json';

export function StatusBadge() {
  const { theme } = useTheme();

  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${theme.styles.card}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span className={theme.styles.text}>{data.status}</span>
    </span>
  );
}
