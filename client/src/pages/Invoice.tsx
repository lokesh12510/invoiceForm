import {
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
// Styles
import { styled } from "@mui/material/styles";
import { FormTextField } from "../theme/Input";
import TableView from "../components/TableView";
import { InvoiceService } from "../services/InvoiceService";

export interface IState {
  providerName: string;
  participantName: string;
  inv_num: string;
  inv_date: string;
  budget: string;
  rowCount: {
    id: number;
    start_date: string;
    end_date: string;
    credit: string;
    active: boolean;
    item_num: string;
    desc: string;
    unit: string;
    price: string;
    gst_code: string;
    amount: string;
  }[];
  grandTotal: number;
  inv_image: File;
}

const Invoice = () => {
  // Row items
  const [rowCount, setRowCount] = useState<IState["rowCount"]>([
    {
      id: new Date().getDate() * Math.floor(Math.random() * 1000),
      start_date: "",
      end_date: "",
      credit: "",
      active: false,
      item_num: "",
      desc: "",
      unit: "",
      price: "",
      gst_code: "",
      amount: "",
    },
  ]);
  // Grand total
  const [grandTotal, setGrandTotal] = useState<IState["grandTotal"]>(0);

  // Invoice Details
  const [providerName, setProviderName] = useState<IState["providerName"]>("");
  const [participantName, setParticipantName] =
    useState<IState["participantName"]>("");
  const [inv_num, setInv_num] = useState<IState["inv_num"]>("");
  const [inv_date, setInv_date] = useState<IState["inv_date"]>("");
  const [budget, setBudget] = useState<IState["budget"]>("");
  const [inv_image, setInv_image] = useState("");

  const handleInvImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      if (/^image\//.test(e.target.files[0].type)) {
        setInv_image(e.currentTarget.files[0]);
        // setInv_image(e.target.files[0]);
      } else {
        console.log("Image not supported");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(rowCount);
    const formData = new FormData();
    formData.append("provider_name", providerName);
    formData.append("participant_name", participantName);
    formData.append("inv_number", inv_num);
    formData.append("inv_date", inv_date);
    formData.append("budget_allocation", budget);
    formData.append("total_amount", grandTotal.toString());
    formData.append("inv_items", JSON.stringify(rowCount));
    formData.append("image", inv_image);
    //   for (var key of formData.entries()) {
    //     console.log(key[0] + ', ' + key[1]);
    // }
    // console.log(formData.get("image"));
    // var request = new XMLHttpRequest();
    // request.open("POST", "/formdata");
    // request.send(formData);

    InvoiceService.createInvoice(
      formData,
      () => {
        console.log("started");
      },
      handleSuccessData,
      handleError,
      () => {
        console.log("ended");
      }
    );
  };

  const handleSuccessData = (data) => {
    console.log(data);
  };
  const handleError = (err) => {
    console.log(err);
  };

  return (
    <Root>
      <Container className="bg_container" maxWidth="xl">
        <Typography variant="h5" mb={5} component="div">
          Create Invoice
        </Typography>
        <div className="">
          <form
            action=""
            className="form"
            onSubmit={handleSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <Grid
              container
              justifyContent={"space-between"}
              spacing={{ xs: 0, md: 4 }}
              mb={5}
            >
              <Grid item xs={12} md={6}>
                {/* Input Field */}
                <Grid
                  container
                  direction="row"
                  mb={4}
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <Grid item xs={4} className="label_grid">
                    <label htmlFor="Provider">Provider Name</label>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <FormTextField
                      size="small"
                      id="Provider"
                      label="Provider Name"
                      variant="outlined"
                      value={providerName}
                      onChange={(e) => setProviderName(e.target.value)}
                      required
                    />
                  </Grid>
                </Grid>
                {/* Input Field */}
                {/* Input Field */}
                <Grid
                  container
                  direction="row"
                  mb={4}
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <Grid item xs={4} className="label_grid">
                    <label htmlFor="Participants">Participants Name</label>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <FormTextField
                      size="small"
                      id="Participants"
                      label="Participants Name"
                      variant="outlined"
                      value={participantName}
                      onChange={(e) => setParticipantName(e.target.value)}
                      required
                    />
                  </Grid>
                </Grid>
                {/* Input Field */}
                {/* Input Field */}
                <Grid
                  container
                  direction="row"
                  mb={4}
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <Grid item xs={4} className="label_grid">
                    <label htmlFor="Invoice">Invoice Number</label>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <FormTextField
                      size="small"
                      id="Invoice"
                      label="Invoice Number"
                      variant="outlined"
                      type={"number"}
                      value={inv_num}
                      onChange={(e) => setInv_num(e.target.value)}
                      required
                      style={{ touchAction: "none" }}
                    />
                  </Grid>
                </Grid>
                {/* Input Field */}
                {/* Input Field */}
                <Grid
                  container
                  direction="row"
                  mb={4}
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <Grid item xs={4} className="label_grid">
                    <label htmlFor="date">Invoice Date</label>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <FormTextField
                      size="small"
                      id="date"
                      label="Invoice Date"
                      variant="outlined"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={inv_date}
                      onChange={(e) => setInv_date(e.target.value)}
                      required
                    />
                  </Grid>
                </Grid>
                {/* Input Field */}
              </Grid>

              <Grid item xs={12} md={5}>
                <Grid
                  container
                  alignItems={"center"}
                  mb={4}
                  justifyContent={"center"}
                >
                  <Grid item xs={4} className="label_grid">
                    <label htmlFor="Invoice">Budget Allocation</label>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <FormTextField
                      size="small"
                      id="outlined-select-currency"
                      select
                      label="Select Budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      required
                      //   helperText="Please select your currency"
                    >
                      <MenuItem key={1} value={"Core"}>
                        Core
                      </MenuItem>
                      <MenuItem key={2} value={"Capital"}>
                        Capital
                      </MenuItem>
                      <MenuItem key={3} value={"Capacity Building"}>
                        Capacity Building
                      </MenuItem>
                    </FormTextField>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TableView
                  setRowCount={setRowCount}
                  rowCount={rowCount}
                  setGrandTotal={setGrandTotal}
                  grandTotal={grandTotal}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleInvImage}
                />
              </Grid>
            </Grid>
            <Button
              className="submitBtn"
              variant="contained"
              size="large"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </Root>
  );
};

export default Invoice;

const Root = styled("div")((theme) => ({
  paddingBlock: "30px",
  "& .bg_container": {
    backgroundColor: "#a7afb72b",
    padding: "40px 20px",
  },
  "& .submitBtn": {
    minWidth: "240px",
  },

  "@media (min-width: 600px)": {
    "& .MuiInputLabel-root": {
      display: "none",
    },
    "& fieldset legend": {
      display: "none",
    },
  },
  "@media (max-width: 600px)": {
    "& .form .label_grid": {
      display: "none",
    },
  },
}));
