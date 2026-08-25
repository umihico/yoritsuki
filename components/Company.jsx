import { COMPANY_ROWS } from '../lib/content';
import SectionHead from './SectionHead';
import T from './T';

export default function Company() {
  return (
    <section id="company">
      <div className="wrap">
        <SectionHead ja="会社概要" en="Company" />
        <dl className="company-table" data-reveal>
          {COMPANY_ROWS.map((row) => (
            <div key={row.label.ja} className="company-row">
              <dt><T {...row.label} /></dt>
              <dd>
                <div className="main"><T {...row.main} /></div>
                {row.sub && <div className="sub"><T {...row.sub} /></div>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
