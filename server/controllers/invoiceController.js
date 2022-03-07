const db = require("../database");
const { cloudinary } = require("../utils/cloudinary");

// @desc    Create Invoice
// @route   POST /api/invoice/create
// @access  Private
const createInvoice = async (req, res) => {
  if (
    !req.body.provider_name ||
    !req.body.budget_allocation ||
    !req.body.participant_name ||
    !req.body.inv_number ||
    !req.body.inv_date
  ) {
    res.status(400).json({ message: "Please check some fields are missing!" });
  }
  if (isNaN(Number(req.body.inv_number))) {
    res.status(400).json({ message: "Invalid input!" });
  }
  if (
    !["Core", "Capital", "Capacity Building"].includes(
      req.body.budget_allocation
    )
  ) {
    res.status(400).json({ message: "Invalid input!" });
  }

  const inv_number = req.body.inv_number;
  const inv_items = JSON.parse(req.body.inv_items);
  let invoiceImage = null;
  console.log(req.file);
  if (req.file) {
    // cloudinary.v2.uploader.upload(file, options, callback);
    const result = await cloudinary.uploader.upload(req.file.path);
    invoiceImage = result.secure_url;
  }

  console.log(req.body.inv_date);

  db.query(
    `CALL create_invoice(?,?,?,?,?,?,?)`,
    [
      req.body.provider_name,
      req.body.budget_allocation,
      req.body.participant_name,
      req.body.inv_number,
      new Date(req.body.inv_date).toISOString(),
      req.body.total_amount,
      invoiceImage,
    ],
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        if (inv_number) {
          const values = [];

          for (let i = 0; i < inv_items.length; i++) {
            values.push([
              new Date([inv_items[i].start_date]).toISOString(),
              new Date([inv_items[i].end_date]).toISOString(),
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
                res.status(400).json({ message: err });
              } else {
                res
                  .status(200)
                  .json({ message: "Invoice Inserted Successfully!" });
              }
            }
          );
        }
      }
    }
  );
};
// @desc    Get Invoice List
// @route   GET /api/invoice
// @access  Private
function promiseQuery(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
      return;
    });
  });
}
const getInvoiceList = (req, res) => {
  db.query("SELECT * FROM invoice", async (err, result) => {
    if (err) {
      // res.status(400).json({ message: err });
      return;
    } else {
      let invoiceData = [];
      for (let resultItem of result) {
        let invoice = `select * FROM item_lists as l WHERE l.inv_number=${resultItem.inv_number}`;
        let invoiceItem = resultItem;
        let item = await promiseQuery(invoice);
        invoiceItem["length"] = item.length;
        invoiceData.push(invoiceItem);
      }
      const data = invoiceData.reverse();
      res.status(200).json({
        data: data,
      });
    }
  });
};
// @desc    Get Single Invoice
// @route   GET /api/invoice/:id
// @access  Private
const getInvoice = (req, res) => {
  id = req.params.id;
  // let invoice = `select * from invoice as i inner join item_lists as l on i.inv_number=l.inv_number WHERE i.inv_number=${id}`;
  let invoice = `select * FROM item_lists as l WHERE l.inv_number=${id}`;
  console.log("invoice", id);
  db.query(invoice, (err, result) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      const data = JSON.stringify(result);
      res.status(200).json(JSON.parse(data));
    }
  });
};

module.exports = {
  createInvoice,
  getInvoiceList,
  getInvoice,
};
