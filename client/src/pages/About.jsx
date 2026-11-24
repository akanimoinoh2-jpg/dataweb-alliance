import { PageHeader } from '../components/UI.jsx';

export default function About() {
  return (
    <>
      <PageHeader title="About Us" subtitle="Dataweb Alliance — We Build. We Analyze. We Solve." />

      <section className="section">
        <div className="container about-grid">
          <div>
            <span className="eyebrow">Who We Are</span>
            <h2>Welcome to Dataweb Alliance</h2>
            <p>
              Dataweb Alliance is a technology-driven company committed to helping individuals, businesses,
              and organizations grow through innovative digital solutions and data-driven insights.
            </p>
            <p>
              We believe that technology and data are powerful tools for solving problems, improving business
              performance, and creating opportunities. We specialize in website design and development, data
              analysis, data visualization, business intelligence, and professional portfolio development.
            </p>
            <p>
              Our goal is to transform ideas into functional digital experiences and turn raw data into
              meaningful information that supports smarter decision-making.
            </p>
          </div>
          <div className="about-side">
            <div className="card highlight">
              <h3>Our Mission</h3>
              <p className="muted">
                To provide reliable, creative, and innovative digital and data solutions that empower
                businesses and individuals to achieve their goals.
              </p>
            </div>
            <div className="card highlight">
              <h3>Our Vision</h3>
              <p className="muted">
                To become a trusted technology and data solutions partner, recognized for excellence,
                creativity, and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why Choose Us</span>
            <h2>Why Choose Dataweb Alliance?</h2>
          </div>
          <div className="grid-3">
            <div className="card">
              <h3>Creativity + Technical Skill</h3>
              <p className="muted">We combine creativity, technical skills, and analytical thinking to deliver solutions that create value.</p>
            </div>
            <div className="card">
              <h3>Simplified Processes</h3>
              <p className="muted">We simplify processes — turning complexity into clean, understandable systems and insights.</p>
            </div>
            <div className="card">
              <h3>Growth Oriented</h3>
              <p className="muted">Everything we build is designed to support growth for your business or personal brand.</p>
            </div>
          </div>
          <blockquote className="quote">
            "At Dataweb Alliance, we don't just build websites or analyze data; we create solutions that make a difference."
          </blockquote>
        </div>
      </section>
    </>
  );
}
