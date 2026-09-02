import Brand from './Brand';
import NavLinks from './NavLinks';
import Toggles from './Toggles';
import { COMPANY } from '../lib/company';

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <a className="brand" href="/" aria-label={`${COMPANY.name.ja} トップページ`}>
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
