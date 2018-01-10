// -------------------------------------
//   Dependencies
// -------------------------------------
// core
import React, {PureComponent} from "react";

// base
/* --empty block-- */

// modules
/* --empty block-- */

// services
/* --empty block-- */

//components
import Hero from "components/Hero";

// views
/* --empty block-- */

// styles
import app from "main/App.css";
import home from "./Home.css";
const classes = {...app, ...home};

// -------------------------------------
//   View - Home
// -------------------------------------
/**
    * @name Home
    * @desc class for the home view
    * @return {Object} - the instance of the view class
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
    // @desc --description--
    // @params {Type} --input param--
    // constructor(props) { /* --empty block-- */ }

    // @name componentDidMount
    // @desc --description--
    componentDidMount() { /* --empty block-- */ }

    // @name componentDidMount
    // @desc --description--
    componentWillUnmount() { /* --empty block-- */ }

    // @name shouldComponentUpdate
    // @desc --description--
    // @params {Type} --input param--
    // @return {Type} --return value--
    // shouldComponentUpdate(nextProps, nextState) { /* --empty block-- */ }

    // ---------------------------------------------
    //   Private methods
    // ---------------------------------------------
    /* --empty block-- */

    // ---------------------------------------------
    //   Public methods
    // ---------------------------------------------
    /* --empty block-- */

    // ---------------------------------------------
    //   Render block
    // ---------------------------------------------
    // @name render
    // @desc --description--
    render() {
        console.log("Home.render() called.");

        return (
            <div className={classes.view}>
            {/* view */}

                {/* page */}
                <div className={classes.page}>
                    {/* content */}
                    <div className={classes.content}>

                        {/* hero */}
                        <Hero></Hero>

                    </div>{/* content end */}
                </div>{/* page end */}

            {/* view end */}
            </div>
        );
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
export default Home;
