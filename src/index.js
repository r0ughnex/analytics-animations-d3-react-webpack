// -------------------------------------
//   Dependencies
// -------------------------------------
// core
import React from "react";
import ReactDOM from "react-dom";

// base
/* --empty block-- */

// modules
import registerServiceWorker from "./registerServiceWorker";

// services
/* --empty block-- */

// components
import App from "./App";

// views
/* --empty block-- */

// styles
import "normalize.css";
import "./index.css";

// -------------------------------------
//   Main - Index
// -------------------------------------
ReactDOM.render(<App></App>, document.getElementById("root"));
registerServiceWorker();

// ---------------------------------------------
//   Export block
// ---------------------------------------------
/* --empty block-- */
