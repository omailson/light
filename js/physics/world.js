/**
 * A World
 *
 * @class World
 */
var World = function () {
    this._bounds = {width: 400, height: 300};
    this._lights = [];
    this._rays = [];
    this._objects = [];
};

/**
 * Sets the World bounds
 *
 * @method setBounds
 * @param bounds {Object} World bounds
 * @param bounds.width {Number}
 * @param bounds.height {Number}
 */
World.prototype.setBounds = function (bounds) {
    this._bounds = bounds;
};

World.prototype.createLightSource = function (startRay, endRay) {
    var light = new Light(startRay, endRay);
    light.world = this;
    this._lights.push(light);

    return light;
};

World.prototype.addObject = function (object) {
    this._objects.push(object);
};

World.prototype.step = function () {
    for (var i = 0; i < this._lights.length; i++) {
        this._lights[i].rays = this.computeRays(this._lights[i]);
    }
};

World.prototype.fetchRays = function (light) {
};

/**
 * Given a point and a vector, returns a Ray that starts in point and goes in
 * the direction of the given vector until it hits a wall
 *
 * @method createFiniteRay
 * @param point {Object} Starting point
 * @param vector {Vector2D} Direction of the Ray
 * @return {Ray} The computed Ray
 */
World.prototype.createFiniteRay = function (point, vector) {
    var w = this._bounds.width;
    var h = this._bounds.height;

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

// XXX
World.prototype.intersectionPoint = function (ray) {
    var w = this._bounds.width;
    var h = this._bounds.height;

    var segments = [];
    segments[0] = new LineSegment({x: 0, y: 0}, {x: w, y: 0});
    segments[1] = new LineSegment({x: w, y: 0}, {x: w, y: h});
    segments[2] = new LineSegment({x: w, y: h}, {x: 0, y: h});
    segments[3] = new LineSegment({x: 0, y: h}, {x: 0, y: 0});

    for (var i = 0; i < segments.length; i++) {
        var p = ray.intersectionPoint(segments[i]);
        if (p)
            return p;
    }

    return null;
};

World.prototype.computeRays = function (light) {
    var startRay = light.startRay();
    var endRay = light.endRay();
    endRay.orientation = -1;
    var rays = [new RayCollection(startRay, endRay)];

    for (var i = 0; i < rays.length; i++) {
        for (var j = 0; j < this._objects.length; j++) {
            this._objects[j].generateRays(rays[i]);
        }

        var collectionEmptied = false;
        for (var j = 0; j < this._objects.length; j++) {
            this._objects[j].computeRays(rays[i]);
            // Remove RayCollection if all rays are occluded by this object
            if (rays[i].data.length === 0) {
                rays.splice(i, 1);
                i--;
                collectionEmptied = true;
            }
        }

        for (var j = 0; !collectionEmptied && j < this._objects.length; j++) {
            if (this._objects[j] instanceof Mirror) {
                var newRays = this._objects[j].computeReflection(rays[i]);
                if (newRays)
                    rays.push(newRays);
            }
        }
    }

    return rays;
};

World.prototype.paint = function (context, rays) {
    var i;

    for (i = 0; i < this._lights.length; i++) {
        this._lights[i].paint(context, rays[i]);
    }

    for (i = 0; i < this._objects.length; i++) {
        this._objects[i].paint(context);
    }
};
