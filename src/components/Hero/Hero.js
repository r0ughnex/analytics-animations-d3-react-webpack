// -------------------------------------
//   Dependencies
// -------------------------------------
// core
import React, {PureComponent} from "react";

// base
import debounce from "debounce";
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
import hero from "./Hero.css";
const classes = {...hero};

// -------------------------------------
//   Component - Hero
// -------------------------------------
/**
    * @name Hero
    * @desc class for the hero component
    * @return {Object} - the instance of the component class
**/
class Hero extends PureComponent {
    // ---------------------------------------------
    //   Private members
    // ---------------------------------------------
    // to parse the given data
    _parseDate = d3.time.format("%d-%b-%Y").parse;

    // reference to the data
    // used for the graphs
    _data = {
        // for line graph
        line: {
            // start and end
            // data for aniamtion
            null: [
                [this._parseDate("1-jan-2017"), 0], [this._parseDate("1-apr-2017"), 0],
                [this._parseDate("1-may-2017"), 0], [this._parseDate("1-jun-2017"), 0],
                [this._parseDate("1-dec-2017"), 0],
            ],

            // intermediate value
            // during animation
            mid: [
                [this._parseDate("1-jan-2017"),  0], [this._parseDate("1-apr-2017"),  5],
                [this._parseDate("1-may-2017"), 30], [this._parseDate("1-jun-2017"), 50],
                [this._parseDate("1-dec-2017"),  5]
            ],

            // final value
            top: [
                [this._parseDate("1-jan-2017"), 25], [this._parseDate("1-apr-2017"), 30],
                [this._parseDate("1-may-2017"), 50], [this._parseDate("1-jun-2017"), 60],
                [this._parseDate("1-dec-2017"), 45]
            ],
        },

        // for the area graphs
        area: {
            // start and end
            // data for aniamtion
            null: [
                [this._parseDate("1-dec-2016"), 0], [this._parseDate("1-jan-2017"), 0],
                [this._parseDate("1-feb-2017"), 0], [this._parseDate("1-mar-2017"), 0],
                [this._parseDate("1-apr-2017"), 0], [this._parseDate("1-may-2017"), 0],
                [this._parseDate("1-jun-2017"), 0], [this._parseDate("1-jul-2017"), 0],
                [this._parseDate("1-aug-2017"), 0], [this._parseDate("1-sep-2017"), 0],
                [this._parseDate("1-oct-2017"), 0], [this._parseDate("1-nov-2017"), 0],
                [this._parseDate("1-dec-2017"), 0], [this._parseDate("1-jan-2018"), 0]
            ],

            // final value
            // for the area
            // graph at back
            back: [
                [this._parseDate("1-dec-2016"),  0], [this._parseDate("1-jan-2017"), 25],
                [this._parseDate("1-feb-2017"), 10], [this._parseDate("1-mar-2017"), 17],
                [this._parseDate("1-apr-2017"), 30], [this._parseDate("1-may-2017"), 25],
                [this._parseDate("1-jun-2017"), 50], [this._parseDate("1-jul-2017"), 60],
                [this._parseDate("1-aug-2017"), 50], [this._parseDate("1-sep-2017"), 30],
                [this._parseDate("1-oct-2017"), 25], [this._parseDate("1-nov-2017"), 45],
                [this._parseDate("1-dec-2017"), 20], [this._parseDate("1-jan-2018"),  0]
            ],

            // final value
            // for the area
            // graph in front
            front: [
                [this._parseDate("1-dec-2016"),  0], [this._parseDate("1-jan-2017"), 10],
                [this._parseDate("1-feb-2017"),  7], [this._parseDate("1-mar-2017"), 12],
                [this._parseDate("1-apr-2017"), 25], [this._parseDate("1-may-2017"), 35],
                [this._parseDate("1-jun-2017"), 25], [this._parseDate("1-jul-2017"), 15],
                [this._parseDate("1-aug-2017"),  6], [this._parseDate("1-sep-2017"),  9],
                [this._parseDate("1-oct-2017"), 11], [this._parseDate("1-nov-2017"), 40],
                [this._parseDate("1-dec-2017"), 30], [this._parseDate("1-jan-2018"),  0]
            ]
        }
    };

    // timings
    // for animation
    _timings = {
        start: 0, // 1

        begin: {
            in:  0 + 800, // 2
            out: 0 + 800 + 1400 + 1500 // 4
        },

        finish: {
            in:  0 + 800 + 1400, // 3
            out: 0 + 800 + 1400 + 1500 + 1300 // 5
        },

        end: 0 + 800 + 1400 + 1500 + 1300 + 1500  // 6
    }

