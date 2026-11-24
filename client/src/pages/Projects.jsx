import { useEffect, useState } from 'react';
import { api } from '../api';
import { PageHeader } from '../components/UI.jsx';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    api.getProjects().then(setProjects).catch(() => {});
  }, []);

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const shown = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <>
      <PageHeader title="Our Projects" subtitle="A selection of the work we've delivered for our clients." />
      <section className="section">
        <div className="container">
          <div className="filter-row">
            {categories.map(c => (
              <button
                key={c}
                className={`chip ${filter === c ? 'active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
          {shown.length === 0 ? (
            <p className="muted center">No projects in this category yet.</p>
          ) : (
            <div className="grid-3">
              {shown.map(p => (
                <article className="card project-card" key={p.id}>
                  {p.image ? (
                    <img src={p.image} alt={p.title} />
                  ) : (
                    <div className="thumb placeholder">{p.category}</div>
                  )}
                  <div className="card-body">
                    <span className="chip small">{p.category}</span>
                    <h3>{p.title}</h3>
                    <p className="muted">{p.description}</p>
                    {p.link && (
                      <a className="text-link" href={p.link} target="_blank" rel="noreferrer">
                        View Project →
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
