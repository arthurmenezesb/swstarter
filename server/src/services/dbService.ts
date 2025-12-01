import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

const db = new sqlite3.Database('./analytics.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database connected');
    const migrationsDir = path.join(__dirname, '../migrations');
    fs.readdirSync(migrationsDir).forEach(file => {
      const migration = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
      db.exec(migration);
    });
  }
});


export default db;