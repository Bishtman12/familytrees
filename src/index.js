import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";
import About from "./about";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
ReactDOM.render(
  <Router>
    {/* <Navbar /> */}
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);