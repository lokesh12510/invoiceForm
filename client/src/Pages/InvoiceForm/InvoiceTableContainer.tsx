import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormikControl from "../../components/FormikControl/FormikControl";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { FieldArray } from "formik";
import { TotalState } from "./type";
// Styles
import styled from "@emotion/styled";
// Icons
import { AddCircleOutlined, Delete } from "@mui/icons-material";

const InvoiceTableContainer: React.FC<TotalState> = ({
  setGrandTotal,
  grandTotal,
}) => {
  const creditOptions = [
    { key: "Credit", value: "Credit" },
    { key: "Cash", value: "Cash" },
  ];
  const checkboxOptions = [{ key: "Active", value: "Active" }];

  return (
    <Root>
      <FieldArray name="inv_items">
        {(fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps;
          const { values, initialValues } = form;
          const { inv_items } = values;
          setGrandTotal(0);
          return (
            <Grid container>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Credit Term</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Support Item Number</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Gst Code</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {inv_items.map((item, index) => {
                        // total += Number(item.amount);
                        setGrandTotal((total) => total + Number(item.amount));
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
                                <IconButton onClick={() => remove(index)}>
                                  <Delete />
                                </IconButton>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
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
    </Root>
  );
};

export default InvoiceTableContainer;

const Root = styled("div")((theme) => ({
  "& .MuiPaper-root": {
    marginBottom: "20px",
  },
  "& .MuiTableCell-root": {
    padding: "15px 10px",
  },
  "& .date_input": {
    maxWidth: "127px",
  },
  "& .totalTxt": {
    marginRight: "50px",
  },
}));
