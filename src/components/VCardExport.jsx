import { useTheme } from '../context/ThemeContext';
import data from '../data.json';
import { Download } from 'lucide-react';

export function VCardExport() {
  const { theme } = useTheme();

  const generateVCard = () => {
    const email = data.links.find(l => l.icon === 'mail')?.url.replace('mailto:', '') || '';
    const url = data.links.find(l => l.icon === 'github')?.url || '';
    const phone = data.links.find(l => l.icon === 'message-circle')?.url.replace('wa.me', '') || '';

    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${data.name}`,
      `N:${data.name};;;`,
      `TITLE:${data.bio}`,
      email ? `EMAIL:${email}` : '',
      phone ? `TEL;TYPE=WhatsApp:+${phone}` : '',
      url ? `URL:${url}` : '',
      `NOTE:${data.status}`,
      'END:VCARD'
    ].filter(Boolean).join('\r\n');

    return vcard;
  };

  const handleExport = () => {
    const vcard = generateVCard();
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, '-').toLowerCase()}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className={`flex items-center justify-center gap-2 p-3 rounded-xl ${theme.styles.button} ${theme.styles.text} w-full text-sm ${theme.styles.textMuted.includes('stone') ? 'font-mono' : ''}`}
    >
      <Download size={18} />
      vCard
    </button>
  );
}
