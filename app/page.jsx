import Hero from '../components/Hero';
import Capabilities from '../components/Capabilities';
import ForYou from '../components/ForYou';
import Company from '../components/Company';
import Contact from '../components/Contact';
import NoticeSection from '../components/NoticeSection';
import { COMPANY, TITLE_DEFAULT } from '../lib/company';

export default function HomePage() {
  return (
    <main
      data-title-ja={TITLE_DEFAULT}
      data-title-en={`${COMPANY.name.en} | Software Engineering`}
    >
      <Hero />
      <Capabilities />
      <ForYou />
      <Company />
      <Contact />
      <NoticeSection />
    </main>
  );
}
