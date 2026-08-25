'use client';

import { useEffect, useState } from 'react';

const LANGS = [
  { code: 'ja', short: 'JA', label: '日本語' },
  { code: 'en', short: 'EN', label: 'English' },
];

function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  const scheme = document.querySelector('meta[name="color-scheme"]');
  if (scheme) scheme.setAttribute('content', theme);
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute('content', theme === 'light' ? '#f4f7fb' : '#0b1020');
}

function applyLang(lang) {
  const root = document.documentElement;
  root.setAttribute('data-lang', lang);
  root.setAttribute('lang', lang);
  const titled = document.querySelector('[data-title-ja]');
  if (titled) {
    document.title = lang === 'en' ? titled.getAttribute('data-title-en') : titled.getAttribute('data-title-ja');
  }
}

// 言語・テーマを1つに束ねたコントロールパネル。
// どちらのボタンも「押すと切り替わる先」を表示する（日本語中→🇺🇸、ダーク中→☀️）。
export default function Toggles() {
  const [lang, setLang] = useState('ja');

  // 初期表示時、ブートスクリプトが復元した属性に表示を同期する
  useEffect(() => {
    setLang(document.documentElement.getAttribute('data-lang') || 'ja');
  }, []);

  const onLang = (next) => {
    setLang(next);
    applyLang(next);
    try { localStorage.setItem('yoritsuki-lang', next); } catch {}
  };

  const onTheme = () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('yoritsuki-theme', next); } catch {}
  };

  // 切替先の言語（ボタンには「押すとこうなる」側の国旗を出す）
  const other = LANGS.find((l) => l.code !== lang) ?? LANGS[1];

  return (
    <div className="toggles" role="group" aria-label="言語・テーマ設定">
      <button
        type="button"
        className="lang-btn mono"
        aria-label={`Switch to ${other.label}`}
        onClick={() => onLang(other.code)}
      >
        {other.short}
      </button>
      <button type="button" className="theme-toggle" aria-label="テーマ切替 / Toggle theme" onClick={onTheme}>
        <span className="icon-moon" aria-hidden="true">🌙</span>
        <span className="icon-sun" aria-hidden="true">☀️</span>
      </button>
    </div>
  );
}
