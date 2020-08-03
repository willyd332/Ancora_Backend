/* eslint-disable camelcase */
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

router.post('/check', async (req, res) => {
  try {
    const { studyid, user_id } = req.body;

    console.log(req.body);

    const check = await db.query(`
      SELECT * FROM studies WHERE user_id = $1 AND studyid = $2
    `, [user_id, studyid]);

    if (check.rowCount > 0) {
      res.json({
        status: 200,
        data: true,
      });
    } else {
      res.json({
        status: 200,
        data: false,
      });
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

router.post('/add', async (req, res) => {
  try {
    const { studyid, user_id } = req.body;

    console.log(req.body);

    const check = await db.query(`
      SELECT * FROM studies WHERE user_id = $1 AND studyid = $2
    `, [user_id, studyid]);

    if (check.rowCount < 1) {
      const update = await db.query(`
        INSERT INTO studies (user_id, studyid) VALUES ($1, $2);
      `, [user_id, studyid]);

      console.log(update);

      res.json({
        status: 200,
        data: update,
      });
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

router.get('/studies/:id', async (req, res) => {
  try {
    const user_id = req.params.id;

    const data = await db.query(`
      SELECT * FROM studies INNER JOIN users ON studies.user_id = users.id WHERE studies.user_id = $1
    `, [user_id]);

    res.json({
      status: 200,
      data: data.rows.map((study) => study.studyid),
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
