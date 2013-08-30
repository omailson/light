/**
 * A collection of Ray
 *
 * @class RayCollection
 * @param startRay {Ray} The first Ray
 * @param endRay {Ray} The last Ray
 * @constructor
 */
var RayCollection = function (startRay, endRay) {
    /**
     * The list of rays
     *
     * @property data
     * @type Array
     * @public
     */
    this.data = [];

    this.data.push(startRay);
    this.data.push(endRay);
};

/**
 * Add a Ray to the collection in the correct order
 *
 * @method insert
 * @param ray {Ray} The Ray to add
 * @return {Number} Where the Ray was inserted
 */
RayCollection.prototype.insert = function (ray) {
    for (var i = 0; i < this.data.length; i++) {
        var cp = this.data[i].toVector().crossProduct(ray.toVector());
        if (cp < 0) {
            this.data.splice(i, 0, ray);
            return i;
        }
    }
};

/**
 * Whether a point is inside the region illuminated by the Light
 *
 * @method contains
 * @param p {Object} The point to be checked
 * @return {Boolean} Whether the point is being illuminated
 */
RayCollection.prototype.contains = function (p) {
    if (this.data.length === 0)
        return false;

    var bb = {
        "left": Math.min(this.data[0].p1.x, this.data[0].p2.x),
        "right": Math.max(this.data[0].p1.x, this.data[0].p2.x),
        "top": Math.min(this.data[0].p1.y, this.data[0].p2.y),
        "bottom": Math.max(this.data[0].p1.y, this.data[0].p2.y)
    };

    for (var i = 1; i < this.data.length; i++) {
        bb.left = Math.min(bb.left, Math.min(this.data[i].p1.x, this.data[i].p2.x));
        bb.right = Math.max(bb.right, Math.max(this.data[i].p1.x, this.data[i].p2.x));
        bb.top  = Math.min(bb.top, Math.min(this.data[i].p1.y, this.data[i].p2.y));
        bb.bottom = Math.max(bb.bottom, Math.max(this.data[i].p1.y, this.data[i].p2.y));
    }

    // Check whether the point is inside the bounding box
    if (p.x < bb.left || p.x > bb.right || p.y < bb.top || p.y > bb.bottom)
        return false;

    // Ray casting
    // Count the number of intersections to that point
    // http://en.wikipedia.org/wiki/Point_in_polygon
    var intersections = 0;
    // A point outside the polygon
    var pIni = {x: bb.left - 0.5, y: p.y};
    var rayCast = new LineSegment(pIni, p);
    for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].lineSegment().intersection(rayCast) !== null)
            intersections++;
    }

    if (intersections % 2 === 0)
        return false;

    return true;
};
