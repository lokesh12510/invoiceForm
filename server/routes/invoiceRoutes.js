const express = require("express");
const upload = require("../utils/multer");

const router = express.Router();
const {
  createInvoice,
  getInvoiceList,
  getInvoice,
} = require("../controllers/invoiceController");

router.get("/", getInvoiceList);
// router.get("/", (req, res) => {
//   res.status(200).json("Invoice Listing!");
// });

router.post("/create", upload.single("image"), createInvoice);

router.get("/:id", getInvoice);

module.exports = router;
