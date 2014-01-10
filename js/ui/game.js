var Game = function (world, scene, context) {
    this._gameWorld = world;
    this._scene = scene;
    this._context = context;

    this._timestamp = 0;
    this._pause = false;
    this._endedDispatcher = new EventDispatcher();
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
    if (!this._gameWorld.hasFinished())
        this._gameWorld.addInput(e);
};

/**
 * First tick of the game
 *
 * See _requestFrame
 *
 * @method _firstTick
 * @param timestamp {Number} Current (and first) timestamp
 * @private
 */
Game.prototype._firstTick = function (timestamp) {
    this._timestamp = timestamp;
    this._requestFrame();
};

/**
 * Game tick. Called at every frame update.
 *
 * See _requestFrame
 *
 * @method _tick
 * @param timestamp {Number} current timestamp
 * @private
 */
Game.prototype._tick = function (timestamp) {
    var delta = timestamp - this._timestamp;
    this._timestamp = timestamp;

    if (!this._pause) {
        this.update(delta);
        this.paint();
    }

    if (this._gameWorld.hasFinished()) {
        this._endedDispatcher.dispatch();
        return;
    }

    this._requestFrame();
};

/**
 * Request the next frame
 *
 * This is kind of a wrapper to requestAnimationFrame
 *
 * @method _requestFrame
 * @private
 */
Game.prototype._requestFrame = function () {
    if (this._timestamp === 0)
        requestAnimationFrame(this._firstTick.bind(this));
    else
        requestAnimationFrame(this._tick.bind(this));
};

/**
 * Start the game
 *
 * @method start
 */
Game.prototype.start = function () {
    this._requestFrame();
};

/**
 * Pause the game
 *
 * @method pause
 */
Game.prototype.pause = function () {
    this._pause = true;
};

/**
 * Resume the game
 *
 * @method resume
 */
Game.prototype.resume = function () {
    this._pause = false;
};

/**
 * Check whether the game is paused
 *
 * @method isPaused
 * @return {Boolean}
 */
Game.prototype.isPaused = function () {
    return this._pause;
};

/**
 * Check whether the game is running
 *
 * This method returns false if either the game is paused or it has finished
 *
 * @method isRunning
 * @return {Boolean}
 */
Game.prototype.isRunning = function () {
    return !this.isPaused() && !this._gameWorld.hasFinished();
};

Game.prototype.addEndedEventListener = function (listener) {
    this._endedDispatcher.addListener(listener);
};

Game.prototype.removeEndedEventListener = function (listener) {
    this._endedDispatcher.removeListener(listener);
};

Game.prototype.update = function (delta) {
    this._gameWorld.update(delta);
    this._scene.update(delta);
};

Game.prototype.paint = function () {
    this._context.canvas.width = this._context.canvas.width;
    this._scene.paint(this._context);
};
