const mysql = require("mysql");

// connect DB
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "invoice_db",
});

module.exports = db;
