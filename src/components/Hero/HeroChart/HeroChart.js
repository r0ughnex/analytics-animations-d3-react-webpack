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

    _intvData = [ ];
    _swngData = [ ];

    _el = {
        main: null,
        svg:  null,
        grp:  null
    }

    _classes = {
        main: "hchart",
        svg:  "hchart__svg",
        grp:  "hchart__svg__g",

        bar:  "hchart__svg__bar",
        path: "hchart__svg__path"
    }

    _modifiers = {
        interval: "--theme-interval",
        swing:    "--theme-swing",
        lineb:    "--line-best",
        linea:    "--line-avg"
    }

    _width  = 0;
    _height = 0;

    _windowWidth = 0;
    _mobileWidth = {
        small: 480,
        deflt: 780
    };

    _margin = {
        bar: 20,
        top:  20, left: 0,
        right: 0, bottom: 0
    };

    _type = "";

    _animation = {
        bar:  { duration:  500, delay: 75 },
        path: { duration: 3000, delay:  0 }
    }

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

    _onWindowResize = () => {
        this._windowWidth = window.innerWidth
                         || document.documentElement.clientWidth
                         || document.body.clientWidth;

        const elRect = this._el.main.getBoundingClientRect()
        this._height = elRect.height - this._margin.top  - this._margin.bottom;
        this._width  = elRect.width  - this._margin.left - this._margin.right
                                     + (this._margin.bar / (this._windowWidth < this._mobileWidth.small ? 2 : 1));

        console.log("-------------------------");
        console.log("this._width:", this._width);
        console.log("this._windowWidth:", this._windowWidth);
        console.log("this._margin.left:", this._margin.left);
        console.log("this._margin.right:", this._margin.right);

        console.log("---------------------------");
        console.log("this._height:", this._height);
        console.log("this._margin.top:", this._margin.top);
        console.log("this._margin.bottom:", this._margin.bottom);
    };

    _createChart = () => {
        const svgElem = d3.select(this._el.main)
                        .append("svg");

        this._el.svg = svgElem.node();
        this._el.svg.classList.add(this._classes.svg);
        this._el.svg.classList.add(this._classes.svg + this._modifiers[this._type]);

        const grpElem = svgElem
                        .append("g");

        this._el.grp = grpElem.node();
        this._el.grp.classList.add(this._classes.grp);
        this._el.grp.setAttribute("transform", "translate(" + (this._margin.left - this._margin.right)  + ", "
                                                            + (this._margin.top  - this._margin.bottom) + ")");

        console.log("--------------------------");
        console.log("this._el.grp", this._el.grp);
        console.log("this._el.svg:", this._el.svg);

        // x and y scales
        const x = d3.scaleBand()
                    .rangeRound([0, this._width]);

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
                this._drawChart(this._intvData, x, y, y1,
                                lineBest, lineAvg); break; }
            case "swing": {
                this._drawChart(this._swngData, x, y, y1,
                                lineBest, lineAvg); break; }
            default:
        }
    };

    _destroyChart = () => {

    };

    _updateChart = () => {

    };

    _drawChart = (data, x, y, y1, lineBest, lineAvg) => {
        data = [...data];
        console.log("-----------");
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
        const grpElem  = d3.select(this._el.grp);
        const barElems = grpElem.selectAll(this._classes.bar)
                        .data(data);

        console.log("-----------------");
        console.log("grpElem:", grpElem);
        console.log("barElems:", barElems);

        barElems.enter()
            .append("rect")
            .attr("class", this._classes.bar)
            .attr("x", (d) => x(d.week))
            .attr("y", this._height)

            .transition().duration(this._animation.bar.duration)
            .delay((d, i) => (i * this._animation.bar.delay))

            .attr("y", (d) => (y1(d.score)
                            + (this._height - y1(d.score)
                            - (this._height - y1(d.score)) * rate1)))

            .attr("height", (d) => ((this._height - y1(d.score)) * rate1))
            .attr("width", ((this._width / data.length) - (this._margin.bar /
                            (this._windowWidth < this._mobileWidth.small ? 2 : 1))));

        // line (best path)
        grpElem.select(this._classes.path + this._modifiers.lineb).remove();

        const pathElem = grpElem
                        .append("path")
                        .datum(data).attr("d", lineBest);

        const elPath = pathElem.node();
        elPath.classList.add(this._classes.path);
        elPath.classList.add(this._classes.path + this._modifiers.lineb);

        // path animation
        const pathLength = pathElem.node().getTotalLength();

        pathElem
            .attr("stroke-dasharray",  pathLength + " " + pathLength)
            .attr("stroke-dashoffset", pathLength)

            .transition().duration(this._animation.path.duration)
            .delay((d, i) => (i * this._animation.path.delay))
            .attr("stroke-dashoffset", 0);

        pathElem.exit().remove();
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
