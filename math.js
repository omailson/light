/*global Vector2D*/

/**
 * Math utilities
 *
 * @class MathHelper
 * @module utils
 */
var MathHelper = {};

/**
 * Converts an angle in degrees to radians.
 *
 * @method toRadians
 * @static
 * @param degree {Number} Angle in degrees
 * @return {Number} Angle in radians
 */
MathHelper.toRadians = function (degree) {
    return degree * (Math.PI / 180);
};

/**
 * Converts an angle in radians to degrees.
 *
 * @method toDegrees
 * @static
 * @param radians {Number} Angle in radians
 * @return {Number} Angle in degrees
 */
MathHelper.toDegrees = function (radians) {
    return radians * (180 / Math.PI);
};

/**
 * Returns the distance between two points.
 *
 * @method dist
 * @static
 * @param a {Object} A point
 * @param b {Object} A point
 * @return {Number} The distance between `a` and `b`
 */
MathHelper.dist = function (a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Returns value bounded by min and max
 *
 * @method bound
 * @static
 * @param min {Number} The minimum bound
 * @param value {Number} The value
 * @param max {Number} The maximum bound
 * @return {Number} The bounded value
 */
MathHelper.bound = function (min, value, max) {
    return Math.max(min, Math.min(value, max));
};

/**
 * Returns true if numbers `a` and `b` are considered equal
 *
 * The two number are compared in a relative way
 *
 * Source: http://qt.gitorious.org/qt/qtbase/blobs/HEAD/src/corelib/global/qglobal.h#line786
 *
 * @method fuzzyCompare
 * @static
 * @param a {Number}
 * @param b {Number}
 * @return {Boolean} If the numbers are considered equal or not
 */

MathHelper.fuzzyCompare = function (a, b) {
    return (Math.abs(a - b) <= 0.000000000001 * Math.min(Math.abs(a), Math.abs(b)));
};

/**
 * Returns true if the difference between numbers `a` and `b` are less of equal the passed `threshold`
 *
 * @method thresholdCompare
 * @static
 * @param a {Number}
 * @param b {Number}
 * @param threshold {Number}
 * @return {Boolean} If the numbers difference are less or equal the threshold
 */
MathHelper.thresholdCompare = function (a, b, threshold) {
    return Math.abs(a - b) <= threshold;
};

/**
 * Rotates a point based on an origin point
 *
 * @method rotatePoint
 * @static
 * @param point {Object} the x and y coordinates of the point to be rotated
 * @param origin {Object} the x and y coordinates of the point used as base for the rotation
 * @param angle {Number} the rotation angle in radians
 * @return {Object} the rotate x and y coordinates
 */
MathHelper.rotatePoint = function (point, origin, angle) {
    var vector = new Vector2D(point.x - origin.x, point.y - origin.y);
    vector.rotate(angle);
    return {x: vector.x + origin.x, y: vector.y + origin.y};
};

MathHelper.between = function (min, value, max) {
    if (min > max) {
        var aux = max;
        max = min;
        min = aux;
    }

    return min <= value && value <= max;
};
