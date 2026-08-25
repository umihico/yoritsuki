import { CAPABILITIES } from '../lib/content';
import SectionHead from './SectionHead';
import T from './T';

const GLYPHS = {
  // 受託開発: 画面レイアウト
  web: (
    <svg viewBox="0 0 88 56" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2" y="4" width="46" height="34" rx="4" />
      <line x1="8" y1="14" x2="30" y2="14" />
      <line x1="8" y1="21" x2="24" y2="21" />
      <line x1="8" y1="28" x2="27" y2="28" />
      <rect x="54" y="4" width="32" height="15" rx="3" />
      <rect x="54" y="24" width="32" height="14" rx="3" />
    </svg>
  ),
  // 自社サービス開発: 芽吹き（新しいものが立ち上がる）
  product: (
    <svg viewBox="0 0 88 56" fill="none" stroke="currentColor" strokeWidth="1.4">
      <line x1="44" y1="50" x2="44" y2="26" />
      <path d="M44 34 C44 24, 34 20, 26 20 C26 30, 36 34, 44 34 Z" />
      <path d="M44 26 C44 16, 54 12, 62 12 C62 22, 52 26, 44 26 Z" />
      <line x1="30" y1="50" x2="58" y2="50" />
    </svg>
  ),
  // サーバー運用代行: サーバーラック
  server: (
    <svg viewBox="0 0 88 56" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="22" y="6" width="44" height="14" rx="3" />
      <rect x="22" y="24" width="44" height="14" rx="3" />
      <circle cx="30" cy="13" r="1.6" />
      <circle cx="30" cy="31" r="1.6" />
      <line x1="48" y1="13" x2="60" y2="13" />
      <line x1="48" y1="31" x2="60" y2="31" />
      <line x1="44" y1="38" x2="44" y2="46" />
      <line x1="32" y1="50" x2="56" y2="50" />
    </svg>
  ),
};

export default function Capabilities() {
  return (
    <section id="capabilities">
      <div className="wrap">
        <SectionHead ja="事業内容" en="Capabilities" />
        <div className="cards" data-reveal>
          {CAPABILITIES.map((card) => (
            <div key={card.title.ja} className="card">
              <div className="glyph" aria-hidden="true">{GLYPHS[card.glyph]}</div>
              <h3><T {...card.title} /></h3>
              <p><T {...card.body} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
