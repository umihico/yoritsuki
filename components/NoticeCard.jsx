import { NOTICE } from '../lib/content';
import T from './T';

// 公告ページ固有のコンテンツはこのカードのみ。
export default function NoticeCard() {
  return (
    <div className="notice-box">
      <p><T {...NOTICE.body} /></p>
      <div className="notice-empty mono">
        <span className="dot" aria-hidden="true" />
        <T {...NOTICE.empty} />
      </div>
    </div>
  );
}
