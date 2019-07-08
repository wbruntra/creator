var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/main.db');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const getHash = password => {
  return bcrypt.hashSync(password, 12);
};

const accounts = [{ name: 'bill', pw: 'hello' }, { name: 'jimmy', pw: 'hola' }];

const timeNow = Math.round(new Date().getTime() / 1000);

db.serialize(function() {
  db.run('drop TABLE IF EXISTS `users`');
  const sql =
    'CREATE TABLE `users` ( \
  	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, \
  	`name`	TEXT, \
  	`password`	TEXT, \
    `updated`	INTEGER \
  );';
  db.run(sql);
  _.forEach(accounts, ({ name, pw }) => {
    db.run(`INSERT INTO users(name, password, updated) VALUES (?, ?, ?)`, [
      name,
      getHash(pw),
      timeNow,
    ]);
  });
});

db.close();
