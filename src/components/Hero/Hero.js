// -------------------------------------
//   Dependencies
// -------------------------------------
// pre
/* --empty block-- */

// core
import PropTypes from "prop-types";
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
    // reference to the types of props
    // to be passed in to the component
    static propTypes = {
        headline: PropTypes.string.isRequired,
        copy:     PropTypes.string.isRequired,

        type: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            week:       PropTypes.number.isRequired,
            intv_avg:   PropTypes.number.isRequired,
            swng_avg:   PropTypes.number.isRequired,
            intv_best:  PropTypes.number.isRequired,
            swng_best:  PropTypes.number.isRequired,
            intv_score: PropTypes.number.isRequired,
            swng_score: PropTypes.number.isRequired
        })).isRequired
    };

    // default values the types of props
    // to be passed in to the component
    static defaultProps = {
        headline: "Lorem ipsum dolor <span>sit</span> <span>amet.</span>",
        copy:     "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

        type: "interval",
        data: [ ]
    }

    // ---------------------------------------------
    //   Constructor block
    // ---------------------------------------------
    // @name constructor
    // @desc the constructor for the component class.
    // @param {Object} props - the properties passed to the component.
    constructor(props) {
        // call the extended
        // parent constructor
        super(props);

        // TO-DO: change this source
        // of data to come from the
        // parent component through
        // props and via a service
        // (upgrade to redux later)
        this.state = {
            headline: props.headline,
            copy:     props.copy,

            type: props.type,
            data: props.data
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
    // @desc the render function for the component.
    render() {
        console.log("component/Hero.js: render() called.");

        const {headline, copy, type, data} = this.state;

        return (
            <div className="hero">
            {/* hero */}

                {/* hero - left, content */}
                <div className="hero__left">
                    <div className="hero__content">

                        {/* hero - content - headline */}
                        <h1 className="hero__content__headline"
                            dangerouslySetInnerHTML={{__html: headline}}>
                        </h1>

                        {/* hero - content - copy */}
                        <p className="hero__content__copy"
                            dangerouslySetInnerHTML={{__html: copy}}>
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
