/**
 * This class represents a source of light
 *
 * @class Light
 * @param pos {Object} Source position
 * @param points {Array} An array of two points. They are the initial points of the light
 * @param color {String} The color of the light
 */
var Light = function (pos, points, color) {
    this.world = null;

    this.pos = pos;
    this.rays = [];
    this.color = color;
    this.points = points;
};

/**
 * Paints the light into a context
 *
 * @method paint
 * @param context {CanvasRenderingContext2D} A canvas context 2D
 */
Light.prototype.paint = function (context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.pos.x, this.pos.y);
    for (var i = 0; i < this.rays.length; i++) {
        context.lineTo(this.rays[i].oriented().p1.x, this.rays[i].oriented().p1.y);
        context.lineTo(this.rays[i].oriented().p2.x, this.rays[i].oriented().p2.y);
    }
    context.fill();
};

/**
 * Recalculate the collection of rays. It looks for the objects in the world
 *
 * @method computeRays
 */
Light.prototype.computeRays = function () {
    this.rays = [];

    this.rays.push(this._createFiniteRay(this.pos, Vector2D.fromPoints(this.pos, this.points[0])));
    var ray = this._createFiniteRay(this.pos, Vector2D.fromPoints(this.pos, this.points[1]));
    ray.orientation = -1;
    this.rays.push(ray);

    var objects = this.world._objects;
    for (var i = 0; i < objects.length; i++) {
        this.addOpaque(objects[i]);
    }
};

/**
 * Add a opaque object to compute the rays
 *
 * @method addOpaque
 * @method opaque {Opaque} An opaque object
 */
Light.prototype.addOpaque = function (opaque) {
    var p;
    var opaqueSegment = new LineSegment(opaque.p1, opaque.p2);
    for (var i = 0; i < this.rays.length; i++) {
        // Check whether this new object intersects existing Rays
        var lightSegment = new LineSegment(this.rays[i].p1, this.rays[i].p2);
        p = lightSegment.intersection(opaqueSegment);
        if (p !== null) {
            // Since this object is opaque the Ray won't go through the object
            this.rays[i].p2 = p;
        }
    }

    // Create a vector that goes from the source of light to the edges of the object
    var vp1 = (new LineSegment(this.pos, opaque.p1)).toVector();
    var vp2 = (new LineSegment(this.pos, opaque.p2)).toVector();

    var order = vp1.crossProduct(vp2);

    if (!this.contains(opaque.p1))
        vp1 = null;

    if (!this.contains(opaque.p2))
        vp2 = null;

    if (vp1) {
        var rp1 = this._createFiniteRay(opaque.p1, vp1);

        if (order > 0)
            rp1.orientation = -1;

        this.insertRay(rp1);
    }

    if (vp2) {
        var rp2 = this._createFiniteRay(opaque.p2, vp2);

        if (order < 0)
            rp2.orientation = -1;

        this.insertRay(rp2);
    }
};

/**
 * Given a point and a vector, returns a Ray that starts in point and goes in
 * the direction of the given vector until it hits a wall
 *
 * @method _createFiniteRay
 * @param point {Object} Starting point
 * @param vector {Vector2D} Direction of the Ray
 * @return {Ray} The computed Ray
 * @private
 */
Light.prototype._createFiniteRay = function (point, vector) {
    var w = this.world._bounds.width;
    var h = this.world._bounds.height;

    /*
     *
     *  +-------+
     *  |       |
     *  |       |
     *  |       |
     *  +-------+
     *
     */
    var segments = [];
    segments[0] = new LineSegment({x: 0, y: 0}, {x: w, y: 0});
    segments[1] = new LineSegment({x: w, y: 0}, {x: w, y: h});
    segments[2] = new LineSegment({x: w, y: h}, {x: 0, y: h});
    segments[3] = new LineSegment({x: 0, y: h}, {x: 0, y: 0});

    for (var i = 0; i < segments.length; i++) {
        var vxu = segments[i].toVector().crossProduct(vector);
        if (vxu === 0) // parallel
            continue;

        var qp = Vector2D.fromPoints(segments[i].p1, point);
        var t = qp.crossProduct(vector)/vxu;
        if (t < 0 || t > 1) // it's not intersecting the segment
            continue;

        // The vector is intersecting the segment, but we need to check if the
        // intersection is before or after the given point.
        var r = qp.crossProduct(segments[i].toVector())/vxu;
        if (r > 0)
            return new Ray(point, {x: point.x + vector.x*r, y: point.y + vector.y*r});
    }
};

/**
 * Add a Ray to the collection in the correct order
 *
 * @method insertRay
 * @param ray {Ray} The Ray to add
 */
Light.prototype.insertRay = function (ray) {
    for (var i = 0; i < this.rays.length; i++) {
        var cp = this.rays[i].toVector().crossProduct(ray.toVector());
        if (cp < 0) {
            this.rays.splice(i, 0, ray);
            break;
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
Light.prototype.contains = function (p) {
    if (this.rays.length === 0)
        return false;

    var bb = {
        "left": Math.min(this.rays[0].p1.x, this.rays[0].p2.x),
        "right": Math.max(this.rays[0].p1.x, this.rays[0].p2.x),
        "top": Math.min(this.rays[0].p1.y, this.rays[0].p2.y),
        "bottom": Math.max(this.rays[0].p1.y, this.rays[0].p2.y)
    };

    for (var i = 1; i < this.rays.length; i++) {
        bb.left = Math.min(bb.left, Math.min(this.rays[i].p1.x, this.rays[i].p2.x));
        bb.right = Math.max(bb.right, Math.max(this.rays[i].p1.x, this.rays[i].p2.x));
        bb.top  = Math.min(bb.top, Math.min(this.rays[i].p1.y, this.rays[i].p2.y));
        bb.bottom = Math.max(bb.bottom, Math.max(this.rays[i].p1.y, this.rays[i].p2.y));
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
    for (var i = 0; i < this.rays.length; i++) {
        if (this.rays[i].lineSegment().intersection(rayCast) !== null)
            intersections++;
    }

    if (intersections % 2 === 0)
        return false;

    return true;
};