    // interval used for the animation
    animationtimer   = null;
    animationTimeout = this._timings.end;

    // main svg element
    _svg = null;

    // wrapper element dimensions
    _width  = 0;
    _height = 0;
    _marginBottom = -2;

    // chart element dimensions
    _chartWidth  = this._width;
    _chartBottom = this._height - this._marginBottom;
    _chartHeight = this._chartBottom - 10; // 10 is baseline

    // holds the scale functional values
    _scale = { x: null, y: null };

    // reference to the axis elements
    _axis  = { x: null, y: null, path: null };

    // reference to the area graph calculations
    _areaBack:  null;
    _areaFront: null;

    // reference to the area graph elements
    _area = {
        back:  { lbl:  null, rbl:  null, path: null  },
        front: { lbl:  null, rbl:  null, path: null, }
    };

    // reference to the line graph calculations
    _lineMain = null;

    // reference to the line graph elements
    _line = { path: null }

    // ---------------------------------------------
    //   Public members
    // ---------------------------------------------
    // boolean flag to indicate if the
    // chart animations can be run
    state = { canPlayAnimations: true };

    // ---------------------------------------------
    //   Constructor block
    // ---------------------------------------------
    // @name constructor
    // @desc --description--
    // @params {Type} --input param--
    constructor(props) {
        super(props);
        this._onWindowResize = debounce(this._onWindowResize, 25);
    }

    // @name componentDidMount
    // @desc --description--
    componentDidMount() {
        console.log("Hero componentDidMount() called.");

        this._createChart(); // create a new chart
        requestAnimationFrame(() => { // wait for the next animation frame
            this._beginChartAnimations(); // begin the chart animation sequence
        });

        // add listener to window
        // to resize the given chart
        this._addWindowResizeListener();
    }

    // @name componentDidMount
    // @desc --description--
    componentWillUnmount() {
        console.log("Hero componentWillUnmount() called.");

        // end the chart animations
        this._endChartAnimations();

        // remove listener from window
        // to resize the current chart
        this._removeWindowResizeListener();
    }

    // @name shouldComponentUpdate
    // @desc --description--
    // @params {Type} --input param--
    // @return {Type} --return value--
    // shouldComponentUpdate(nextProps, nextState) { /* --empty block-- */ }

    // ---------------------------------------------
    //   Private methods
    // ---------------------------------------------
    // @name _onWindowResize
    // @desc --description--
    // @params {Type} --input param--
    _onWindowResize = (event) => {
        this._endChartAnimations(); // end the chart animations
        this._destroyChart(); // destroy the current chart
        this._createChart();  // create a new chart

        requestAnimationFrame(() => { // wait for the next animation frame
            this._beginChartAnimations(); // begin the chart animation sequence
        });
    };

    // @name _addWindowResizeListener
    // @desc --description--
    _addWindowResizeListener() {
        window.addEventListener("resize", this._onWindowResize);
    }

    // @name_removeWindowResizeListener
    // @desc --description--
    _removeWindowResizeListener() {
        window.removeEventListener("resize", this._onWindowResize);
    }

    // @name _destroyChart
    // @desc --description--
    _destroyChart = () => {
        if(this._svg && typeof this._svg.html === "function") {
            this._svg.html(null);
        }
    };

