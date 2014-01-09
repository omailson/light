/**
 * The main class of the game
 *
 * @class Main
 * @constructor
 */
var Main = function () {
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
    document.getElementById("paused").style.display = "none";
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
    var levelData = {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 250, y: 120}},
            {type: "opaque", p1: {x: 250, y: 40}, p2: {x: 250, y: 70}}
        ]
    };
    this._navigator.goTo("home-page", null, null, levelData);
};

/**
 * Run the game
 *
 * @method run
 */
Main.prototype.run = function () {
    this._init();
};
