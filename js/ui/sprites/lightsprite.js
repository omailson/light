var LightSprite = function () {
    this.pos = null;
    this.color = null;
    this.points = [];
    this.entity = null;
    this._drawPoints = [];

    this._startHandler = null;
    this._endHandler = null;
};

/**
 * Describe one of the four sides of the border
 *
 * @class LightSprite._BorderSide
 * @static
 */
LightSprite._BorderSide = {
    /**
     * No side
     *
     * @property None
     * @type LightSprite._BorderSide
     * @static
     * @final
     */
    None: 0,

    /**
     * Top border
     *
     * @property Top
     * @type LightSprite._BorderSide
     * @static
     * @final
     */
    Top: 1,

    /**
     * Right border
     *
     * @property Right
     * @type LightSprite._BorderSide
     * @static
     * @final
     */
    Right: 2,

    /**
     * Bottom border
     *
     * @property Bottom
     * @type LightSprite._BorderSide
     * @static
     * @final
     */
    Bottom: 4,

    /**
     * Left border
     *
     * @property Left
     * @type LightSprite._BorderSide
     * @static
     * @final
     */
    Left: 8
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
        var side = LightSprite._BorderSide.None;
        for (var j = 0; j < rays[i].data.length; j++) {
            var p1 = rays[i].data[j].p1;
            var p2 = rays[i].data[j].p2;
            if (!rays[i].data[j].isFinite()) {
                // The ray intersects a border
                var intersection = this._intersectionPoint(rays[i].data[j], bounds);
                p2 = intersection.point;
            }

            if (side !== LightSprite._BorderSide.None
                    && side !== intersection.side
                    && rays[i].data[j-1].orientation === 1
                    && rays[i].data[j].orientation === -1) {
                // XXX: Only work when both sides are adjacent
                var edgeMask = side | intersection.side;
                var edgePoint = {
                    x: edgeMask & LightSprite._BorderSide.Left ? bounds.x : bounds.x + bounds.width,
                    y: edgeMask & LightSprite._BorderSide.Top ? bounds.y : bounds.y + bounds.height
                };
                points.push(edgePoint);
            }

            if (intersection)
                side = intersection.side;

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
 * Given a infinite ray and four vertices, returns at which point the Ray
 * intersects with one of the vertices.
 *
 * @method _intersectionPoint
 * @param ray {Ray} An infinite Ray
 * @param bounds {Object} A rectangle (x, y, width, height)
 * @return {Object} The intersection point (point) and the border side it intersects (side). Or null if it doesn't intersect any border.
 * @private
 */
LightSprite.prototype._intersectionPoint = function (ray, bounds) {
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
            return {point: p, side: Math.pow(2, i)};
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
