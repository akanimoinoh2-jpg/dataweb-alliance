import { SITE } from '../siteConfig';

export function ServiceIcon({ name }) {
  const icons = {
    globe: <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c3 3.5 3 16.5 0 20M12 2c-3 3.5-3 16.5 0 20" />,
    chart: <path d="M3 3v18h18M7 15l4-6 4 4 5-8" />,
    report: <path d="M6 2h9l5 5v15H6zM14 2v6h6M9 13h6M9 17h6" />,
    grid: <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />,
    user: <path d="M20 21a8 8 0 10-16 0M12 11a4 4 0 100-8 4 4 0 000 8z" />,
    cog: <path d="M12 15a3 3 0 100-6 3 3 0 000 6zm7-3a7 7 0 00-.2-1.6l2-1.5-2-3.4-2.3 1a7 7 0 00-2.8-1.6L13.4 2h-2.8l-.3 2.5a7 7 0 00-2.8 1.6l-2.3-1-2 3.4 2 1.5A7 7 0 005 12c0 .5.1 1.1.2 1.6l-2 1.5 2 3.4 2.3-1a7 7 0 002.8 1.6l.3 2.5h2.8l.3-2.5a7 7 0 002.8-1.6l2.3 1 2-3.4-2-1.5c.1-.5.2-1.1.2-1.6z" />
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="icon">
      {icons[name] || icons.cog}
    </svg>
  );
}

export function WhatsAppButton({ line = 0, label = 'Chat on WhatsApp' }) {
  const w = SITE.whatsapp[line];
  return (
    <a className="btn btn-whatsapp" href={`https://wa.me/${w.raw}`} target="_blank" rel="noreferrer">
      <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
        <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.1 14.1c-.2.6-1.2 1.1-1.7 1.2-.5 0-1 .1-1.7-.1a12 12 0 01-3-1.3 12 12 0 01-3.4-3.9c-.9-1.5-1-2.8-.7-3.5.3-.7 1-1.4 1.3-1.5h.8c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.5.7c-.2.2-.3.4-.1.7.5.9 1.1 1.6 1.9 2.2.7.5 1.2.8 1.5.9.2 0 .4 0 .6-.2l.7-.9c.2-.2.4-.2.6-.1l2 .9c.3.2.4.3.4.5s0 .7-.2 1.2z"/>
      </svg>
      {label}
    </a>
  );
}

export function PageHeader({ title, subtitle }) {
  return (
    <section className="page-header">
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
