var GamePage = function (element, navigator) {
    Page.call(this, element, navigator);

    this._gameFactory = new GameFactory();
    this._game = null;
    this._inputListener = null;

    this._canvas = document.getElementById("canvas");
    this._initInputListener(document.body, this._canvas);
};

inherits(GamePage, Page);

/**
 * Initializes the input listener
 *
 * @method _initInputListener
 * @param body {HTMLElement} The body element
 * @param element {HTMLElement} The canvas element
 * @private
 */
GamePage.prototype._initInputListener = function (body, element) {
    this._inputListener = new InputListener(body, element);
    this._inputListener.pressed = this._onInputEvent.bind(this);
    this._inputListener.moved = this._onInputEvent.bind(this);
    this._inputListener.released = this._onInputEvent.bind(this);
};

GamePage.prototype._onInputEvent = function (e) {
    this._game.addInput(e);
};

GamePage.prototype._onShow = function () {
    if (this._inputListener)
        this._inputListener.updateOffsets();
};

GamePage.prototype.onNavigatedTo = function (params) {
    this._game = this._gameFactory.create(this._canvas, params);
    this._game.start();
};
