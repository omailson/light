/*global Touchy, InputEvent, Modernizr*/

/**
 * Listens to touch events in an element
 *
 * If you rely on the position property of the InputEvent you need to
 * make sure that the `updateOffsets()` method is called when the
 * element moves (e.g when the window is resized).
 *
 * @class InputListener
 * @constructor
 * @param sourceElement {HTMLElement} The touch event source
 * @param [referenceElement] {HTMLElement} The element that is used to calculate
 *                                         the relative position of the events.
 */
var InputListener = function (sourceElement, referenceElement) {
    Touchy(sourceElement, !Modernizr.touch, this._handleInputEvents.bind(this));
    Touchy.stopWindowBounce();

    this._element = referenceElement || sourceElement;
    this.updateOffsets();
    this._lastPos = { x: 0, y: 0 };

    /**
     * Fired when a press event occurs
     *
     * @event pressed
     * @param evt {Object} The point
     */
    this.pressed = function (/*point*/) {};

    /**
     * Fired when a move event occurs
     *
     * @event moved
     * @param evt {Object} The point
     */
    this.moved = function (/*evt*/) {};

    /**
     * Fired when a release event occurs
     *
     * @event released
     * @param evt {Object} The point
     */
    this.released = function (/*evt*/) {};
};

InputListener.prototype.updateOffsets = function () {
    this._elementOffset = {left: 0, top: 0};
    var el = this._element;
    while (el) {
        this._elementOffset.left += el.offsetLeft;
        this._elementOffset.top += el.offsetTop;
        el = el.offsetParent;
    }
};

/**
 * Handles input event generated by the Touchy library
 *
 * @method _handleInputEvents
 * @private
 * @param hand {Object}
 * @param finger {Object}
 */
InputListener.prototype._handleInputEvents = function (hand, finger) {
    finger.on("start", this._onPress.bind(this));
    finger.on("move", this._onMove.bind(this));
    finger.on("end", this._onRelease.bind(this));
};

/**
 * Handles start events generated by the Touchy library
 *
 * This method translates the Touchy's start event into a pressed InputEvent.
 *
 * @method _onPress
 * @private
 * @param event {Object} Touchy's drag start event
 */
InputListener.prototype._onPress = function (event) {
    event.originalEvent.cancelBubble = true;

    var position = this._mapToElement(event);
    this._lastPos = position;
    var inside = this._isEventInsideBounds(event);

    var evt = new InputEvent(InputEvent.Type.Press, position, inside);
    evt.originalEvent = event.originalEvent;
    this.pressed(evt);
};

/**
 * Handles move events generated by the Touchy library
 *
 * This method translates the Touchy's move event into a move InputEvent.
 *
 * @method _onMove
 * @private
 * @param event {Object} Touchy's move event
 */
InputListener.prototype._onMove = function (event) {
    event.originalEvent.cancelBubble = true;

    var pos = this._mapToElement(event);

    var offset = { x: 0, y: 0 };
    if (this._lastPos) {
        offset = {
            x: pos.x - this._lastPos.x,
            y: pos.y - this._lastPos.y
        };
    }

    this._lastPos = pos;
    var inside = this._isEventInsideBounds(event);

    var evt = new InputEvent(InputEvent.Type.Move, pos, inside, offset);
    evt.originalEvent = event.originalEvent;
    this.moved(evt);
};

/**
 * Handles end events generated by the Touchy library
 *
 * This method translates the Touchy's end event into a release InputEvent.
 *
 * @method _onRelease
 * @private
 * @param event {Object} Touchy's drag end event
 */
InputListener.prototype._onRelease = function (event) {
    event.originalEvent.cancelBubble = true;

    var pos = this._mapToElement(event);
    var inside = this._isEventInsideBounds(event);
    var evt = new InputEvent(InputEvent.Type.Release, pos, inside);
    evt.originalEvent = event.originalEvent;
    this.released(evt);

    this._lastPos = null;
};

/**
 * @method _mapToElement
 */
InputListener.prototype._mapToElement = function (point) {
    return {
        x: point.x - this._elementOffset.left,
        y: point.y - this._elementOffset.top
    };
};

/**
 * Checks if a point is inside the game view bounds.
 *
 * @method _isEventInsideBounds
 * @private
 * @param point {Object} The point
 */
InputListener.prototype._isEventInsideBounds = function (point) {
    return point.x >= this._elementOffset.left &&
           point.x <= this._elementOffset.left + this._element.width &&
           point.y >= this._elementOffset.top &&
           point.y <= this._elementOffset.top + this._element.height;
};