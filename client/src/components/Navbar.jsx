import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SITE } from '../siteConfig';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/logo.jpg" alt="Dataweb Alliance logo" className="brand-logo" />
          <span className="brand-text">
            Dataweb <em>Alliance</em>
          </span>
        </Link>

        <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <a className="btn btn-sm nav-cta" href={`https://wa.me/${SITE.whatsapp[0].raw}`} target="_blank" rel="noreferrer">
            WhatsApp Us
          </a>
        </nav>
      </div>
    </header>
  );
}
