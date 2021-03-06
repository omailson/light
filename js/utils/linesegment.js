/**
 * A line segment
 *
 * @class LineSegment
 * @param p1 {Object} Starting point
 * @param p2 {Object} Ending point
 */
var LineSegment = function (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
};

/**
 * Returns the vector (p2 - p1)
 *
 * @method toVector
 * @return {Vector2D} The vector representation of this line segment
 */
LineSegment.prototype.toVector = function () {
    return new Vector2D(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
};

/**
 * The middle point of the line segment. This point is equidistant to both
 * endpoints of the segment.
 *
 * @method midpoint
 * @return {Point} the midpoint
 */
LineSegment.prototype.midpoint = function () {
    return {x: (this.p1.x + this.p2.x) / 2, y: (this.p1.y + this.p2.y) / 2};
};

/**
 * The intersection of this segment with another line segment
 *
 * @param line {LineSegment} another line segment
 * @return {Object} the intersection point between them, or null if invalid
 */
LineSegment.prototype.intersection = function (line) {
    var p1 = new Point(this.p1);
    var p2 = new Point(this.p2);
    var q1 = line.p1;
    var q2 = line.p2;

    var v = this.toVector();
    var u = line.toVector();

    if (v.crossProduct(u) === 0) { // parallel
        // Check special case where both segments are parallel but intersect
        // only in one point.
        if (p1.equals(q1) && !p1.equals(q2) ||
                p1.equals(q2) && !p1.equals(q1))
            return p1.toJSON();
        else if (p2.equals(q1) && !p2.equals(q2) ||
                p2.equals(q2) && !p2.equals(q1))
            return p2.toJSON();

        return null;
    }

    var p1v = new Vector2D(p1.x, p1.y);
    var q1v = new Vector2D(q1.x, q1.y);
    var t = Vector2D.sub(q1v, p1v);
    t = t.crossProduct(u);
    t = t / v.crossProduct(u);

    var r = {x: p1.x + v.x*t, y: p1.y + v.y*t};

    if (Fuzzy.between(q1.x, r.x, q2.x) &&
            Fuzzy.between(q1.y, r.y, q2.y) &&
            Fuzzy.gte(t, 0) &&
            Fuzzy.lte(t, 1))
        return r;

    return null;
};
