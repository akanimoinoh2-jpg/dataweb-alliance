import { useEffect, useState } from 'react';
import { api } from '../api';

const emptyProject = { title: '', description: '', category: '', image: '', link: '', featured: false };
const emptyService = { title: '', description: '', icon: 'cog' };

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('dwa_token') || '');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState('projects');

  // data
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [msg, setMsg] = useState('');

  const load = async () => {
    try {
      const [p, s, m] = await Promise.all([api.getProjects(), api.getServices(), api.getMessages()]);
      setProjects(p); setServices(s); setMessages(m);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

  const login = async e => {
    e.preventDefault();
    setError('');
    try {
      const { token: t } = await api.login(username, password);
      localStorage.setItem('dwa_token', t);
      setToken(t);
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('dwa_token');
    setToken('');
  };

  const flash = text => {
    setMsg(text);
    setTimeout(() => setMsg(''), 2500);
  };

  const saveProject = async e => {
    e.preventDefault();
    try {
      await api.saveProject(projectForm);
      setProjectForm(emptyProject);
      await load();
      flash('Project saved ✓');
    } catch (err) { flash(err.message); }
  };

  const saveService = async e => {
    e.preventDefault();
    try {
      await api.saveService(serviceForm);
      setServiceForm(emptyService);
      await load();
      flash('Service saved ✓');
    } catch (err) { flash(err.message); }
  };

  if (!token) {
    return (
      <section className="section">
        <div className="container narrow">
          <form className="card form login-card" onSubmit={login}>
            <h2 className="center">Admin Login</h2>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
            <button className="btn btn-primary" type="submit">Login</button>
            {error && <p className="error center">{error}</p>}
            <p className="muted small center">Default: admin / admin123 (change it after first login)</p>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="admin-head">
          <h2>Admin Dashboard</h2>
          <div>
            <button className="btn btn-sm btn-outline" onClick={logout}>Logout</button>
          </div>
        </div>
        {msg && <p className="success">{msg}</p>}

        <div className="filter-row">
          {['projects', 'services', 'messages'].map(t => (
            <button key={t} className={`chip ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
              {t === 'messages' && messages.filter(m => !m.read).length > 0
                ? ` (${messages.filter(m => !m.read).length})` : ''}
            </button>
          ))}
        </div>

        {tab === 'projects' && (
          <div className="admin-grid">
            <form className="card form" onSubmit={saveProject}>
              <h3>{projectForm.id ? 'Edit Project' : 'Add Project'}</h3>
              <input placeholder="Title" value={projectForm.title}
                onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} required />
              <textarea placeholder="Description" rows="4" value={projectForm.description}
                onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} required />
              <input placeholder="Category" value={projectForm.category}
                onChange={e => setProjectForm({ ...projectForm, category: e.target.value })} />
              <input placeholder="Image URL (optional)" value={projectForm.image}
                onChange={e => setProjectForm({ ...projectForm, image: e.target.value })} />
              <input placeholder="Project link (optional)" value={projectForm.link}
                onChange={e => setProjectForm({ ...projectForm, link: e.target.value })} />
              <label className="check">
                <input type="checkbox" checked={projectForm.featured}
                  onChange={e => setProjectForm({ ...projectForm, featured: e.target.checked })} />
                Featured on homepage
              </label>
              <div className="row-btns">
                <button className="btn btn-primary" type="submit">{projectForm.id ? 'Update' : 'Add'} Project</button>
                {projectForm.id && (
                  <button type="button" className="btn btn-outline" onClick={() => setProjectForm(emptyProject)}>Cancel</button>
                )}
              </div>
            </form>
            <div className="card list">
              <h3>All Projects ({projects.length})</h3>
              {projects.map(p => (
                <div className="list-item" key={p.id}>
                  <div>
                    <strong>{p.title}</strong>
                    <span className="muted small"> — {p.category}{p.featured ? ' ★' : ''}</span>
                  </div>
                  <div className="row-btns">
                    <button className="btn btn-sm btn-outline"
                      onClick={() => setProjectForm({ ...emptyProject, ...p })}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={async () => {
                      if (confirm('Delete this project?')) {
                        await api.deleteProject(p.id); await load(); flash('Project deleted');
                      }
                    }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'services' && (
          <div className="admin-grid">
            <form className="card form" onSubmit={saveService}>
              <h3>{serviceForm.id ? 'Edit Service' : 'Add Service'}</h3>
              <input placeholder="Title" value={serviceForm.title}
                onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} required />
              <textarea placeholder="Description" rows="4" value={serviceForm.description}
                onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })} required />
              <select value={serviceForm.icon}
                onChange={e => setServiceForm({ ...serviceForm, icon: e.target.value })}>
                {['globe', 'chart', 'report', 'grid', 'user', 'cog'].map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
              <div className="row-btns">
                <button className="btn btn-primary" type="submit">{serviceForm.id ? 'Update' : 'Add'} Service</button>
                {serviceForm.id && (
                  <button type="button" className="btn btn-outline"
                    onClick={() => setServiceForm(emptyService)}>Cancel</button>
                )}
              </div>
            </form>
            <div className="card list">
              <h3>All Services ({services.length})</h3>
              {services.map(s => (
                <div className="list-item" key={s.id}>
                  <div>
                    <strong>{s.title}</strong>
                    <span className="muted small"> — {s.icon}</span>
                  </div>
                  <div className="row-btns">
                    <button className="btn btn-sm btn-outline"
                      onClick={() => setServiceForm({ ...emptyService, ...s })}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={async () => {
                      if (confirm('Delete this service?')) {
                        await api.deleteService(s.id); await load(); flash('Service deleted');
                      }
                    }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'messages' && (
          <div className="card list">
            <h3>Contact Messages ({messages.length})</h3>
            {messages.length === 0 && <p className="muted">No messages yet.</p>}
            {messages.map(m => (
              <div className={`list-item ${m.read ? '' : 'unread'}`} key={m.id}>
                <div>
                  <strong>{m.name}</strong> <span className="muted small">({m.email})</span>
                  {m.subject && <span className="muted small"> — {m.subject}</span>}
                  <p>{m.message}</p>
                  <span className="muted small">{new Date(m.createdAt).toLocaleString()}</span>
                </div>
                <div className="row-btns">
                  {!m.read && (
                    <button className="btn btn-sm btn-outline" onClick={async () => {
                      await api.markRead(m.id); await load();
                    }}>Mark Read</button>
                  )}
                  <button className="btn btn-sm btn-danger" onClick={async () => {
                    if (confirm('Delete this message?')) {
                      await api.deleteMessage(m.id); await load(); flash('Message deleted');
                    }
                  }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
