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
    this._initContent();
    this._gameController = new GameController(this._levelModel);
    this._createPages();
    DOMTree.get(R.PausedText).style.display = "none";
    this._goToMainPage();
};

Main.prototype._initContent = function () {
    var content = DOMTree.get(R.Content);
    var canvas = DOMTree.get(R.Canvas);
    var width = HTMLElementUtils.width(canvas) + 2;
    var height = HTMLElementUtils.height(canvas) + 2;
    HTMLElementUtils.setWidth(content, width);
    HTMLElementUtils.setHeight(content, height);
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
    this._levelModel = Levels.data;
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
