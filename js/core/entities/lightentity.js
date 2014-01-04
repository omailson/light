var LightEntity = function (params) {
    this.body = null;
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
