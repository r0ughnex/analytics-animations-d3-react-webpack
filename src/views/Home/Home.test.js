// -------------------------------------
//   Dependencies
// -------------------------------------
// pre
/* --empty block-- */

// core
import React from "react";
import ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";

// base
import {configure, shallow} from "enzyme";
import toTitleCase from "to-title-case";
import homeData from "./Home.data.json";

// modules
/* --empty block-- */

// services
/* --empty block-- */

// components
import Hero from "components/Hero";

// views
import Home from "./Home";

// styles
/* --empty block-- */

console.log("views/Home.test.js: test loaded.");
// -------------------------------------
//   View - Home Test
// -------------------------------------
/**
    * @name HomeTest
    * @desc class for testing the home view.
    * @return {Object} - the instance of the test class.
**/
class HomeTest {
    // ---------------------------------------------
    //   Private members
    // ---------------------------------------------
    // reference to all the rendered
    // shallow DOM elements in the view
    static _els = {
        // the main root
        // view element
        view: null
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
    // @desc function to configure the view test.
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
        // render a shallow version of the view
        this._els.view = shallow(<Home></Home>);
    }

    // @name _afterInitialRender
    // @desc function run after all render tests complete.
    static _afterInitialRender() {
        // reset the rendered view
        this._els.view = null;
    }

    // _testInitialRender
    // @desc function to test the initial view render.
    static _testInitialRender() {
        // test for main element
        it("it should render the home view without crashing", () => {
            const avs = ".app__view"; // app view selector
            const aps = ".app__page"; // app page selector

            // test for app view
            expect(this._els.view.find(`${avs}`))
                .toHaveLength(1);

            // test for app page
            expect(this._els.view.find(`${avs} > ${aps}`))
                .toHaveLength(1);

            // test for app page content
            expect(this._els.view.find(`${aps} > ${aps}__content`))
                .toHaveLength(1);
        });
    }

    // @name _beforeCustomState
    // @desc function run before custom state tests start.
    static _beforeCustomState() {
        // update the view state
        this._beforeInitialRender();
        this._els.view.setState({contents: homeData.contents});
    }

    // @name _afterCustomState
    // @desc function run after custom state tests complete.
    static _afterCustomState() {
        this._afterInitialRender();
    }

    // _testCustomState
    // @desc function to test the custom view state.
    static _testCustomState() {
        // test for sections, container
        it("it should render a section, container for each content", () => {
            // get all the view contents in the current state
            const contents = this._els.view.state().contents;

            // loop through each content in state
            contents.forEach((content, index) => {
                // get the content id
                const {id}  = content; // the current content id
                const ids = `.section#${id}`; // section selector

                // test for section
                expect(this._els.view.find(ids))
                    .toHaveLength(1);

                // test for container
                expect(this._els.view.find(`${ids} > .container`))
                    .toHaveLength(1);
            });
        });

        // test for component template
        it("it should render a component for each content template", () => {
            // get all the view contents in the current state
            const contents = this._els.view.state().contents;

            // loop through each content in state
            contents.forEach((content, index) => {
                // get the content template
                const {template} = content;

                // get name from the template
                const component = toTitleCase(template
                                            .replace(/-|_/g, " "))
                                            .replace(/ /g, "");

                // test for the component
                expect(this._els.view.find(`${component}`))
                    .toHaveLength(1);
            });
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
    // @desc the run function for the view test.
    static run() {
        console.log("views/Home.test.js: run() called.");

        // configure test
        this._configure();

        // describe a block to group the initial render tests
        describe("<Home></Home>: _testInitialRender()", () => {
            // execute before all the render tests are run
            beforeAll(() => { this._beforeInitialRender(); });

            // test the initial render
            this._testInitialRender();

            // execute after all the render tests are run
            afterAll(() => { this._afterInitialRender(); });
        });

        // describe a block to group the custom state tests
        describe("<Home></Home>: _testCustomState()", () => {
            // execute before all the state tests are run
            beforeAll(() => { this._beforeCustomState(); });

            // test the initial state
            this._testCustomState();

            // execute after all the state tests are run
            afterAll(() => { this._afterCustomState(); });
        });
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
HomeTest.run(); // run the view test
