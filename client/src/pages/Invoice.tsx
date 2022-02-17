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
import React from "react";
// Styles
import { styled } from "@mui/material/styles";
import { FormTextField } from "../theme/Input";
import TableView from "../components/TableView";

const Invoice = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <Root>
      <Container className="bg_container" maxWidth="xl">
        <Typography variant="h5" mb={5} component="div">
          Create Invoice
        </Typography>
        <div className="">
          <form action="" className="form" onSubmit={handleSubmit}>
            <Grid
              container
              justifyContent={"space-between"}
              spacing={{ xs: 0, md: 4 }}
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
                      type={"date"}
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      value="Core"
                      label="Select Budget"
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
                <TableView />
              </Grid>
            </Grid>
            <Button variant="outlined" type="submit">
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
