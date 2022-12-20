import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <Router>
    {/* <Navigation /> */}
    <Routes>
      <Route path="/" element={<App />} />
      {/* <Route path="/about" element={<About />} />
      <Route path="/tree" element={<Contact />} /> */}
    </Routes>
    {/* <Footer /> */}
  </Router>,
  document.getElementById("root")
);