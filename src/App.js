// -------------------------------------
//   Dependencies
// -------------------------------------
// pre
/* --empty block-- */

// core
import React, {Component} from "react";
import {Switch, Redirect, Route} from "react-router-dom";

// base
/* --empty block-- */

// modules
/* --empty block-- */

// services
/* --empty block-- */

// components
/* --empty block-- */

// views
import Home from "views/Home"

// styles
import "./App.css";

console.log("main/App.js: app loaded.");
// -------------------------------------
//   Main - App
// -------------------------------------
/**
    * @name App
    * @desc class for the main app.
    * @return {Object} - the instance of the app class.
**/
class App extends Component {
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
    /* --empty block-- */

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
    // @desc the render function for the app.
    render() {
        console.log("main/App.js: render() called.");

        return (
            <div className="app">
            <Switch>{/* app, view */}

                    {/* view - home */}
                    <Route path="/home" component={Home}></Route>

                    {/* view - default */}
                    {/* note: the 'App' class needs to extend 'Component' instead */}
                    {/* of extending 'PureComponent' for router Redirect to work  */}
                    <Redirect from="/" to="home"></Redirect>

            </Switch>{/* view end */}
            {/* app end */}
            </div>
        );
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
export default App; // export the app class
