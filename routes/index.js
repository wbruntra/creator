var path = require('path');
var express = require('express');
var router = express.Router();
var Database = require('better-sqlite3');
var db = new Database(path.join(__dirname, '..', 'data', 'main.db'));

const { timeNow } = require('../utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/entries', (req, res) => {
  const entries = db.prepare('SELECT * FROM entries').all();
  res.send({ entries });
});

router.get('/entries/:id', (req, res) => {
  const entry = db
    .prepare('SELECT * FROM entries WHERE ID = ?')
    .get(req.params.id);
  // const entry = {
  //   title: 'yeah',
  //   body: 'you rule!',
  // };
  res.send(entry);
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
