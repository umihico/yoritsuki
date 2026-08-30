export const dynamic = 'force-static';

// PWA/ホーム画面用マニフェスト。アイコンは brand/yoritsuki-logo.svg から生成した2行版。
export default function manifest() {
  return {
    name: '株式会社ヨリツキ',
    short_name: 'ヨリツキ',
    description:
      '株式会社ヨリツキは、Webサービス・モバイルアプリ・業務システムを、AIを駆使して一貫して担うソフトウェアエンジニアリング会社です。',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1020',
    theme_color: '#0b1020',
    lang: 'ja',
    icons: [
      { src: '/icon-192.png', type: 'image/png', sizes: '192x192', purpose: 'any' },
      { src: '/icon-512.png', type: 'image/png', sizes: '512x512', purpose: 'any' },
    ],
  };
}
