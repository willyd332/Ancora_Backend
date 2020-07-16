const express = require('express');
const db = require('../db/db.js');

const router = express.Router();

router.get('/conditions/:str', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT condition, condition <-> $1 AS dist
      FROM conditions
      ORDER BY dist LIMIT 10;
    `, [req.params.str]);

    console.log(rows);
    res.json({
      status: 200,
      data: rows,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: 500,
      err,
    });
  }
});

router.post('/add', async (req, res) => {
  try {
    const update = await db.query(''); // update user's studies with req.session.userId
    console.log(update);

    res.json({
      status: 200,
      data: update,
    });
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

// Example Query: const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [1]);
