import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import InvoiceList from "./features/invoice/InvoiceList";
import Invoice from "./features/invoice/Invoice";
import Appbar from "./components/Appbar";
import Toast from "./components/Toast";
import { useAppContext } from "./Context";
import { CircularProgress } from "@mui/material";
function App() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    dispatch({ type: "START_LOADING" });
    setTimeout(() => {
      dispatch({ type: "STOP_LOADING" });
    }, 1000);
  }, [dispatch]);

  return (
    <div className="App">
      {!state.loading && state.message && (
        <Toast type={state.message.type} message={state.message.data} />
      )}
      {state.loading && (
        <CircularProgress
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: "auto",
            zIndex: "1051",
          }}
        />
      )}

      <Appbar />
      <Routes>
        <Route path="/" element={<Invoice />} />
        <Route path="/invoice-list" element={<InvoiceList />} />
      </Routes>
    </div>
  );
}

export default App;
