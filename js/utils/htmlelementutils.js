/*global Modernizr, StringUtils*/
/**
 * Utilities to deal with HTMLElement
 *
 * @class HTMLElementUtils
 * @module utils
 */
var HTMLElementUtils = {};

/**
 * Adds an event listener to element
 *
 * @method addEventListener
 * @param element {HTMLElement} The element
 * @param eventName {String} The event name
 * @param listener {Function} The listener
 * @static
 */
HTMLElementUtils.addEventListener = function (element, eventName, listener) {
    // XXX: guarantee portability
    element.addEventListener(eventName, listener);
};

/**
 * Returns the element's class name
 *
 * @method className
 * @param element {HTMLElement} The element
 * @return {Object} The element's class name
 * @static
 */
HTMLElementUtils.className = function (element) {
    return element.className;
};

/**
 * Sets the element's display class name
 *
 * @method setClassName
 * @param element {HTMLElement} The element
 * @param className {String} The class name
 * @static
 */
HTMLElementUtils.setClassName = function (element, className) {
    element.className = className;
};

/**
 * Check if there is a specific class on a given `element`
 *
 * @method hasClass
 * @param element {HTMLElement} The element
 * @param className {String} The class name
 * @return {Boolean}
 * @static
 */
HTMLElementUtils.hasClass = function (element, className) {
    return element.className.indexOf(className) !== -1;
};

/**
 * Add a new class to the element's class list
 *
 * @method addClass
 * @param element {HTMLElement} The element
 * @param className {String} The new class name
 * @static
 */
HTMLElementUtils.addClass = function (element, className) {
    element.className = StringUtils.addStringToSet(element.className, className);
};

/**
 * Remove an existent class from the element's class list
 *
 * @method removeClass
 * @param element {HTMLElement} The element
 * @param className {String} The class name
 * @static
 */
HTMLElementUtils.removeClass = function (element, className) {
    element.className = StringUtils.removeStringFromSet(element.className, className);
};

/**
 * Return the element's left offset to its parent
 *
 * @method offsetLeft
 * @param element {HTMLElement} The element
 * @return {Number} The element's left offset to its parent
 * @static
 */
HTMLElementUtils.offsetLeft = function (element) {
    return element.offsetLeft;
};

// XXX: deal with a scale different than pixel
/**
 * Returns the element's width
 *
 * Currently only removes the "px" at the end of the string. If width is in
 * another scale (e.g. % or auto) this method will return a wrong value.
 *
 * @method width
 * @param element {HTMLElement} The element
 * @return {Number} The element's width
 * @static
 */
HTMLElementUtils.width = function (element) {
    return parseInt(HTMLElementUtils._computedStyle(element).width, 10);
};

/**
 * Sets the element's width (in pixels)
 *
 * @method setWidth
 * @param element {HTMLElement} The element
 * @param width {Number} The element's width (in pixels)
 * @static
 */
HTMLElementUtils.setWidth = function (element, width) {
    element.style.width = width + "px";
};

// XXX: deal with a scale different than pixel
/**
 * Returns the element's height
 *
 * Currently only removes the "px" at the end of the string. If height is in
 * another scale (e.g. % or auto) this method will return a wrong value.
 *
 * @method height
 * @param element {HTMLElement} The element
 * @return {Number} The element's height
 * @static
 */
HTMLElementUtils.height = function (element) {
    return parseInt(HTMLElementUtils._computedStyle(element).height, 10);
};

/**
 * Sets the element's height (in pixels)
 *
 * @method setHeight
 * @param element {HTMLElement} The element
 * @param height {Number} The element's height (in pixels)
 * @static
 */
HTMLElementUtils.setHeight = function (element, height) {
    element.style.height = height + "px";
};

// XXX: deal with a scale different than pixel
/**
 * Returns the element's left (in pixels)
 *
 * Currently only removes the "px" at the end of the string. If left is in
 * another scale (e.g. % or auto) this method will return a wrong value.
 *
 * @method left
 * @param element {HTMLElement} The element
 * @return The element's left (in pixels)
 * @static
 */
HTMLElementUtils.left = function (element) {
    return parseInt(HTMLElementUtils._computedStyle(element).left, 10);
};

/**
 * Sets the element's left (in pixels)
 *
 * @method setLeft
 * @param element {HTMLElement} The element
 * @param left {Number} The element's left (in pixels)
 * @static
 */
HTMLElementUtils.setLeft = function (element, left) {
    element.style.left = left + "px";
};

// XXX: deal with a scale different than pixel
/**
 * Returns the element's top (in pixels)
 *
 * Currently only removes the "px" at the end of the string. If top is in
 * another scale (e.g. % or auto) this method will return a wrong value.
 *
 * @method top
 * @param element {HTMLElement} The element
 * @return The element's top (in pixels)
 * @static
 */
HTMLElementUtils.top = function (element) {
    return parseInt(HTMLElementUtils._computedStyle(element).top, 10);
};

/**
 * Sets the element's top (in pixels)
 *
 * @method setTop
 * @param element {HTMLElement} The element
 * @param top {Number} The element's top (in pixels)
 * @static
 */
HTMLElementUtils.setTop = function (element, top) {
    element.style.top = top + "px";
};

// XXX: return a enum instead of a string
/**
 * Returns the element's display type
 *
 * @method display
 * @param element {HTMLElement} The element
 * @return {String} The element's display type
 * @static
 */
