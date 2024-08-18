const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE profile (username TEXT, email TEXT, phone TEXT, avatar TEXT, modifiedTime TEXT)");
  db.run("INSERT INTO profile (username, email, phone, avatar, modifiedTime) VALUES (?, ?, ?, ?, ?)",
    ['mxy', 'mxy2316868975@gmail.com', '17621987980', 'https://api.dicebear.com/7.x/miniavs/svg?seed=3', '']);
});

module.exports = db;
