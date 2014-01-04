/**
 * Utility class that provides an interactive way to move around objects that
 * consists of two endpoints and a line
 *
 * @class LineSegmentEntity
 * @param params {Object} two endpoints
 * @param params.p1 {Object} an endpoint
 * @param params.p1.x {Number}
 * @param params.p1.y {Number}
 * @param params.p2 {Object} another endpoint
 * @constructor
 */
var LineSegmentEntity = function (params) {
    this._lineSegment = new LineSegment(params.p1, params.p2);

    this._grabbed = false;
    this._grabbedPoint = 0;
};

inherits(LineSegmentEntity, InteractiveEntity);

/**
 * Sets the first endpoint
 *
 * @method setP1
 * @param p1 {Point}
 */
LineSegmentEntity.prototype.setP1 = function (p1) {
    this._lineSegment.p1 = {x: p1.x, y: p1.y};
};

/**
 * Sets the second endpoint
 *
 * @method setP2
 * @param p2 {Point}
 */
LineSegmentEntity.prototype.setP2 = function (p2) {
    this._lineSegment.p2 = {x: p2.x, y: p2.y};
};

/**
 * Returns the first endpoint
 *
 * @method p1
 * @return {Point}
 */
LineSegmentEntity.prototype.p1 = function () {
    return this._lineSegment.p1;
};

/**
 * Returns the second endpoint
 *
 * @method p2
 * @return {Point}
 */
LineSegmentEntity.prototype.p2 = function () {
    return this._lineSegment.p2;
};

LineSegmentEntity.prototype.acceptsInputEvent = function (input) {
    var parentCall = InteractiveEntity.prototype.acceptsInputEvent.call(this, input);
    if (parentCall)
        return true;

    if (this._grabbed)
        return true;

    if (MathHelper.dist(this._lineSegment.p1, input.position) < 4
            || MathHelper.dist(this._lineSegment.p2, input.position) < 4
            || MathHelper.dist(this._lineSegment.midpoint(), input.position) < 4)
        return true;

    return false;
};

LineSegmentEntity.prototype.onPress = function (ev) {
    this._grabbed = true;
    var p1dist = MathHelper.dist(this._lineSegment.p1, ev.position);
    var p2dist = MathHelper.dist(this._lineSegment.p2, ev.position);
    var midpointDist = MathHelper.dist(this._lineSegment.midpoint(), ev.position);

    if (p1dist < p2dist && p1dist < midpointDist)
        this._grabbedPoint = 1;
    else if (p2dist < p1dist && p2dist < midpointDist)
        this._grabbedPoint = 2;
    else
        this._grabbedPoint = 3;
};

LineSegmentEntity.prototype.onMove = function (ev) {
    if (this._grabbedPoint === 1) {
        this._lineSegment.p1 = {x: ev.position.x, y: ev.position.y };
    } else if (this._grabbedPoint === 2) {
        this._lineSegment.p2 = {x: ev.position.x, y: ev.position.y };
    } else if (this._grabbedPoint === 3) {
        var p1 = new Point(this._lineSegment.p1);
        var p2 = new Point(this._lineSegment.p2);
        this._lineSegment.p1 = p1.translated(ev.offset);
        this._lineSegment.p2 = p2.translated(ev.offset);
    }
};

LineSegmentEntity.prototype.onRelease = function (ev) {
    this._grabbed = false;
    this._grabbedPoint = 0;
};
