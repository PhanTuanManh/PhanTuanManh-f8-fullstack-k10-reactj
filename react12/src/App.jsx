import React from "react";
import ProductTable from "./pages/admin/ProductTable";
import ProductForm from "./pages/admin/ProductForm";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductTable />} />
        <Route path="/add" element={<ProductForm />} />
        <Route path="/update/:id" element={<ProductForm />} />
      </Routes>
    </>
  );
};

export default App;
