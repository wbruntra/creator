var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/main.db');
const _ = require('lodash');
const testEntries = require('./moreTestEntries');

const timeNow = Math.round(new Date().getTime() / 1000);
console.log(testEntries);

_.forEach(testEntries, ({ title, body, creator_email }) => {
  db.run(
    `INSERT INTO entries(title, body, creator_email, updated) VALUES (?, ?, ?, ?)`,
    [title, body, creator_email, timeNow]
  );
});

db.close();
