var LightEntity = function (params) {
    this.body = null;
    this.drawPoints = [];
    this._startRay = params.startRay;
    this._endRay = params.endRay;

    this.startHandler = this._createHandler(params.startRay);
    this.endHandler = this._createHandler(params.endRay);

    this._grabbedHandler = null;
};

inherits(LightEntity, InteractiveEntity);

LightEntity.prototype.update = function (delta) {
    this._startRay = this.body.startRay();
    this._endRay = this.body.endRay();
};

LightEntity.prototype.rays = function () {
    return this.body.rays;
};

LightEntity.prototype._createHandler = function (ray) {
    var vector = ray.vector.normalized();
    var size = 100;
    var params = {
        p1: ray.p1,
        p2: {
            x: ray.p1.x + vector.x * size,
            y: ray.p1.y + vector.y * size
        }
    };

    return new LineSegmentEntity(params);
};

/**
 * Location of the light source
 *
 * @method pos
 * @return {Object}
 */
LightEntity.prototype.pos = function () {
    return this.body.pos;
};

LightEntity.prototype.initPhysics = function (physicsWorld) {
    this.body = physicsWorld.createLightSource(this._startRay, this._endRay);
};

/**
 * Compute each vertex of the Light polygon limiting to viewport boundaries
 *
 * @method computeDrawPoints
 * @param bounds {Object} Viewport rectangle
 * @param bounds.x {Number}
 * @param bounds.y {Number}
 * @param bounds.width {Number}
 * @param bounds.height {Number}
 */
LightEntity.prototype.computeDrawPoints = function (bounds) {
    this.drawPoints.length = 0;
    var rays = this.body.rays;
    for (var i = 0; i < rays.length; i++) {
        var points = [];
        var corners = this._illuminatedVertices(rays[i], bounds);

        for (var j = 0; j < rays[i].data.length; j++) {
            var p1 = rays[i].data[j].p1;
            var p2 = rays[i].data[j].p2;
            if (!rays[i].data[j].isFinite())
                p2 = this._borderIntersection(rays[i].data[j], bounds);

            // Check if one of the corners are illuminated
            var pushedCorners = [];
            for (var k = 0; k < corners.length; k++) {
                var cp = Vector2D.fromPoints(rays[i].lightPos, corners[k]).crossProduct(rays[i].data[j].toVector());
                if (cp > 0) {
                    pushedCorners.push(corners[k]);
                    corners.splice(k, 1);
                    k--;
                }
            }
            // Those points should be ordered
            pushedCorners.sort(function (a, b) {
                var va = Vector2D.fromPoints(rays[i].lightPos, a);
                var vb = Vector2D.fromPoints(rays[i].lightPos, b);
                var cp = va.crossProduct(vb);
                return -cp;
            });
            points = points.concat(pushedCorners);

            if (rays[i].data[j].orientation === 1) {
                points.push(p1);
                points.push(p2);
            } else {
                points.push(p2);
                points.push(p1);
            }
        }
        this.drawPoints.push({
            opacity: rays[i].opacity,
            points: points
        });
    }
};

/**
 * Returns which of the four corners are illuminated by the given RayCollection
 *
 * @method _illuminatedVertices
 * @param rays {RayCollection}
 * @param bounds {Object} A rectangle (x, y, width, height)
 * @return {Array} array containing at most 4 points
 * @private
 */
LightEntity.prototype._illuminatedVertices = function (rays, bounds) {
    var left = bounds.x;
    var top = bounds.y;
    var right = bounds.x + bounds.width;
    var bottom = bounds.y + bounds.height;

    var corners = [
        {x: left, y: top},
        {x: right, y: top},
        {x: right, y: bottom},
        {x: left, y: bottom}
    ];

    var vertices = [];
    for (var i = 0; i < corners.length; i++) {
        if (rays.contains(corners[i]))
            vertices.push(corners[i]);
    }

    return vertices;
};

/**
 * Given a infinite ray and a rectangle, returns at which point the Ray
 * intersects with one of the edges
 *
 * @method _borderIntersection
 * @param ray {Ray} An infinite Ray
 * @param bounds {Object} A rectangle (x, y, width, height)
 * @return {Object} The intersection point, or null if it doesn't intersect any border.
 * @private
 */
LightEntity.prototype._borderIntersection = function (ray, bounds) {
    var left = bounds.x;
    var top = bounds.y;
    var right = bounds.x + bounds.width;
    var bottom = bounds.y + bounds.height;

    var segments = [];
    // Top
    segments[0] = new LineSegment({x: left, y: top}, {x: right, y: top});
    // Right
    segments[1] = new LineSegment({x: right, y: top}, {x: right, y: bottom});
    // Bottom
    segments[2] = new LineSegment({x: right, y: bottom}, {x: left, y: bottom});
    // Left
    segments[3] = new LineSegment({x: left, y: bottom}, {x: left, y: top});

    for (var i = 0; i < segments.length; i++) {
        var p = ray.intersectionPoint(segments[i]);
        if (p)
            return p;
    }

    return null;
};

LightEntity.prototype.acceptsInputEvent = function (input) {
    if (this._grabbedHandler)
        return this._grabbedHandler.acceptsInputEvent(input);

    if (this.startHandler.acceptsInputEvent(input))
        this._grabbedHandler = this.startHandler;
    else if (this.endHandler.acceptsInputEvent(input))
        this._grabbedHandler = this.endHandler;

    if (this._grabbedHandler)
        return true;
    else
        return false;
};

LightEntity.prototype.onPress = function (ev) {
    this._grabbedHandler.onPress(ev);
};

LightEntity.prototype.onMove = function (ev) {
    this._grabbedHandler.onMove(ev);
    var ray = new Ray(this._grabbedHandler.p1(),
            Vector2D.fromPoints(this._grabbedHandler.p1(),
                this._grabbedHandler.p2()));
    if (this._grabbedHandler === this.startHandler) {
        ray.orientation = this._startRay.orientation;
        this.body.setRays(ray, null);
    } else if (this._grabbedHandler === this.endHandler) {
        ray.orientation = this._endRay.orientation;
        this.body.setRays(null, ray);
    }
};

LightEntity.prototype.onRelease = function (ev) {
    this._grabbedHandler.onRelease(ev);
    this._grabbedHandler = null;
};
