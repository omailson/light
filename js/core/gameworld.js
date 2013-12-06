var GameWorld = function () {
    this._world = new World();
    this._entities = [];
    this._lights = [];
};

GameWorld.prototype.physicsWorld = function () {
    return this._world;
};

GameWorld.prototype.update = function (delta) {
    this._world.step();
};

GameWorld.prototype.addLight = function (light) {
    this._lights.push(light);
};

GameWorld.prototype.addEntity = function (entity) {
    this._entities.push(entity);
};
