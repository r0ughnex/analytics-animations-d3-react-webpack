// -------------------------------------
//   Dependencies
// -------------------------------------
// pre
import entries from "object.entries";

// core
import PropTypes from "prop-types";
import React, {Component} from "react";

// base
import * as d3 from "d3";
import query from "base/query";
import debounce from "debounce";
import deepEqual from "deep-equal";

// modules
/* --empty block-- */

// services
/* --empty block-- */

// components
/* --empty block-- */

// views
/* --empty block-- */

// styles
import "./HeroChart.css";

console.log("components/HeroChart.js: component loaded.");
// -------------------------------------
//   Component - Hero Chart
// -------------------------------------
/**
    * @name HeroChart
    * @desc class for the hero chart component.
    * @return {Object} - the instance of the component class.
**/
class HeroChart extends Component {
    // ---------------------------------------------
    //   Private members
    // ---------------------------------------------
    // the different type of constants
    // used to indicate the data, line
    // and point types in the component
    _TYPES = {
        data:  { SWING: "swing", INTERVAL: "interval" },
        line:  { BEST:  "best",  AVERAGE:  "avg" },
        point: { BEST:  "best",  AVERAGE:  "avg" }
    };

    _swngData = [ ]; // reference to the calculated swing data
    _intvData = [ ]; // reference to the calculated interval data
    _hasInitialized = false; // flag to indicate if the component has initialized

    // reference to various DOM
    // elements in the component
    _el = {
        main: null, // the main parent DOM element
        svg:  null, // the nested child svg DOM element
        grp:  null, // the nested child group DOM element
        bars: null  // the nested child rect DOM elements
    };

    // reference to the various classes assigned
    // to the DOM elements within the component
    _classes = {
        main: "hchart", // for the main parent DOM element
        svg:  "hchart__svg", // for the nested child svg DOM element
        grp:  "hchart__svg__g", // for the nested child group DOM element

        bar:    "hchart__svg__bar",   // for the nested child rect DOM elements
        path:   "hchart__svg__path",  // for the nested child path DOM elements
        circle: "hchart__svg__circle" // for the nested child circle DOM elements
    };

    // reference to the various class based modifiers
    // assigned to the DOM elements within the component
    _modifiers = {
        interval: "--theme-interval", // for the theme on the main DOM element
        swing:    "--theme-swing",    // for the theme on the main DOM element

        lineb: "--line-best", // for the path type on the nested DOM elements
        linea: "--line-avg",  // for the path type on the nested DOM elements

        pointb: "--point-best", // for the circle type on the nested DOM elements
        pointa: "--point-avg"   // for the circle type on the nested DOM elements
    };

    _width  = 0; // the current width of the component
    _height = 0; // the current height of the component

    _debounce = 25; // the debounce used on bound listener events
    _circRad  = 6;  // the radius of the circle used on the chart
    _winWidth = 0;  // the current width of the main window screen
    _mobWidth = {   // the widths for different mobile breakpoints
        small: 480, // for smaller mobiles
        deflt: 780  // for default mobiles
    };

    // reference to the margins used
    // for the various chart elements
    _margin = {
        bar: 20, // for the bar elements
        top: 20, left: 0, // for area top and left
        right: 0, bottom: 0 // for area right and bottom
    };

    // reference to the animation duration
    // and delay used for transition of the
    // various chart elements when rendering
    _anim = {
        bar:    { duration:  500, delay: 75 },
        path:   { duration: 3000, delay:  0 },
        circle: { duration: 2250, delay: 50 }
    };

    // ---------------------------------------------
    //   Public members
    // ---------------------------------------------
    // reference to the types of props
    // to be passed in to the component
    static propTypes = {
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
        type: "interval",
        data: [ ]
    }

    // reference to the intial
    // state of the component
    state = {
        type: "", // the type of data in the chart to be rendered
        data: [ ] // data used to render the chart of given type
    }

