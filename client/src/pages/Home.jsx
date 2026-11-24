import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { SITE } from '../siteConfig';
import { ServiceIcon, WhatsAppButton } from '../components/UI.jsx';

export default function Home() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.getServices().then(setServices).catch(() => {});
    api.getProjects().then(p => setProjects(p.filter(x => x.featured).slice(0, 3))).catch(() => {});
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="eyebrow">Technology &amp; Data Solutions Company</span>
            <h1>We Build. <span className="accent">We Analyze.</span> We Solve.</h1>
            <p>
              Dataweb Alliance helps individuals, businesses and organizations grow through innovative
              digital solutions and data-driven insights — from website development to business intelligence.
            </p>
            <div className="hero-actions">
              <Link to="/services" className="btn btn-primary">Explore Our Services</Link>
              <Link to="/contact" className="btn btn-outline">Get In Touch</Link>
            </div>
            <div className="hero-stats">
              <div><strong>6+</strong><span>Core Services</span></div>
              <div><strong>100%</strong><span>Client Focused</span></div>
              <div><strong>24/7</strong><span>Support Reach</span></div>
            </div>
          </div>
          <div className="hero-card">
            <div className="card-float">
              <span className="dot" /> Raw Data
            </div>
            <div className="card-float mid">
              <span className="dot dot-blue" /> Analysis &amp; BI
            </div>
            <div className="card-float">
              <span className="dot dot-green" /> Smart Decisions
            </div>
            <p className="muted small">Ideas → Digital Experiences. Data → Meaningful Insight.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What We Do</span>
            <h2>Solutions That Make a Difference</h2>
          </div>
          <div className="grid-3">
            {services.slice(0, 6).map(s => (
              <div className="card" key={s.id}>
                <div className="icon-wrap"><ServiceIcon name={s.icon} /></div>
                <h3>{s.title}</h3>
                <p className="muted">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="center"><Link to="/services" className="btn btn-outline">View All Services</Link></div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Featured Work</span>
            <h2>Recent Projects</h2>
          </div>
          {projects.length === 0 ? (
            <p className="muted center">Projects coming soon.</p>
          ) : (
            <div className="grid-3">
              {projects.map(p => (
                <div className="card project-card" key={p.id}>
                  {p.image ? <img src={p.image} alt={p.title} /> : <div className="thumb placeholder">{p.category}</div>}
                  <h3>{p.title}</h3>
                  <p className="muted">{p.description}</p>
                </div>
              ))}
            </div>
          )}
          <div className="center"><Link to="/projects" className="btn btn-outline">See All Projects</Link></div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container center">
          <h2>Have a project in mind?</h2>
          <p>Let's turn your idea into a functional digital experience — or your data into smarter decisions.</p>
          <div className="hero-actions center-flex">
            <WhatsAppButton label={`WhatsApp ${SITE.whatsapp[0].display}`} />
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
