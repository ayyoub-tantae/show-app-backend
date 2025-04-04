const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./shows.db');

// Création de la table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS shows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT CHECK(category IN ('movie', 'anime', 'serie')) NOT NULL,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  console.log('Database initialized');
});

module.exports = db;