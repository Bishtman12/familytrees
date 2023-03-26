import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import About from "./about";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tree" element={<App />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);