var LightSprite = function () {
    this.pos = null;
    this.color = null;
    this.points = [];
    this.entity = null;
    this._drawPoints = [];

    this._startHandler = null;
    this._endHandler = null;
};

LightSprite.prototype.update = function (delta) {
    this.entity.update(delta);
    this.pos = this.entity.pos();
    this._startHandler.update(delta);
    this._endHandler.update(delta);
};

LightSprite.prototype.paint = function (context, rays) {
    this.draw(context, rays);
};

LightSprite.prototype.draw = function (context) {
    var opacity = 1;
    var rays = this.entity.rays();
    context.save();
    context.fillStyle = this.color;
    for (var i = 0; i < this._drawPoints.length; i++, opacity -= 0.2) {
        context.globalAlpha = opacity;
        context.beginPath();
        context.moveTo(this._drawPoints[i][0].x, this._drawPoints[i][0].y);
        for (var j = 0; j < this._drawPoints[i].length; j++) {
            context.lineTo(this._drawPoints[i][j].x, this._drawPoints[i][j].y);
        }
        context.fill();
    }

    if (this._startHandler)
        this._startHandler.draw(context);
    if (this._endHandler)
        this._endHandler.draw(context);
    context.restore();
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
LightSprite.prototype.computeDrawPoints = function (bounds) {
    this._drawPoints.length = 0;
    var rays = this.entity.rays();
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
        this._drawPoints.push(points);
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
LightSprite.prototype._illuminatedVertices = function (rays, bounds) {
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
LightSprite.prototype._borderIntersection = function (ray, bounds) {
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

LightSprite.prototype.readData = function (data, builder) {
    var params = {
        startRay: new Ray(data.rays[0].p1, new Vector2D(data.rays[0].vector.x, data.rays[0].vector.y)),
        endRay: new Ray(data.rays[1].p1, new Vector2D(data.rays[1].vector.x, data.rays[1].vector.y))
    };

    this.entity = builder.buildLightEntity(params, builder);

    this._startHandler = new LightHandlerSprite(this.entity.startHandler);
    this._endHandler = new LightHandlerSprite(this.entity.endHandler);

    this.pos = this.entity.pos();
    this.color = data.color;
};
