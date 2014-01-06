/*global MathHelper*/

/**
 * Yes, Rectangle!
 *
 * @class Rectangle
 * @module utils
 * @constructor
 * @param x {Number} X coordenate of the top left corner
 * @param y {Number} Y coordenate of the top left corner
 * @param width {Number} The rectangle's width
 * @param height {Number} The rectangle's height
 */
var Rectangle = function (x, y, width, height) {
    /**
     * @property x
     * @type Number
     * @default 0
     */
    this.x = x || 0;

    /**
     * @property y
     * @type Number
     * @default 0
     */
    this.y = y || 0;

    /**
     * @property width
     * @type Number
     * @default 0
     */
    this.width = width || 0;

    /**
     * @property height
     * @type Number
     * @default 0
     */
    this.height = height || 0;
};

/**
 * Change the rectangle's position.
 *
 * @method setPos
 * @param x {Number} X coordenate
 * @param y {Number} Y coordenate
 */
Rectangle.prototype.setPos = function (x, y) {
    this.x = x;
    this.y = y;
};

/**
 * Change the rectangle's size.
 *
 * @method setSize
 * @param width {Number} The rectangle's width
 * @param height {Number} The rectangle's height
 */
Rectangle.prototype.setSize = function (w, h) {
    this.width = w;
    this.height = h;
};

/**
 * Check if there is a non-empty area of overlap between two rectangles.
 *
 * Source: https://qt.gitorious.org/qt/qtbase/source/8b17f13c094d357b3a2d9a5e64bd1334791660fc:src/corelib/tools/qrect.cpp#L2212
 *
 * @method intersects
 * @param r {Object} A rectangle
 * @return {Boolean} true if this rectangle intersects with r, otherwise false
 */
Rectangle.prototype.intersects = function (r) {
    var l1 = this.x;
    var r1 = this.x;
    if (this.width < 0)
        l1 += this.width;
    else
        r1 += this.width;

    if (l1 === r1) // null rect
        return false;

    var l2 = r.x;
    var r2 = r.x;
    if (r.width < 0)
        l2 += r.width;
    else
        r2 += r.width;

    if (l2 === r2) // null rect
        return false;

    if (l1 >= r2 || l2 >= r1)
        return false;

    var t1 = this.y;
    var b1 = this.y;
    if (this.height < 0)
        t1 += this.height;
    else
        b1 += this.height;

    if (t1 === b1) // null rect
        return false;

    var t2 = r.y;
    var b2 = r.y;
    if (r.height < 0)
        t2 += r.height;
    else
        b2 += r.height;

    if (t2 === b2) // null rect
        return false;
    if (t1 >= b2 || t2 >= b1)
        return false;

    return true;
};

/**
 * Returns true if a given point is inside or on the edge of the rectangle,
 * otherwise returns false.
 *
 * @method contains
 * @param p {Object} The point
 * @return {Boolean} true if the rectangle contains p, otherwise returns false.
 */
Rectangle.prototype.contains = function (p)
{
    var left = this.x;
    var right = this.x + this.width;
    if (p.x < left || p.x > right)
        return false;

    var top = this.y;
    var bottom = this.y + this.height;
    if (p.y < top || p.y > bottom)
        return false;

    return true;
};

/**
 * Returns whether the rectangle is equal to this or not
 *
 * @method equals
 * @param rect {Rectangle} The rectangle
 * @return {Boolean} Whether the rectangle is equal to this or not
 */
Rectangle.prototype.equals = function (rect) {
    return (MathHelper.fuzzyCompare(this.x, rect.x) && MathHelper.fuzzyCompare(this.y, rect.y) &&
            MathHelper.fuzzyCompare(this.width, rect.width) && MathHelper.fuzzyCompare(this.height, rect.height));
};

/**
 * Returns the top-left point
 * @method topLeft
 * @return {Object} The top-left point
 */
Rectangle.prototype.topLeft = function () {
    return { x: this.x, y: this.y };
};

/**
 * Returns the top-right point
 * @method topRight
 * @return {Object} The top-right point
 */
Rectangle.prototype.topRight = function () {
    return { x: this.x + this.width, y: this.y };
};

/**
 * Returns the top-center point
 * @method topCenter
 * @return {Object} The top-center point
 */
Rectangle.prototype.topCenter = function () {
    return { x: this.x + this.width / 2, y: this.y };
};

/**
 * Returns the bottom-left point
 * @method bottomLeft
 * @return {Object} The bottom-left point
 */
Rectangle.prototype.bottomLeft = function () {
    return { x: this.x, y: this.y + this.height };
};

/**
 * Returns the bottom-right point
 * @method bottomRight
 * @return {Object} The bottom-right point
 */
Rectangle.prototype.bottomRight = function () {
    return { x: this.x + this.width, y: this.y + this.height };
};

/**
 * Returns the bottom-center point
 * @method bottomCenter
 * @return {Object} The bottom-center point
 */
Rectangle.prototype.bottomCenter = function () {
    return { x: this.x + this.width / 2, y: this.y + this.height };
};

/**
 * Returns the center point
 * @method center
 * @return {Object} The center point
 */
Rectangle.prototype.center = function () {
    return { x: this.x + this.width / 2, y: this.y + this.height / 2 };
};

/**
 * Returns the y-coordinate of the rectangle's top edge.
 * Equivalent to {{#crossLink "Rectangle/y"}}{{/crossLink}}
 *
 * @method top
 * @return {Number} The y-coordidate of the top edge
 */
Rectangle.prototype.top = function () {
    return this.y;
};

/**
 * Returns the y-coordinate of the rectangle's bottom edge.
 *
 * @method bottom
 * @return {Number} The y-coordidate of the bottom edge
 */
Rectangle.prototype.bottom = function () {
    return this.bottomRight().y;
};

/**
 * Returns the x-coordinate of the rectangle's left edge.
 * Equivalent to {{#crossLink "Rectangle/x"}}{{/crossLink}}
 *
 * @method left
 * @return {Number} The x-coordidate of the left edge
 */
Rectangle.prototype.left = function () {
    return this.x;
};

/**
 * Returns the x-coordinate of the rectangle's right edge.
 *
 * @method right
 * @return {Number} The x-coordidate of the right edge
 */
Rectangle.prototype.right = function () {
    return this.bottomRight().x;
};

/**
 * Returns a clone of this rectangle
 *
 * @method clone
 * @return {Rectangle} A clone of this rectangle
 */
Rectangle.prototype.clone = function () {
    return new Rectangle(this.x, this.y, this.width, this.height);
};
