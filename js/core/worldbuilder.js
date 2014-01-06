var WorldBuilder = function () {
    this._world = new GameWorld();
};

WorldBuilder.prototype.getWorld = function () {
    return this._world;
};

WorldBuilder.prototype.buildOpaqueEntity = function (params) {
    var opaque = new OpaqueEntity(params);
    opaque.initPhysics(this._world.physicsWorld());
    this._world.addEntity(opaque);
    return opaque;
};

WorldBuilder.prototype.buildMirrorEntity = function (params) {
    var mirror = new MirrorEntity(params);
    mirror.initPhysics(this._world.physicsWorld());
    this._world.addEntity(mirror);
    return mirror;
};

WorldBuilder.prototype.buildLightEntity = function (params) {
    var light = new LightEntity(params);
    light.initPhysics(this._world.physicsWorld());
    this._world.addLight(light);
    return light;
};

WorldBuilder.prototype.buildLightBoxEntity = function (params) {
    var lightBox = new LightBoxEntity(params);
    lightBox.initPhysics(this._world.physicsWorld());
    this._world.addLightBox(lightBox);
    return lightBox;
};
