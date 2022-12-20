import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
    {/* <Footer /> */}
  </Router>,
  document.getElementById("root")
);