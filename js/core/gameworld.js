var GameWorld = function () {
    this._world = new World();
    this._inputManager = new InputManager();
    this._entities = [];
    this._lights = [];
    this._bounds = {x: 0, y: 0, width: 0, height: 0};
};

GameWorld.prototype.physicsWorld = function () {
    return this._world;
};

GameWorld.prototype.setSize = function (width, height) {
    this._bounds.width = width;
    this._bounds.height = height;
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
    var i;
    this._inputManager.processInputs();
    // Add new light entities and destroy unused ones
    this._processLightEntities();
    this._world.step();

    for (i = 0; i < this._lights.length; i++) {
        this._lights[i].computeDrawPoints(this._bounds);
        this._lights[i].update(delta);
    }

    for (i = 0; i < this._entities.length; i++) {
        this._entities[i].update(delta);
    }
};

GameWorld.prototype.addLightBox = function (light) {
    this._lights.push(light);
    this._inputManager.registerEntity(light);
};

GameWorld.prototype.addLight = function (light) {
    this._lights.push(light);
    if (isInstanceOf(light, InteractiveEntity))
        this._inputManager.registerEntity(light);
};

GameWorld.prototype.addEntity = function (entity) {
    this._entities.push(entity);
    this._inputManager.registerEntity(entity);
};

GameWorld.prototype._processLightEntities = function () {
    for (var i = 0; i < this._lights.length; i++) {
        if (this._lights[i] instanceof LightBoxEntity) {
            for (var j = 0; j < this._lights[i].newLights.length; j++) {
                this._lights[i].newLights[j].initPhysics(this._world);
            }
            for (var j = 0; j < this._lights[i].destroyedLights.length; j++) {
                this._world.destroyBody(this._lights[i].destroyedLights[j].body);
            }

            this._lights[i].newLights.length = 0;
            this._lights[i].destroyedLights.length = 0;
        }
    }
};
