import { Link } from 'react-router-dom';
import { SITE } from '../siteConfig';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3 className="footer-brand"><img src="/logo.jpg" alt="Dataweb Alliance logo" className="brand-logo" /> Dataweb <em>Alliance</em></h3>
          <p className="muted">{SITE.tagline}</p>
          <p className="muted small">Technology-driven solutions that help individuals, businesses and organizations grow.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Reach Us</h4>
          <ul>
            {SITE.whatsapp.map(w => (
              <li key={w.raw}>
                <a href={`https://wa.me/${w.raw}`} target="_blank" rel="noreferrer">WhatsApp: {w.display}</a>
              </li>
            ))}
            <li><a href={SITE.facebook} target="_blank" rel="noreferrer">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} Dataweb Alliance. All rights reserved.</span>
        <Link to="/admin" className="btn btn-sm btn-outline footer-admin-btn">Admin</Link>
      </div>
    </footer>
  );
}
