import { FOR_YOU } from '../lib/content';
import T from './T';

export default function ForYou() {
  return (
    <section id="for-you" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="for-you" data-reveal>
          <p className="fy-label mono"><T {...FOR_YOU.label} /></p>
          <ul>
            {FOR_YOU.items.map((item) => (
              <li key={item.ja}><T {...item} /></li>
            ))}
          </ul>
          <p className="fy-note"><T {...FOR_YOU.note} /></p>
        </div>
      </div>
    </section>
  );
}
