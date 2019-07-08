var path = require('path');
var express = require('express');
var router = express.Router();
// var Database = require('better-sqlite3');
// var db = new Database(path.join(__dirname, '..', 'data', 'main.db'));
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(path.join(__dirname, '..', 'data', 'main.db'));
const { promisify } = require('util');

const { timeNow } = require('../utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/entries', (req, res) => {
  db.prepare('SELECT * FROM entries').all((err, entries) => {
    res.send({ entries });
  });
});

router.get('/entries/:id', (req, res) => {
  db.prepare('SELECT * FROM entries WHERE ID = ?').get(
    req.params.id,
    (err, entry) => {
      res.send(entry);
    }
  );
});

router.post('/entries/new', (req, res) => {
  const stmt = db.prepare(
    'INSERT INTO entries (title, body, updated) VALUES (?, ?, ?)'
  );
  const { title, body } = req.body;
  const info = stmt.run(title, body, timeNow());

  res.sendStatus(200);
});

module.exports = router;
