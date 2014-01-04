var OpaqueEntity = function (params) {
    this.p1 = params.p1;
    this.p2 = params.p2;

    this._interactiveHandler = new LineSegmentEntity(params);
};

inherits(OpaqueEntity, InteractiveEntity);

OpaqueEntity.prototype.update = function (delta) {
    this.p1 = this.body.p1;
    this.p2 = this.body.p2;
};

OpaqueEntity.prototype.initPhysics = function (physicsWorld) {
    this.body = new Opaque(this.p1, this.p2);
    physicsWorld.addObject(this.body);
};

OpaqueEntity.prototype.acceptsInputEvent = function (input) {
    return this._interactiveHandler.acceptsInputEvent(input);
};

OpaqueEntity.prototype.onPress = function (ev) {
    this._interactiveHandler.onPress(ev);
};

OpaqueEntity.prototype.onMove = function (ev) {
    this._interactiveHandler.onMove(ev);
    this.body.p1 = this._interactiveHandler.p1();
    this.body.p2 = this._interactiveHandler.p2();
};

OpaqueEntity.prototype.onRelease = function (ev) {
    this._interactiveHandler.onRelease(ev);
};
