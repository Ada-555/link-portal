import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import data from '../data.json';
import { Clock } from 'lucide-react';

export function LocalTime() {
  const { theme } = useTheme();
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const tz = data.timezone || 'Europe/Dublin';
        const now = new Date();
        const options = {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
        const dateOptions = {
          timeZone: tz,
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        };
        setTime(now.toLocaleTimeString('en-IE', options));
        setDate(now.toLocaleDateString('en-IE', dateOptions));
      } catch {
        const now = new Date();
        setTime(now.toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
        setDate(now.toLocaleDateString('en-IE', { weekday: 'short', month: 'short', day: 'numeric' }));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`p-3 rounded-lg ${theme.styles.card} inline-block`}>
      <div className="flex items-center gap-2 justify-center">
        <Clock size={16} className={theme.styles.textMuted} />
        <span className={theme.styles.textMuted}>My Local Time</span>
      </div>
      <p className={`text-2xl font-bold mt-1 ${theme.styles.text} ${theme.styles.textMuted.includes('stone') ? 'font-mono' : ''}`}>
        {time}
      </p>
      <p className={`text-xs ${theme.styles.textMuted}`}>{date} · {data.timezone}</p>
    </div>
  );
}
