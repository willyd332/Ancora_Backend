const { Pool } = require('pg');

const connectionString = process.env.POSTGRES_URI;

console.log(connectionString);

const pool = new Pool({
  connectionString,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
