'use client';

import { useEffect } from 'react';

// reveal-on-scroll。初期状態は常に表示（no-JSセーフ）。
// JSが動く環境でのみ、ビューポート外の要素を隠してスクロールで表示する。
export default function RevealInit() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );

    const targets = document.querySelectorAll('[data-reveal]');
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('reveal-pending');
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);

  return null;
}
