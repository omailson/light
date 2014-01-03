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

    /**
     * The physics body that generated this RayCollection
     *
     * @property parentBody
     * @type Body
     * @public
     */
    this.parentBody = null;

    /**
     * The position of the virtual light source
     *
     * @property lightPos
     * @type Object
     * @public
     */
    this.lightPos = startRay.commonSource(endRay);

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
        var cp = RayCollection._compareFunction(ray, this.data[i]);
        if (cp < 0) {
            this.data.splice(i, 0, ray);
            return i;
        }
    }
};

/**
 * Remove a Ray located at the given index
 *
 * @method remove
 * @param index {Number} the index of the ray to be removed
 * @return {Ray} the removed Ray, or null if invalid
 */
RayCollection.prototype.remove = function (index) {
    var removedRays = this.data.splice(index, 1);

    return removedRays.length > 0 ? removedRays[0] : null;
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
    // XXX this.lightPos is not necessarily outside
    var rayCast = new LineSegment(this.lightPos, p);
    for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].intersectionPoint(rayCast) !== null)
            intersections++;

        // Check not only the rays but also the adjacency segments between to rays
        var adjacencySegment = this._adjacencySegment(i);
        if (adjacencySegment && adjacencySegment.intersection(rayCast))
            intersections++;
    }

    if (intersections % 2 === 0)
        return false;

    return true;
};

/**
 * Returns the adjacency segment between the ray given by index and the ray
 * after that
 *
 * @method _adjacencySegment
 * @param index {Number} the Ray index in the data array
 * @private
 * @return {LineSegment}
 */
RayCollection.prototype._adjacencySegment = function (index) {
    var r1 = this.data[index];
    var r2 = this.data[(index + 1) % this.data.length];

    var p1 = null;
    var p2 = null;
    if (r1.orientation === 1 && r1.isFinite())
        p1 = r1.p2;
    else if (r1.orientation === -1)
        p1 = r1.p1;

    if (r2.orientation === -1 && r2.isFinite())
        p2 = r2.p2;
    else if (r2.orientation === 1)
        p2 = r2.p1;

    if (p1 === null || p2 === null)
        return null;

    return new LineSegment(p1, p2);
};

/**
 * Compare two rays. If result < 0, then Ray a must come before Ray b.
 *
 * @method _compareFunction
 * @param a {Ray}
 * @param b {Ray}
 * @return {Number} < 0 if a is lower than b. 0 if they are equal (or parallel)
 * @private
 * @static
 */
RayCollection._compareFunction = function (a, b) {
    var cp = a.toVector().crossProduct(b.toVector());
    return -cp;
};

/**
 * Given an array of unordered Rays return a RayCollection
 *
 * The array must have at least 2 rays otherwise the function returns null
 *
 * @method fromArray
 * @param rays {Array} an array of Ray
 * @return {RayCollection}
 * @static
 */
RayCollection.fromArray = function (rays) {
    if (rays.length < 2)
        return null;

    rays.sort(RayCollection._compareFunction);

    var rayCollection = new RayCollection(rays[0], rays[rays.length-1]);
    rayCollection.data = rays;

    return rayCollection;
};
