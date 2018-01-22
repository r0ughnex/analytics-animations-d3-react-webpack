// -------------------------------------
//   Dependencies
// -------------------------------------
// pre
/* --empty block-- */

// core
import React, {Component} from "react";

// base
import * as d3 from "d3";

// modules
/* --empty block-- */

// services
/* --empty block-- */

//components
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
    _data = [
        { week:  1, intv_best: 54, intv_avg: 33, intv_score: 29, swng_best:  54, swng_avg:  33, swng_score:  39 },
        { week:  2, intv_best: 63, intv_avg: 35, intv_score: 37, swng_best: 104, swng_avg:  64, swng_score:  76 },
        { week:  3, intv_best: 79, intv_avg: 41, intv_score: 46, swng_best: 168, swng_avg: 102, swng_score: 122 },
        { week:  4, intv_best: 85, intv_avg: 45, intv_score: 51, swng_best: 201, swng_avg: 126, swng_score: 153 },
        { week:  5, intv_best: 89, intv_avg: 49, intv_score: 56, swng_best: 251, swng_avg: 164, swng_score: 196 },
        { week:  6, intv_best: 95, intv_avg: 57, intv_score: 64, swng_best: 305, swng_avg: 199, swng_score: 240 },
        { week:  7, intv_best: 99, intv_avg: 59, intv_score: 69, swng_best: 309, swng_avg: 199, swng_score: 249 },
        { week:  8, intv_best: 89, intv_avg: 49, intv_score: 56, swng_best: 251, swng_avg: 164, swng_score: 196 },
        { week:  9, intv_best: 85, intv_avg: 45, intv_score: 51, swng_best: 201, swng_avg: 126, swng_score: 153 },
        { week: 10, intv_best: 79, intv_avg: 41, intv_score: 46, swng_best: 168, swng_avg: 102, swng_score: 122 },
        { week: 11, intv_best: 63, intv_avg: 35, intv_score: 37, swng_best: 104, swng_avg:  64, swng_score:  76 },
        { week: 12, intv_best: 54, intv_avg: 33, intv_score: 29, swng_best:  54, swng_avg:  33, swng_score:  39 }
    ];

    _intvData = [ ];
    _swngData = [ ];

    _width  = 0;
    _height = 0;

    _margin = {
        top:  0, bottom: 20,
        left: 20, right: 0
    };

    _el  = null;
    _type = "";

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

        this._onDataChange(this._data);

        this._onTypeChange(this._type);
    }

    // ---------------------------------------------
    //   Private methods
    // ---------------------------------------------
    _createChart = (el) => {
        const svgElem = d3.select(el)
                        .append("svg")
                        .attr("class", "hchart__svg hchart__svg--theme-" + this._type);

        const gElem   = svgElem.append("g")
                        .attr("class", "hchart__svg__g");

        gElem.attr("transform", "translate(" + (this._margin.left - this._margin.right)  + ","
                                             + (this._margin.top  - this._margin.bottom) + ")");

        console.log("---------------");
        console.log("gElem:",   gElem);
        console.log("svgElem:", svgElem);

        // x and y scales
        const x = d3.scaleBand()
                    .rangeRound([0, this._width])
                    .padding(0.400).align(0.150);

        const y = d3.scaleLinear()
                    .rangeRound([this._height, 0]);

        const y1 = d3.scaleLinear()
                    .rangeRound([this._height, 0]);

        // line scales
        const lineAvg = d3.line()
                        .x(d => x(d.week) + x.bandwidth() / 2)
                        .y(d => y(d.avg))

                        // stop line if the value is null
                        .defined(d => d.avg);

        const lineBest = d3.line()
                        .x(d => x(d.week) + x.bandwidth() / 2)
                        .y(d => y(d.best))

                        // stop line if the value is null
                        .defined(d => d.best);

        console.log("-------------");
        console.log("x:",  typeof x);
        console.log("y:",  typeof y);
        console.log("y1:", typeof y1);

        console.log("-------------------------");
        console.log("lineAvg:",  typeof lineAvg);
        console.log("lineBest:", typeof lineBest);

        switch(this._type) {
            case "interval": {
                this._drawChart(el, this._intvData, x, y, y1); break; }
            case "swing": {
                this._drawChart(el, this._swngData, x, y, y1); break; }
            default:
        }
    };

    _destroyChart = () => {

    };

    _updateChart = () => {

    };

    _drawChart = (el, data, x, y, y1) => {
        data = [...data]; // shallow copy
        console.log("-----------------");
        console.log("data:", data);

        // add domains
        x.domain(data.map(d => d.week));
        y.domain([0, d3.max(data, d => d.best)]);
        y1.domain([0, d3.max(data, d => d.score)]);

        // adjust avg height
        const rate1 = d3.max(data, d => d.score) /
                      d3.max(data, d => d.best);

        console.log("-------------");
        console.log("rate1:", rate1);

        // bar points
        const gElem   = d3.select(el).select("g");
        const barElem = gElem.selectAll(".hchart__svg__bar").data(data);

        console.log("-------------");
        console.log("gElem:", gElem);
        console.log("barElem:", barElem);

        barElem.enter()
                .append("rect")
                .attr("class", "hchart__svg__bar")

                .attr("x", (d) => x(d.week))
                .attr("y", this._height)

                .transition().duration(500)
                .delay((d, i) => (i * 75))

                .attr("y", (d) => (y1(d.score)
                                    + (this._height - y1(d.score)
                                    - (this._height - y1(d.score)) * rate1)))

                .attr("width", ((this._width / data.length) - this._margin.left - this._margin.right))
                .attr("height", (d) => ((this._height - y1(d.score)) * rate1))
    };

    _onDataChange = (data) => {
        let intvData = [ ];
        let swngData = [ ];

        data.forEach((entry, index) => {
            intvData.push({
                week:  entry.week,
                avg:   entry.intv_avg,
                best:  entry.intv_best,
                score: entry.intv_score
            });

            swngData.push({
                week:  entry.week,
                avg:   entry.swng_avg,
                best:  entry.swng_best,
                score: entry.swng_score
            });
        });

        this._intvData = intvData;
        this._swngData = swngData;

        console.log("-------------------------------");
        console.log("this._intvData:", this._intvData);
        console.log("this._swngData:", this._swngData);
    };

    _onTypeChange = (type) => {
        try { type = type.toLowerCase();   }
        catch(error) { console.log(error); }

        switch(type) {
            case "interval": {
                this._type = type;
                console.log("-----------------------");
                console.log("this._type:", this._type);
                break;
            }

            case "swing": {
                this._type = type;
                console.log("-----------------------");
                console.log("this._type:", this._type);
                break;
            }

            default: {
                type = "interval";
                this._onTypeChange(type);
            }
        }
    };

    _onWindowResize = (el) => {
        const elRect = el.getBoundingClientRect()
        this._width  = elRect.width  - this._margin.left - this._margin.right;
        this._height = elRect.height - this._margin.top  - this._margin.bottom;

        console.log("-------------------------");
        console.log("this._width:", this._width);
        console.log("this._margin.left:", this._margin.left);
        console.log("this._margin.right:", this._margin.right);

        console.log("---------------------------");
        console.log("this._height:", this._height);
        console.log("this._margin.top:", this._margin.top);
        console.log("this._margin.bottom:", this._margin.bottom);
    };

    // ---------------------------------------------
    //   Public methods
    // ---------------------------------------------
    // @name componentDidMount
    // @desc the function called after the component has mounted.
    componentDidMount() {
        this._el = this.refs.el;

        this._onWindowResize(this._el);

        this._createChart(this._el);
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
