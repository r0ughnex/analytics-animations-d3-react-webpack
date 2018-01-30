// -------------------------------------
//   Dependencies
// -------------------------------------
// pre
/* --empty block-- */

// core
/* --empty block-- */

// base
/* --empty block-- */

// modules
/* --empty block-- */

// services
/* --empty block-- */

// components
/* --empty block-- */

// views
/* --empty block-- */

// styles
/* --empty block-- */

console.log("base/query.js: base loaded.");
// -------------------------------------
//   Base - Query
// -------------------------------------
/**
    * @name query
    * @desc A base module to abstract document.querySelectorAll
            for increased performance and greater usability.
            query is attached to the window object.
**/

const doc = window.document;
const simpleRe = /^(#?[\w-]+|\.[\w-.]+)$/;
const periodRe = /\./g;
const slice = [].slice;
let classes;

// @name query
// @desc the main function for the base.
// @param {String} selector - the selector for the query to be performed
// @param {Element} context - optional content for query to be performed
// @return {Array{DOM}} - the array of DOM elements that match the given selector
function query (selector, context) {
    context = context || doc;

    // redirect simple selectors to
    // the more performant function
    if(simpleRe.test(selector)) { try {
        switch(selector.charAt(0)) {
            case "#":
                // handle id-based selectors
                return [context.getElementById(selector.substr(1))];

            case ".":
                // handle class-based selectors and do query by
                // multiple classes by converting the selector
                // string into single spaced class names
                classes = selector.substr(1).replace(periodRe, " ");
                return slice.call(context.getElementsByClassName(classes));

            default:
                // handle tag-based selectors
                return slice.call(context.getElementsByTagName(selector));
        }}

        // default to selector to use the `querySelectorAll` on any error
        // (this might happen on svg elements browsers such as IE 11, 10)
        catch(error) { return slice.call(context.querySelectorAll(selector)); }
    }

    // default to selector to use the `querySelectorAll`
    return slice.call(context.querySelectorAll(selector));
}

// ---------------------------------------------
//   Export block
// ---------------------------------------------
export default query;
