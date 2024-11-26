import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Header from "./components/Header.jsx";
import "./assets/styles/css/output.css";
import Footer from "./components/Footer.jsx";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <>
    <Header />
    <App />
    <Footer />
  </>
);
