import NoticeCard from '../../components/NoticeCard';
import SectionHead from '../../components/SectionHead';

const TITLE = '公告 | 株式会社ヨリツキ';
const DESCRIPTION = '株式会社ヨリツキの電子公告ページです。';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/publicnotice/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/publicnotice/',
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
};

export default function PublicNoticePage() {
  return (
    <main
      className="notice-main"
      data-title-ja="公告 | 株式会社ヨリツキ"
      data-title-en="Public Notice | Yoritsuki, Inc."
    >
      <div className="wrap">
        <SectionHead ja="公告" en="Public Notice" />
        <NoticeCard />
      </div>
    </main>
  );
}
