var YouWinDialog = function (element) {
    Dialog.call(this, element);

    this._menuButton = null;
    this._playAgainButton = null;
    this._nextButton = null;
    this._initButtons();
};

inherits(YouWinDialog, Dialog);

/**
 * The reasons to dismiss the dialog
 *
 * @class YouWinDialog.DismissReason
 * @static
 */
YouWinDialog.DismissReason = {
    /**
     * The user asked to go to the main menu
     *
     * @property Menu
     * @type YouWinDialog.DismissReason
     * @static
     * @final
     */
    Menu: 0,
    /**
     * The user asked to play again the same level
     *
     * @property PlayAgain
     * @type YouWinDialog.DismissReason
     * @static
     * @final
     */
    PlayAgain: 1,
    /**
     * The user asked to go to next level
     *
     * @property Next
     * @type YouWinDialog.DismissReason
     * @static
     * @final
     */
    Next: 2
};

YouWinDialog.prototype._initButtons = function () {
    var menuButtonElement = document.getElementById("you-win-menu");
    this._menuButton = new Button(menuButtonElement, this._onMenuClicked.bind(this));

    var playAgainButtonElement = document.getElementById("you-win-playagain");
    this._playAgainButton = new Button(playAgainButtonElement, this._onPlayAgainClicked.bind(this));

    var nextButtonElement = document.getElementById("you-win-nextlevel");
    this._nextButton = new Button(nextButtonElement, this._onNextClicked.bind(this));
};

YouWinDialog.prototype._onMenuClicked = function () {
    this._readyToDismiss(YouWinDialog.DismissReason.Menu);
};

YouWinDialog.prototype._onPlayAgainClicked = function () {
    this._readyToDismiss(YouWinDialog.DismissReason.PlayAgain);
};

YouWinDialog.prototype._onNextClicked = function () {
    this._readyToDismiss(YouWinDialog.DismissReason.Next);
};