require("dotenv").config();

const express = require("express");
const upload = require("./utils/multer");
const { cloudinary } = require("./utils/cloudinary");

const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.use(errorHandler)

// connect DB
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "invoice_db",
});

// create invoice
app.post("/create", upload.single("image"), async (req, res) => {
  const provider_name = req.body.provider_name;
  const budget_allocation = req.body.budget_allocation;
  const participant_name = req.body.participant_name;
  const inv_number = req.body.inv_number;
  const inv_date = req.body.inv_date;
  const total_amount = req.body.total_amount;
  const inv_items = JSON.parse(req.body.inv_items);

  // cloudinary.v2.uploader.upload(file, options, callback);
  const result = await cloudinary.uploader.upload(req.file.path);

  let inv_doc = result.secure_url;

  console.log(inv_doc)

  let sql = `CALL create_invoice(?,?,?,?,?,?,?)`;

  db.query(
    sql,
    [
      provider_name,
      budget_allocation,
      participant_name,
      inv_number,
      inv_date,
      total_amount,
      inv_doc,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (inv_number) {
          const values = [];

          for (let i = 0; i < inv_items.length; i++) {
            values.push([
              [inv_items[i].start_date],
              [inv_items[i].end_date],
              [inv_number],
              [inv_items[i].active],
              [inv_items[i].desc],
              [inv_items[i].unit],
              [inv_items[i].price],
              [inv_items[i].gst_code],
              [inv_items[i].amount],
            ]);
          }

          db.query(
            "INSERT INTO item_lists (start_date,end_date,inv_number,active,description,unit,price,gst_code,amount) VALUES ?",
            [values],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.status(200).json("Invoice Inserted!");
              }
            }
          );
        }
      }
    }
  );
});

// Upload Image
app.post("/invoice/upload", upload.single("image"), async (req, res) => {
  console.log("File", req.file);

  // cloudinary.v2.uploader.upload(file, options, callback);
  const result = await cloudinary.uploader.upload(req.file.path);

  console.log(result, "res");

  const post_details = {
    title: new Date(),
    image: result.secure_url,
  };

  res.status(200).json(post_details);
});

// get invoices list
app.get("/invoice-list", (req, res) => {
  db.query("SELECT * FROM invoice", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const data = JSON.stringify(result);
      res.send(JSON.parse(data));
    }
  });
});

// get invoice
app.get(`/invoice/:id`, (req, res) => {
  id = req.params.id;
  // let invoice = `select * from invoice as i inner join item_lists as l on i.inv_number=l.inv_number WHERE i.inv_number=${id}`;
  let invoice = `select * FROM item_lists as l WHERE l.inv_number=${id}`;

  db.query(invoice, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const data = JSON.stringify(result);
      res.send(JSON.parse(data));
    }
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("DB is working on 3001");
});
