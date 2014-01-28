var GamePage = function (element, navigator, gameController) {
    Page.call(this, element, navigator);

    this._canvas = DOMTree.get(R.Canvas);
    this._inputListener = null;
    this._initInputListener(DOMTree.get(R.Body), this._canvas);

    this._levelModel = null;
    this._gameController = gameController;
    this._gameController.setCanvas(this._canvas);
    this._gameController.addStartedEventListener(this._onStarted.bind(this));
    this._gameController.addScoreChangedEventListener(this._onScoreChanged.bind(this));
    this._gameController.addEndedEventListener(this._onEnded.bind(this));

    this._youWinDialog = this._createYouWinDialog(DOMTree.get(R.YouWinDialog));
    this._scoreWidget = this._createScoreWidget();
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

GamePage.prototype._createScoreWidget = function () {
    var scoreWidget = new ScoreWidget();
    return scoreWidget;
};

GamePage.prototype._onInputEvent = function (e) {
    this._gameController.addInput(e);
};

GamePage.prototype._onShow = function () {
    if (this._inputListener)
        this._inputListener.updateOffsets();
};

GamePage.prototype.onNavigatedTo = function (params) {
    this._levelModel = params.model;

    this._gameController.load(params.level);
    this._gameController.start();
};

GamePage.prototype._onStarted = function (level) {
    var initialScore = level.maxScore();
    this._scoreWidget.setScore(initialScore);
    this._scoreWidget.show();
};

GamePage.prototype._onScoreChanged = function (oldScore, newScore) {
    this._scoreWidget.setScore(newScore);
};

GamePage.prototype._onEnded = function (stars) {
    this._youWinDialog.setStars(stars);
    this._youWinDialog.show();
    this._scoreWidget.hide();
};

GamePage.prototype._onYouWinDialogDismissed = function (reason) {
    switch (reason) {
        case YouWinDialog.DismissReason.Menu:
            this._goToMenu();
            break;
        case YouWinDialog.DismissReason.PlayAgain:
            this._gameController.reload();
            break;
        case YouWinDialog.DismissReason.Next:
            this._goToNextLevel();
            break;
    }
};

GamePage.prototype._goToNextLevel = function () {
    if (this._gameController.hasNextLevel()) {
        this._gameController.loadNextLevel();
        this._gameController.start();
    } else {
        this._goToMenu();
    }
};

GamePage.prototype._goToMenu = function() {
    this._navigator.goTo("level-page", Component.TransitionType.SlideOutRight,
            Component.TransitionType.SlideInLeft, this._levelModel);
};
