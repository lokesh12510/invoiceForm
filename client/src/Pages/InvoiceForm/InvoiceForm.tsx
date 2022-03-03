import {
  Button,
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { InvoiceAPI } from "./InvoiceAPI";
import { InvoiceValidationSchema } from "../../validationSchema/InvoiceFormValidation";
import FormikControl from "../../components/FormikControl/FormikControl";
import InvoiceTableContainer from "./InvoiceTableContainer";
import { IState } from "./type";
import { useAppContext } from "../../App/Context";
import { Link } from "react-router-dom";
// Styles
import { styled } from "@mui/material/styles";
import { DefaultTheme } from "../../theme/DefaultTheme";
// Icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const InvoiceForm = () => {
  const budgetOptions = [
    { key: "select an option", value: "" },
    { key: "Core", value: "Core" },
    { key: "Capital", value: "Capital" },
    { key: "Capacity Building", value: "Capacity Building" },
  ];

  const [grandTotal, setGrandTotal] = useState(0);
  const [inv_image, setInv_image] = useState("");

  // InitialState
  const initialValues: IState = {
    provider_name: "",
    participant_name: "",
    inv_number: "",
    inv_date: null,
    budget_allocation: "",
    inv_items: [
      {
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
    ],
    total_amount: 0,
    image: null,
  };

  // Check for file type
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

  // eslint-disable-next-line
  const { state, dispatch } = useAppContext();

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();

    // Generate FormData
    const formData = new FormData();
    formData.append("provider_name", values.provider_name);
    formData.append("participant_name", values.participant_name);
    formData.append("inv_number", values.inv_number);
    formData.append("inv_date", values.inv_date);
    formData.append("budget_allocation", values.budget_allocation);
    formData.append("total_amount", grandTotal.toString());
    formData.append("inv_items", JSON.stringify(values.inv_items));
    formData.append("image", inv_image);

    // Create Invoice Service call
    InvoiceAPI.createInvoice(
      formData,
      () => {
        dispatch({ type: "START_LOADING" });
      },
      handleSuccessData,
      handleError,
      () => {
        dispatch({ type: "STOP_LOADING" });
      }
    );
    setInv_image("");
  };

  const handleSuccessData = (data) => {
    dispatch({
      type: "SHOW_MSG",
      payload: { type: "success", message: data.data.message },
    });
  };
  const handleError = (err) => {
    dispatch({
      type: "SHOW_MSG",
      payload: { type: "error", message: "Error Occurred!" },
    });
  };

  return (
    <Root>
      <Container className="bg_container" maxWidth="xl">
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h5" component="div" color={"secondary"}>
            Create Invoice
          </Typography>
          <Button
            component={Link}
            to="/invoice-list"
            variant="outlined"
            size="small"
            color="secondary"
          >
            View Invoice
          </Button>
        </Stack>
        <Divider />
        <Formik
          initialValues={initialValues}
          validationSchema={InvoiceValidationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form className="form">
                <Grid
                  container
                  justifyContent={"space-between"}
                  spacing={{ xs: 0, md: 4 }}
                  mb={5}
                >
                  <Grid item xs={12} md={6}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      size="small"
                      id="Provider"
                      label="Provider Name"
                      name="provider_name"
                      className="field"
                    />
                    <FormikControl
                      control="input"
                      variant="outlined"
                      size="small"
                      id="Participants"
                      label="Participants Name"
                      name="participant_name"
                      className="field"
                    />
                    <FormikControl
                      control="input"
                      variant="outlined"
                      size="small"
                      id="Invoice Number"
                      label="Invoice Number"
                      name="inv_number"
                      className="field"
                    />
                    <FormikControl
                      control="date"
                      variant="outlined"
                      size="small"
                      id="date"
                      label="Invoice Date"
                      name="inv_date"
                      className="field"
                    />
                  </Grid>

                  <Grid item xs={12} md={5}>
                    <FormikControl
                      control="select"
                      variant="outlined"
                      size="small"
                      id="budget_allocation"
                      label="Select Budget"
                      name="budget_allocation"
                      defaultValue=""
                      options={budgetOptions}
                      className="field"
                    />
                  </Grid>

                  <Grid item xs={12} mb={{ xs: "10px", md: "0px" }}>
                    {/* Items table Container */}
                    <InvoiceTableContainer
                      setGrandTotal={setGrandTotal}
                      grandTotal={grandTotal}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label htmlFor="contained-button-file">
                      <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleInvImage}
                        style={{ display: "none" }}
                      />
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={3}
                        style={{
                          border: `1px dashed ${DefaultTheme.palette.primary.main}`,
                          padding: "15px",
                        }}
                        className="uploadDiv"
                      >
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload
                        </Button>
                        <p>{inv_image["name"]}</p>
                      </Stack>
                    </label>
                  </Grid>
                </Grid>

                <Button
                  className="submitBtn"
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Root>
  );
};

export default InvoiceForm;

const Root = styled("div")((theme) => ({
  paddingBlock: "10px",
  "& .bg_container": {
    backgroundColor: "#a7afb72b",
    padding: "20px 20px",
    "& .form": {
      marginTop: "30px",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "8.5px 14px",
  },
  "& .MuiOutlinedInput-root": {
    padding: "0",
  },
  "& .MuiTableCell-root": {
    padding: "9px 10px",
  },
  "& . MuiTableCell-head": {
    lineHeigth: "1rem",
  },
  "& .field": {
    marginBottom: "12px",
  },
  "& .submitBtn": {
    minWidth: "240px",
  },
  "& .uploadDiv": {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: `${DefaultTheme.palette.primary.main}0f`,
    },
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
    "& .submitBtn": {
      minWidth: "100%",
    },
  },
}));
