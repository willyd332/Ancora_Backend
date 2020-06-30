const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const db = require('./db/db.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL, // allowed address
  credentials: true, // allows session cookies to be sent
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  'Access-Control-Allow-Origin': process.env.SESSION_SECRET,
}));

const trialController = require('./controllers/trial-controller');

app.use('/trial', trialController);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 9000, () => {
  console.log(`Server is listening on port ${process.env.PORT} or 9000`);
});

db.query('SELECT NOW()', (err, res) => {
  if (err) {
    throw err;
  }
  console.log(`Connected to postgres @ ${res.rows[0].now}`);
});
