/*global InputListener*/

/**
 * A simple button
 *
 * @class Button
 * @module ui
 * @constructor
 * @param element {HTMLElement} The HTML element representing the button
 * @param [listener] {Function} The listener
 */
var Button = function (element, listener) {
    /**
     * The HTML element representing the button
     *
     * @property _element
     * @private
     * @type HTMLElement
     */
    this._element = element;

    /**
     * The button's owner event listener
     *
     * @property _listener
     * @private
     * @type Function
     */
    this._listener = listener;

    this._initInternalListener();
};

/**
 * Initializes the internal listener
 *
 * @method _initInternalListener
 * @protected
 */
Button.prototype._initInternalListener = function () {
    var internalListener = new InputListener(this._element);
    internalListener.released = this._onClicked.bind(this);
};

/**
 * The internal clicked listener
 *
 * Here the button can perform some operations
 * to update the Button UI. Derived classes should override it,
 * if additional behaviour is desired
 *
 * @method _onClicked
 * @param [params] {Object} Parameters passed to the listener
 * @protected
 */
Button.prototype._onClicked = function (params) {
    if (this._listener)
        this._listener(params);
};

/**
 * Sets the clicked listener
 *
 * @method setClickedListener
 * @param listener {Function} The listener
 */
Button.prototype.setClickedListener = function (listener) {
    this._listener = listener;
};
