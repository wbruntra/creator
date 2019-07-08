var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/main.db');
const _ = require('lodash');
const testEntries = require('./testEntries');

const timeNow = Math.round(new Date().getTime() / 1000);
console.log(testEntries);

db.serialize(function() {
  db.run('drop TABLE IF EXISTS `entries`');
  const sql =
    'CREATE TABLE `entries` ( \
  	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, \
  	`title`	TEXT, \
    `body`	TEXT, \
    `creator_email` TEXT, \
    `updated`	INTEGER \
  );';
  db.run(sql);
  _.forEach(testEntries, ({ title, body, creator_email }) => {
    db.run(
      `INSERT INTO entries(title, body, creator_email, updated) VALUES (?, ?, ?, ?)`,
      [title, body, creator_email, timeNow]
    );
  });
});

db.close();
