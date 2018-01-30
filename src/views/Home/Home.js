// -------------------------------------
//   Dependencies
// -------------------------------------
// pre
/* --empty block-- */

// core
import React, {PureComponent} from "react";

// base
/* --empty block-- */

// modules
/* --empty block-- */

// services
/* --empty block-- */

// components
import Hero from "components/Hero";

// views
/* --empty block-- */

// styles
import "./Home.css";

console.log("views/Home.js: view loaded.");
// -------------------------------------
//   View - Home
// -------------------------------------
/**
    * @name Home
    * @desc class for the home view.
    * @return {Object} - the instance of the view class.
**/
class Home extends PureComponent {
    // ---------------------------------------------
    //   Private members
    // ---------------------------------------------
    /* --empty block-- */

    // ---------------------------------------------
    //   Public members
    // ---------------------------------------------
    // reference to the intial
    // state of the component
    state = {
        // the contents of this
        // view to be rendered
        contents: [ ]
    };

    // ---------------------------------------------
    //   Constructor block
    // ---------------------------------------------
    // @name constructor
    // @desc the constructor for the view class.
    // @param {Object} props - the properties passed to the view.
    constructor(props) {
        // call the extended
        // parent constructor
        super(props);

        // TO-DO: convert this initial
        // source of data to come from
        // a service, and with redux

        // set the initial state
        // of the view on load
        this.state = {
            contents: [
                {
                    id: "hero",
                    template: "hero",

                    section:   { type: "reset", color: "dark" },
                    container: { type: "reset" },

                    data: {
                        headline: "Quisque interdum <br className='all'/> dui <span>eget</span> <span>tristique.</span>",
                        copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel lacinia diam. Aliquam erat volutpat felis. Phasellus et justo vitae massa faucibus ac&nbsp;ut&nbsp;mi.",

                        chartType: "interval",
                        chartData: [
                            { week:  1, intv_avg: 31, swng_avg:  45, intv_best: 55, swng_best:  76, intv_score: 36, swng_score:  54 },
                            { week:  2, intv_avg: 34, swng_avg:  48, intv_best: 58, swng_best:  79, intv_score: 38, swng_score:  57 },
                            { week:  3, intv_avg: 35, swng_avg:  64, intv_best: 63, swng_best: 104, intv_score: 37, swng_score:  76 },
                            { week:  4, intv_avg: 38, swng_avg:  83, intv_best: 71, swng_best: 136, intv_score: 41, swng_score:  99 },
                            { week:  5, intv_avg: 41, swng_avg: 102, intv_best: 79, swng_best: 168, intv_score: 46, swng_score: 122 },
                            { week:  6, intv_avg: 35, swng_avg: 114, intv_best: 67, swng_best: 184, intv_score: 38, swng_score: 137 },
                            { week:  7, intv_avg: 30, swng_avg: 126, intv_best: 55, swng_best: 201, intv_score: 31, swng_score: 153 },
                            { week:  8, intv_avg: 35, swng_avg: 145, intv_best: 67, swng_best: 226, intv_score: 38, swng_score: 174 },
                            { week:  9, intv_avg: 41, swng_avg: 164, intv_best: 79, swng_best: 251, intv_score: 46, swng_score: 196 },
                            { week: 10, intv_avg: 39, swng_avg: 182, intv_best: 72, swng_best: 278, intv_score: 45, swng_score: 218 },
                            { week: 11, intv_avg: 37, swng_avg: 199, intv_best: 65, swng_best: 305, intv_score: 44, swng_score: 240 },
                            { week: 12, intv_avg: 34, swng_avg: 202, intv_best: 62, swng_best: 308, intv_score: 41, swng_score: 243 }
                        ]
                    }
                }
            ]
        };
    }

    // ---------------------------------------------
    //   Private methods
    // ---------------------------------------------
    /* --empty block-- */

    // ---------------------------------------------
    //   Public methods
    // ---------------------------------------------
    // @name componentDidMount
    // @desc the function called after the view has mounted.
    componentDidMount() { /* --empty block-- */ }

    // @name componentWillUnmount
    // @desc the function called before the view is unmounted.
    componentWillUnmount() { /* --empty block-- */ }

    // @name componentWillReceiveProps
    // @desc the function called when view is ready to receive new props.
    // @param {Object} nextProps - the changed properties to be compared with this.props.
    componentWillReceiveProps(nextProps) { /* --empty block-- */ }

    // ---------------------------------------------
    //   Render block
    // ---------------------------------------------
    // @name render
    // @desc the render function for the view.
    render() {
        console.log("views/Home.js: render() called.");

        // get the contents from state
        const {contents} = this.state;

        return (
            <div className="app__view">
            {/* app - view */}
            {/* home */}

                {/* app - page */}
                <div className="app__page">

                    {/* app - page - content */}
                    <div className="app__page__content">

                    {/* loop through each content in the data */}
                    {contents.length && contents.map((content) => {
                    return (
                        <div
                            key="content.id" id="content.id"
                            className={"section section--" + content.section.type +
                                       " section--color-"  + content.section.color}>
                            <div className={"container container--" + content.container.type}>
                            {/* add section, container type and styles, render */}
                            {/* the DOM that corresponds to the given template */}

                                {/* content template - hero */}
                                {content.template === "hero" &&
                                    <Hero
                                        headline={content.data.headline}
                                        type={content.data.chartType}
                                        data={content.data.chartData}
                                        copy={content.data.copy}>
                                    </Hero>
                                }

                            </div>{/* container end */}
                        {/* section end */}
                        </div>
                    )})}

                    </div>{/* app - page - content end */}

                </div>{/* app - page end */}

            {/* home end */}
            {/* app - view end */}
            </div>
        );
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
export default Home; // export the view class
