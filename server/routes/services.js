const express = require('express');
const { readDB, writeDB, nextId } = require('../db');
const auth = require('./middleware');

const router = express.Router();

router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.services || []);
});

router.post('/', auth, (req, res) => {
  const { title, description, icon } = req.body || {};
  if (!title || !description) return res.status(400).json({ message: 'Title and description are required' });
  const db = readDB();
  db.services = db.services || [];
  const service = { id: nextId('s_', db.services), title, description, icon: icon || 'cog' };
  db.services.push(service);
  writeDB(db);
  res.status(201).json(service);
});

router.put('/:id', auth, (req, res) => {
  const db = readDB();
  db.services = db.services || [];
  const s = db.services.find(x => x.id === req.params.id);
  if (!s) return res.status(404).json({ message: 'Service not found' });
  const { title, description, icon } = req.body || {};
  if (title !== undefined) s.title = title;
  if (description !== undefined) s.description = description;
  if (icon !== undefined) s.icon = icon;
  writeDB(db);
  res.json(s);
});

router.delete('/:id', auth, (req, res) => {
  const db = readDB();
  const before = (db.services || []).length;
  db.services = (db.services || []).filter(x => x.id !== req.params.id);
  if (db.services.length === before) return res.status(404).json({ message: 'Service not found' });
  writeDB(db);
  res.json({ message: 'Service deleted' });
});

module.exports = router;
