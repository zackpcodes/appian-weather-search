
const express = require("express");
const pgp = require("pg-promise")();
const {ParameterizedQuery: PQ} = require('pg-promise');
const cors = require("cors");
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const port = "3001";
var db = pgp(`postgres://zack:pass@DB:5432/appian`); // Parameters should be in .env file. Hard coded for simplicity.

app.use(cookieParser());

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(
  cors({
    origin: true, // Should whitelist cross site or just disable when in production system.
    credentials: true,
  })
);

app.use(
  session({
    secret: "this is super secret", // A secure way to store secret would be in dedicated secret manager (e.g. AWS Secrets Manager).
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      sameSite: "Lax",
    },
  })
);

app.post("/weather/search", (req, res) => {
  let queryConditions = [];
  let queryValues = [];
  let queryConditionsCount = 0;

  if (req.body.location && req.body.location !== '') {
    queryConditions.push(`town=$${++queryConditionsCount}`);
    queryValues.push(req.body.location);
  }
  if (req.body.startDate && req.body.endDate && req.body.startDate !== '' && req.body.endDate !== '') {
    queryConditions.push(`date BETWEEN $${++queryConditionsCount} AND $${++queryConditionsCount}`);
    queryValues.push(req.body.startDate);
    queryValues.push(req.body.endDate);
  }

  let builtWeatherQuery = new PQ({text: `SELECT * FROM weather ${queryConditions.length > 0 ? 'WHERE' : ''} ${queryConditions.join(' AND ')}`, values: queryValues});

  db.many(builtWeatherQuery)
    .then(function (data) {
      res.status(200).json({
        results: data,
      });
    })
    .catch(function (error) {
      console.log("ERROR:", error);
      res.status(500).send('Internal Server Error!');
    });
});

app.listen(port, () => {
  console.log(`Listening`);
});
