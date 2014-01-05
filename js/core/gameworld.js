var GameWorld = function () {
    this._world = new World();
    this._inputManager = new InputManager();
    this._entities = [];
    this._lights = [];
};

GameWorld.prototype.physicsWorld = function () {
    return this._world;
};

/**
 * Append a user input to the list of user inputs (tap, drag...)
 *
 * @method addInput
 * @param input {InputEvent} the input to be pushed to the GameWorld's input list, which will be processed in the gameloop
 */
GameWorld.prototype.addInput = function (input) {
    this._inputManager.addInput(input);
};

GameWorld.prototype.update = function (delta) {
    this._inputManager.processInputs();
    this._world.step();

    var i;
    for (i = 0; i < this._lights.length; i++) {
        this._lights[i].update(delta);
    }

    for (i = 0; i < this._entities.length; i++) {
        this._entities[i].update(delta);
    }
};

GameWorld.prototype.addLight = function (light) {
    this._lights.push(light);
    this._inputManager.registerEntity(light);
};

GameWorld.prototype.addEntity = function (entity) {
    this._entities.push(entity);
    this._inputManager.registerEntity(entity);
};
