var SceneBuilder = function (worldBuilder, canvasElement) {
    this._worldBuilder = worldBuilder;
    this._scene = new Scene();
    this._scene.setSize(canvasElement.width, canvasElement.height);

    var compositionBuffer = this._createCompositionBuffer(canvasElement);
    this._scene.setCompositionBuffer(compositionBuffer);
};

SceneBuilder.prototype._createCompositionBuffer = function(canvas) {
    var compositionCanvas = document.createElement("canvas");
    compositionCanvas.width = canvas.width;
    compositionCanvas.height = canvas.height;

    return compositionCanvas.getContext("2d");
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

SceneBuilder.prototype.buildLightBoxSprite = function (data) {
    var lightBox = new LightBoxSprite(this._scene.compositionBuffer());
    lightBox.readData(data, this._worldBuilder);
    this._scene.addLightBox(lightBox);
};

SceneBuilder.prototype.buildTargetSprite = function (data) {
    var target = new TargetSprite();
    target.readData(data, this._worldBuilder);
    this._scene.addSprite(target);
};

SceneBuilder.prototype.buildWallSprite = function(data) {
    var wall = new WallSprite();
    wall.readData(data, this._worldBuilder);
    this._scene.addSprite(wall);
};
