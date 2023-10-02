import React from "react";
import ReactDOM from "react-dom/client";
import Wordle from "./Wordle";
import Header from "./components/Header";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header />
    <Wordle />
  </React.StrictMode>
);
