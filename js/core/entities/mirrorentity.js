var MirrorEntity = function (params) {
    this.p1 = params.p1;
    this.p2 = params.p2;
    this.body = null;
};

MirrorEntity.prototype.update = function (delta) {
};

MirrorEntity.prototype.initPhysics = function (physicsWorld) {
    this.body = new Mirror(this.p1, this.p2);
    physicsWorld.addObject(this.body);
};
