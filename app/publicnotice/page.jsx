import NoticeCard from '../../components/NoticeCard';
import SectionHead from '../../components/SectionHead';
import { COMPANY } from '../../lib/company';

const TITLE = `公告 | ${COMPANY.name.ja}`;
const DESCRIPTION = `${COMPANY.name.ja}の電子公告ページです。`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/publicnotice/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/publicnotice/',
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
};

export default function PublicNoticePage() {
  return (
    <main
      className="notice-main"
      data-title-ja={TITLE}
      data-title-en={`Public Notice | ${COMPANY.name.en}`}
    >
      <div className="wrap">
        <SectionHead ja="公告" en="Public Notice" />
        <NoticeCard />
      </div>
    </main>
  );
}
