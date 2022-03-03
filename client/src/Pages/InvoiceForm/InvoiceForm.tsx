import {
  Button,
  Container,
  Grid,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray } from "formik";
// Styles
import { styled } from "@mui/material/styles";
import { InvoiceAPI } from "./InvoiceAPI";
import { InvoiceValidationSchema } from "../../validationSchema/InvoiceFormValidation";
import FormikControl from "../../components/FormikControl/FormikControl";
import InvoiceTableContainer from "./InvoiceTableContainer";
import { AddCircleOutlined, Delete } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IState } from "./type";
import { DefaultTheme } from "../../theme/DefaultTheme";

import { useAppContext } from "../../App/Context";
import { Link } from "react-router-dom";

const InvoiceForm = () => {
  const budgetOptions = [
    { key: "select an option", value: "" },
    { key: "Core", value: "Core" },
    { key: "Capital", value: "Capital" },
    { key: "Capacity Building", value: "Capacity Building" },
  ];
  const creditOptions = [
    { key: "Credit", value: "Credit" },
    { key: "Cash", value: "Cash" },
  ];

  const checkboxOptions = [{ key: "Active", value: "Active" }];

  const [grandTotal, setGrandTotal] = useState(0);
  const [inv_image, setInv_image] = useState("");

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

  const { state, dispatch } = useAppContext();
  console.log(state);

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    const formData = new FormData();
    formData.append("provider_name", values.provider_name);
    formData.append("participant_name", values.participant_name);
    formData.append("inv_number", values.inv_number);
    formData.append("inv_date", values.inv_date);
    formData.append("budget_allocation", values.budget_allocation);
    formData.append("total_amount", grandTotal.toString());
    formData.append("inv_items", JSON.stringify(values.inv_items));
    formData.append("image", inv_image);
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
    console.log(data);
    dispatch({
      type: "SHOW_MSG",
      payload: { type: "success", message: data.data.message },
    });
  };
  const handleError = (err) => {
    console.log(err);
    dispatch({
      type: "SHOW_MSG",
      payload: { type: "error", message: "Error Occurred!" },
    });
  };

  useEffect(() => {
    console.log(inv_image);
  }, [inv_image]);

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
          // innerRef={ref}
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
                    <FieldArray name="inv_items">
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps;
                        const { values } = form;
                        const { inv_items } = values;
                        setGrandTotal(0);
                        return (
                          <Grid container>
                            <Grid item xs={12}>
                              <InvoiceTableContainer>
                                {inv_items.map((item, index) => {
                                  // total += Number(item.amount);
                                  setGrandTotal(
                                    (total) => total + Number(item.amount)
                                  );
                                  return (
                                    <TableRow
                                      key={index}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell>
                                        <FormikControl
                                          control="date"
                                          tableField="true"
                                          variant="outlined"
                                          size="small"
                                          id="start_date"
                                          name={`inv_items.${index}.start_date`}
                                          className="date_input"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <FormikControl
                                          control="date"
                                          tableField="true"
                                          variant="outlined"
                                          size="small"
                                          id="end_date"
                                          name={`inv_items.${index}.end_date`}
                                          className="date_input"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <FormikControl
                                          tableField="true"
                                          control="select"
                                          variant="outlined"
                                          size="small"
                                          id="credit"
                                          label="Select credit"
                                          name={`inv_items.${index}.credit`}
                                          options={creditOptions}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <FormikControl
                                          tableField="true"
                                          control="checkbox"
                                          variant="outlined"
                                          size="small"
                                          id="active"
                                          label="Select active"
                                          name={`inv_items.${index}.active`}
                                          options={checkboxOptions}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <FormikControl
                                          tableField="true"
                                          control="input"
                                          label="item_num"
                                          name={`inv_items.${index}.item_num`}
                                          variant="outlined"
                                          size="small"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <FormikControl
                                          tableField="true"
                                          control="textarea"
                                          label="description"
                                          name={`inv_items.${index}.desc`}
                                          variant="outlined"
                                          size="small"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <FormikControl
                                          tableField="true"
                                          control="input"
                                          label="unit"
                                          name={`inv_items.${index}.unit`}
                                          variant="outlined"
                                          size="small"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <FormikControl
                                          tableField="true"
                                          control="input"
                                          label="price"
                                          name={`inv_items.${index}.price`}
                                          variant="outlined"
                                          size="small"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <FormikControl
                                          tableField="true"
                                          control="input"
                                          label="gst_code"
                                          name={`inv_items.${index}.gst_code`}
                                          variant="outlined"
                                          size="small"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <FormikControl
                                          tableField="true"
                                          control="input"
                                          label="amount"
                                          name={`inv_items.${index}.amount`}
                                          variant="outlined"
                                          size="small"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        {index > 0 && (
                                          <IconButton
                                            onClick={() => remove(index)}
                                          >
                                            <Delete />
                                          </IconButton>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </InvoiceTableContainer>
                            </Grid>
                            <Grid item xs={6}>
                              <Button
                                variant="outlined"
                                type="button"
                                onClick={() => push(initialValues.inv_items[0])}
                                startIcon={<AddCircleOutlined />}
                                color="secondary"
                              >
                                Add Item
                              </Button>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                variant="h5"
                                component={"p"}
                                textAlign="end"
                                className="totalTxt"
                                color={"secondary"}
                              >
                                Total : {grandTotal}
                              </Typography>
                            </Grid>
                          </Grid>
                        );
                      }}
                    </FieldArray>
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
