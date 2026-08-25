import { CONTACT } from '../lib/content';
import SectionHead from './SectionHead';
import T from './T';

// お問い合わせ。フォームは設けず、紹介制である旨のみ案内する。
export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <SectionHead ja="お問い合わせ" en="Contact" />
        <div className="notice-box" data-reveal>
          <p><T {...CONTACT.body} /></p>
        </div>
      </div>
    </section>
  );
}
