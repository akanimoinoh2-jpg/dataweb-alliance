const express = require('express');
const { readDB, writeDB, nextId } = require('../db');
const auth = require('./middleware');

const router = express.Router();

// Create message (public contact form)
router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ message: 'Name, email and message are required' });
  const db = readDB();
  db.messages = db.messages || [];
  const msg = {
    id: nextId('m_', db.messages),
    name,
    email,
    subject: subject || '',
    message,
    read: false,
    createdAt: new Date().toISOString()
  };
  db.messages.push(msg);
  writeDB(db);
  res.status(201).json({ message: 'Message received', id: msg.id });
});

// List messages (admin)
router.get('/', auth, (req, res) => {
  const db = readDB();
  res.json(db.messages || []);
});

// Mark as read
router.patch('/:id/read', auth, (req, res) => {
  const db = readDB();
  const m = (db.messages || []).find(x => x.id === req.params.id);
  if (!m) return res.status(404).json({ message: 'Message not found' });
  m.read = true;
  writeDB(db);
  res.json(m);
});

// Delete message
router.delete('/:id', auth, (req, res) => {
  const db = readDB();
  const before = (db.messages || []).length;
  db.messages = (db.messages || []).filter(x => x.id !== req.params.id);
  if (db.messages.length === before) return res.status(404).json({ message: 'Message not found' });
  writeDB(db);
  res.json({ message: 'Message deleted' });
});

module.exports = router;
