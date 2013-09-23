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
        "left": this.data[0].left(),
        "right": this.data[0].right(),
        "top": this.data[0].top(),
        "bottom": this.data[0].bottom()
    };

    for (var i = 1; i < this.data.length; i++) {
        bb.left = Math.min(bb.left, this.data[i].left());
        bb.right = Math.max(bb.right, this.data[i].right());
        bb.top  = Math.min(bb.top, this.data[i].top());
        bb.bottom = Math.max(bb.bottom, this.data[i].bottom());
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
        if (this.data[i].intersectionPoint(rayCast) !== null)
            intersections++;
    }

    if (intersections % 2 === 0)
        return false;

    return true;
};
