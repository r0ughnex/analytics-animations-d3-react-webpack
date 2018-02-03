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
import Home from "views/Home"

// styles
/* --empty block-- */

console.log("main/App.test.js: test loaded.");
// -------------------------------------
//   Main - App Test
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
        // the main root
        // app element
        app: null
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

        // disable the default console logging
        // clear the screen for the test logs
        console.twarn = console.warn;
        console.tlog  = console.log;
        console.warn  = () => { };
        console.log   = () => { };
    }

    // @name _beforeInitialRender
    // @desc function run before any render tests start.
    static _beforeInitialRender() {
        // render a shallow version of the app
        this._els.app = shallow(<App></App>);
    }

    // @name _afterInitialRender
    // @desc function run after all render tests complete.
    static _afterInitialRender() {
        // reset the rendered app
        this._els.app = null;
    }

    // _testInitialRender
    // @desc function to test the initial app render.
    static _testInitialRender() {
        // test for main element
        it("it should render the main app without crashing", () => {
            const aps = `.app`; // app selector
            expect(this._els.app.find(`${aps}`))
                .toHaveLength(1);
        });

        // test for router switch
        it("it should render only one route <Switch> item", () => {
            expect(this._els.app.find(Switch))
                .toHaveLength(1);
        });

        // test for router routes
        it("it should render atleast one view <Route> item", () => {
            expect(this._els.app.find(Route).length)
                .toBeGreaterThanOrEqual(1);
        });

        // test for router routes
        it("it should contain atleast one <Route> to Home", () => {
            expect(this._els.app.contains(
                <Route path="/home" component={Home}></Route>))
                .toEqual(true);
        });

        // test for router redirects
        it("it should render atleast one <Redirect> item", () => {
            expect(this._els.app.find(Redirect).length)
                .toBeGreaterThanOrEqual(1);
        });

        // test for router redirects
        it("it should contain atleast one <Redirect> to Home", () => {
            expect(this._els.app.contains(
                <Redirect from="/" to="home"></Redirect>))
                .toEqual(true);
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

        // describe a block to group the initial render tests
        describe("<App></App>: _testInitialRender()", () => {
            // execute before all the render tests are run
            beforeAll(() => { this._beforeInitialRender(); });

            // test the initial render
            this._testInitialRender();

            // execute after all the render tests are run
            afterAll(() => { this._afterInitialRender(); });
        });
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
AppTest.run(); // run the app test
