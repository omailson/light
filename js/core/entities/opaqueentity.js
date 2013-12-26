var OpaqueEntity = function (params) {
    this.p1 = params.p1;
    this.p2 = params.p2;
};

OpaqueEntity.prototype.update = function (delta) {
    this.p1 = this.body.p1;
    this.p2 = this.body.p2;
};

OpaqueEntity.prototype.initPhysics = function (physicsWorld) {
    this.body = new Opaque(this.p1, this.p2);
    physicsWorld.addObject(this.body);
};
