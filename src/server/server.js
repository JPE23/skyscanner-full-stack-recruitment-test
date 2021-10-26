/**
 * AUTHOR: JAMES EASY
 */

/**
 * IMPORTS
 * @type {e | (() => Express)}
 */
const cors = require("cors");
const express = require("express");
const helmet = require('helmet');
const path = require('path');

/**
 * EXPRESS
 */
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/**
 * CORS implemented so that we don"t get errors when trying to access the
 * server from a different server location
 */
app.use(cors({}));

/**
 * Helmet implemented to secure HTTP headers
 */
app.use(helmet());

/**
 * RETURNS FLIGHT.JSON
 */
app.get('/', function(req, res){
  res.sendFile(path.join('/home/james/Portfolio/personalprojects/linkmoodhq/coding-challenge-fullstack/public/flights.json'));
});

/**
 * PORT SETTINGS
 * @type {string|number}
 */
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`))
