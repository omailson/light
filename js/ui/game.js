var Game = function (world, scene, context) {
    this._gameWorld = world;
    this._scene = scene;
    this._context = context;
};

Game.prototype.init = function () {
};

/**
 * Deliver an input event to the game
 *
 * @method addInput
 * @param e {InputEvent} input event
 */
Game.prototype.addInput = function (e) {
    this._gameWorld.addInput(e);
};

Game.prototype.update = function (delta) {
    this._gameWorld.update(delta);
    this._scene.update(delta);
};

Game.prototype.paint = function () {
    this._context.canvas.width = this._context.canvas.width;
    this._scene.paint(this._context);
};
