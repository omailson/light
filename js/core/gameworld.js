var GameWorld = function () {
    this._world = new World();
    this._entities = [];
    this._lights = [];
    this._rays = [];
};

GameWorld.prototype.physicsWorld = function () {
    return this._world;
};

GameWorld.prototype.rays = function () {
    return this._rays;
};

GameWorld.prototype.update = function (delta) {
    this._rays = [];
    for (var i = 0; i < this._lights.length; i++) {
        var lightRays = {
            light: this._lights[i],
            rays: []
        };
        lightRays.rays = this._world.computeRays(this._lights[i]);
        this._rays.push(lightRays);
    }
};

GameWorld.prototype.addLight = function (light) {
    this._lights.push(light);
};

GameWorld.prototype.addEntity = function (entity) {
    this._entities.push(entity);
};
