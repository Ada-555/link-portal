import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { QRCodeModal } from './components/QRCodeModal';
import { VCardExport } from './components/VCardExport';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { LocalTime } from './components/LocalTime';
import { StatusBadge } from './components/StatusBadge';
import data from './data.json';
import {
  Globe, Mail, MessageCircle, ExternalLink, QrCode, Download,
  Sparkles, Zap, Leaf, Monitor, MonitorDot, Menu, X
} from 'lucide-react';

const iconMap = {
  github: Globe,
  x: X,
  mail: Mail,
  'message-circle': MessageCircle,
};

const ClawIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M12 2C8.5 2 6 5 6 8c0 1.5.5 2.5 1 3.5.5 1 1 2 1 3 0 1.5-1 3-3 3-1 0-2-.5-2.5-1-.5-.5-1-1-1-1.5 0-.5.5-1 1-1 .5 0 .5.5.5.5s-.5-1-.5-1.5c0-1 .5-2 1.5-2.5C5 10.5 7 9 9 9c1 0 2 .5 2.5 1.5.3.7.5 1.5.5 2.5 0 1-.5 2-1 2.5-.5.5-.5 1-.5 1.5s.5 1 1 1h3c1.5 0 3-1.5 3-3 0-1-.5-2-1-3-.5-1-1-2-1-3.5C17 5 14.5 2 12 2z"/>
  </svg>
);

function AppContent() {
  const { theme, themes, currentTheme, setCurrentTheme, isClawMode } = useTheme();
  const [showQR, setShowQR] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme.class;
    document.body.className = `${theme.styles.bg} min-h-screen transition-colors duration-500`;
  }, [theme]);

  const getMessengerLink = (link) => {
    if (link.icon === 'mail') {
      return `mailto:${link.url.replace('mailto:', '')}?subject=Hi%20Kay&body=Hi%20Kay%2C%20I%20found%20your%20Link-Portal%20and%20wanted%20to%20reach%20out!`;
    }
    if (link.icon === 'message-circle') {
      return `${link.url}?text=Hi%20Kay!%20Found%20your%20Link-Portal%20—%20let's%20connect!`;
    }
    return link.url;
  };

  return (
    <div className={`min-h-screen ${theme.styles.text} transition-colors duration-500 ${currentTheme === 'terminal' ? 'scanlines' : ''}`}>
      {/* CRT Scanlines for Terminal */}
      {currentTheme === 'terminal' && (
        <style>{`
          .scanlines::before {
            content: '';
            position: fixed;
            inset: 0;
            background: repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15),
              rgba(0, 0, 0, 0.15) 1px,
              transparent 1px,
              transparent 2px
            );
            pointer-events: none;
            z-index: 100;
            animation: flicker 0.15s infinite;
          }
          @keyframes flicker {
            0%, 100% { opacity: 0.97; }
            50% { opacity: 1; }
          }
        `}</style>
      )}

      {/* Mobile Menu */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`p-2 rounded-lg ${theme.styles.card} ${theme.styles.text}`}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {menuOpen && (
          <div className={`absolute right-0 mt-2 p-2 rounded-lg ${theme.styles.card} min-w-[160px]`}>
            <ThemeSwitcher />
          </div>
        )}
      </div>

      {/* Desktop Theme Switcher */}
      <div className="hidden md:block fixed top-4 right-4 z-50">
        <div className={`p-3 rounded-xl ${theme.styles.card}`}>
          <ThemeSwitcher />
        </div>
      </div>

      {/* Claw Mode Overlay */}
      {isClawMode && (
        <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center">
          <div className="text-center animate-bounce">
            <ClawIcon />
            <p className="text-2xl font-bold mt-2">CLAW MODE!</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className={`w-full max-w-md ${theme.styles.card} rounded-2xl p-8 transition-all duration-500`}>

          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${
              currentTheme === 'glass' ? 'from-purple-400 to-indigo-600' :
              currentTheme === 'brutal' ? 'from-yellow-300 to-pink-500' :
              currentTheme === 'zen' ? 'from-stone-300 to-stone-500' :
              currentTheme === 'terminal' ? 'from-green-700 to-green-900' :
              'from-indigo-500 to-purple-600'
            } flex items-center justify-center text-4xl font-bold shadow-lg`}>
              {isClawMode ? <ClawIcon /> : data.name[0]}
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${currentTheme === 'brutal' ? 'font-mono' : ''}`} style={{ letterSpacing: currentTheme === 'zen' ? '0.1em' : 'normal' }}>
              {data.name}
            </h1>
            <p className={`${theme.styles.textMuted} ${currentTheme === 'terminal' ? 'font-mono' : ''}`}>
              {data.bio}
            </p>
            <div className="mt-3">
              <StatusBadge />
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3 mb-8">
            {data.links.map((link) => {
              const IconComponent = iconMap[link.icon] || ExternalLink;
              return (
                <a
                  key={link.label}
                  href={getMessengerLink(link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-xl ${theme.styles.button} ${currentTheme === 'zen' ? 'rounded-full' : ''}`}
                >
                  <span className="flex items-center gap-3">
                    <span className={isClawMode ? 'animate-ping' : ''}>
                      {isClawMode ? <ClawIcon /> : <IconComponent size={20} />}
                    </span>
                    <span className={currentTheme === 'brutal' ? 'font-mono font-bold' : ''}>
                      {link.label}
                    </span>
                  </span>
                  {link.icon !== 'mail' && link.icon !== 'message-circle' && (
                    <ExternalLink size={16} className={theme.styles.textMuted} />
                  )}
                </a>
              );
            })}
          </div>

          {/* Utility Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowQR(true)}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl ${theme.styles.button} ${currentTheme === 'brutal' ? 'font-mono font-bold' : ''} text-sm`}
            >
              <QrCode size={18} />
              QR Code
            </button>
            <VCardExport />
          </div>

          {/* Local Time */}
          <div className={`mt-6 text-center ${currentTheme === 'terminal' ? 'font-mono' : ''}`}>
            <LocalTime />
          </div>

        </div>

        {/* Footer */}
        <p className={`mt-8 text-sm ${theme.styles.textMuted}`}>
          {currentTheme === 'terminal' ? '> link-portal v1.0' : '© 2024 Kay'}
        </p>
      </div>

      {/* QR Modal */}
      {showQR && <QRCodeModal onClose={() => setShowQR(false)} />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
