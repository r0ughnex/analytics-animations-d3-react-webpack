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
        { week:  1, intv_best: 54, intv_avg: 33, intv_score: 39, swng_best:  54, swng_avg:  33, swng_score:  39 },
        { week:  2, intv_best: 63, intv_avg: 35, intv_score: 37, swng_best: 104, swng_avg:  64, swng_score:  76 },
        { week:  3, intv_best: 79, intv_avg: 41, intv_score: 46, swng_best: 168, swng_avg: 102, swng_score: 122 },
        { week:  4, intv_best: 55, intv_avg: 30, intv_score: 31, swng_best: 201, swng_avg: 126, swng_score: 153 },
        { week:  5, intv_best: 79, intv_avg: 41, intv_score: 46, swng_best: 251, swng_avg: 164, swng_score: 196 },
        { week:  6, intv_best: 65, intv_avg: 37, intv_score: 44, swng_best: 305, swng_avg: 199, swng_score: 240 },
        { week:  7, intv_best: 65, intv_avg: 37, intv_score: 44, swng_best: 305, swng_avg: 199, swng_score: 240 },
        { week:  8, intv_best: 79, intv_avg: 41, intv_score: 46, swng_best: 251, swng_avg: 164, swng_score: 196 },
        { week:  9, intv_best: 55, intv_avg: 30, intv_score: 31, swng_best: 201, swng_avg: 126, swng_score: 153 },
        { week: 10, intv_best: 79, intv_avg: 41, intv_score: 46, swng_best: 168, swng_avg: 102, swng_score: 122 },
        { week: 11, intv_best: 63, intv_avg: 35, intv_score: 37, swng_best: 104, swng_avg:  64, swng_score:  76 },
        { week: 12, intv_best: 54, intv_avg: 33, intv_score: 39, swng_best:  54, swng_avg:  33, swng_score:  39 }
    ];

    _intvData = [ ];
    _swngData = [ ];

    _type   = null;
    _width  = 0;
    _height = 0;

    _el = null;

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
    _createChart = () => {

    };

    _destroyChart = () => {

    };

    _updateChart = () => {

    };

    _drawChart = () => {

    };

    _onTypeChange = (type) => {
        try { type = type.toLowerCase();   }
        catch(error) { /* console.log(error); */ }

        switch(type) {
            case "interval": {
                /* do something */
                this._type = type;
                break;
            }

            case "swing": {
                /* do someting */
                this._type = type;
                break;
            }

            default: {
                type = "interval";
                this._onTypeChange(type);
            }
        }
    };

    _onDataChange = (data) => {
        let intvData = [ ];
        let swngData = [ ];

        data.forEach(function(entry, index) {
            intvData.push({
                wk: entry.week,
                avg: entry.intv_avg,
                best: entry.intv_best,
                score: entry.intv_score
            });

            swngData.push({
                wk: entry.week,
                avg: entry.svng_avg,
                best: entry.svng_best,
                score: entry.svng_score
            });
        });

        this._intvData = intvData;
        this._swngData = swngData;
    };

    _onWindowResize = () => {
        const elRect = this._el.getBoundingClientRect()
        this._width  = elRect.width;
        this._height = elRect.height;
    };

    // ---------------------------------------------
    //   Public methods
    // ---------------------------------------------
    // @name componentDidMount
    // @desc the function called after the component has mounted.
    componentDidMount() {
        this._el = this.refs.el;

        this._onWindowResize();
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

                {/* hero chart - svg */}
                <div className="hchart__svg">

                    {/* this svg contains dynamic */}
                    {/* elements rendered with d3 */}

                </div>{/* hero chart - svg end */}

            {/* hero chart end */}
            </div>
        );
    }
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
export default HeroChart;
