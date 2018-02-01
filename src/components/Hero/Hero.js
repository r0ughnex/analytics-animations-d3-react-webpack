// -------------------------------------
//   Dependencies
// -------------------------------------
// pre
/* --empty block-- */

// core
import PropTypes from "prop-types";
import React, {PureComponent} from "react";

// base
import deepEqual from "deep-equal";

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
    // the different type constants
    // used to indicate the various
    // data types in the component
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

    // reference to the intial
    // state of the component
    state = {
        headline: "", // the headline for the hero component
        copy:     "", // the copy content for this component

        type: "", // the type of data in the chart to be rendered
        data: [ ] // data used to render the chart of given type
    };

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

        // check if the next props has changed, get the keys and values of the changed props
        const {newProps, hasChanged, changedProps} = this._onPropsChange(props, this.state);

        /* eslint-disable */
        // if the next props has changed, then update the state
        if(hasChanged) { changedProps.forEach((prop, index) => {
            this.state[prop] = newProps[prop]; /* eslint-enable */
        });}
    }

    // ---------------------------------------------
    //   Private methods
    // ---------------------------------------------
    // @name _onTypeChange
    // @desc function called when the input type is changed.
    // @param {String} type - the new string type that was changed.
    // @return {Object} - the object returned by the function call on complete.
    //         {Object.String} type - the modified input type that triggered the change.
    //         {Object.Boolean} isValid - boolean flag indicating the validity of the change.
    _onTypeChange = (type) => {
        // boolean flag to
        // indicate validity
        let isValid  = true;

        // check if the given
        // type string is valid
        switch(type) {
            case this._TYPES.data.INTERVAL:
            case this._TYPES.data.SWING: { break; }
            // else set a defult value for the given type
            default: { type = this._TYPES.data.INTERVAL; }
        }

        return {
            type,   // return the modified input type
            isValid // return the boolean validity flag
        };
    };

    // @name _onPropsChange
    // @desc function called when the input properties are changed.
    // @param {Object} newProps - the new properties object that was changed.
    // @return {Object} - the object returned by the function call on complete.
    //         {Object.Object} newProps - the modified input properties that triggered the change.
    //         {Object.Boolean} hasChanged - boolean flag indicating if the properties have changed.
    //         {Object.Array} changedProps - the array containing the property keys that were changed.
    _onPropsChange = (newProps, oldProps) => {
        newProps = {...newProps}; // make a shallow copy of the new props
        let hasChanged   = false; // set the changed boolean flag to false
        let changedProps = [];    // create a new array for the changed props

        // compare the new and the old headline
        if(newProps.headline !== oldProps.headline) {
            changedProps.push("headline"); // add to changed props
            hasChanged = true; // set changed flag to true
        }

        // compare the new and the old copy
        if(newProps.copy !== oldProps.copy) {
            changedProps.push("copy"); // add to changed props
            hasChanged = true; // set changed flag to true
        }

        // compare the new and the old type
        if(newProps.type !== oldProps.type) {
            const {isValid, type} = this._onTypeChange(newProps.type);
            if(isValid) { // only proceed if the change was valid
                changedProps.push("type"); // add to changed props
                newProps.type = type; // update the changed value
                hasChanged = true; // set changed flag to true
            }
        }

        // compare the new and the old data
        if(!deepEqual(newProps.data, oldProps.data)) {
            changedProps.push("data");  // add to changed props
            hasChanged = true;  // set changed flag to true
        }

        console.log("-------------------------------");
        console.log("component/Hero.js: newProps has"
                    + (!hasChanged ? " not" : "")
                    + " changed.");

        if(hasChanged) {
            console.log("component/Hero.js: changed newProps are:");
            changedProps.forEach((prop, index) => {
                console.log(prop + ":", newProps[prop]);
            })
        }

        return {
            newProps, // return the modified input props
            hasChanged, // return the boolean changed flag
            changedProps // return the changed keys of props
        };
    };

    // @name _getNextType
    // @desc function to get the next type for the given chart type.
    // @param {String} type - the given type to get the next type for.
    // @return {String} - the next type for the given current chart type.
    _getNextType = (type) => {
        switch(type) {
            // check if the given type is valid
            // and return the next chart type
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
    componentWillReceiveProps(nextProps) {
        console.log("------------------------------------------------------");
        console.log("component/Hero.js: componentWillReceiveProps() called.");

        // check if the next props has changed, get the keys and values of the changed props
        const {newProps, hasChanged, changedProps} = this._onPropsChange(nextProps, this.state);

        // if the next props has changed, then update the state
        if(hasChanged) { changedProps.forEach((prop, index) => {
            const obj = { }; obj[prop] = newProps[prop];

            this.setState(obj, () => {
                // if this is the last change in state
                if(index === (changedProps.length - 1)) {
                    /* do nothing on set state callback */
                }
            });
        });}
    }

    // @name getButtonText
    // @desc function to get the button text for the given type.
    // @param {String} type - the given type to get the button text for.
    // @return {String} - the button text for the given current chart type.
    getButtonText = (type) => {
        // get the next type for the given type
        let nextType = this._getNextType(type);
        // return button text with next type
        return `Show ${nextType} data`;
    };

    // @name onToggleTypeClick
    // @desc function bound to the toogle type button click event.
    // @param {Event} event - the event that triggered the function call.
    // @param {String} type - the current chart type obtained from the event.
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
    };

    // ---------------------------------------------
    //   Render block
    // ---------------------------------------------
    // @name render
    // @desc the render function for the component.
    render() {
        console.log("component/Hero.js: render() called.");

        // get the contents, type and data from the state
        const {headline, copy, type, data} = this.state;

        return (
            <div className="hero">
            {/* hero */}

                {/* hero - left, content */}
                <div className="hero__left">
                    <div className="hero__content">

                        {/* hero - content - headline */}
                        {headline &&
                        <h1 className="hero__content__headline"
                            dangerouslySetInnerHTML={{__html: headline}}>
                        </h1>}

                        {/* hero - content - copy */}
                        {copy &&
                        <p className="hero__content__copy"
                            dangerouslySetInnerHTML={{__html: copy}}>
                        </p>}

                        {/* hero - content - bwrap */}
                        {(headline || copy) &&
                        <div className="button-wrapper hero__content__bwrap">
                            <a className="button button--secondary" href="#toggle-data-type"
                                onClick={this.onToggleTypeClick}
                                title={this.getButtonText(type)}>
                                {this.getButtonText(type)}
                            </a>
                        </div>}

                    </div>{/* hero - content end */}
                </div>{/* hero - left end */}

                {/* hero - right, chart */}
                <div className="hero__right">
                    <div className="hero__chart">

                        {/* hero chart */}
                        {data.length ?
                        <HeroChart
                            type={type}
                            data={data}>
                        </HeroChart>: null}

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
