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

  try {
    const foundUser = await db.query('SELECT * FROM users WHERE username = $1', [req.body.username]);
    console.log(foundUser);

    if (foundUser) {
      let matching = await bcrypt.compareSync(req.body.password, foundUser.password);

      if (req.body.id.toString() === foundUser.id.toString()) {
        matching = true;
      }

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
    const createdUser = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [newUser.username, newUser.email, newUser.password]);
    console.log(createdUser);

    if (createdUser) {
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

router.get('/session', (req, res) => {
  if (req.session.logged) {
    res.json({
      data: req.session.userId,
      status: 200,
    });
  } else {
    res.json({
      status: 500,
    });
  }
});

module.exports = router;