    // ---------------------------------------------
    //   Constructor block
    // ---------------------------------------------
    // @name constructor
    // @desc the constructor for the component class.
    // @param {Object} props - the properties passed to the component.
    constructor(props) {
        super(props);

        // add a polyfill for HTMLElement.classList method
        // since IE <= 11 does not support it on svg elements
        if (!("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {
            let descr = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "classList");
            Object.defineProperty(SVGElement.prototype, "classList", descr);
        }

        // add a polyfill for the Object.entries
        // method since babel does not include it
        if (!Object.entries) { entries.shim(); }

        // check if the next props has changed, get the keys and values of the changed props
        const {newProps, hasChanged, changedProps} = this._onPropsChange(props, this.state);

        /* eslint-disable */
        // if the next props has changed, then update the state
        if(hasChanged) { changedProps.forEach((prop, index) => {
            this.state[prop] = newProps.type; /* eslint-enable */
        });}
    }

    // ---------------------------------------------
    //   Private methods
    // ---------------------------------------------
    // @name _onDataChange
    // @desc function called when the input data is changed.
    // @param {Array} data - the new array of data that was changed.
    // @return {Object} - the object returned by the function call on complete.
    //         {Object.Array} data - the modified input data that triggered the change.
    //         {Object.Boolean} isValid - boolean flag indicating the validity of the change.
    _onDataChange = (data) => {
        let swngData = [ ];  // array to hold the swing data
        let intvData = [ ];  // array to hold the interval data
        let isValid  = true; // boolean flag to indicate validity

        // loop through each entry in the data
        try { data.forEach((entry, index) => {
            // check if the value of each entry is valid
            Object.entries(entry).forEach(([key, value]) => {
                if(typeof value !== "number") {
                    isValid = false;
                    return isValid;
                }
            });

            // only proceed if
            // the data is valid
            if(!isValid) { return; }

            // push entry into
            // the interval data
            intvData.push({
                week:  entry.week,
                avg:   entry.intv_avg,
                best:  entry.intv_best,
                score: entry.intv_score
            });

            // push entry into
            // the swing data
            swngData.push({
                week:  entry.week,
                avg:   entry.swng_avg,
                best:  entry.swng_best,
                score: entry.swng_score
            });
        }); }

        // set validity as
        // false on any error
        catch(error) {
            console.log(error);
            isValid = false;
        }

        // only update the calculated
        // data if they are both valid
        if(isValid) {
            this._intvData = intvData;
            this._swngData = swngData;
        }

        return {
            data,   // return the modified input data
            isValid // return the boolean validity flag
        };
    };

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
            const {isValid, data} = this._onDataChange(newProps.data)
            if(isValid) {  // only proceed if the change was valid
                changedProps.push("data");  // add to changed props
                newProps.data = data;  // update the changed value
                hasChanged = true;  // set changed flag to true
            }
        }

        console.log("-------------------------------------");
        console.log("component/HeroChart.js: newProps have"
                    + (!hasChanged ? " not" : "")
                    + " changed.");

        if(hasChanged) {
            console.log("component/HeroChart.js: changed newProps are:");
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

    // @name _onWindowResize
    // @desc the listener function bound to the window resize event.
    // @param {Event} - the event that triggered the function call.
    _onWindowResize = (event) => {
        // get the current window width
        this._winWidth = window.innerWidth
                        || document.documentElement.clientWidth
                        || document.body.clientWidth;

        // get the chart width and height
        const elRect = this._el.main.getBoundingClientRect()
        const height = elRect.height - this._margin.top  - this._margin.bottom;
        const width  = elRect.width  - this._margin.left - this._margin.right
                                     + (this._margin.bar / (this._winWidth < this._mobWidth.small ? 2 : 1));

        // compare the obtained width and
        // height to current set of values
        if(Math.abs(this._width - width) >= 30
        || Math.abs(this._height - height) >= 30) {
            this._height = height; this._width = width;
            if(this._hasInitialized) { this._drawChart(); }
        }
    };

    // @name _addWindowResizeListener
    // @desc function to add a listener to the window resize event.
    _addWindowResizeListener = () => {
        window.addEventListener("resize", this._onWindowResize);
    };

    // @name_removeWindowResizeListener
    // @desc function to remove the listener from the window resize event.
    _removeWindowResizeListener = () => {
        window.removeEventListener("resize", this._onWindowResize);
    };


    // @name _createChart
    // @desc function to create a new hero chart.
    // @return {Promise(Boolean)} - the resolved promise with the success flag.
    _createChart = () => {
        return new Promise((resolve, reject) => { try {
            // reset the svg classes
            const elSvg = this._el.svg;
            elSvg.removeAttribute("class");
            elSvg.classList.add(this._classes.svg);

            // add the modifier based on the set type
            elSvg.classList.add(this._classes.svg + this._modifiers[this.state.type]);

            // reset the group classes
            const elGrp = this._el.grp;
            elGrp.removeAttribute("class");
            elGrp.classList.add(this._classes.grp);

            // shift the group based on the set margins
            elGrp.setAttribute("transform", "translate(" + (this._margin.left - this._margin.right)  + ", "
                                                                + (this._margin.top  - this._margin.bottom) + ")");
            // draw chart if it has
            // not been initialized
            if(!this._hasInitialized) {
                this._drawChart().then(() => {
                    // set initialized to true and
                    // resolve with true on success
                    this._hasInitialized = true;
                    return resolve(true);
                });
            }

            // resolve with true on success
            else { return resolve(true); }}

            // resolve with false on any error
            catch(error) { console.log(error);
                return resolve(false);
            }
        });
    };

    // @name _destroyChart
    // @desc function to destroy the created hero chart.
    // @return {Promise(Boolean)} - the resolved promise with the success flag.
    _destroyChart = () => {
        return new Promise((resolve, reject) => { try {
            // reset the svg classes
            const elSvg = this._el.svg;
            elSvg.removeAttribute("class");
            elSvg.classList.add(this._classes.svg);

            // reset the group classes
            const elGrp = this._el.grp;
            elGrp.removeAttribute("class");
            elGrp.classList.add(this._classes.grp);

            // iterate and remove all the
            // child nodes from the group
            while (elGrp.hasChildNodes()) {
                elGrp.removeChild(elGrp.lastChild);
            }

            // remove transforms from the group
            elGrp.removeAttribute("transform");

            // reset references to bars and
            // resolve with true on success
            this._el.bars = null;
            return resolve(true); }

            // resolve with false on any error
            catch(error) { console.log(error);
                return resolve(false);
            }
        });
    };

    // @name _drawBars
    // @desc function to the draw the bars on the chart.
    // @param {Array} data - the data source for the bars.
    // @param {Function} x - the x scale function for the chart.
    // @param {Function} y - the y scale function for the chart.
    // @param {Function} y1 - the y1 scale function for the chart.
    _drawBars = (data, x, y, y1) => {
        // only proceed if input params are valid
        if(!Array.isArray(data)    || !data.length
        || typeof x !== "function" || typeof y !== "function"
        || typeof y1 !== "function") { return false; }

        // add domains for x and y scales
        x.domain(data.map(d => d.week));
        y.domain([0, d3.max(data, d => d.best)]);
        y1.domain([0, d3.max(data, d => d.score)]);

        // calculate rate at which the avg
        // height needs to be adjusted for
        const rate = d3.max(data, d => d.score) /
                     d3.max(data, d => d.best);

        // select the bar elements on the chart
        // (get the parent group DOM element)
        const elGrp    = this._el.grp;
        const grpElem  = d3.select(elGrp);
        let   barElems = null;

        // if chart has not initialized
        if(!this._hasInitialized) {
            // create new rect and append it to the group element
            barElems = grpElem.selectAll("." + this._classes.bar)
                              .data(data).enter().append("rect") // trigger enter
                              .attr("x", (d) => x(d.week)) // add the x data
                              .attr("y", this._height) // add the y data


            // add the base class to each bar
            this._el.bars = barElems.nodes();
            this._el.bars.forEach((elBar, index) => {
                elBar.classList.add(this._classes.bar);
            });
        }

        // update data, if chart has been initialized
        else { barElems = d3.selectAll(this._el.bars)
                            .data(data); }

        // perform animation
        // on the bar elements
        barElems
            .transition().duration(this._anim.bar.duration)
            .delay((d, i) => (i * this._anim.bar.delay))

            .attr("x", (d) => x(d.week))
            .attr("y", (d) => (y1(d.score)
                            + (this._height - y1(d.score)
                            - (this._height - y1(d.score)) * rate)))

            // adjust the bar width, height based on the given margins
            .attr("height", (d) => ((this._height - y1(d.score)) * rate))
            .attr("width", ((this._width / data.length) - (this._margin.bar /
                            (this._winWidth < this._mobWidth.small ? 2 : 1))));

        if(!this._hasInitialized) {
            // trigger exit on complete
            barElems.exit().remove();
        }
    };

    // @name _drawLines
    // @desc function to draw the lines on the chart.
    // @param {Array} data - the data source for the lines.
    // @param {Function} x - the x scale function for the chart.
    // @param {Function} y - the y scale function for the chart.
    // @param {String} type - the current type of line to be drawn.
    _drawLines = (data, x, y, type) => {
        // only proceed if input params are valid
        if(!Array.isArray(data)    || !data.length
        || typeof x !== "function" || typeof y !== "function"
        || typeof type !== "string") { return false; }

        // set the default
        // modifier as null
        let modifier = null;

        switch(type) {
            // check if the given type is valid
            // and select corresponding modifier
            case this._TYPES.line.AVERAGE: {
                type = this._TYPES.line.AVERAGE;
                modifier = this._modifiers.linea; break; }

            case this._TYPES.line.BEST: default: {
                type = this._TYPES.line.BEST;
                modifier = this._modifiers.lineb; break; }
        }

        // set the line scale
        const scale = d3.line()
                    .x(d => x(d.week) + x.bandwidth() / 2)
                    .y(d => y(d[type]))

                    // stop line if the value is null
                    .defined(d => d[type]);

        // remove any previously drawn lines (or paths)
        const elGrp  = this._el.grp; // get the parent group DOM element
        let   elPath = query("." + this._classes.path + modifier, elGrp);
        if(elPath.length) { elGrp.removeChild(elPath[0]); } // remove child

        // create new path element in the group
        // and update them with the new data set
        const grpElem  = d3.select(elGrp);
        let   pathElem = grpElem.append("path").datum(data).attr("d", scale);

        // add default base and modifier
        // classes to the path element
        elPath = pathElem.node();
        elPath.classList.add(this._classes.path);
        elPath.classList.add(this._classes.path + modifier);

        // get the total length of the line drawn
        const pathLength = elPath.getTotalLength();

        // perform animation
        // on the line element
        pathElem
            .attr("stroke-dasharray",  pathLength + " " + pathLength)
            .attr("stroke-dashoffset", pathLength)

            .transition().duration(this._anim.path.duration)
            .delay((d, i) => (i * this._anim.path.delay))
            .attr("stroke-dashoffset", 0);
    };

    // @name _drawPoints
    // @desc function to draw the points on the chart.
    // @param {Array} data - the data source for the points.
    // @param {Function} x - the x scale function for the chart.
    // @param {Function} y - the y scale function for the chart.
    // @param {String} type - the current type of point to be drawn.
    _drawPoints = (data, x, y, type) => {
        // only proceed if input params are valid
        if(!Array.isArray(data)    || !data.length
        || typeof x !== "function" || typeof y !== "function"
        || typeof type !== "string") { return false; }

        // set the default
        // modifier as null
        let modifier = null;

        switch(type) {
            // check if the given type is valid
            // and select corresponding modifier
            case this._TYPES.point.AVERAGE: {
                type = this._TYPES.point.AVERAGE;
                modifier = this._modifiers.pointa; break; }

            case this._TYPES.point.BEST: default: {
                type = this._TYPES.point.BEST;
                modifier = this._modifiers.pointb; break; }
        }

        // remove any previously drawn points (or circles)
        const elGrp     = this._el.grp; // get the parent group DOM element
        let   elCircles = query("." + this._classes.circle + modifier, elGrp);
        elCircles.forEach((elCircle, index) => { elGrp.removeChild(elCircle); });

        // create new circle elements in the group
        // and update them with the new data set
        const grpElem   = d3.select(elGrp);
        let   circElems = null;

        circElems = grpElem.selectAll("." + this._classes.circle + modifier)
                           .data(data.filter(d => d[type])) // update data
                           .enter().append("circle") // trigger enter

                           .attr("cx", d => x(d.week) + x.bandwidth() / 2)
                           .attr("cy", d => y(d[type])) // set x and y data
                           .attr("r", 0) // set the radius of the point

        // add default base and modifier
        // classes to the circle element
        elCircles = circElems.nodes()
        elCircles.forEach((elCircle, index) => {
            elCircle.classList.add(this._classes.circle);
            elCircle.classList.add(this._classes.circle + modifier);
        });

        // perform animation on
        // the circle elements
        circElems
            .transition().duration(this._anim.circle.duration)
            .delay((d, i) => (i * this._anim.circle.delay))
            .attr("r", this._circRad);
    };


    // @name _drawChart
    // @desc function to draw a new hero chart.
    // @return {Promise(Boolean)} - the resolved promise with the success flag.
    _drawChart = () => {
        return new Promise((resolve, reject) => {
            // set the initial data
            // to be an empty array
            try { let data = [ ];

            // get the data that corresponds to
            // the given chart type to be drawn
            switch(this.state.type) {
                case this._TYPES.data.SWING: {
                    data = [...this._swngData]; break; }

                case this._TYPES.data.INTERVAL: default: {
                    data = [...this._intvData]; break; }
            }

            // calculate the x and y
            // scales for the chart
            const x = d3.scaleBand()
                        .rangeRound([0, this._width]);

            const y = d3.scaleLinear()
                        .rangeRound([this._height, 0]);

            const y1 = d3.scaleLinear()
                         .rangeRound([this._height, 0]);

            // draw chart elements in
            // the next animation frame
            requestAnimationFrame(() => {
                // draw the bar elements
                this._drawBars(data, x, y, y1);

                // draw the line (or path) elements
                this._drawLines(data, x, y, this._TYPES.line.BEST);
                this._drawLines(data, x, y, this._TYPES.line.AVERAGE);

                // draw the point (or circle) elements
                this._drawPoints(data, x, y, this._TYPES.point.BEST);
                this._drawPoints(data, x, y, this._TYPES.point.AVERAGE);
                return resolve(true); // and resolve with true on success
            }); }

            // resolve with false on any error
            catch(error) { console.log(error);
                return resolve(false);
            }
        });
    };

    // ---------------------------------------------
    //   Public methods
    // ---------------------------------------------
    // @name componentDidMount
    // @desc the function called after the component has mounted.
    componentDidMount() {
        // get the set element references
        this._el.main = this.refs.main;
        this._el.svg  = this.refs.svg;
        this._el.grp  = this.refs.grp;

        // trigger window resize
        // at least once manually
        this._onWindowResize();

        // create the hero chart
        this._createChart().then(() => {
            // add a debounce to the window resize
            // event listener before it is bound
            this._onWindowResize = debounce(
                this._onWindowResize,
                this._debounce
            );

            // add listener to resize event
            this._addWindowResizeListener();
        });

    }

    // @name componentWillReceiveProps
    // @desc the function called when component is ready to receive new props.
    // @param {Object} nextProps - the changed properties to be compared with this.props.
    componentWillReceiveProps(nextProps) {
        console.log("-----------------------------------------------------------");
        console.log("component/HeroChart.js: componentWillReceiveProps() called.");

        // check if the next props has changed, get the keys and values of the changed props
        const {newProps, hasChanged, changedProps} = this._onPropsChange(nextProps, this.state);

        // if the next props has changed, then update the state
        if(hasChanged) { changedProps.forEach((prop, index) => {
            const obj = { }; obj[prop] = newProps[prop];

            this.setState(obj, () => {
                if(index === (changedProps.length - 1)
                && this._hasInitialized) { this._drawChart(); }
            });
        });}
    }

    // @name shouldComponentUpdate
    // @desc the function called to check if the component needs to be updated.
    // @param {Object} nextProps - the changed properties to be compared with this.props.
    // @param {Object} nextState - the changed component state to be compared with this.state.
    shouldComponentUpdate(nextProps, nextState) {
        console.log("-------------------------------------------------------");
        console.log("component/HeroChart.js: shouldComponentUpdate() called.");

        // in this particular component d3
        // controls the rendering of the
        // graph elements on any update
        return false;
    }

    // @name componentWillUnmount
    // @desc the function called before the component is unmounted.
    componentWillUnmount() {
        // remove the previously bound listener
        // function from the window resize event
        this._removeWindowResizeListener();
    }

    // ---------------------------------------------
    //   Render block
    // ---------------------------------------------
    // @name render
    // @desc the render function for the component.
    render() {
        console.log("component/HeroChart.js: render() called.");

        return (
            <div className="hchart" ref="main">
            {/* hero chart */}

                {/* hero chart - svg, g */}
                <svg className="hchart__svg" ref="svg">
                    <g className="hchart__svg__g" ref="grp">

                        {/* this element contains dynamic */}
                        {/* svg elements rendered with d3 */}

                    </g>{/* hero chart - g end */}
                </svg>{/* hero chart - svg end */}

            {/* hero chart end */}
            </div>
        );
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
export default HeroChart;