HTMLElementUtils.display = function (element) {
    return HTMLElementUtils._computedStyle(element).display;
};

/**
 * Sets the element's display type
 *
 * @method setDisplay
 * @param element {HTMLElement} The element
 * @param display {String} The element's display type
 * @static
 */
HTMLElementUtils.setDisplay = function (element, display) {
    element.style.display = display;
    HTMLElementUtils._applyStyle(element);
};

/**
 * Sets the element's transform
 *
 * @method setTransform
 * @param element {HTMLElement} The element
 * @param transform {String} The transform
 * @static
 */
HTMLElementUtils.setTransform = function (element, transform) {
    element.style[Modernizr.prefixed("transform")] = transform;
};

/**
 * Sets the element's transform origin
 *
 * @method setTransformOrigin
 * @param element {HTMLElement} The element
 * @param transformOrigin {Object} The transform origin
 * @static
 */
HTMLElementUtils.setTransformOrigin = function (element, transformOrigin) {
    var origin = transformOrigin.x + "px " + transformOrigin.y + "px";
    element.style[Modernizr.prefixed("transformOrigin")] = origin;
};

/**
 * Sets the element background image
 *
 * Pass an array of images to set multiple backgrounds (CSS3)
 *
 * @method setBackgroundImage
 * @param element {HTMLElement} The element
 * @param image {String | Array} The url of the image or an array of it
 * @static
 */
HTMLElementUtils.setBackgroundImage = function (element, image) {
    if (!Array.isArray(image)) {
        if (image)
            element.style.backgroundImage = "url('" + image + "')";
        else
            element.style.backgroundImage = "";
    } else {
        var styleStrings = [];
        for (var i = 0; i < image.length; i++) {
            styleStrings.push("url('" + image[i] + "')");
        }

        element.style.backgroundImage = styleStrings.join();
    }
};

/**
 * Sets the element background repeat property
 *
 * The repeat property must be a string with one of the following values:
 *
 * * no-repeat
 * * repeat
 * * repeat-x
 * * repeat-y
 *
 * It also accepts an array to set the property for multiple backgrounds
 *
 * @method setBackgroundRepeat
 * @param element {HTMLElement} The element
 * @param repeat {String | Array} The repeat property or an array of it
 * @static
 */
HTMLElementUtils.setBackgroundRepeat = function (element, repeat) {
    if (!Array.isArray(repeat)) {
        element.style.backgroundRepeat = repeat;
    } else {
        element.style.backgroundRepeat = repeat.join();
    }
};

/**
 * Sets the element background position
 *
 * The position is represented by an object as follow:
 *
 *     {x: 0, y: 0}
 *
 * Pass an array of positions for multiple backgrounds (CSS3)
 *
 * @method setBackgroundPosition
 * @param element {HTMLElement} The element
 * @param position {Object | Array} A position or an array of positions
 * @static
 */
HTMLElementUtils.setBackgroundPosition = function (element, position) {
    if (!Array.isArray(position)) {
        element.style.backgroundPosition = position.x + "px " + position.y + "px";
    } else {
        var styleStrings = [];
        for (var i = 0; i < position.length; i++) {
            styleStrings.push(position[i].x + "px " + position[i].y + "px");
        }

        element.style.backgroundPosition = styleStrings.join();
    }
};

/**
 * Sets the element background size
 *
 * The size is represented by an object as follow:
 *
 *     {width: 0, height: 0}
 *
 * Pass an array of sizes for multiple backgrounds (CSS3)
 *
 * @method setBackgroundSize
 * @param element {HTMLElement} The element
 * @param size {Object | Array} A size or an array of sizes
 * @static
 */
HTMLElementUtils.setBackgroundSize = function (element, size) {
    if (!Array.isArray(size)) {
        element.style.backgroundSize = size.width + "px " + size.height + "px";
    } else {
        var styleStrings = [];
        for (var i = 0; i < size.length; i++) {
            styleStrings.push(size[i].width + "px " + size[i].height + "px");
        }

        element.style.backgroundSize = styleStrings.join();
    }

};

/**
 * Sets the clip to the defined rectangle
 *
 * @method setClip
 * @param element {HTMLElement} The element
 * @param top {Number} Distance in pixels from the top of the element to the top of the clip
 * @param right {Number} Distance in pixels from the left of the element to the right of the clip
 * @param bottom {Number} Distance in pixels from the top of the element to the bottom of the clip
 * @param right {Number} Distance in pixels from the left of the element to the left of the clip
 * @static
 */
HTMLElementUtils.setClip = function (element, top, right, bottom, left) {
    element.style.clip = "rect(" + top + "px, " + right + "px, " + bottom + "px, " + left + "px)";
};

/**
 * Returns the element's computed style
 *
 * @method _computedStyle
 * @param element {HTMLElement} The element
 * @return {Object} The element's computed style
 * @static
 * @private
 */
HTMLElementUtils._computedStyle = function (element) {
    return window.getComputedStyle(element);
};

/**
 * Forces the browser to apply the current style
 *
 * @method _applyStyle
 * @param element {HTMLElement} The element
 * @static
 * @private
 */
HTMLElementUtils._applyStyle = function (element) {
    // Hack to make the browser apply the display immediatly so that
    // it doesn't interfere with transition effects (if any)
    // http://code.google.com/p/chromium/issues/detail?id=121340
    element.offsetWidth;
};
