// -------------------------------------
//   Dependencies
// -------------------------------------
// pre
/* --empty block-- */

// core
import React from "react";
import ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";
import {Switch, Redirect, Route} from "react-router-dom";

// base
import {configure, shallow} from "enzyme";

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
        console.log("main/App.test.js: run() called.");

        configure({adapter: new Adapter()});
        const elApp = shallow(<App></App>);

        describe("<App></App>", () => {

            it("it should render only one <Switch> item", () => {
                expect(elApp.find(Switch)).toHaveLength(1);
            });


            it("it should render atleast one view <Route> item", () => {
                expect(elApp.find(Route).length).toBeGreaterThanOrEqual(1);
            });

            it("it should render atleast one default <Redirect> item", () => {
                expect(elApp.find(Redirect).length).toBeGreaterThanOrEqual(1);
            });

        });

    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
AppTest.run(); // run the app test
