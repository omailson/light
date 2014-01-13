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
    this._gameController = null;
    this._homePage = null;
    this._gamePage = null;
    this._levelPage = null;
};

/**
 * Initilization
 *
 * @method _init
 * @private
 */
Main.prototype._init = function () {
    this._loadLevels();
    this._gameController = new GameController(this._levelModel);
    this._createPages();
    DOMTree.get(R.PausedText).style.display = "none";
    this._goToMainPage();
};

Main.prototype._createPages = function () {
    var gamePageDiv = DOMTree.get(R.GamePage);
    this._gamePage = new GamePage(gamePageDiv, this._navigator, this._gameController);
    this._navigator.registerUri("game-page", this._gamePage);

    var homePageDiv = DOMTree.get(R.HomePage);
    this._homePage = new HomePage(homePageDiv, this._navigator);
    this._navigator.registerUri("home-page", this._homePage);

    var levelPageDiv = DOMTree.get(R.LevelPage);
    this._levelPage = new LevelPage(levelPageDiv, this._navigator);
    this._navigator.registerUri("level-page", this._levelPage);
};

Main.prototype._loadLevels = function () {
    var levelData = {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 250, y: 120}},
            {type: "opaque", p1: {x: 250, y: 40}, p2: {x: 250, y: 70}}
        ]
    };

    this._levelModel = [levelData];
};

Main.prototype._goToMainPage = function () {
    this._navigator.goTo("home-page", null, null, this._levelModel);
};

/**
 * Run the game
 *
 * @method run
 */
Main.prototype.run = function () {
    this._init();
};
