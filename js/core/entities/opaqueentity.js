var OpaqueEntity = function (params) {
    this.p1 = params.p1;
    this.p2 = params.p2;
};

OpaqueEntity.prototype.initPhysics = function (physicsWorld) {
    var opaque = new Opaque(this.p1, this.p2);
    physicsWorld.addObject(opaque);
};
