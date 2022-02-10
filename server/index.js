const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// connect DB
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "invoice_db",
});

// create invoice
app.post("/create", (req, res) => {
  const provider_name = req.body.provider_name;
  const budget_allocation = req.body.budget_allocation;
  const participant_name = req.body.participant_name;
  const inv_number = req.body.inv_number;
  const inv_date = req.body.inv_date;
  const total_amount = req.body.total_amount;
  const inv_items = JSON.stringify(req.body.inv_items);
  const inv_doc = req.body.inv_doc;

  db.query(
    "INSERT INTO invoice (provider_name,budget_allocation,participant_name,inv_number,inv_date,total_amount,inv_items,inv_doc) VALUES (?,?,?,?,?,?,?,?)",
    [
      provider_name,
      budget_allocation,
      participant_name,
      inv_number,
      inv_date,
      total_amount,
      inv_items,
      inv_doc,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values Inserted!");
      }
    }
  );
});

// get invoice
app.get("/invoices", (req, res) => {
  db.query("SELECT * FROM invoice", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(result));
      const data = JSON.stringify(result);
      res.send(JSON.parse(data));
    }
  });
});

app.listen(3001, () => {
  console.log("DB is working on 3001");
});
