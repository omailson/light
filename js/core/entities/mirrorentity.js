var MirrorEntity = function (params) {
    this.p1 = params.p1;
    this.p2 = params.p2;
};

MirrorEntity.prototype.initPhysics = function (physicsWorld) {
    var mirror = new Mirror(this.p1, this.p2);
    physicsWorld.addObject(mirror);
};
