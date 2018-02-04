// -------------------------------------
//   Dependencies
// -------------------------------------
// pre
/* --empty block-- */

// core
import React, {PureComponent} from "react";

// base
import homeData from "./Home.data.json";

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

        // note: you can use withRouter to make below
        // props available inside a component directly
        console.log("---------------------------------------");
        console.log("views/Home.js: routerProps has matched.");
        console.log("views/Home.js: matched routerProps are:");
        console.log("location:", this.props.location);
        console.log("history:", this.props.history);
        console.log("match:", this.props.match);

        // TO-DO: convert this initial source of data
        // to come from a service, and through redux
        // (move data source to Firebase or AWS S3)

        // set the initial state of the view on load
        this.state = { contents: homeData.contents };
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

                {/* app - page */}
                <div className="app__page">

                    {/* app - page - content */}
                    <div className="app__page__content">

                    {/* loop through each content in the data */}
                    {contents.length && contents.map((content) => {
                    const {section, container} = content; // get the content items
                    const {id, data, template} = content; // get the content items
                    return (
                        <div
                            key={id} id={id}
                            className={`section section--${section.type} section--color-${section.color}`}>
                            <div className={`container container--${container.type}`}>
                            {/* add section, container type and styles, render */}
                            {/* the DOM that corresponds to the given template */}

                                {/* content template - hero */}
                                {template === "hero" &&
                                    <Hero
                                        headline={data.headline}
                                        type={data.chartType}
                                        data={data.chartData}
                                        copy={data.copy}>
                                    </Hero>
                                }

                            </div>{/* container end */}
                        {/* section end */}
                        </div>
                    )})}

                    </div>{/* app - page - content end */}

                </div>{/* app - page end */}

            {/* app - view end */}
            </div>
        );
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
export default Home; // export the view class
