/*global Vector2D*/

/**
 * Fired when the screen is touched
 *
 * @class InputEvent
 * @constructor
 * @param type {InputEvent.Type} The type of the event
 * @param position {Vector2D} The position of the touch
 * @param inside {Boolen} If the event occured inside the view
 * @param [offset] {Vector2D} The offset of the drag event
 */
function InputEvent(type, position, inside, offset) {
    offset = offset || {};
    position = position || {};

    /**
     * The type of the event
     *
     * @property type
     * @type InputEvent.Type
     */
    this.type = type;

    /**
     * The position of the touch
     *
     * @property position
     * @type Vector2D
     */
    this.position = new Vector2D(position.x, position.y);

    /**
     * The offset between two drag events
     *
     * @property offset
     * @type Vector2D
     */
    this.offset = new Vector2D(offset.x, offset.y);

    /**
     * Whether the event was accept by an entity
     *
     * @property accepted
     * @type Boolean
     */
    this.accepted = false;

    /**
     * Whether the event happend inside the game view bounds
     *
     * @property insideBounds
     * @type Boolean
     */
    this.insideBounds = inside;
}

/**
 * The type of the input event
 * @class InputEvent.Type
 * @static
 */
InputEvent.Type = {
    /**
     * Indicates that a press has happened
     * @property Press
     * @type Number
     * @static
     * @final
     */
    Press: 0,

    /**
     * Indicates that a move has started
     * @property Move
     * @type Number
     * @static
     * @final
     */
    Move: 1,

    /**
     * Indicates that a release has happened
     * @property Release
     * @type Number
     * @static
     * @final
     */
    Release: 2
};
