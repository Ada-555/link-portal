# 🔗 Kay's Link-Portal

> Digital Business Card · Built with React + Tailwind CSS + ❤️

**Live:** https://ada-555.github.io/link-portal

---

## ✨ Features

### 🎨 Theme Switcher (5 Themes)
- **Glassmorphism** — Frosted cards, mesh gradients, purple/indigo tones
- **Neo-Brutalism** — 4px black borders, yellow cards, punchy pink (#FF0055) accents
- **Minimalist Zen** — Soft stone grays, wide letter-spacing, fade-in transitions
- **Retro Terminal** — CRT scanlines, green-on-black (#00FF00), flicker animation
- **Modern Dark** — Slate-900 backgrounds, indigo glows (default for dark/scheduler)

### 🟢 Dynamic Status Badge
- Live "Current Status" bubble pulled from `data.json`
- Animated green pulse indicator

### 📱 PWA Support
- Installable on mobile (Add to Home Screen)
- Offline-capable via Service Worker
- Custom manifest with icons

### ⏰ IP-Based Local Time
- Real-time clock synced to `Europe/Dublin` timezone
- Updates every second with date display

### 📲 Messenger Bridge
- **Email** — Opens `mailto:` with pre-filled subject & body
- **WhatsApp** — Opens `wa.me` with pre-filled intro message

### 🌙 Dark/Light Scheduler
- Auto-defaults to **Modern Dark** theme if:
  - User's system preference is dark mode
  - OR it's after 8:00 PM in the profile's timezone

### 📎 QR Code Modal
- One-click popup QR code of the live site URL
- High error correction (H level) for reliable scanning

### 📇 vCard Export
- Generates and downloads a `.vcf` vCard file
- Contains name, bio, email, phone (WhatsApp), and website

### 🐾 Easter Egg — Claw Mode
- Press **"C"** on your keyboard
- All icons transform into animated claw marks for 2 seconds

---

## 🛠 Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS 3**
- **Lucide React** (icons)
- **qrcode.react** (QR generation)
- **PWA** (manifest.json + service worker)

---

## 📁 Project Structure

```
link-portal/
├── public/
│   ├── favicon.svg
│   ├── manifest.json
│   └── sw.js
├── src/
│   ├── components/
│   │   ├── LocalTime.jsx
│   │   ├── QRCodeModal.jsx
│   │   ├── StatusBadge.jsx
│   │   ├── ThemeSwitcher.jsx
│   │   └── VCardExport.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── data.json          ← Edit this to update profile
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🚀 Deploy

Deployed to **GitHub Pages** at: https://ada-555.github.io/link-portal

Built and pushed via GitHub.

---

_Built for Kay_ 🐾
