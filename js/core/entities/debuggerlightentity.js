/**
 * Interactive light entity. For debug purposes.
 *
 * Change LightEntity to this class on WorldBuilder.buildLightEntity() to use it
 *
 * @class DebuggerLightEntity
 * @constructor
 */
var DebuggerLightEntity = function (params) {
    LightEntity.call(this, params);
    this.startHandler = this._createHandler(params.startRay);
    this.endHandler = this._createHandler(params.endRay);

    this._grabbedHandler = null;
};

inherits(DebuggerLightEntity, InteractiveEntity);
inherits(DebuggerLightEntity, LightEntity);

DebuggerLightEntity.prototype._createHandler = function (ray) {
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

DebuggerLightEntity.prototype.acceptsInputEvent = function (input) {
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

DebuggerLightEntity.prototype.onPress = function (ev) {
    this._grabbedHandler.onPress(ev);
};

DebuggerLightEntity.prototype.onMove = function (ev) {
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

DebuggerLightEntity.prototype.onRelease = function (ev) {
    this._grabbedHandler.onRelease(ev);
    this._grabbedHandler = null;
};
