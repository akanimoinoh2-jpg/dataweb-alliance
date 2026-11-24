import { useEffect, useState } from 'react';
import { api } from '../api';
import { ServiceIcon, PageHeader } from '../components/UI.jsx';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.getServices().then(setServices).catch(() => {});
  }, []);

  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Digital and data solutions tailored to help you grow."
      />
      <section className="section">
        <div className="container">
          <div className="grid-2">
            {services.map(s => (
              <div className="card service-row" key={s.id}>
                <div className="icon-wrap"><ServiceIcon name={s.icon} /></div>
                <div>
                  <h3>{s.title}</h3>
                  <p className="muted">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
