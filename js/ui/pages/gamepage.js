var GamePage = function (element, navigator) {
    Page.call(this, element, navigator);

    this._canvas = document.getElementById("canvas");
    this._inputListener = null;
    this._initInputListener(document.body, this._canvas);

    this._gameController = new GameController();
    this._gameController.setCanvas(this._canvas);
    this._gameController.addEndedEventListener(this._onEnded.bind(this));

    this._youWinDialog = this._createYouWinDialog(document.getElementById("you-win-dialog"));
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

GamePage.prototype._createYouWinDialog = function (element) {
    var youWinDialog = new YouWinDialog(element);
    youWinDialog.setDismissedListener(this._onYouWinDialogDismissed.bind(this));
    return youWinDialog;
};

GamePage.prototype._onInputEvent = function (e) {
    this._gameController.addInput(e);
};

GamePage.prototype._onShow = function () {
    if (this._inputListener)
        this._inputListener.updateOffsets();
};

GamePage.prototype.onNavigatedTo = function (params) {
    this._gameController.load(params);
    this._gameController.start();
};

GamePage.prototype._onEnded = function () {
    this._youWinDialog.show();
};

GamePage.prototype._onYouWinDialogDismissed = function (reason) {
    switch (reason) {
        case YouWinDialog.DismissReason.Menu:
            main._goToMainPage();
            break;
        case YouWinDialog.DismissReason.PlayAgain:
            this._gameController.reload();
            break;
        case YouWinDialog.DismissReason.Next:
            break;
    }
};
