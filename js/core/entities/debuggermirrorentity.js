var DebuggerMirrorEntity = function (params) {
    MirrorEntity.call(this, params);

    this._interactiveHandler = new LineSegmentEntity(params);
};

inherits(DebuggerMirrorEntity, MirrorEntity);
inherits(DebuggerMirrorEntity, InteractiveEntity);

DebuggerMirrorEntity.prototype.update = function (delta) {
    this.p1 = this.body.p1;
    this.p2 = this.body.p2;
};

DebuggerMirrorEntity.prototype.acceptsInputEvent = function (input) {
    return this._interactiveHandler.acceptsInputEvent(input);
};

DebuggerMirrorEntity.prototype.onPress = function (ev) {
    this._interactiveHandler.onPress(ev);
};

DebuggerMirrorEntity.prototype.onMove = function (ev) {
    this._interactiveHandler.onMove(ev);
    this.body.p1 = this._interactiveHandler.p1();
    this.body.p2 = this._interactiveHandler.p2();
};

DebuggerMirrorEntity.prototype.onRelease = function (ev) {
    this._interactiveHandler.onRelease(ev);
};
