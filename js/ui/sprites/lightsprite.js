var LightSprite = function () {
    this.pos = null;
    this.color = null;
    this.points = [];
    this.entity = null;
    this._drawPoints = [];
};

LightSprite.prototype.update = function (delta) {
};

LightSprite.prototype.paint = function (context, rays) {
    this.draw(context, rays);
};

LightSprite.prototype.draw = function (context) {
    var opacity = 1;
    var rays = this.entity.rays();
    context.save();
    var size = 20;
    context.rect(this.pos.x - size/2 + 0.5, this.pos.y - size/2 + 0.5, size, size);
    context.stroke();
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
        for (var j = 0; j < rays[i].data.length; j++) {
            var p1 = rays[i].data[j].p1;
            var p2 = rays[i].data[j].p2;
            if (!rays[i].data[j].isFinite())
                p2 = this._intersectionPoint(rays[i].data[j], bounds);

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

LightSprite.prototype._intersectionPoint = function (ray, bounds) {
    var left = bounds.x;
    var top = bounds.y;
    var right = bounds.x + bounds.width;
    var bottom = bounds.y + bounds.height;

    var segments = [];
    segments[0] = new LineSegment({x: left, y: top}, {x: right, y: top});
    segments[1] = new LineSegment({x: right, y: top}, {x: right, y: bottom});
    segments[2] = new LineSegment({x: right, y: bottom}, {x: left, y: bottom});
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

    this.pos = this.entity.pos();
    this.color = data.color;
};
