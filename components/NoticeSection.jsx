import { NOTICE_SECTION } from '../lib/content';
import SectionHead from './SectionHead';
import T from './T';

// トップページの公告セクション。本文は専用ページ（/publicnotice/）への案内のみ。
export default function NoticeSection() {
  return (
    <section id="notice">
      <div className="wrap">
        <SectionHead ja="公告" en="Public Notice" />
        <div className="notice-box" data-reveal>
          <p><T {...NOTICE_SECTION.body} /></p>
          <a className="notice-link" href="/publicnotice/">
            <T {...NOTICE_SECTION.link} />
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