    // @name _createChart
    // @desc --description--
    _createChart = () => {
        // get the main element
        this._svg    = d3.select("." + classes.chart);

        // get element dimensions
        this._width  = this._svg.node().clientWidth;
        this._height = this._svg.node().clientHeight;

        // get chart dimensions
        this._chartWidth  = this._width;
        this._chartBottom = this._height - this._marginBottom;
        this._chartHeight = this._chartBottom - 10; // 10 is baseline

        // calculat the scale functional values
        this._scale.x = d3.time.scale()
            .range([0, this._width])
            .domain(d3.extent(this._data.area.back, function(d) { return d[0]; }));

        this._scale.y = d3.scale.linear()
            .range([this._chartHeight, 0])
            .domain([0, d3.max(this._data.area.back, function(d) { return (d[1]*1.2); /* pad for elastic easing */ })]);

        // calculate the axis functional values
        this._axis.x = d3.svg.axis()
            .scale(this._scale.x)
            .orient("bottom").ticks(12)
            .tickFormat(d3.time.format("%b"));

        // create the axis path elements
        this._axis.path = this._svg.append("g")
            .attr("class", classes.axis_posX)
            .attr("transform", "translate(0," + this._chartBottom + ")")
            .call(this._axis.x);

        // calculate the area graph values
        this._areaBack = d3.svg.area()
            .x(function(d) { return this._scale.x(d[0]); })
            .y0(this._chartHeight)
            .y1(function(d) { return this._scale.y(d[1]); });

        // create the area graph elements
        this._area.back.path = this._svg.append("path")
            .attr("class", classes.area_posBack);

        this._area.back.rbl = this._svg.append("line")
            .attr("class", classes.baseline_posBackRight);

        this._area.back.lbl = this._svg.append("line")
            .attr("class", classes.baseline_posBackLeft);

        // calculate the area graph values
        this._areaFront = d3.svg.area()
            .x(function(d) { return this._scale.x(d[0]); })
            .y0(this._chartHeight)
            .y1(function(d) { return this._scale.y(d[1]); });

        // create the area graph elements
        this._area.front.path = this._svg.append("path")
            .attr("class", classes.area_posFront);

        this._area.front.rbl = this._svg.append("line")
            .attr("class", classes.baseline_posFrontRight);

        this._area.front.lbl = this._svg.append("line")
            .attr("class", classes.baseline_posFrontLeft);

        // create the line graph elements
        this._lineMain = d3.svg.line()
            .x(function(d, i){
                return this._scale.x(d[0]);
            })

            .y(function(d, i){
                return this._scale.y(d[1]);
            });

        // create the line graph elements
        this._line.path = this._svg.append("svg:path")
            .attr("class", classes.line);
    };

    // @name _endChartAnimations
    // @desc --description--
    _endChartAnimations = () => {
        clearTimeout(this.animationtimer); // clear previous timers

        if(this._svg && typeof this._svg.selectAll === "function") {
            // interrupt animations on all the nested child elements
            this._svg.selectAll("*").interrupt().transition().duration(0);
        }
    };

