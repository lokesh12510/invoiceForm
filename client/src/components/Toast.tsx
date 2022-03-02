import React, { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const Toast = ({ children, type }) => {
  useEffect(() => {
    setOpen(true);
    setTimeout(() => {}, 5000);
  }, []);

  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      sx={{ bottom: { xs: 0, sm: 30 } }}
    >
      <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
        {children}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
