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
