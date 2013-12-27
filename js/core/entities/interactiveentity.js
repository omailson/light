/*global inherits, Entity, InputEvent*/

/**
 * An entity that reacts to input events
 *
 * @class InteractiveEntity
 * @module libcircus
 * @extends Entity
 * @constructor
 * @param params {Object} Initialization parameters
 */
var InteractiveEntity = function (params) {
};

/**
 * Accepts or not the event passed as parameter.
 * Each entity should override this method if it wants a specific behaviour
 *
 *     // event format
 *     var event = {
 *         type: 0
 *         position: { x: 0, y: 0 }
 *     };
 *
 * @method acceptsInputEvent
 * @param event {Object} the input event
 * @return {Boolean} if it accepts the input or not
 */
InteractiveEntity.prototype.acceptsInputEvent = function (event) {
    if (event.type === InputEvent.Type.Release)
        return true;

    return false;
};

/**
 * Handles press events.
 * This function is called when the entity accepts a press event.
 *
 * See also: {{#crossLink "InteractiveEntity/acceptsInputEvent"}}{{/crossLink}}
 *
 * @method onPress
 * @param event {InputEvent} the input event
 */
InteractiveEntity.prototype.onPress = function (/*event*/) {
};

/**
 * Handles move events.
 * This function is called when the entity accepts a move event.
 *
 * See also: {{#crossLink "InteractiveEntity/acceptsInputEvent"}}{{/crossLink}}
 *
 * @method onMove
 * @param event {InputEvent} the input event
 */
InteractiveEntity.prototype.onMove = function (/*event*/) {
};

/**
 * Handles release events.
 * This function is called when the entity accepts a release event.
 *
 * See also: {{#crossLink "InteractiveEntity/acceptsInputEvent"}}{{/crossLink}}
 *
 * @method onRelease
 * @param event {InputEvent} the input event
 */
InteractiveEntity.prototype.onRelease = function (/*event*/) {
};

