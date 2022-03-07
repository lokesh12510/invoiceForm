const mysql = require("mysql");

// connect DB
const db = mysql.createConnection({
  user: "sql6476679",
  host: "sql6.freemysqlhosting.net",
  password: "WfKCVFS5xH",
  database: "sql6476679",
});

module.exports = db;
