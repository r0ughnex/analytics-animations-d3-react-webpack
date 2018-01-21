// -------------------------------------
//   Dependencies
// -------------------------------------
// core
import React from "react";
import ReactDOM from "react-dom";

// base
/* --empty block-- */

// modules
/* --empty block-- */

// services
/* --empty block-- */

// components
import App from "./App";

// views
/* --empty block-- */

// styles
/* --empty block-- */

console.log("main/App.test.js: test loaded.");
// -------------------------------------
//   Main - AppTest
// -------------------------------------
/**
    * @name AppTest
    * @desc class for testing the main app.
    * @return {Object} - the instance of the test class.
**/
class AppTest {
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
    //   Run block
    // ---------------------------------------------
    // @name run
    // @desc the run function for the test.
    static run() {
        console.log("main/App.test.js: run called.");

        // execute the tests on the main app
        it("renders without crashing", () => {
            const div = document.createElement("div");
            ReactDOM.render(<App></App>, div);
        });

    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
AppTest.run();
