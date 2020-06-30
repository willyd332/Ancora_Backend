const express = require('express');
const db = require('../db/db.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.json({
      status: 200,
      data: 'Hello World',
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: 500,
      err,
    });
  }
});

module.exports = router;

// Example Query: const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [1]);
