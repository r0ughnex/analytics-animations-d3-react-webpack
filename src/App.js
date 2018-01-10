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
/* --empty block-- */

// views
import Home from "views/Home";

// styles
import app from "./App.css";
const classes = {...app};

// -------------------------------------
//   Main - App
// -------------------------------------
/**
    * @name App
    * @desc class for the main app
    * @return {Object} - the instance of the main class
**/
class App extends PureComponent {
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
        console.log("App.render() called.");

        return (
            <div className={classes.app}>
            {/* app */}

                {/* view */}
                <Home></Home>

            {/* app end */}
            </div>
        );
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
export default App;
