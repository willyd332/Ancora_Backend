const express = require('express');

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
