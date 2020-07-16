require('dotenv').config({ path: '../.env' });
const db = require('../db/db.js');
const conditionsData = require('./conditions-data.json');

const main = async () => {
  await db.query('DROP TABLE IF EXISTS conditions');

  // await db.query('CREATE EXTENSION pg_trgm;');

  await db.query(`
  CREATE TABLE conditions (
    condition VARCHAR(255)
  );`);

  await db.query(`
  CREATE INDEX cond_trgm ON conditions USING gin (condition gin_trgm_ops);`);

  for (let i = 0; i < conditionsData.length; i += 1) {
    // console.log(i);
    db.query('INSERT INTO conditions(condition) VALUES($1)', [conditionsData[i]]);
  }
};

main();
