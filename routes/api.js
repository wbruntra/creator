var path = require('path');
var express = require('express');
var router = express.Router();
// var Database = require('better-sqlite3');
// var db = new Database(path.join(__dirname, '..', 'data', 'main.db'));
const Promise = require('bluebird');
var sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');
const dbPath = path.join(__dirname, '..', 'data', 'main.db');
const dbPromise = sqlite.open(dbPath, { Promise });
// var db = new sqlite3.Database(dbPath);
// const { promisify } = require('util');
const _ = require('lodash');

const { timeNow } = require('../utils');

const useDb = async (req, res, next) => {
  const db = await dbPromise;
  req.db = db;
  next();
};

const loadEntry = async (req, res, next) => {
  const id = req.params.id ? req.params.id : req.body.id;
  if (!id) {
    return res.sendStatus(400);
  }
  const entry = await req.db.get('SELECT * FROM entries WHERE id = ?', id);
  req.entry = entry;
  next();
};

/* GET response. */
router.get('/', function(req, res, next) {
  res.send('OK');
});

router.get('/entries', useDb, async (req, res) => {
  const db = req.db;
  const entries = await db.all('SELECT * FROM entries');
  res.send({ entries });
});

router.get('/entries/:id', useDb, async (req, res) => {
  const entry = await req.db.get(
    'SELECT * FROM entries WHERE id = ?',
    req.params.id
  );
  res.send(entry);
});

router.post('/entries/new', async (req, res) => {
  try {
    const db = await dbPromise;
    const { title, body, email } = req.body;
    await db.run(
      'INSERT INTO entries (title, body, creator_email, updated) VALUES (?, ?, ?, ?)',
      [title, body, email, timeNow()]
    );

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.delete('/entries/:id', useDb, async (req, res) => {
  const { id } = req.params;
  // if (_.get(req.session, 'profile.email' !== req.entry.creator_email)) {
  //   return res.sendStatus(403);
  // }
  const result = await req.db.run(
    'DELETE FROM entries WHERE id = ? AND creator_email = ?',
    [id, req.session.profile.email]
  );
  res.sendStatus(204);
});

router.post('/entries/edit', async (req, res) => {
  try {
    const db = await dbPromise;
    const { id, title, body } = req.body;

    const entry = await db.get('SELECT * FROM entries WHERE id = ?', id);

    if (_.get(req.session, 'profile.email') !== entry.creator_email) {
      return res.sendStatus(403);
    }

    await db.run('UPDATE entries SET title=?, body=?, updated=? WHERE id = ?', [
      title,
      body,
      timeNow(),
      id,
    ]);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/users', useDb, async (req, res) => {
  const users = await req.db.all('SELECT * FROM users');
  res.send({ users });
});

router.get('/users/status', useDb, async (req, res) => {
  res.send({
    tokens: req.session.tokens,
    profile: req.session.profile,
    name: req.session.name,
    signInAt: req.session.signIn,
  });
});

// router.post('/users/signin', useDb, async (req, res) => {
//   const { name, password } = req.body;
//   try {
//     const row = await req.db.get('SELECT * FROM users WHERE name = ?', name);
//     const success = await bcryptVerify(password, row.password);
//     if (success) {
//       req.session = {
//         name,
//         signIn: timeNow(),
//       };
//       res.sendStatus(200);
//     } else {
//       res.sendStatus(401);
//     }
//   } catch (err) {
//     res.sendStatus(500);
//   }
// });

router.post('/users/signout', (req, res) => {
  res.send('OK');
});

module.exports = router;
