// -------------------------------------
//   Dependencies
// -------------------------------------
// pre
import "normalize.css";
import "./index.css";

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
/* --empty block-- */

console.log("main/Index.js: index loaded.");
// -------------------------------------
//   Main - Index
// -------------------------------------
/**
    * @name Index
    * @desc class for the main index.
    * @return {Object} - the instance of the index class.
**/
class Index {
    // ---------------------------------------------
    //   Private members
    // ---------------------------------------------
    /* --empty block-- */

    // ---------------------------------------------
    //   Public members
    // ---------------------------------------------
    /* --empty block-- */

    // ---------------------------------------------
    //   Constructor block
    // ---------------------------------------------
    /* --empty block-- */

    // ---------------------------------------------
    //   Private methods
    // ---------------------------------------------
    /* --empty block-- */

    // ---------------------------------------------
    //   Public methods
    // ---------------------------------------------
    /* --empty block-- */

    // ---------------------------------------------
    //   Render block
    // ---------------------------------------------
    // @name render
    // @desc the render function for the index.
    static render() {
        console.log("_______________________________");
        console.log("main/Index.js: render() called.");

        // manually render the main app on the parent root element
        ReactDOM.render(<App></App>, document.getElementById("root"));
        registerServiceWorker(); // register service worker for pwa

        /*
        console.log("main/Index.js: render called."); */
        console.log("_______________________________");
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
Index.render();
