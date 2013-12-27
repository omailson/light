/*global InputEvent, MathHelper*/

/**
 * Manages all the user input on libcircus
 *
 * @class InputManager
 * @constructor
 */
var InputManager = function () {
    this._interactiveEntities = [];
    this._inputs = [];
    this._pressedEntity = null;
};

/**
 * Enables the entity to recieve input events
 *
 * @method registerEntity
 * @param entity {InteractiveEntity} the entity
 */
InputManager.prototype.registerEntity = function (entity) {
    this._interactiveEntities.push(entity);
};

/**
 * Add a new input event to be deliveried to the registered entities.
 *
 * @method addInput
 * @param ev {InputEvent} the input event
 */
InputManager.prototype.addInput = function (ev) {
    this._inputs.push(ev);
};

/**
 * Clear all user inputs.
 * Should be called at every end of gameworld step
 *
 * @private
 * @method _clearInputs
 */
InputManager.prototype._clearInputs = function () {
    this._inputs.splice(0, this._inputs.length);
};

/**
 * Deliveries the user inputs to the entity that should receive it.
 *
 * @method processInputs
 */
InputManager.prototype.processInputs = function () {
    var entities = this._interactiveEntities;
    var inputs = this._inputs;
    var targetEntity = null;

    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];

        // Move and Release events should be delivered to the same entity that accepted the
        // initial Press or Move event (in this case, _pressedEntity).
        if (this._pressedEntity) {
            if (input.type === InputEvent.Type.Press)
                continue;

            // here we check if the pressedEntity accepts the current event.
            // if it does not accept it, we must reset the event (if it's a move event)
            // to a press event and let other entities accept it or not
            input.accepted = this._pressedEntity.acceptsInputEvent(input);
            if (input.accepted)
                targetEntity = this._pressedEntity;
            else if (input.type !== InputEvent.Type.Release)
                input.type = InputEvent.Type.Press;
        }

        if (!targetEntity) {
            // var closest = null;
            // var closestDist = Number.MAX_VALUE;
            for (var j = 0; j < entities.length; j++) {
                var entity = entities[j];

                if (entity === this._pressedEntity || !entity.acceptsInputEvent(input))
                    continue;

                input.accepted = true;
                targetEntity = entity;
                break;

                // var dist = MathHelper.dist(input.position, entity.pos());
                // if (dist < closestDist) {
                //     closest = entity;
                //     closestDist = dist;
                // }
            }

            // if (closest)
            //     targetEntity = closest;
            // else if (this._fallbackEntity.acceptsInputEvent(input))
            //     targetEntity = this._fallbackEntity;
        }

        if (targetEntity)
            this._sendInputEvent(targetEntity, input);
    }

    this._clearInputs();
};

/**
 * Delivers an event to an entity if the entity accepts the input event.
 * This method is called by {{#crossLink "InputManager/processInput"}}{{/crossLink}}
 *
 * See also: {{#crossLink "InteractiveEntity/acceptsInputEvent"}}{{/crossLink}}
 *
 * @private
 * @method _sendInputEvent
 * @param entity {InteractiveEntity} the entity that will recieve the event
 * @param ev {InputEvent} the event
 */
InputManager.prototype._sendInputEvent = function (entity, ev) {
    switch (ev.type) {
    case InputEvent.Type.Press:
        entity.onPress(ev);
        this._pressedEntity = entity;
        break;
    case InputEvent.Type.Move:
        entity.onMove(ev);
        this._pressedEntity = entity;
        break;
    case InputEvent.Type.Release:
        entity.onRelease(ev);
        this._pressedEntity = null;
        break;
    default:
        break;
    }
};
