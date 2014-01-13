/**
 * Controls the game
 *
 * @class GameController
 * @constructor
 */
var GameController = function () {
    this._gameFactory = new GameFactory();
    this._game = null;
    this._canvas = null;
    this._levelData = {};

    this._endedDispatcher = new EventDispatcher();
};

/**
 * Set the canvas element
 *
 * @method setCanvas
 * @param canvas {HTMLCanvasElement}
 */
GameController.prototype.setCanvas = function (canvas) {
    this._canvas = canvas;
};

/**
 * Create a new game
 *
 * @method _createGame
 * @private
 */
GameController.prototype._createGame = function () {
    this._game = this._gameFactory.create(this._canvas, this._levelData);
    this._game.addEndedEventListener(this._onEnded.bind(this));
};

/**
 * @method _onEnded
 * @private
 */
GameController.prototype._onEnded = function () {
    this._endedDispatcher.dispatch();
};

/**
 * Start the game
 *
 * @method start
 */
GameController.prototype.start = function () {
    this._game.start();
};

/**
 * Pause the game
 *
 * @method pause
 */
GameController.prototype.pause = function () {
    this._game.pause();
};

/**
 * Resume a paused game
 *
 * @method resume
 */
GameController.prototype.resume = function () {
    this._game.resume();
};

/**
 * Reload the game
 *
 * @method reload
 */
GameController.prototype.reload = function () {
    this._createGame();
    this._game.start();
};

/**
 * Load a level
 *
 * @method load
 * @param levelData {Object}
 */
GameController.prototype.load = function (levelData) {
    this._levelData = levelData;
    this._createGame();
};

/**
 * Send input to the game, if it exists and is running
 *
 * @method addInput
 * @param input {Object}
 */
GameController.prototype.addInput = function (input) {
    if (!this._game)
        return;

    if (this._game.isRunning())
        this._game.addInput(input);
};

/**
 * @method addEndedEventListener
 * @param listener {Function}
 */
GameController.prototype.addEndedEventListener = function (listener) {
    this._endedDispatcher.addListener(listener);
};

/**
 * @method removeEndedEventListener
 * @param listener {Function}
 */
GameController.prototype.removeEndedEventListener = function (listener) {
    this._endedDispatcher.removeListener(listener);
};