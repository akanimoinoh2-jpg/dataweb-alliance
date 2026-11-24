require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const projects = require('./routes/projects');
const services = require('./routes/services');
const messages = require('./routes/messages');
const auth = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => res.json({ ok: true, name: 'Dataweb Alliance API' }));
app.use('/api/projects', projects);
app.use('/api/services', services);
app.use('/api/messages', messages);
app.use('/api/auth', auth);

// Serve the built React app in production
const clientBuild = path.join(__dirname, '..', 'client', 'dist');
if (require('fs').existsSync(clientBuild)) {
  app.use(express.static(clientBuild));
  app.get('*', (req, res) => res.sendFile(path.join(clientBuild, 'index.html')));
}

app.listen(PORT, () => console.log(`Dataweb Alliance API running on http://localhost:${PORT}`));
