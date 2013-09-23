/**
 * A ray of light
 *
 * @class Ray
 * @param p1 {Object} Starting point
 * @param p2 {Object|Vector2D} Ending point or a vector
 * @param orientation {Number} the orientation of the Ray. 1 is default. -1 is inverted
 */
var Ray = function (p1, p2, orientation) {
    this.p1 = p1;

    if (p2 instanceof Vector2D) {
        this.vector = p2;
        this.p2 = null;
    } else {
        this.p2 = p2;
        this.vector = new Vector2D(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
    }

    this.orientation = orientation || 1;
};

/**
 * Whether the Ray is finite
 *
 * @method isFinite
 * @return {Boolean}
 */
Ray.prototype.isFinite = function () {
    return this.p2 ? true : false;
};

/**
 * Given a line segment returns the intersection point between them, if there's
 * any or null otherwise.
 *
 * @method intersectionPoint
 * @param lineSegment {LineSegment}
 * @return {Object} The intersection poing or null
 */
Ray.prototype.intersectionPoint = function (lineSegment) {
    if (this.isFinite()) {
        var raySegment = new LineSegment(this.p1, this.p2);
        return raySegment.intersection(lineSegment);
    }

    var vxu = lineSegment.toVector().crossProduct(this.vector);
    if (vxu === 0) // parallel
        return null;

    var qp = Vector2D.fromPoints(lineSegment.p1, this.p1);
    var t = qp.crossProduct(this.vector)/vxu;
    if (t < 0 || t > 1) // it's not intersecting the segment
        return null;

    // The vector is intersecting the segment, but we need to check if the
    // intersection is before or after the given point.
    var r = qp.crossProduct(lineSegment.toVector())/vxu;
    if (r > 0)
        return {x: this.p1.x + this.vector.x*r, y: this.p1.y + this.vector.y*r};

    return null;
};

/**
 * Returns a vector representation of the Ray
 *
 * @method toVector
 * @return {Vector2D}
 */
Ray.prototype.toVector = function () {
    if (this.isFinite())
        return new Vector2D(this.p2.x - this.p1.x, this.p2.y - this.p1.y);

    return this.vector;
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

/**
 * The left value of the Ray bounding box
 *
 * @method left
 * @return {Number}
 */
Ray.prototype.left = function () {
    if (this.isFinite())
        return Math.min(this.p1.x, this.p2.x);

    if (Vector2D.dotProduct(new Vector2D(1, 0), this.vector) >= 0)
        return this.p1.x;
    else
        return Number.NEGATIVE_INFINITY;
};

/**
 * The right value of the Ray bounding box
 *
 * @method right
 * @return {Number}
 */
Ray.prototype.right = function () {
    if (this.isFinite())
        return Math.max(this.p1.x, this.p2.x);

    if (Vector2D.dotProduct(new Vector2D(1, 0), this.vector) <= 0)
        return this.p1.x;
    else
        return Number.POSITIVE_INFINITY;
};

/**
 * The top value of the Ray bounding box
 *
 * @method top
 * @return {Number}
 */
Ray.prototype.top = function () {
    if (this.isFinite())
        return Math.min(this.p1.y, this.p2.y);

    if (Vector2D.dotProduct(new Vector2D(0, 1), this.vector) >= 0)
        return this.p1.y;
    else
        return Number.NEGATIVE_INFINITY;
};

/**
 * The bottom value of the Ray bouding box
 *
 * @method bottom
 * @return {Number}
 */
Ray.prototype.bottom = function () {
    if (this.isFinite())
        return Math.max(this.p1.y, this.p2.y);

    if (Vector2D.dotProduct(new Vector2D(0, 1), this.vector) <= 0)
        return this.p1.y;
    else
        return Number.POSITIVE_INFINITY;
};
