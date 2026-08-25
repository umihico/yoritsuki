import { COPYRIGHT } from '../lib/content';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="copyright mono">{COPYRIGHT}</p>
      </div>
    </footer>
  );
}
