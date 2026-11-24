const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'db.json');

function readDB() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

function nextId(prefix, items) {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

module.exports = { readDB, writeDB, nextId };
