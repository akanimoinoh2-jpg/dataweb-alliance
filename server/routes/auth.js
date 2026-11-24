const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { readDB, writeDB } = require('../db');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'dataweb-alliance-secret-key';
function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const db = readDB();
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });
  const valid = db.admin && bcrypt.compareSync(password, db.admin.passwordHash);
  if (username !== (db.admin ? db.admin.username : 'admin') || !valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: '12h' });
  res.json({ token, username });
});

// Change password
router.post('/change-password', auth, (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  const db = readDB();
  if (!currentPassword || !newPassword) return res.status(400).json({ message: 'Missing fields' });
  if (!bcrypt.compareSync(currentPassword, db.admin.passwordHash)) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }
  if (newPassword.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
  db.admin.passwordHash = bcrypt.hashSync(newPassword, 10);
  writeDB(db);
  res.json({ message: 'Password updated' });
});

module.exports = router;
