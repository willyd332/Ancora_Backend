require('dotenv').config({ path: '../.env' });
const db = require('../db/db.js');

const main = async () => {
  await db.query('DROP TABLE IF EXISTS studies');

  await db.query(`
  CREATE TABLE studies (
    user_id INTEGER,
    studyId VARCHAR(255)
  );`);

  return true;
};

main();
