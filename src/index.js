import React from "react";
import { render } from "react-dom";
import Tree from "./Tree";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => <Tree />;

render(<App />, document.getElementById("root"));
