var GameWorld = function () {
    this._world = new World();
    this._entities = [];
};

GameWorld.prototype.physicsWorld = function () {
    return this._world;
};

GameWorld.prototype.addEntity = function (entity) {
    this._entities.push(entity);
};
