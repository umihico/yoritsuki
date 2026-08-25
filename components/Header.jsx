import Brand from './Brand';
import NavLinks from './NavLinks';
import Toggles from './Toggles';

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <a className="brand" href="/" aria-label="株式会社ヨリツキ トップページ">
          <Brand />
        </a>
        <div className="nav-group">
          <NavLinks />
          <Toggles />
        </div>
      </div>
    </header>
  );
}
