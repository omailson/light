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
    this.color = color;
    this.points = points;
};

/**
 * Paints the light into a context
 *
 * @method paint
 * @param context {CanvasRenderingContext2D} A canvas context 2D
 */
Light.prototype.paint = function (context, rays) {
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.pos.x, this.pos.y);
    for (var i = 0; i < rays.data.length; i++) {
        context.lineTo(rays.data[i].oriented().p1.x, rays.data[i].oriented().p1.y);
        context.lineTo(rays.data[i].oriented().p2.x, rays.data[i].oriented().p2.y);
    }
    context.fill();
};

/**
 * Recalculate the collection of rays. It looks for the objects in the world
 *
 * @method computeRays
 * @return {RayCollection}
 */
Light.prototype.computeRays = function () {
    var startRay = this._createFiniteRay(this.pos, Vector2D.fromPoints(this.pos, this.points[0]));
    var endRay = this._createFiniteRay(this.pos, Vector2D.fromPoints(this.pos, this.points[1]));
    endRay.orientation = -1;
    var rays = new RayCollection(startRay, endRay);

    var objects = this.world._objects;
    for (var i = 0; i < objects.length; i++) {
        this.addOpaque(objects[i], rays);
    }

    return rays;
};

/**
 * Add a opaque object to compute the rays
 *
 * @method addOpaque
 * @method opaque {Opaque} An opaque object
 */
Light.prototype.addOpaque = function (opaque, rays) {
    var p;
    var opaqueSegment = new LineSegment(opaque.p1, opaque.p2);
    for (var i = 0; i < rays.data.length; i++) {
        // Check whether this new object intersects existing Rays
        var lightSegment = new LineSegment(rays.data[i].p1, rays.data[i].p2);
        p = lightSegment.intersection(opaqueSegment);
        if (p !== null) {
            // Since this object is opaque the Ray won't go through the object
            rays.data[i].p2 = p;
        }
    }

    // Create a vector that goes from the source of light to the edges of the object
    var vp1 = (new LineSegment(this.pos, opaque.p1)).toVector();
    var vp2 = (new LineSegment(this.pos, opaque.p2)).toVector();

    var order = vp1.crossProduct(vp2);

    if (!rays.contains(opaque.p1))
        vp1 = null;

    if (!rays.contains(opaque.p2))
        vp2 = null;

    if (vp1) {
        var rp1 = this._createFiniteRay(opaque.p1, vp1);

        if (order > 0)
            rp1.orientation = -1;

        rays.insert(rp1);
    }

    if (vp2) {
        var rp2 = this._createFiniteRay(opaque.p2, vp2);

        if (order < 0)
            rp2.orientation = -1;

        rays.insert(rp2);
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
