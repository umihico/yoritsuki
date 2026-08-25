import { HERO } from '../lib/content';
import T from './T';

function HeroTitle({ lines, lang }) {
  return (
    <span className={lang}>
      {lines[0]}
      <br />
      <span className="grad">{lines[1]}</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="wrap">
        <p className="eyebrow mono">{HERO.eyebrow}</p>
        <h1>
          <HeroTitle lines={HERO.title.ja} lang="ja" />
          <HeroTitle lines={HERO.title.en} lang="en" />
        </h1>
        <div className="decls">
          {HERO.declarations.map((d, i) => (
            <p key={d.ja}>
              <span className="decl-num mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <T {...d} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
