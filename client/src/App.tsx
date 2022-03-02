import React from "react";
import { Routes, Route } from "react-router-dom";
import InvoiceList from "./features/invoice/InvoiceList";
import Invoice from "./features/invoice/Invoice";
import Appbar from "./components/Appbar";
import Toast from "./components/Toast";

function App() {
  return (
    <div className="App">
      <Toast type={"success"}>Invoice Added Successfully!</Toast>
      <Appbar />
      <Routes>
        <Route path="/" element={<Invoice />} />
        <Route path="/invoice-list" element={<InvoiceList />} />
      </Routes>
    </div>
  );
}

export default App;
