/**
 * This class handles event listeners.
 *
 * @class EventDispatcher
 * @module utils
 */
var EventDispatcher = function () {
    this._listeners = [];
};

/**
 * Register an event listener callback.
 *
 * @method addListener
 * @param listener {Method} callback for this event.
 */
EventDispatcher.prototype.addListener = function (listener) {
    if (this._listeners.indexOf(listener) !== -1)
        return;

    this._listeners.push(listener);
};

/**
 * Dispatches an event.
 *
 * @method dispatch
 */
EventDispatcher.prototype.dispatch = function () {
    for (var i = 0; i < this._listeners.length; i++)
        this._listeners[i].apply(null, arguments);
};

/**
 * Removes a listener from the EventDispatcher object.
 *
 * @method removeListener
 * @param listener {Method} callback for this event.
 */
EventDispatcher.prototype.removeListener = function (listener) {
    var idx = this._listeners.indexOf(listener);
    if (idx === -1)
        return;

    this._listeners.splice(idx, 1);
};

/**
 * Removes all the listeners.
 *
 * @method clearListeners
 */
EventDispatcher.prototype.clearListeners = function () {
    this._listeners.length = 0;
};
