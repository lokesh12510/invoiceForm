import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";

const InvoiceTableContainer = ({ children }) => {
  return (
    <Root>
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
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
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
