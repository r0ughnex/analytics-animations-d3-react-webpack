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
class Hero extends PureComponent {
    // ---------------------------------------------
    //   Private members
    // ---------------------------------------------
    _TYPES = {
        data: { SWING: "swing", INTERVAL: "interval" }
    };

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
    constructor(props) {
        super(props);

        // TO-DO: change this source
        // of data to come from the
        // parent component through
        // props and via a service
        this.state = {
            type: "interval",

            data: [
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
        };
    }

    // ---------------------------------------------
    //   Private methods
    // ---------------------------------------------
    _getNextType = (type) => {
        switch(type) {
            case this._TYPES.data.INTERVAL: {
                return this._TYPES.data.SWING; }

            case this._TYPES.data.SWING: default: {
                return this._TYPES.data.INTERVAL; }
        }
    };

    // ---------------------------------------------
    //   Public methods
    // ---------------------------------------------
    // @name componentDidMount
    // @desc the function called after the component has mounted.
    componentDidMount() { /* --empty block-- */ }

    // @name componentWillUnmount
    // @desc the function called before the component is unmounted.
    componentWillUnmount() { /* --empty block-- */ }

    // @name componentWillReceiveProps
    // @desc the function called when component is ready to receive new props.
    // @param {Object} nextProps - the changed properties to be compared with this.props.
    componentWillReceiveProps(nextProps) { /* --empty block-- */ }

    getToogleText = (type) => {
        let nextType = this._getNextType(type);
        return `Show ${nextType} data`;
    };

    onToggleTypeClick = (event, type) => {
        if(typeof type !== "string") {
            type = this.state.type;
        }

        if(event) { try {
            event.preventDefault();
            event.stopPropagation(); }
            catch(error) { console.log(error); }
        }

        let nextType = this._getNextType(type);
        this.setState({type: nextType});
    }

    // ---------------------------------------------
    //   Render block
    // ---------------------------------------------
    // @name render
    // @desc the render function for the app.
    render() {
        console.log("component/Hero.js: render() called.");

        const {type, data} = this.state;

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
                            <a className="button button--secondary" href="#toggle-data-type"
                                onClick={this.onToggleTypeClick}
                                title={this.getToogleText(type)}>
                                {this.getToogleText(type)}
                            </a>
                        </div>

                    </div>{/* hero - content end */}
                </div>{/* hero - left end */}

                {/* hero - right, chart */}
                <div className="hero__right">
                    <div className="hero__chart">

                        {/* hero chart */}
                        <HeroChart
                            type={type}
                            data={data}>
                        </HeroChart>

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
