import { QRCodeSVG } from 'qrcode.react';
import { useTheme } from '../context/ThemeContext';
import { X } from 'lucide-react';

export function QRCodeModal({ onClose }) {
  const { theme } = useTheme();
  const url = window.location.href;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div
        className={`relative ${theme.styles.card} rounded-2xl p-8 max-w-sm w-full text-center animate-in zoom-in-95 duration-200`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 p-1 rounded-full ${theme.styles.button}`}
        >
          <X size={18} />
        </button>
        <h3 className={`text-xl font-bold mb-4 ${theme.styles.text}`}>Scan to Connect</h3>
        <div className="bg-white p-4 rounded-xl inline-block">
          <QRCodeSVG value={url} size={200} level="H" />
        </div>
        <p className={`mt-4 text-sm ${theme.styles.textMuted}`}>
          {url}
        </p>
      </div>
    </div>
  );
}
