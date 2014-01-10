/*global inherits, Component*/

/**
 * A dialog in the UI
 *
 * @class Dialog
 * @module ui
 * @param element {HTMLElement} The HTML element representing the dialog
 * @extends Component
 */
var Dialog = function (element) {
    Component.call(this, element);

    this._readyToDismissListener = null;
    this._readyToDismissFired = false;
    this._dismissedListener = null;
    this._dismissedReason = null;
    this._dismissed = true;
};

inherits(Dialog, Component);

/**
 * Sets the listener to the ready to dismiss event
 *
 * The ready to dismiss event is fired when the dialog wants to dismiss itself.
 *
 * @method setReadyToDismissListener
 * @param listener {Function} The listener
 */
Dialog.prototype.setReadyToDismissListener = function (listener) {
    this._readyToDismissListener = listener;
};

/**
 * Sets the listener to the dismissed event
 *
 * The dismissed event is fired when the dialog is dismissed.
 *
 * @method setDismissedListener
 * @param listener {Function} The listener
 */
Dialog.prototype.setDismissedListener = function (listener) {
    this._dismissedListener = listener;
};

/**
 * Acknowledges the dismissal request of this dialog
 *
 * See {{#crossLink "Dialog/_readyToDismiss"}}{{/crossLink}}
 *
 * @method ackDismiss
 */
Dialog.prototype.ackDismiss = function () {
    this._onReadyToDismiss();
};

/**
 * Asks the listeners if they are ready for the dismissal of this dialog
 *
 * When the listeners are ready, they'll call this _dismiss() method.
 *
 * @method _readyToDismiss
 * @param reason {Object} The reason
 * @protected
 */
Dialog.prototype._readyToDismiss = function (reason) {
    if (this._readyToDismissFired)
        return;

    this._readyToDismissFired = true;
    this._dismissedReason = reason;

    if (this._readyToDismissListener)
        this._readyToDismissListener(this._dismissedReason);
    else
        this.ackDismiss();
};

/**
 * Called when the listener are ready for the dismissal of this dialog
 *
 * Override this method to do something before dismissing the dialog.
 *
 * @method _onReadyToDismiss
 * @protected
 */
Dialog.prototype._onReadyToDismiss = function () {
    this._dismiss();
};

/**
 * Dismisses the dialog
 *
 * The dialog is hidden when dismissed.
 *
 * @method _dismiss
 * @private
 */
Dialog.prototype._dismiss = function () {
    if (this._dismissed)
        return;

    this._dismissed = true;

    if (this._dismissedListener)
        this._dismissedListener(this._dismissedReason);

    this.hide();
};

/**
 * Called when the dialog becomes visible
pp *
 * Overridden from ({{#crossLink "Component/_onShow"}}{{/crossLink}})
 *
 * @method _onShow
 * @protected
 */
Dialog.prototype._onShow = function () {
    this._readyToDismissFired = false;
    this._dismissed = false;
};
