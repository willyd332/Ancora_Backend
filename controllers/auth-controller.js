const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../db/db.js');

const router = express.Router();

const incorrectInfo = {
  status: 200,
  data: false,
};

router.post('/login', async (req, res) => {
  console.log('Receiving Request');
  console.log(req.body);

  try {
    const foundUser = await db.query('SELECT * FROM users WHERE username = $1', [req.body.username]);
    console.log(foundUser);

    if (foundUser) {
      const matching = await bcrypt.compareSync(req.body.password, foundUser.password);

      if (matching === true) {
        console.log(`logging in ${req.body.username}`);

        req.session.logged = true;
        req.session.userId = foundUser.id;

        res.json({
          status: 200,
          data: foundUser,
        });
      } else {
        res.json(incorrectInfo);
      }
    } else {
      res.json(incorrectInfo);
    }
  } catch (err) {
    console.log(err);

    res.json({
      status: 500,
      data: false,
      err,
    });
  }
});

router.post('/register', async (req, res) => {
  const { password } = req.body;

  const passwordHash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: passwordHash,
  };

  try {
    const checkUser = await db.query('SELECT * FROM users WHERE username = $1', [newUser.username]);
    if (checkUser.rowCount === 0) {
      await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [newUser.username, newUser.email, newUser.password]);
      const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [newUser.username]);
      const createdUser = rows[0];
      req.session.logged = true;
      req.session.userId = createdUser.id;
      res.json({
        status: 200,
        data: createdUser,
      });
    } else {
      res.json(incorrectInfo);
    }
  } catch (err) {
    console.log(err);

    res.json({
      status: 500,
      data: false,
      err,
    });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.json({
        status: 500,
        data: false,
        err,
      });
    } else {
      res.redirect('/');
    }
  });
});

router.post('/session', async (req, res) => {
  console.log('Receiving Request');
  console.log(req.body);

  try {
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [req.body.id]);
    const foundUser = rows[0];
    console.log(foundUser);

    if (foundUser) {
      console.log(`logging in ${req.body.username}`);

      req.session.logged = true;
      req.session.userId = foundUser.id;

      res.json({
        status: 200,
        data: foundUser,
      });
    } else {
      res.json(incorrectInfo);
    }
  } catch (err) {
    console.log(err);

    res.json({
      status: 500,
      data: false,
      err,
    });
  }
});

module.exports = router;
