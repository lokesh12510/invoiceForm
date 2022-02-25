require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

// routes
const InvoiceRoute = require("./routes/invoiceRoutes");
const ImageUpload = require("./routes/uploadRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// Invoice routes
app.use("/api/invoice", InvoiceRoute);
app.use("/api/tools", ImageUpload);

app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
  console.log("DB is working on 3001");
});
