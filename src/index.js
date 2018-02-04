// -------------------------------------
//   Dependencies
// -------------------------------------
// pre
import entries from "object.entries";
import "normalize.css";
import "./index.css";

// core
import React from "react"; /*
import ReactDOM from "react-dom"; */
import {render} from 'react-snapshot';
import {BrowserRouter} from "react-router-dom";

// base
import query from "base/query";

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
    // @name addPolyfills
    // @desc function to add polyfills to the build.
    static addPolyfills = () => {
        // add a polyfill for HTMLElement.classList method
        // since IE <= 11 does not support it on svg elements
        if (!("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {
            let descr = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "classList");
            Object.defineProperty(SVGElement.prototype, "classList", descr);
        }

        // add a polyfill for the Object.entries
        // method since babel does not include it
        if (!Object.entries) { entries.shim(); }
    }

    // ---------------------------------------------
    //   Render block
    // ---------------------------------------------
    // @name render
    // @desc the render function for the index.
    static render() {
        console.log("_______________________________");
        console.log("main/Index.js: render() called.");

        /*
        // manually render the main app on the parent root element
        ReactDOM.render(<BrowserRouter><App></App></BrowserRouter>, query("#root")[0]); */
        render(<BrowserRouter><App></App></BrowserRouter>, query("#root")[0]); /* ssr */

        registerServiceWorker(); // register service worker for pwa

        /*
        console.log("main/Index.js: render called."); */
        console.log("_______________________________");
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
Index.addPolyfills(); // add polyfills
Index.render(); // run the index render
