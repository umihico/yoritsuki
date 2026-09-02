import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RevealInit from '../components/RevealInit';
import { SITE_URL } from '../lib/site';
import { COMPANY, TITLE_DEFAULT } from '../lib/company';

const TITLE = TITLE_DEFAULT;
const DESCRIPTION = COMPANY.description;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  applicationName: COMPANY.name.ja,
  appleWebApp: { capable: true, title: COMPANY.name.ja, statusBarStyle: 'black-translucent' },
  // モバイルOSによる住所・電話・メールの自動リンクを抑止（住所はJSXで明示リンクのみ）
  formatDetection: { telephone: false, date: false, address: false, email: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    siteName: COMPANY.name.ja,
    images: [{ url: '/ogp.png', width: 1200, height: 630, alt: COMPANY.shortName }],
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
  name: COMPANY.name.ja,
  alternateName: COMPANY.name.en,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon-512.png`,
  foundingDate: COMPANY.founding.date,
  founder: { '@type': 'Person', name: COMPANY.founder.ja, alternateName: COMPANY.founder.en },
  address: {
    '@type': 'PostalAddress',
    postalCode: COMPANY.address.postalCode,
    addressRegion: COMPANY.address.region,
    addressLocality: COMPANY.address.locality,
    streetAddress: COMPANY.address.street,
    addressCountry: COMPANY.address.country,
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
