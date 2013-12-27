var LightEntity = function (params) {
    this.body = null;
    this._startRay = params.startRay;
    this._endRay = params.endRay;
};

inherits(LightEntity, InteractiveEntity);

LightEntity.prototype.rays = function () {
    return this.body.rays;
};

/**
 * Location of the light source
 *
 * @method pos
 * @return {Object}
 */
LightEntity.prototype.pos = function () {
    return this.body.pos;
};

LightEntity.prototype.initPhysics = function (physicsWorld) {
    this.body = physicsWorld.createLightSource(this._startRay, this._endRay);
};
