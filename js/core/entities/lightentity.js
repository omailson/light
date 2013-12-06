var LightEntity = function (params) {
    this.body = null;
    this.pos = params.pos;
    this.points = params.points;
};

LightEntity.prototype.rays = function () {
    return this.body.rays;
};

LightEntity.prototype.initPhysics = function (physicsWorld) {
    this.body = physicsWorld.createLightSource(this.pos, this.points, "");
};
