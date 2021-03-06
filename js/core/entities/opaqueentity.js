var OpaqueEntity = function (params) {
    this.p1 = params.p1;
    this.p2 = params.p2;
    this.body = null;
};

OpaqueEntity.prototype.update = function (delta) {
};

OpaqueEntity.prototype.initPhysics = function (physicsWorld) {
    this.body = new Opaque(this.p1, this.p2);
    physicsWorld.addObject(this.body);
};
