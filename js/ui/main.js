/**
 * The main class of the game
 *
 * @class Main
 * @constructor
 */
var Main = function () {
    this._game = null;
    this._timestamp = 0;
    if (window.Debugger)
        this.debug = new Debugger(this);

    this._navigator = new PageNavigator();
    this._homePage = null;
    this._gamePage = null;
};

/**
 * Initilization
 *
 * @method _init
 * @private
 */
Main.prototype._init = function () {
    this._createPages();
    var gameFactory = new GameFactory();
    var levelData = {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 250, y: 120}},
            {type: "opaque", p1: {x: 250, y: 40}, p2: {x: 250, y: 70}}
        ]
    };

    document.getElementById("paused").style.display = "none";
    this._game = gameFactory.create(document.getElementById("canvas"), levelData);

    this._initInputListener(document.body, document.getElementById("canvas"));
    this._goToMainPage();
};

Main.prototype._createPages = function () {
    var gamePageDiv = document.getElementById("gamepage");
    this._gamePage = new GamePage(gamePageDiv, this._navigator);
    this._navigator.registerUri("game-page", this._gamePage);

    var homePageDiv = document.getElementById("homepage");
    this._homePage = new HomePage(homePageDiv, this._navigator);
    this._navigator.registerUri("home-page", this._homePage);
};

Main.prototype._goToMainPage = function () {
    this._navigator.goTo("home-page", null, null, null);
};

/**
 * Initializes the input listener
 *
 * @method _initInputListener
 * @param body {HTMLElement} The body elemtn
 * @param element {HTMLElement} The canvas element
 * @private
 */
Main.prototype._initInputListener = function (body, element) {
    this._inputListener = new InputListener(body, element);
    this._inputListener.pressed = this._onInputEvent.bind(this);
    this._inputListener.moved = this._onInputEvent.bind(this);
    this._inputListener.released = this._onInputEvent.bind(this);
};

Main.prototype._onInputEvent = function (e) {
    this._game.addInput(e);
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

    if (!this._pause) {
        this._game.update(delta);
        this._game.paint();
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
Main.prototype._requestFrame = function () {
    if (this._timestamp === 0)
        requestAnimationFrame(this._firstTick.bind(this));
    else
        requestAnimationFrame(this._tick.bind(this));
};

/**
 * Pause game. Pass a boolean or nothing to toggle
 *
 * @method pause
 * @param pause {Boolean} Whether the game should be paused or resumed. Leave it blank to toggle
 */
Main.prototype.pause = function (pause) {
    if (arguments.length === 0)
        pause = !this._pause;

    if (this._pause === !!pause)
        return;

    this._pause = !!pause;
    if (this._pause)
        document.getElementById("paused").style.display = "";
    else
        document.getElementById("paused").style.display = "none";
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
