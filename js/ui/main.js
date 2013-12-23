/**
 * The main class of the game
 *
 * @class Main
 * @constructor
 */
var Main = function () {
    this._game = null;
    this._timestamp = 0;
};

/**
 * Initilization
 *
 * @method _init
 * @private
 */
Main.prototype._init = function () {
    var gameFactory = new GameFactory();
    var levelData = {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 250, y: 120}},
            {type: "opaque", p1: {x: 250, y: 40}, p2: {x: 250, y: 70}}
        ]
    };

    this._game = gameFactory.create(document.getElementById("canvas"), levelData);
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
Main.prototype._firstTick = function (timestamp) {
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
Main.prototype._tick = function (timestamp) {
    var delta = timestamp - this._timestamp;
    this._timestamp = timestamp;

    this._game.update(delta);
    this._game.paint();

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
Main.prototype._requestFrame = function () {
    if (this._timestamp === 0)
        requestAnimationFrame(this._firstTick.bind(this));
    else
        requestAnimationFrame(this._tick.bind(this));
};

/**
 * Run the game
 *
 * @method run
 */
Main.prototype.run = function () {
    this._init();
    this._requestFrame();
};
