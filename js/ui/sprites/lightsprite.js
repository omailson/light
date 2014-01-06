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
    this.pos = this.entity.pos();
    this._drawPoints = this.entity.drawPoints;
    if (this._startHandler)
        this._startHandler.update(delta);
    if (this._endHandler)
        this._endHandler.update(delta);
};

LightSprite.prototype.paint = function (context, rays) {
    this.draw(context, rays);
};

LightSprite.prototype.draw = function (context) {
    context.save();
    context.fillStyle = this.color;
    for (var i = 0; i < this._drawPoints.length; i++) {
        context.globalAlpha = this._drawPoints[i].opacity;
        context.beginPath();
        context.moveTo(this._drawPoints[i].points[0].x, this._drawPoints[i].points[0].y);
        for (var j = 0; j < this._drawPoints[i].points.length; j++) {
            context.lineTo(this._drawPoints[i].points[j].x, this._drawPoints[i].points[j].y);
        }
        context.fill();
    }

    if (this._startHandler)
        this._startHandler.draw(context);
    if (this._endHandler)
        this._endHandler.draw(context);
    context.restore();
};

LightSprite.prototype.readData = function (data, builder) {
    var params = {
        startRay: new Ray(data.rays[0].p1, new Vector2D(data.rays[0].vector.x, data.rays[0].vector.y)),
        endRay: new Ray(data.rays[1].p1, new Vector2D(data.rays[1].vector.x, data.rays[1].vector.y))
    };

    this.entity = builder.buildLightEntity(params, builder);

    if (this.entity.startHandler)
        this._startHandler = new LightHandlerSprite(this.entity.startHandler);
    if (this.entity.endHandler)
        this._endHandler = new LightHandlerSprite(this.entity.endHandler);

    this.pos = this.entity.pos();
    this.color = data.color;
};
