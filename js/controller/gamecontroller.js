/**
 * Controls the game
 *
 * @class GameController
 * @constructor
 */
var GameController = function (model) {
    this._model = model;
    this._gameFactory = new GameFactory();
    this._game = null;
    this._canvas = null;
    this._levelData = {};
    this._level = -1;

    this._startedDispatcher = new EventDispatcher();
    this._scoreChangedDispatcher = new EventDispatcher();
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
    this._game.addScoreChangedEventListener(this._scoreChangedDispatcher.dispatch.bind(this._scoreChangedDispatcher));
};

/**
 * @method _onEnded
 * @private
 */
GameController.prototype._onEnded = function () {
    var stars = 0;
    if (this._game.score >= this._levelData.gold)
        stars = 3;
    else if (this._game.score >= this._levelData.silver)
        stars = 2;
    else if (this._game.score >= this._levelData.bronze)
        stars = 1;
    this._endedDispatcher.dispatch(stars);
};

/**
 * Start the game
 *
 * @method start
 */
GameController.prototype.start = function () {
    this._game.start();
    this._startedDispatcher.dispatch(this._levelData);
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
    this.start();
};

/**
 * Load a level
 *
 * @method load
 * @param level {Number} the level number
 */
GameController.prototype.load = function (level) {
    this._level = level;
    this._levelData = new Level(this._model[level]);
    this._createGame();
};

/**
 * Check whether there are more levels to be played
 *
 * @method hasNextLevel
 * @return {Boolean}
 */
GameController.prototype.hasNextLevel = function () {
    return this._level + 1 < this._model.length;
};

/**
 * Load next level (if there's any)
 *
 * @method loadNextLevel
 */
GameController.prototype.loadNextLevel = function () {
    if (!this.hasNextLevel())
        return;

    this.load(this._level + 1);
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

/**
 * @method addStartedEventListener
 * @param listener {Function}
 * @param listener.level {Level} The started level
 */
GameController.prototype.addStartedEventListener = function (listener) {
    this._startedDispatcher.addListener(listener);
};

/**
 * @method removeStartedDispatcher
 * @param listener {Function}
 */
GameController.prototype.removeStartedDispatcher = function (listener) {
    this._startedDispatcher.removeListener(listener);
};

/**
 * @method addScoreChangedEventListener
 * @param listener {Function}
 */
GameController.prototype.addScoreChangedEventListener = function (listener) {
    this._scoreChangedDispatcher.addListener(listener);
};

/**
 * @method removeScoreChangedEventListener
 * @param listener {Function}
 */
GameController.prototype.removeScoreChangedEventListener = function (listener) {
    this._scoreChangedDispatcher.removeListener(listener);
};
