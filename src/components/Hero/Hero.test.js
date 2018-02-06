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
import homeData from "views/Home/Home.data.json";
import {configure, shallow} from "enzyme";

// modules
/* --empty block-- */

// services
/* --empty block-- */

// components
import HeroChart from "./HeroChart";
import Hero from "./Hero";

// views
/* --empty block-- */

// styles
/* --empty block-- */

console.log("components/Hero.test.js: test loaded.");
// -------------------------------------
//   Component - Hero Test
// -------------------------------------
/**
    * @name HeroTest
    * @desc class for testing the hero component.
    * @return {Object} - the instance of the test class.
**/
class HeroTest {
    // ---------------------------------------------
    //   Private members
    // ---------------------------------------------
    // reference to all the
    // rendered shallow DOM
    // elements in component
    static _els = {
        // the main root
        // component element
        component: null
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
    // @desc function to configure the component test.
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
        // render a shallow version of the component
        this._els.component = shallow(<Hero></Hero>);
    }

    // @name _afterInitialRender
    // @desc function run after all render tests complete.
    static _afterInitialRender() {
        // reset the rendered component
        this._els.component = null;
    }

    // _testInitialRender
    // @desc function to test the initial component render.
    static _testInitialRender() {
        // test for main element
        it("it should render the hero component without crashing", () => {
            // component selector
            const hs = ".hero";

            // test for component
            expect(this._els.component.find(`${hs}`))
                .toHaveLength(1);

            // test for left content
            expect(this._els.component.find(`${hs}__left`))
                .toHaveLength(1);

            // test for right chart
            expect(this._els.component.find(`${hs}__right`))
                .toHaveLength(1);
        });

        // test for headline, content and button
        it("it should render a default headline, copy and button", () => {
            // component content selector
            const hcs = ".hero__content";

            // test for healdine
            expect(this._els.component.find(`${hcs}__headline`))
                .toHaveLength(1);

            // test for sub copy
            expect(this._els.component.find(`${hcs}__copy`))
                .toHaveLength(1);

            // test for button
            expect(this._els.component.find(`.button`))
                .toHaveLength(1);
        });

        // test for nested chart component
        it("it should not render a chart when the data is empty", () => {
            expect(this._els.component.find(HeroChart))
                .toHaveLength(0);
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
    // @desc the run function for the component test.
    static run() {
        console.log("components/Hero.test.js: run() called.");

        // configure test
        this._configure();

        // describe a block to group the initial render tests
        describe("<Hero></Hero>: _testInitialRender()", () => {
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
HeroTest.run(); // run the component test
