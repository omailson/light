var SceneBuilder = function (worldBuilder) {
    this._worldBuilder = worldBuilder;
    this._scene = new Scene();
};

SceneBuilder.prototype.scene = function () {
    return this._scene;
};

SceneBuilder.prototype.buildOpaqueSprite = function (data) {
    var opaque = new OpaqueSprite();
    opaque.readData(data, this._worldBuilder);
    this._scene.addSprite(opaque);

    return opaque;
};

SceneBuilder.prototype.buildMirrorSprite = function (data) {
    var mirror = new MirrorSprite();
    mirror.readData(data, this._worldBuilder);
    this._scene.addSprite(mirror);

    return mirror;
};
