var MirrorEntity = function (params) {
    this.p1 = params.p1;
    this.p2 = params.p2;

    this._grabbed = false;
    this._grabbedPoint = 0;
};

inherits(MirrorEntity, InteractiveEntity);

MirrorEntity.prototype.update = function (delta) {
    this.p1 = this.body.p1;
    this.p2 = this.body.p2;
};

MirrorEntity.prototype.initPhysics = function (physicsWorld) {
    this.body = new Mirror(this.p1, this.p2);
    physicsWorld.addObject(this.body);
};

MirrorEntity.prototype.acceptsInputEvent = function (input) {
    var parentCall = InteractiveEntity.prototype.acceptsInputEvent.call(this, input);
    if (parentCall)
        return true;

    if (this._grabbed)
        return true;

    if (MathHelper.dist(this.p1, input.position) < 4
            || MathHelper.dist(this.p2, input.position) < 4)
        return true;

    return false;
};

MirrorEntity.prototype.onPress = function (ev) {
    this._grabbed = true;
    if (MathHelper.dist(this.p1, ev.position) < MathHelper.dist(this.p2, ev.position))
        this._grabbedPoint = 1;
    else
        this._grabbedPoint = 2;
};

MirrorEntity.prototype.onMove = function (ev) {
    if (this._grabbedPoint === 1)
        this.body.p1 = {x: ev.position.x, y: ev.position.y };
    else if (this._grabbedPoint === 2)
        this.body.p2 = {x: ev.position.x, y: ev.position.y };
};

MirrorEntity.prototype.onRelease = function (ev) {
    this._grabbed = false;
    this._grabbedPoint = 0;
};
