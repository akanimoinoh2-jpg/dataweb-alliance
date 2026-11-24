import { useState } from 'react';
import { api } from '../api';
import { SITE } from '../siteConfig';
import { PageHeader, WhatsAppButton } from '../components/UI.jsx';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      await api.sendMessage(form);
      setStatus({ ok: true, text: "Message sent! We'll get back to you soon." });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ ok: false, text: err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Tell us about your project — we'd love to hear from you." />
      <section className="section">
        <div className="container contact-grid">
          <form className="card form" onSubmit={submit}>
            <h3>Send a Message</h3>
            <input name="name" placeholder="Your Name" value={form.name} onChange={onChange} required />
            <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={onChange} required />
            <input name="subject" placeholder="Subject" value={form.subject} onChange={onChange} />
            <textarea name="message" rows="5" placeholder="Your Message" value={form.message} onChange={onChange} required />
            <button className="btn btn-primary" disabled={sending}>{sending ? 'Sending...' : 'Send Message'}</button>
            {status && <p className={status.ok ? 'success' : 'error'}>{status.text}</p>}
          </form>

          <div className="contact-side">
            <div className="card">
              <h3>WhatsApp</h3>
              {SITE.whatsapp.map((w, i) => (
                <p key={w.raw}>
                  <a href={`https://wa.me/${w.raw}`} target="_blank" rel="noreferrer" className="text-link">
                    {w.display}
                  </a>
                </p>
              ))}
              <WhatsAppButton label="Chat Now" />
            </div>
            <div className="card">
              <h3>Social</h3>
              <p><a className="text-link" href={SITE.facebook} target="_blank" rel="noreferrer">Facebook — Dataweb Alliance</a></p>
            </div>
            <div className="card">
              <h3>Working Hours</h3>
              <p className="muted">{SITE.hours}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
