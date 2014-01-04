var MirrorEntity = function (params) {
    this.p1 = params.p1;
    this.p2 = params.p2;

    this._interactiveHandler = new LineSegmentEntity(params);
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
    return this._interactiveHandler.acceptsInputEvent(input);
};

MirrorEntity.prototype.onPress = function (ev) {
    this._interactiveHandler.onPress(ev);
};

MirrorEntity.prototype.onMove = function (ev) {
    this._interactiveHandler.onMove(ev);
    this.body.p1 = this._interactiveHandler.p1();
    this.body.p2 = this._interactiveHandler.p2();
};

MirrorEntity.prototype.onRelease = function (ev) {
    this._interactiveHandler.onRelease(ev);
};