    // @name _beginChartAnimations
    // @desc --description--
    _beginChartAnimations = () => {

        // animate the path of the
        // area graph in the back
        this._area.back.path
            .attr("d", this._areaBack(this._data.area.null))
            .transition()
                .delay(this._timings.begin.in + 300)
                .duration(700)
                .ease("elastic", 1, 0.9)
            .attr("d", this._areaBack(this._data.area.back))
            .transition()
                .delay(this._timings.begin.out + 300)
                .duration(500)
                .ease("cubic")
            .attr("d", this._areaBack(this._data.area.null));

        // animate the right base line of
        // the area graph in the the back
        this._area.back.rbl
            .attr("x1", (this._width / 2))
            .attr("x2", (this._width / 2))
            .attr("y1", (this._height - this._marginBottom - 5))
            .attr("y2", (this._height - this._marginBottom - 5))
            .transition()
                .delay(this._timings.start)
                .duration(500)
            .attr("x1", 0)
            .transition()
                .delay(this._timings.finish.out + 300)
                .duration(500)
            .attr("x1", (this._width / 2));

        // animate the left base line of
        // the area graph in the the back
        this._area.back.lbl
            .attr("x1", (this._width / 2))
            .attr("x2", (this._width / 2))
            .attr("y1", (this._height - this._marginBottom - 5))
            .attr("y2", (this._height - this._marginBottom - 5))
            .transition()
                .delay(this._timings.start)
                .duration(500)
            .attr("x2", this._width)
            .transition()
                .delay(this._timings.finish.out + 300)
                .duration(500)
            .attr("x2", (this._width / 2));

        // animate the path of the
        // area graph in the front
        this._area.front.path
            .attr("d", this._areaFront(this._data.area.null))
            .transition()
                .delay(this._timings.begin.in + 300)
                .duration(700)
                .ease("elastic", 1, 0.9)
            .attr("d", this._areaFront(this._data.area.front))
            .transition()
                .delay(this._timings.begin.out)
                .duration(500)
                .ease("cubic")
            .attr("d", this._areaFront(this._data.area.null));

        // animate the right base line of
        // the area graph in the the front
        this._area.front.rbl
            .attr("x1", (this._width / 2))
            .attr("x2", (this._width / 2))
            .attr("y1", (this._height - this._marginBottom - 5))
            .attr("y2", (this._height - this._marginBottom - 5))
            .transition()
                .delay(this._timings.start + 300)
                .duration(500)
            .attr("x1", 0)
            .transition()
                .delay(this._timings.finish.out)
                .duration(500)
            .attr("x1", (this._width / 2));

        // animate the left base line of
        // the area graph in the the front
        this._area.front.lbl
            .attr("x1", (this._width / 2))
            .attr("x2", (this._width / 2))
            .attr("y1", (this._height - this._marginBottom - 5))
            .attr("y2", (this._height - this._marginBottom - 5))
            .transition()
                .delay(this._timings.start + 300)
                .duration(500)
            .attr("x2", this._width)
            .transition()
                .delay(this._timings.finish.out)
                .duration(500)
            .attr("x2", (this._width / 2));

        // animate the path
        // of the line graph
        this._line.path
            .attr("class", classes.line_animationStart)
            .attr("d", this._lineMain(this._data.line.null))
            .transition()
                .delay(this._timings.begin.in + 300)
                .duration(500)
                .ease("linear", 1, 0.4)
            .attr("d", this._lineMain(this._data.line.mid))
            .attr("class", classes.line)
            .transition()
                .delay(this._timings.begin.in + 800)
                .duration(500)
                .ease("elastic", 1, 0.4)
            .attr("d", this._lineMain(this._data.line.top))
            .transition()
                .delay(this._timings.begin.out + 500)
                .duration(500)
                .ease("cubic")
            .attr("d", this._lineMain(this._data.line.null))
            .transition()
                .delay(this._timings.finish.out)
            .attr("class", classes.line_animationDone);

        // animate the path
        // of the graph axis
        this._axis.path
            .attr("class", classes.axis_animationStart)
            .transition()
                .delay(this._timings.start)
                .duration(500)
            .attr("class", classes.axis_posX)
            .transition()
                .delay(this._timings.finish.out + 800)
                .duration(500)
            .attr("class", classes.axis_animationDone);

        // check if animations are allowed
        if(this.state.canPlayAnimations) {
            // the delay is for a smoother effect
            this.animationtimer = setTimeout(() => {
                requestAnimationFrame(() => { // wait for the next animation frame
                    this._beginChartAnimations(); // begin the chart animation sequence
                });
            }, this.animationTimeout);
        }

        // else end the chart animations
        else { this._endChartAnimations(); }
    };

    // ---------------------------------------------
    //   Public methods
    // ---------------------------------------------
    // @name onButtonClick
    // @desc --description--
    // @params {Type} --input param--
    onButtonClick = (event) => {
        if(event) { try {
            event.target.blur();
            event.preventDefault();
            event.stopPropagation();
            event.target.parentNode.blur(); }
            catch(error) { console.log(error); }
        }

        // set the boolean flag in the state
        this.setState((prevState, props) => {
            let canPlayAnimations = !prevState.canPlayAnimations;

            // check if the animations
            // are allowed to be played
            if(canPlayAnimations) {
                requestAnimationFrame(() => { // wait for the next animation frame
                    this._beginChartAnimations(); // begin the chart animation sequence
                });
            }

            // else end the chart animations
            // note: let the current animation run
            // and let it end after it is complete
            // else { this._endChartAnimations(); }

            return { canPlayAnimations: canPlayAnimations };
        });

    };

    // ---------------------------------------------
    //   Render block
    // ---------------------------------------------
    // @name render
    // @desc --description--
    render() {
        console.log("Hero.render() called.");

        return (
            <div className={classes.hero}>
            {/* hero */}

                {/* content */}
                <div className={classes.content}>
                    {/* headline */}
                    <h2 className={classes.headline}>
                        Lorem ipsum dolar, <br/>
                        sit adipiscing elit.
                    </h2>

                    {/* copy */}
                    <p className={classes.copy}>
                        Cras quis malesuada odio. Fusce viverra purus ante, non
                        dapibus lorem tincidunt vitae. Duis a ornare ipsum, non
                        porttitor orci. Nullam imperdiet a lacus quis egestas.
                    </p>

                    {/* button */}
                    <button onClick={this.onButtonClick}
                            className={classes.button_colorSecondary}>
                            {this.state.canPlayAnimations ? "Pause" : "Play"} Animations
                    </button>
                </div>{/* content end */}

                {/* chart */}
                <svg className={classes.chart}></svg>

            {/* hero end */}
            </div>
        );
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
export default Hero;
