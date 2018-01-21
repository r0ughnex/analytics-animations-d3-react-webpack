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
/* --empty block-- */

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
        console.log("main/App.js: render called.");

        return (
            <div className="app">
            {/* app */}

                {/* app - view */}
                <div className="app__view">

                    {/* app - page */}
                    <div className="app__page">

                        {/* app - page - content */}
                        <div className="app__page__content">

                            <div className="section section--color-dark">
                                <div className="container">
                                    <h1> Lorem ipsum dolor </h1>
                                    <h2> Lorem ipsum dolor </h2>
                                    <h3> Lorem ipsum dolor </h3>
                                    <h4> Lorem ipsum dolor </h4>
                                    <p>  Lorem ipsum dolor </p>
                                    <p><a href="#" title="Lorem ipsum dolor"> Lorem ipsum dolor </a></p>

                                    <div className="button-wrapper">
                                        <a href="#" className="button button--primary" title="Lorem ipsum dolor">
                                            Lorem ipsum dolor
                                        </a>

                                        <br className="all"/>
                                        <a href="#" className="button button--secondary" title="Lorem ipsum dolor">
                                            Lorem ipsum dolor
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="section section--color-blue">
                                <div className="container">
                                    <h1> Lorem ipsum dolor </h1>
                                    <h2> Lorem ipsum dolor </h2>
                                    <h3> Lorem ipsum dolor </h3>
                                    <h4> Lorem ipsum dolor </h4>
                                    <p>  Lorem ipsum dolor </p>
                                    <p><a href="#" title="Lorem ipsum dolor"> Lorem ipsum dolor </a></p>

                                    <div className="button-wrapper">
                                        <a href="#" className="button button--primary" title="Lorem ipsum dolor">
                                            Lorem ipsum dolor
                                        </a>

                                        <br className="all"/>
                                        <a href="#" className="button button--secondary" title="Lorem ipsum dolor">
                                            Lorem ipsum dolor
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="section section--color-light">
                                <div className="container">
                                    <h1> Lorem ipsum dolor </h1>
                                    <h2> Lorem ipsum dolor </h2>
                                    <h3> Lorem ipsum dolor </h3>
                                    <h4> Lorem ipsum dolor </h4>
                                    <p>  Lorem ipsum dolor </p>
                                    <p><a href="#" title="Lorem ipsum dolor"> Lorem ipsum dolor </a></p>

                                    <div className="button-wrapper">
                                        <a href="#" className="button button--primary" title="Lorem ipsum dolor">
                                            Lorem ipsum dolor
                                        </a>

                                        <br className="all"/>
                                        <a href="#" className="button button--secondary" title="Lorem ipsum dolor">
                                            Lorem ipsum dolor
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="section section--color-default">
                                <div className="container">
                                    <h1> Lorem ipsum dolor </h1>
                                    <h2> Lorem ipsum dolor </h2>
                                    <h3> Lorem ipsum dolor </h3>
                                    <h4> Lorem ipsum dolor </h4>
                                    <p>  Lorem ipsum dolor </p>
                                    <p><a href="#" title="Lorem ipsum dolor"> Lorem ipsum dolor </a></p>

                                    <div className="button-wrapper">
                                        <a href="#" className="button button--primary" title="Lorem ipsum dolor">
                                            Lorem ipsum dolor
                                        </a>

                                        <br className="all"/>
                                        <a href="#" className="button button--secondary" title="Lorem ipsum dolor">
                                            Lorem ipsum dolor
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>{/* app - page - content end */}

                    </div>{/* app - page end */}

                </div>{/* app - view end */}

            {/* app end */}
            </div>
        );
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
export default App;
