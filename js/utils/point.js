/**
 * A 2D point
 *
 * Usage:
 *
 *     var p1 = new Point(); // A (0, 0) point
 *     var p2 = new Point(4, 2); // Two parameters
 *     var p3 = new Point({x: 4, y: 2}); // Any object with x and y
 *     var p4 = new Point(p2); // Does not make a copy. Becomes an alias to the other Point
 *
 * @class Point
 * @param args {Various} See usage in constructor documentation
 * @constructor
 */
var Point = function () {
    var x, y;
    if (arguments.length === 2) {
        x = arguments[0];
        y = arguments[1];
    } else if (arguments.length === 1) {
        if (arguments[0] instanceof Point)
            return arguments[0];

        x = arguments[0].x;
        y = arguments[0].y;
    } else {
        x = 0;
        y = 0;
    }

    this.x = x;
    this.y = y;
};

/**
 * Sets the point position. You can also set x and y directly
 *
 * @method setPos
 * @param x {Number} x coordinate
 * @param y {Number} y coordinate
 */
Point.prototype.setPos = function (x, y) {
    this.x = x;
    this.y = y;
};

/**
 * Perform a fuzzy compare between this point and a given point.
 *
 * The given point does not need to be an instance of Point. Just need to have
 * the x and y parameters
 *
 * @method equals
 * @param p {Object|Point} the other point to compare
 * @return {Boolean} whether they are equal
 */
Point.prototype.equals = function (p) {
    return MathHelper.fuzzyCompare(1 + this.x, 1 + p.x)
        && MathHelper.fuzzyCompare(1 + this.y, 1 + p.y);
};

/**
 * Translate this object by a given offset
 *
 * @method translate
 * @param p {Point} an offset to translate
 */
Point.prototype.translate = function (p) {
    this.x = this.x + p.x;
    this.y = this.y + p.y;
};

/**
 * Return another point translated by a given offset
 *
 * @method translated
 * @param p {Point} an offset to translate
 * @return {Point} a translated point
 */
Point.prototype.translated = function (p) {
    var r = this.clone();
    r.translate(p);
    return r;
};

/**
 * Create a copy of this object
 *
 * @method clone
 * @return {Point} a copy of the object
 */
Point.prototype.clone = function () {
    return new Point(this.x, this.y);
};

/**
 * Return a simple JavaScript Object containing the x and y properties
 *
 * @method toJSON
 * @return {Object}
 */
Point.prototype.toJSON = function () {
    return {x: this.x, y: this.y};
};
