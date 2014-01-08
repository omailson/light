/*global Modernizr*/

/**
 * Object to provide some util information about the underlying browser
 *
 * @class Browser
 * @static
 */
var Browser = {};

/**
 * Returns if the underlying browser is Internet Explorer
 *
 * @method isIE
 * @static
 * @return {Boolean}
 */
Browser.isIE = function () {
    if (navigator.userAgent.indexOf("MSIE") !== -1)
        return true;

    return false;
};

/**
 * Returns the browser's transition end event name
 *
 * @method transitionEndEventName
 * @return {String} The browser's transition end event name
 * @static
 */
Browser.transitionEndEventName = function () {
    // From http://modernizr.com/docs/#prefixed
    var transEndEventNames = {
        "WebkitTransition" : "webkitTransitionEnd",
        "MozTransition" : "transitionend",
        "OTransition" : "oTransitionEnd",
        "msTransition" : "MSTransitionEnd",
        "transition" : "transitionend"
    };
    return transEndEventNames[Modernizr.prefixed("transition")];
};

/**
 * Returns the browser's animation end event name
 *
 * @method animationEndEventName
 * @return {String} The browser's animation end event name
 * @static
 */
Browser.animationEndEventName = function () {
    var animEndEventNames = {
        "WebkitAnimation" : "webkitAnimationEnd",
        "MozAnimation" : "animationend",
        "OAnimation" : "oAnimationEnd",
        "msAnimation" : "MSAnimationEnd",
        "animation" : "animationend"
    };
    return animEndEventNames[Modernizr.prefixed("animation")];
};

/**
 * Returns the browser's animation iteration event name
 *
 * @method animationIterationEventName
 * @return {String} The browser's animation iteration event name
 * @static
 */
Browser.animationIterationEventName = function () {
    var animIterationEventNames = {
        "WebkitAnimation" : "webkitAnimationIteration",
        "MozAnimation" : "animationiteration",
        "OAnimation" : "oAnimationIteration",
        "msAnimation" : "MSAnimationIteration",
        "animation" : "animationiteration"
    };
    return animIterationEventNames[Modernizr.prefixed("animation")];
};
