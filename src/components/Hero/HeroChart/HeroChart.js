// -------------------------------------
//   Dependencies
// -------------------------------------
// pre
/* --empty block-- */

// core
import React, {Component} from "react";

// base
import query from "base/query";
import * as d3 from "d3";

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
    _TYPES = {
        data:  { SWING: "swing", INTERVAL: "interval" },
        line:  { BEST:  "best",  AVERAGE:  "avg" },
        point: { BEST:  "best",  AVERAGE:  "avg" }
    }

    _intvData = [ ];
    _swngData = [ ];
    _hasInitialized = false;

    _el = {
        main: null,
        svg:  null,
        grp:  null
    }

    _classes = {
        main: "hchart",
        svg:  "hchart__svg",
        grp:  "hchart__svg__g",

        bar:    "hchart__svg__bar",
        path:   "hchart__svg__path",
        circle: "hchart__svg__circle"
    }

    _modifiers = {
        interval: "--theme-interval",
        swing:    "--theme-swing",

        lineb: "--line-best",
        linea: "--line-avg",

        pointb: "--point-best",
        pointa: "--point-avg"
    }

    _width  = 0;
    _height = 0;

    _circRad  = 6;
    _winWidth = 0;
    _mobWidth = {
        small: 480,
        deflt: 780
    };

    _margin = {
        bar: 20,
        top: 20, left: 0,
        right: 0, bottom: 0
    };

    _anim = {
        bar:    { duration:  500, delay: 75 },
        path:   { duration: 3000, delay:  0 },
        circle: { duration: 2250, delay: 50 }
    }

    // ---------------------------------------------
    //   Public members
    // ---------------------------------------------
    state = {
        data: [ ],
        type: ""
    }

    // ---------------------------------------------
    //   Constructor block
    // ---------------------------------------------
    // @name constructor
    // @desc the constructor for the component class.
    // @param {Object} props - the properties passed to the component.
    constructor(props) {
        super(props);

        const data = [
            { week:  1, intv_best: 55, intv_avg: 31, intv_score: 36, swng_best:  76, swng_avg:  45, swng_score:  54 },
            { week:  2, intv_best: 58, intv_avg: 34, intv_score: 38, swng_best:  79, swng_avg:  48, swng_score:  57 },
            { week:  3, intv_best: 63, intv_avg: 35, intv_score: 37, swng_best: 104, swng_avg:  64, swng_score:  76 },
            { week:  4, intv_best: 71, intv_avg: 38, intv_score: 41, swng_best: 136, swng_avg:  83, swng_score:  99 },
            { week:  5, intv_best: 79, intv_avg: 41, intv_score: 46, swng_best: 168, swng_avg: 102, swng_score: 122 },
            { week:  6, intv_best: 67, intv_avg: 35, intv_score: 38, swng_best: 184, swng_avg: 114, swng_score: 137 },
            { week:  7, intv_best: 55, intv_avg: 30, intv_score: 31, swng_best: 201, swng_avg: 126, swng_score: 153 },
            { week:  8, intv_best: 67, intv_avg: 35, intv_score: 38, swng_best: 226, swng_avg: 145, swng_score: 174 },
            { week:  9, intv_best: 79, intv_avg: 41, intv_score: 46, swng_best: 251, swng_avg: 164, swng_score: 196 },
            { week: 10, intv_best: 72, intv_avg: 39, intv_score: 45, swng_best: 278, swng_avg: 182, swng_score: 218 },
            { week: 11, intv_best: 65, intv_avg: 37, intv_score: 44, swng_best: 305, swng_avg: 199, swng_score: 240 },
            { week: 12, intv_best: 62, intv_avg: 34, intv_score: 41, swng_best: 308, swng_avg: 202, swng_score: 243 }
        ];

        const type = this._TYPES.data.INTERVAL;

        this.state.data = data;
        this.state.type = type;

        this._onDataChange(data, false);
        this._onTypeChange(type, false);
    }

    // ---------------------------------------------
    //   Private methods
    // ---------------------------------------------
    _onDataChange = (data, setState) => {
        if(typeof setState !== "boolean") {
            setState = false;
        }

        let intvData = [ ];
        let swngData = [ ];

        data.forEach((entry, index) => {
            intvData.push({
                week: entry.week,
                avg: entry.intv_avg,
                best: entry.intv_best,
                score: entry.intv_score
            });

            swngData.push({
                week: entry.week,
                avg: entry.swng_avg,
                best: entry.swng_best,
                score: entry.swng_score
            });
        });

        this._intvData = intvData;
        this._swngData = swngData;
        if(setState) { this.setState({data: data}); }
    };

    _onTypeChange = (type, setState) => {
        if(typeof setState !== "boolean") {
            setState = false;
        }

        switch(type) {
            case this._TYPES.data.INTERVAL: { if(setState) { this.setState({type: type}); } break; }
            case this._TYPES.data.SWING:    { if(setState) { this.setState({type: type}); } break; }
            default: { this._onTypeChange(this._TYPES.data.INTERVAL); }
        }
    };

    _onWindowResize = () => {
        this._winWidth = window.innerWidth
                        || document.documentElement.clientWidth
                        || document.body.clientWidth;

        const elRect = this._el.main.getBoundingClientRect()
        const height = elRect.height - this._margin.top  - this._margin.bottom;
        const width  = elRect.width  - this._margin.left - this._margin.right
                                     + (this._margin.bar / (this._winWidth < this._mobWidth.small ? 2 : 1));

        if(Math.abs(this._width - width) >= 50
        || Math.abs(this._height - height) >= 50) {
            this._height = height; this._width = width;
            if(this._hasInitialized) { this._drawChart(); }
        }
    };

    _createChart = () => {
        const svgElem = d3.select(this._el.main)
                        .append("svg");

        this._el.svg = svgElem.node();
        this._el.svg.classList.add(this._classes.svg);
        this._el.svg.classList.add(this._classes.svg + this._modifiers[this.state.type]);

        const grpElem = svgElem
                        .append("g");

        this._el.grp = grpElem.node();
        this._el.grp.classList.add(this._classes.grp);
        this._el.grp.setAttribute("transform", "translate(" + (this._margin.left - this._margin.right)  + ", "
                                                            + (this._margin.top  - this._margin.bottom) + ")");

        if(!this._hasInitialized) {
            this._drawChart(); this._hasInitialized = true;
        }
    };

    _destroyChart = () => {
        this._el.main.innerHTML = "";
        this._hasInitialized = false;

        this._el.svg  = null;
        this._el.grp  = null;
    };

    _drawBars = (data, x, y, y1) => {
        // add domains
        x.domain(data.map(d => d.week));
        y.domain([0, d3.max(data, d => d.best)]);
        y1.domain([0, d3.max(data, d => d.score)]);

        // adjust avg height
        const rate1 = d3.max(data, d => d.score) /
                      d3.max(data, d => d.best);

        // bars (elements)
        const grpElem  = d3.select(this._el.grp);
        let   barElems = grpElem.selectAll("." + this._classes.bar)
                        .data(data);

        if(!this._hasInitialized) {
            barElems =
            barElems.enter()
                    .append("rect")
                    .attr("class", this._classes.bar)
                    .attr("x", (d) => x(d.week))
                    .attr("y", this._height)
        }

        // bar animation
        barElems
            .transition().duration(this._anim.bar.duration)
            .delay((d, i) => (i * this._anim.bar.delay))

            .attr("x", (d) => x(d.week))
            .attr("y", (d) => (y1(d.score)
                            + (this._height - y1(d.score)
                            - (this._height - y1(d.score)) * rate1)))

            .attr("height", (d) => ((this._height - y1(d.score)) * rate1))
            .attr("width", ((this._width / data.length) - (this._margin.bar /
                            (this._winWidth < this._mobWidth.small ? 2 : 1))));

        if(!this._hasInitialized) {
            barElems.exit().remove();
        }
    };

    _drawLines = (data, x, y, type) => {
        let modifier = null;

        switch(type) {
            case this._TYPES.line.AVERAGE: {
                type = this._TYPES.line.AVERAGE;
                modifier = this._modifiers.linea; break; }
            case this._TYPES.line.BEST: default: {
                type = this._TYPES.line.BEST;
                modifier = this._modifiers.lineb; break; }
        }

        // line scale
        const scale = d3.line()
                    .x(d => x(d.week) + x.bandwidth() / 2)
                    .y(d => y(d[type]))

                    // stop line if the value is null
                    .defined(d => d[type]);

        // lines (best, avg path)
        const grpElem  = d3.select(this._el.grp);
        grpElem.select("." + this._classes.path + modifier).remove();

        const pathElem = grpElem
                        .append("path")
                        .attr("class", this._classes.path + " "
                        + (this._classes.path + modifier))
                        .datum(data).attr("d", scale);

        // path animation
        const pathLength = pathElem.node().getTotalLength();

        pathElem
            .attr("stroke-dasharray",  pathLength + " " + pathLength)
            .attr("stroke-dashoffset", pathLength)

            .transition().duration(this._anim.path.duration)
            .delay((d, i) => (i * this._anim.path.delay))
            .attr("stroke-dashoffset", 0);

        pathElem.exit().remove();
    };

    _drawPoints = (data, x, y, type) => {
        let modifier = null;

        switch(type) {
            case this._TYPES.point.AVERAGE: {
                type = this._TYPES.point.AVERAGE;
                modifier = this._modifiers.pointa; break; }
            case this._TYPES.point.BEST: default: {
                type = this._TYPES.point.BEST;
                modifier = this._modifiers.pointb; break; }
        }

        // circles (best, avg points)
        const grpElem  = d3.select(this._el.grp);
        grpElem.selectAll("." + this._classes.circle + modifier).remove();

        const circleElems = grpElem
                        .selectAll("." + this._classes.circle + modifier)
                        .data(data.filter(d => d[type]));

        // circle animation
        circleElems.enter()
            .append("circle")
            .attr("class", this._classes.circle + " "
                        + (this._classes.circle + modifier))

            .attr("cx", d => x(d.week) + x.bandwidth() / 2)
            .attr("cy", d => y(d[type]))
            .attr("r", 0)

            .transition().duration(this._anim.circle.duration)
            .delay((d, i) => (i * this._anim.circle.delay))
            .attr("r", this._circRad);
    };

    _drawChart = () => {
        let data = [ ];

        switch(this.state.type) {
            case this._TYPES.data.SWING: {
                data = [...this._swngData]; break; }
            case this._TYPES.data.INTERVAL: default: {
                data = [...this._intvData]; break; }
        }

        // x and y scales
        const x = d3.scaleBand()
                    .rangeRound([0, this._width]);

        const y = d3.scaleLinear()
                    .rangeRound([this._height, 0]);

        const y1 = d3.scaleLinear()
                    .rangeRound([this._height, 0]);

        // draw bars
        this._drawBars(data, x, y, y1);

        // draw lines
        this._drawLines(data, x, y, this._TYPES.line.BEST);
        this._drawLines(data, x, y, this._TYPES.line.AVERAGE);

        // draw points
        this._drawPoints(data, x, y, this._TYPES.point.BEST);
        this._drawPoints(data, x, y, this._TYPES.point.AVERAGE);
    };

    // ---------------------------------------------
    //   Public methods
    // ---------------------------------------------
    // @name componentDidMount
    // @desc the function called after the component has mounted.
    componentDidMount() {
        this._el.main = this.refs.el;
        this._onWindowResize();
        this._createChart();
    }

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
        console.log("component/HeroChart.js: render called.");

        return (
            <div className="hchart" ref="el">
            {/* hero chart */}

                {/* this element contains dynamic */}
                {/* svg elements rendered with d3 */}

            {/* hero chart end */}
            </div>
        );
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
export default HeroChart;
