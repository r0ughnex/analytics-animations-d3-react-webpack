// -------------------------------------
//   Dependencies
// -------------------------------------
// pre
/* --empty block-- */

// core
import React, {Component} from "react";

// base
/* --empty block-- */

// modules
/* --empty block-- */

// services
/* --empty block-- */

// components
import HeroChart from "components/Hero/HeroChart";

// views
/* --empty block-- */

// styles
import "./Hero.css";

console.log("components/Hero.js: component loaded.");
// -------------------------------------
//   Component - Hero
// -------------------------------------
/**
    * @name Hero
    * @desc class for the hero component.
    * @return {Object} - the instance of the component class.
**/
class Hero extends Component {
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
    // @desc the constructor for the component class.
    // @param {Object} props - the properties passed to the component.
    // constructor(props) { /* --empty block-- */ }

    // ---------------------------------------------
    //   Private methods
    // ---------------------------------------------
    /* --empty block-- */

    // ---------------------------------------------
    //   Public methods
    // ---------------------------------------------
    // @name componentDidMount
    // @desc the function called after the component has mounted.
    componentDidMount() { /* --empty block-- */ }

    // @name componentWillUnmount
    // @desc the function called before the component is unmounted.
    componentWillUnmount() { /* --empty block-- */ }

    // @name shouldComponentUpdate
    // @desc the function called to check if the component needs to be updated.
    // @param {Object} nextProps - the changed properties to be compared with this.props.
    // @param {Object} nextState - the changed component state to be compared with this.state.
    // shouldComponentUpdate(nextProps, nextState) { /* --empty block-- */ }

    // ---------------------------------------------
    //   Render block
    // ---------------------------------------------
    // @name render
    // @desc the render function for the app.
    render() {
        console.log("component/Hero.js: render called.");

        return (
            <div className="hero">
            {/* hero */}

                {/* hero - left, content */}
                <div className="hero__left">
                    <div className="hero__content">

                        {/* hero - content - headline */}
                        <h1 className="hero__content__headline">
                            Quisque interdum <br className="all"/>
                            dui <span>eget</span> <span>tristique.</span>
                        </h1>

                        {/* hero - content - copy */}
                        <p className="hero__content__copy">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel
                            lacinia diam. Aliquam erat volutpat felis. Phasellus et justo vitae
                            massa faucibus ac&nbsp;ut&nbsp;mi.
                        </p>

                        {/* hero - content - bwrap */}
                        <div className="button-wrapper hero__content__bwrap">
                            <a className="button button--secondary" title="Lorem ipsum dolor">
                                Lorem ipsum dolor
                            </a>
                        </div>

                    </div>{/* hero - content end */}
                </div>{/* hero - left end */}

                {/* hero - right, chart */}
                <div className="hero__right">
                    <div className="hero__chart">

                        {/* hero chart */}
                        <HeroChart></HeroChart>

                    </div>{/* hero - chart end */}
                </div>{/* hero - right end */}

            {/* hero end */}
            </div>
        );
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
export default Hero;
