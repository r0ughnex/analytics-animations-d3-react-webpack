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
    // reference to all the rendered
    // shallow DOM elements in the app
    static _els = {
        app: null // the root app element
    };

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
    // @name _configure
    // @desc function to configure the app test.
    static _configure() {
        // configure enzyme to use the
        // adapter you want it to use
        configure({adapter: new Adapter()});
    }

    // @name _beforeEacg
    // @desc function run before each test starts.
    static _beforeEach() {
        // render a shallow version of the app
        this._els.app = shallow(<App></App>);
    }

    // @name _afterEach
    // @desc function run after each test completes.
    static _afterEach() {
        // reset the rendered app
        this._els.app = null;
    }

    // _testRender
    // @desc function to test the app render.
    static _testRender() {
        // test for main element
        it("it should render the app without crashing", () => {
            expect(this._els.app.find(".app"))
                .toHaveLength(1);
        });

        // test for router switch
        it("it should render only one <Switch> item", () => {
            expect(this._els.app.find(Switch))
                .toHaveLength(1);
        });

        // test for route routes
        it("it should render atleast one view <Route> item", () => {
            expect(this._els.app.find(Route).length)
                .toBeGreaterThanOrEqual(1);
        });

        // test for router redirects
        it("it should render atleast one default <Redirect> item", () => {
            // note: you could uses this._els.app.setProps({key: value})
            // to change the value of props supplied to the rendered app
            expect(this._els.app.find(Redirect).length)
                .toBeGreaterThanOrEqual(1);
        });
    }

    // ---------------------------------------------
    //   Public methods
    // ---------------------------------------------
    /* --empty block-- */

    // ---------------------------------------------
    //   Run block
    // ---------------------------------------------
    // @name run
    // @desc the run function for the app test.
    static run() {
        console.log("main/App.test.js: run() called.");

        // configure test
        this._configure();

        // describe a block to group tests
        describe("<App></App>", () => {
            // execute before
            // each test run
            beforeEach(() => {
                this._beforeEach();
            });

            // test the render
            this._testRender();

            // execute after
            // each test run
            afterEach(() => {
                this._afterEach();
            });
        });
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
AppTest.run(); // run the app test
