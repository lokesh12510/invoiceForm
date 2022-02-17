import React from "react";
import { Routes, Route } from "react-router-dom";
import InvoiceList from "./pages/InvoiceList";
import Invoice from "./pages/Invoice";
import Appbar from "./components/Appbar";

function App() {
  return (
    <div className="App">
      <Appbar />
      <Routes>
        <Route path="/" element={<Invoice />} />
        <Route path="/invoice-list" element={<InvoiceList />} />
      </Routes>
    </div>
  );
}

export default App;
