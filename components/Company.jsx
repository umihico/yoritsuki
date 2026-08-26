import { COMPANY_ROWS } from '../lib/content';
import SectionHead from './SectionHead';
import T from './T';

// テキスト中の指定語の直前を優先的な改行位置にする（語自体は途中で割らない）
function withBreak(text, breakBefore) {
  if (!breakBefore || !text.includes(breakBefore)) return text;
  const i = text.indexOf(breakBefore);
  return (
    <>
      {text.slice(0, i)}
      <wbr />
      <span className="nowrap">{text.slice(i)}</span>
    </>
  );
}

function CompanyValue({ row }) {
  // href を持つ行：メインの日英どちらもその範囲だけを明示リンク。サブ（英字下の和文）はリンクなし。
  if (row.href) {
    return (
      <dd>
        <div className="main">
          <span className="ja">
            <a className="addr-link" href={row.href} target="_blank" rel="noopener noreferrer">
              {withBreak(row.main.ja, row.breakBefore)}
            </a>
          </span>
          <span className="en">
            <a className="addr-link" href={row.href} target="_blank" rel="noopener noreferrer">
              {withBreak(row.main.en, row.breakBefore)}
            </a>
          </span>
        </div>
        {row.sub && (
          <div className="sub">
            {row.sub.ja && <span className="ja">{withBreak(row.sub.ja, row.breakBefore)}</span>}
            {row.sub.en && <span className="en">{withBreak(row.sub.en, row.breakBefore)}</span>}
          </div>
        )}
      </dd>
    );
  }
  return (
    <dd>
      <div className="main"><T {...row.main} /></div>
      {row.sub && <div className="sub"><T {...row.sub} /></div>}
    </dd>
  );
}

export default function Company() {
  return (
    <section id="company">
      <div className="wrap">
        <SectionHead ja="会社概要" en="Company" />
        <dl className="company-table" data-reveal>
          {COMPANY_ROWS.map((row) => (
            <div key={row.label.ja} className="company-row">
              <dt><T {...row.label} /></dt>
              <CompanyValue row={row} />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
