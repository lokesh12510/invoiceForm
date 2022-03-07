import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useAppContext } from "../../App/Context";
import { InvoiceAPI } from "./InvoiceAPI";
import styled from "@emotion/styled";
import {
  Button,
  Container,
  Divider,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import { InvoiceTableState } from "./type";
import moment from "moment";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export default function InvoiceListContainer() {
  // eslint-disable-next-line
  const { state, dispatch } = useAppContext();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [invoiceList, setInvoiceList] = useState<InvoiceTableState[]>([]);

  useEffect(() => {
    InvoiceAPI.getInvoiceList(
      {},
      () => {
        dispatch({ type: "START_LOADING" });
      },
      handleSuccessData,
      handleError,
      () => {
        dispatch({ type: "STOP_LOADING" });
      }
    );
    // eslint-disable-next-line
  }, []);

  const handleSuccessData = (data) => {
    setInvoiceList(data.data.data);
  };
  const handleError = (err) => {
    dispatch({
      type: "SHOW_MSG",
      payload: { type: "error", message: "Error Occurred!" },
    });
  };
  return (
    <Root maxWidth="xl">
      <Stack
        direction={"row"}
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h5" component="div" color={"secondary"}>
          Invoice List
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          size="small"
          color="secondary"
        >
          Add Invoice
        </Button>
      </Stack>
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Provider Name</TableCell>
              <TableCell>Participant Name</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Item Count</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!state.loading &&
              invoiceList.length > 0 &&
              invoiceList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.provider_name}
                    </TableCell>
                    <TableCell>{item.participant_name}</TableCell>
                    <TableCell>{item.inv_number}</TableCell>
                    <TableCell>
                      {moment(item.inv_date).format("Do MMM YYYY")}
                    </TableCell>
                    <TableCell>{item.length}</TableCell>
                    <TableCell>{item.total_amount}</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        endIcon={item.inv_doc && <RemoveRedEyeIcon />}
                        component={"a"}
                        target={"_blank"}
                        href={item.inv_doc}
                      >
                        {item.inv_doc ? item.inv_doc.split("/").slice(-1) : ""}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            {invoiceList.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={invoiceList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Root>
  );
}

const Root = styled(Container)((theme) => ({
  marginBlock: "30px",
  paddingBlock: "20px",
  backgroundColor: "#a7afb72b",
  "& .MuiTableCell-body": {
    paddingBlock: "0px",
  },
  "& .MuiTableRow-root": {
    height: "40px",
  },
}));
