const express = require('express');
const { readDB, writeDB, nextId } = require('../db');
const auth = require('./middleware');

const router = express.Router();

// Public: list projects
router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.projects || []);
});

// Public: single project
router.get('/:id', (req, res) => {
  const db = readDB();
  const p = (db.projects || []).find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ message: 'Project not found' });
  res.json(p);
});

// Create
router.post('/', auth, (req, res) => {
  const { title, description, category, image, link, featured } = req.body || {};
  if (!title || !description) return res.status(400).json({ message: 'Title and description are required' });
  const db = readDB();
  db.projects = db.projects || [];
  const project = {
    id: nextId('p_', db.projects),
    title,
    description,
    category: category || 'General',
    image: image || '',
    link: link || '',
    featured: !!featured
  };
  db.projects.push(project);
  writeDB(db);
  res.status(201).json(project);
});

// Update
router.put('/:id', auth, (req, res) => {
  const db = readDB();
  db.projects = db.projects || [];
  const p = db.projects.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ message: 'Project not found' });
  const { title, description, category, image, link, featured } = req.body || {};
  if (title !== undefined) p.title = title;
  if (description !== undefined) p.description = description;
  if (category !== undefined) p.category = category;
  if (image !== undefined) p.image = image;
  if (link !== undefined) p.link = link;
  if (featured !== undefined) p.featured = !!featured;
  writeDB(db);
  res.json(p);
});

// Delete
router.delete('/:id', auth, (req, res) => {
  const db = readDB();
  const before = (db.projects || []).length;
  db.projects = (db.projects || []).filter(x => x.id !== req.params.id);
  if (db.projects.length === before) return res.status(404).json({ message: 'Project not found' });
  writeDB(db);
  res.json({ message: 'Project deleted' });
});

module.exports = router;
