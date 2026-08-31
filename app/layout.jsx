import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RevealInit from '../components/RevealInit';
import { SITE_URL } from '../lib/site';

const TITLE = '株式会社ヨリツキ | Yoritsuki, Inc.';
const DESCRIPTION =
  '株式会社ヨリツキは、Web・アプリ・業務システムの企画から運用まで一気通貫で手がける開発会社です。';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  applicationName: '株式会社ヨリツキ',
  appleWebApp: { capable: true, title: '株式会社ヨリツキ', statusBarStyle: 'black-translucent' },
  // モバイルOSによる住所・電話・メールの自動リンクを抑止（住所はJSXで明示リンクのみ）
  formatDetection: { telephone: false, date: false, address: false, email: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    siteName: '株式会社ヨリツキ',
    images: [{ url: '/ogp.png', width: 1200, height: 630, alt: 'ヨリツキ' }],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/ogp.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport = {
  themeColor: '#0b1020',
  colorScheme: 'dark',
};

// 指名検索時のナレッジパネル形成用の組織情報
const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '株式会社ヨリツキ',
  alternateName: 'Yoritsuki, Inc.',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon-512.png`,
  foundingDate: '2026-08',
  founder: { '@type': 'Person', name: '岩佐 海彦', alternateName: 'Umihiko Iwasa' },
  address: {
    '@type': 'PostalAddress',
    postalCode: '107-0061',
    addressRegion: '東京都',
    addressLocality: '港区',
    streetAddress: '北青山1-3-1 アールキューブ青山3F',
    addressCountry: 'JP',
  },
};

// テーマ・言語をペイント前に復元（FOUC回避）。no-js クラスの除去もここで行う。
const BOOT_SCRIPT = `
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');
  try {
    // 初期表示は常にダーク（OSのprefers-color-schemeは無視）。
    // ユーザーがライトへ切り替えた場合のみlocalStorageに保存され、以後は永続的にその選択を尊重する。
    var t = localStorage.getItem('yoritsuki-theme');
    if (t) root.setAttribute('data-theme', t);
    var l = localStorage.getItem('yoritsuki-lang');
    if (l) { root.setAttribute('data-lang', l); root.setAttribute('lang', l); }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="ja" data-lang="ja" data-theme="dark" className="no-js" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <Header />
        {children}
        <Footer />
        <RevealInit />
      </body>
    </html>
  );
}
