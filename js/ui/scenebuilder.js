var SceneBuilder = function (worldBuilder, canvasElement) {
    this._worldBuilder = worldBuilder;
    this._scene = new Scene();
    this._scene.setSize(canvasElement.width, canvasElement.height);
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

SceneBuilder.prototype.buildLightSprite = function (data) {
    var light = new LightSprite();
    light.readData(data, this._worldBuilder);
    this._scene.addLight(light);

    return light;
};
