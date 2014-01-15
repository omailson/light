var DebuggerOpaqueEntity = function (params) {
    OpaqueEntity.call(this, params);

    this._interactiveHandler = new LineSegmentEntity(params);
};

inherits(DebuggerOpaqueEntity, OpaqueEntity);
inherits(DebuggerOpaqueEntity, InteractiveEntity);

DebuggerOpaqueEntity.prototype.update = function (delta) {
    this.p1 = this.body.p1;
    this.p2 = this.body.p2;
};

DebuggerOpaqueEntity.prototype.acceptsInputEvent = function (input) {
    return this._interactiveHandler.acceptsInputEvent(input);
};

DebuggerOpaqueEntity.prototype.onPress = function (ev) {
    this._interactiveHandler.onPress(ev);
};

DebuggerOpaqueEntity.prototype.onMove = function (ev) {
    this._interactiveHandler.onMove(ev);
    this.body.p1 = this._interactiveHandler.p1();
    this.body.p2 = this._interactiveHandler.p2();
};

DebuggerOpaqueEntity.prototype.onRelease = function (ev) {
    this._interactiveHandler.onRelease(ev);
};
