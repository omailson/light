/**
 * A ray of light
 *
 * @class Ray
 * @param p1 {Object} Starting point
 * @param p2 {Object} Ending point
 * @param orientation {Number} the orientation of the Ray. 1 is default. -1 is inverted
 */
var Ray = function (p1, p2, orientation) {
    this.p1 = p1;
    this.p2 = p2;

    this.orientation = orientation || 1;
};

/**
 * Returns a vector representation of the Ray
 *
 * @method toVector
 * @return {Vector2D}
 */
Ray.prototype.toVector = function () {
    return new Vector2D(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
};

/**
 * Returns a line segment going from p1 to p2
 *
 * @method lineSegment
 * @return {LineSegment}
 */
Ray.prototype.lineSegment = function () {
    return new LineSegment(this.p1, this.p2);
};

/**
 * Returns a vector representation of the Ray taking into account its orientation
 *
 * @method toOrientedVector
 * @return {Vector2D}
 */
Ray.prototype.toOrientedVector = function () {
    var v = this.toVector();
    v.scalarMult(this.orientation);

    return v;
};

/**
 * Returns a Ray in the opposite direction if this Ray is oriented
 *
 * @method oriented
 * @return {Ray}
 */
Ray.prototype.oriented = function () {
    if (this.orientation === 1)
        return this;

    return new Ray(this.p2, this.p1, 1);
};
