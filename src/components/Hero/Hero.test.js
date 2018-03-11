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

    // reference to the custom
    // data passed as properties
    static _props = { };

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

        // test for headline and content
        it("it should render a default headline and copy content", () => {
            // component content selector
            const hcs = ".hero__content";

            // test for healdine
            expect(this._els.component.find(`${hcs}__headline`))
                .toHaveLength(1);

            // test for copy
            expect(this._els.component.find(`${hcs}__copy`))
                .toHaveLength(1);
        });

        // test for a default button
        it("it should render a default button when data is empty", () => {
            expect(this._els.component.find(`.button`))
                .toHaveLength(1);
        });

        // test for nested chart component
        it("it should not render any chart when the data is empty", () => {
            expect(this._els.component.find(HeroChart))
                .toHaveLength(0);
        });
    }

    // @name _beforeCustomRender
    // @desc function run before custom render tests start.
    static _beforeCustomRender() {
        // get the custom data to be passed as props to the component
        const {data} = homeData.contents.find((content, index, arr) => {
            return (content.template === "hero");
        });

        // render a shallow version of the component
        // and pass along the new data as properties
        this._els.component = shallow(
                                <Hero
                                    headline={data.headline}
                                    type={data.chartType}
                                    data={data.chartData}
                                    copy={data.copy}>
                                </Hero>);

        // save the properties
        // passed to component
        this._props = data;
    }

    // @name _afterCustomRender
    // @desc function run after custom render tests complete.
    static _afterCustomRender() {
        this._afterInitialRender();
    }

    // _testCustomRender
    // @desc function to test the custom component render.
    static _testCustomRender() {
        // test for headline and content
        it("it should render the given headline and copy content", () => {
            // component content selector
            const hcs = ".hero__content";

            // render the headline from data as text and
            // get the headline rendered by the component
            const passedHeadline = new DOMParser().parseFromString(this._props.headline, "text/html")
                                        .childNodes[0].textContent;

            const renderHeadline = this._els.component.find(`${hcs}__headline`)
                                        .render().text();

            // render the copy from data as text and
            // get the copy rendered by the component
            const passedCopy = new DOMParser().parseFromString(this._props.copy, "text/html")
                                        .childNodes[0].textContent;

            const renderCopy = this._els.component.find(`${hcs}__copy`)
                                        .render().text();

            // expect the rendered headline and copy to match
            expect(renderHeadline).toMatch(passedHeadline);
            expect(renderCopy).toMatch(passedCopy);
        });

        // test for a custom button
        it("it should render required button when data is not empty", () => {
            // get the passed type and rendered text
            const passedType = this._props.chartType;
            const renderText = this._els.component.find(`.button`)
                                    .render().text();

            // get the required type
            // based on the passed type
            let requiredType = passedType;
            switch(passedType) {
                 // when swing
                case "swing": // is passed
                    { requiredType = "interval";
                      break; }
                // when interval is passed
                case "interval": default:
                    { requiredType = "swing"; }
            }

            // expect the render text to
            // contain the required type
            expect(renderText.toLowerCase()
                   .includes(requiredType))
                        .toBeTruthy()
        });

        // test for nested chart component
        it("it should render required chart when the data is not empty", () => {
            expect(this._els.component.find(HeroChart))
                .toHaveLength(1);
        });
    }

    // @name _beforeCustomState
    // @desc function run before custom state tests start.
    static _beforeCustomState() {
        // update component state
        this._beforeCustomRender();
        this._els.component.setState({type: "interval"});
    }

    // @name _afterCustomState
    // @desc function run after custom state tests complete.
    static _afterCustomState() {
        this._afterCustomRender();
    }

    // _testCustomState
    // @desc function to test the custom component state.
    static _testCustomState() {
        // test for default initial state
        it("it should contain the initial state type as 'interval'", () => {
            expect(this._els.component.state().type)
                .toMatch("interval");
        });

        // test for button click event
        it("it should change the type when the button is clicked", () => {
            // simulate a click on the button
            this._els.component.find(`.button`)
                .simulate("click");

            // check if the state type has changed
            expect(this._els.component.state().type)
                .not.toMatch("interval");
        });

        // test for new changed state
        it("it should contain the changed state type as 'swing'", () => {
            expect(this._els.component.state().type)
                .toMatch("swing");
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

        // describe a block to group the custom render tests
        describe("<Hero></Hero>: _testCustomRender()", () => {
            // execute before all the render tests are run
            beforeAll(() => { this._beforeCustomRender(); });

            // test the custom render
            this._testCustomRender();

            // execute after all the render tests are run
            afterAll(() => { this._afterCustomRender(); });
        });

        // describe a block to group the custom state tests
        describe("<Hero></Hero>: _testCustomState()", () => {
            // execute before all the state tests are run
            beforeAll(() => { this._beforeCustomState(); });

            // test the custom state
            this._testCustomState();

            // execute after all the state tests are run
            afterAll(() => { this._afterCustomState(); });
        });
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
HeroTest.run(); // run the component test
