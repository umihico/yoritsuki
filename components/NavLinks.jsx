'use client';

import { useEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from '../lib/content';
import T from './T';

// セクションid → ハイライトするナビhref の対応（homeのみ）
const SPY_SECTIONS = [
  { id: 'capabilities', href: '/#capabilities' },
  { id: 'company', href: '/#company' },
  { id: 'contact', href: '/#contact' },
  // トップの公告セクション到達時はヘッダーの「公告」（専用ページリンク）を点灯させる
  { id: 'notice', href: '/publicnotice/' },
];

// ヘッダーのスライダー型ナビ。現在地の下線バーがリンク間をスライドする。
export default function NavLinks() {
  const [active, setActive] = useState(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const navRef = useRef(null);
  // アンカークリック直後は「クリックした場所」を現在地として優先する。
  // （#contact クリック時、ページ末尾到達の救済ルールが下の公告を点灯させてしまうため）
  // ユーザーが手動操作（wheel/touch/キー/クリック）した時点で解除して幾何判定に戻す。
  const intentRef = useRef(null);

  // スクロール位置から現在地を決める
  useEffect(() => {
    // 公告専用ページではナビの「公告」を点灯させる
    if (window.location.pathname.startsWith('/publicnotice')) {
      setActive('/publicnotice/');
      return;
    }

    const els = SPY_SECTIONS
      .map((s) => ({ ...s, el: document.getElementById(s.id) }))
      .filter((s) => s.el);
    if (!els.length) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      if (intentRef.current) {
        setActive(intentRef.current);
        return;
      }
      // ビューポート上から40%の位置を「現在地」の基準線とする
      const line = window.innerHeight * 0.4;
      let current = null;
      for (const s of els) {
        if (s.el.getBoundingClientRect().top <= line) current = s.href;
      }
      // 最下部のセクションは基準線まで上がりきれないことがあるため、
      // ページ末尾に達したら最後のセクションを現在地とする
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        current = els[els.length - 1].href;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    // ハッシュ（アンカー）遷移で意図をロック
    const applyHashIntent = () => {
      const href = '/' + window.location.hash;
      if (SPY_SECTIONS.some((s) => s.href === href)) {
        intentRef.current = href;
        setActive(href);
      }
    };
    // 手動操作で意図ロックを解除（navクリックは mousedown→hashchange の順なので上書きされない）
    const clearIntent = () => {
      if (!intentRef.current) return;
      intentRef.current = null;
      onScroll();
    };

    if (window.location.hash) applyHashIntent();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('hashchange', applyHashIntent);
    window.addEventListener('wheel', clearIntent, { passive: true });
    window.addEventListener('touchstart', clearIntent, { passive: true });
    window.addEventListener('keydown', clearIntent);
    window.addEventListener('mousedown', clearIntent);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('hashchange', applyHashIntent);
      window.removeEventListener('wheel', clearIntent);
      window.removeEventListener('touchstart', clearIntent);
      window.removeEventListener('keydown', clearIntent);
      window.removeEventListener('mousedown', clearIntent);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // アクティブなリンクの位置・幅にバーを合わせる（言語切替・リサイズでも追随）
  useEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      if (!nav) return;
      const link = nav.querySelector('a.active');
      if (!link) {
        setIndicator((i) => ({ ...i, visible: false }));
        return;
      }
      setIndicator({ left: link.offsetLeft, width: link.offsetWidth, visible: true });
    };

    measure();
    window.addEventListener('resize', measure);
    // 言語切替で文字幅が変わるため、<html data-lang> の変化を監視して再計測
    const mo = new MutationObserver(measure);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
    return () => {
      window.removeEventListener('resize', measure);
      mo.disconnect();
    };
  }, [active]);

  return (
    <nav className="site-nav" ref={navRef} aria-label="グローバルナビゲーション">
      <span
        className="nav-indicator"
        aria-hidden="true"
        style={{
          left: indicator.left,
          width: indicator.width,
          opacity: indicator.visible ? 1 : 0,
        }}
      />
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={active === item.href ? 'active' : undefined}
          aria-current={active === item.href ? 'true' : undefined}
        >
          <T ja={item.ja} en={item.en} />
        </a>
      ))}
    </nav>
  );
}
