import Hero from '../components/Hero';
import Capabilities from '../components/Capabilities';
import ForYou from '../components/ForYou';
import Company from '../components/Company';
import Contact from '../components/Contact';
import NoticeSection from '../components/NoticeSection';

export default function HomePage() {
  return (
    <main
      data-title-ja="株式会社ヨリツキ | Yoritsuki, Inc."
      data-title-en="Yoritsuki, Inc. | Software Engineering"
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
