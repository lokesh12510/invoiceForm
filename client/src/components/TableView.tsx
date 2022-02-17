import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import { Delete } from "@mui/icons-material";

interface InputFields {
  id: "string";
  startDate: "string";
  endDate: "string";
  credit: "string";
  active: "boolean";
  item_num: "string";
  desc: "string";
  unit: "string";
  price: "string";
  gst_code: "string";
  amount: "string";
}

const initialData = {
  id: new Date().getDate() * Math.floor(Math.random() * 1000),
  startDate: "",
  endDate: "",
  credit: "",
  active: false,
  item_num: "",
  desc: "",
  unit: "",
  price: "",
  gst_code: "",
  amount: "",
};

export default function TableView() {
  const [rowCount, setRowCount] = useState([initialData]);

  const handleRowCount = () => {
    setRowCount([
      ...rowCount,
      {
        id: new Date().getDate() * Math.floor(Math.random() * 1000),
        startDate: "",
        endDate: "",
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
  };

  const handleDeleteRow = (index: number) => {
    const values = [...rowCount];
    values.splice(index, 1);
    setRowCount(values);
  };

  const handleFormData = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const values = [...rowCount];
    values[index][event.target.name] = event.target.value;
    setRowCount(values);
  };

  const handleCheckboxData = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const values = [...rowCount];
    values[index]["active"] = !values[index]["active"];
    setRowCount(values);
  };

  const handleConsole = (e) => {
    e.preventDefault();
    console.log("submit", rowCount);
  };

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
          <TableBody>
            {rowCount.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <TextField
                    size="small"
                    id="start"
                    variant="outlined"
                    type={"date"}
                    className="date_input"
                    name="startDate"
                    value={row.startDate}
                    onChange={(e) => handleFormData(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    id="end"
                    variant="outlined"
                    type={"date"}
                    name="endDate"
                    className="date_input"
                    value={row.endDate}
                    onChange={(e) => handleFormData(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    id="credit"
                    select
                    variant="outlined"
                    name="credit"
                    value={row.credit}
                    onChange={(e) => handleFormData(index, e)}
                  >
                    <MenuItem key={1} value={"Credit"}>
                      Credit Only
                    </MenuItem>
                    <MenuItem key={2} value={"Cash"}>
                      Cash Only
                    </MenuItem>
                  </TextField>
                </TableCell>
                <TableCell>
                  <Checkbox
                    inputProps={{ "aria-label": "Checkbox demo" }}
                    name="active"
                    value={row.active}
                    onClick={(e) => handleCheckboxData(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    id="item_num"
                    variant="outlined"
                    name="item_num"
                    value={row.item_num}
                    onChange={(e) => handleFormData(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    id="desc"
                    name="desc"
                    variant="outlined"
                    multiline
                    value={row.desc}
                    onChange={(e) => handleFormData(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    id="unit"
                    name="unit"
                    variant="outlined"
                    type={"number"}
                    value={row.unit}
                    onChange={(e) => handleFormData(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    id="price"
                    name="price"
                    variant="outlined"
                    type={"number"}
                    value={row.price}
                    onChange={(e) => handleFormData(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    id="gst_code"
                    name="gst_code"
                    variant="outlined"
                    value={row.gst_code}
                    onChange={(e) => handleFormData(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    id="amount"
                    name="amount"
                    variant="outlined"
                    disabled
                    value={row.amount}
                    onChange={(e) => handleFormData(index, e)}
                  />
                </TableCell>
                <TableCell>
                  {rowCount.length > 1 && (
                    <IconButton onClick={() => handleDeleteRow(index)}>
                      <Delete />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" onClick={handleRowCount}>
        Add Item
      </Button>
    </Root>
  );
}

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
}));
