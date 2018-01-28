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
    /* --empty block-- */

    // ---------------------------------------------
    //   Constructor block
    // ---------------------------------------------
    // @name constructor
    // @desc the constructor for the view class.
    // @param {Object} props - the properties passed to the view.
    // constructor(props) { /* --empty block-- */ }

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

    // @name shouldComponentUpdate
    // @desc the function called to check if the view needs to be updated.
    // @param {Object} nextProps - the changed properties to be compared with this.props.
    // @param {Object} nextState - the changed view state to be compared with this.state.
    // shouldComponentUpdate(nextProps, nextState) { /* --empty block-- */ }

    // ---------------------------------------------
    //   Render block
    // ---------------------------------------------
    // @name render
    // @desc the render function for the app.
    render() {
        console.log("views/Home.js: render() called.");

        return (
            <div className="app__view">
            {/* app - view */}
            {/* home */}

                {/* app - page */}
                <div className="app__page">

                    {/* app - page - content */}
                    <div className="app__page__content">

                        {/* section, container */}
                        <div className="section section--reset">
                            <div className="container container--reset">

                                {/* hero */}
                                <Hero></Hero>

                            </div>{/* container end */}
                        </div>{/* section end */}

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
export default Home;
