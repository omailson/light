/*global StringUtils, Browser, HTMLElementUtils, EventDispatcher*/

/**
 * Base class for a visual component
 *
 * @class Component
 * @module ui
 * @constructor
 * @param element {HTMLElement} The HTML element representing the component
 */
var Component = function (element) {
    if (!element)
        return;

    this._element = element;
    this._elDisplayStyle = HTMLElementUtils.display(this._element);
    this._elWidth = HTMLElementUtils.width(this._element);
    this._elHeight = HTMLElementUtils.height(this._element);
    var transitionEndEventName = Browser.transitionEndEventName();
    HTMLElementUtils.addEventListener(this._element, transitionEndEventName, this._onTransitionEnded.bind(this));
    var animationEndEventName = Browser.animationEndEventName();
    HTMLElementUtils.addEventListener(this._element, animationEndEventName, this._onTransitionEnded.bind(this));

    this._transitionIn = null;
    this._transitionOut = null;

    this._showDispatcher = new EventDispatcher();
    this._hideDispatcher = new EventDispatcher();

    this._state = Component.State.Hidden;
    // Hide the component
    var className = HTMLElementUtils.className(this._element);
    className = StringUtils.addStringToSet(className, "hidden");
    HTMLElementUtils.setDisplay(this._element, "none");
    HTMLElementUtils.setClassName(this._element, className);
};

/**
 * The types of transitions
 *
 * @class Component.TransitionType
 * @static
 */
Component.TransitionType = {
    /**
     * Delay transition
     *
     * @property Delay
     * @type TransitionType
     * @static
     * @final
     */
    Delay: "delay",

    /**
     * Fade-in transition
     *
     * @property FadeIn
     * @type TransitionType
     * @static
     * @final
     */
    FadeIn: "fadeIn",

    /**
     * Fade-out transition
     *
     * @property FadeOut
     * @type TransitionType
     * @static
     * @final
     */
    FadeOut: "fadeOut",

    /**
     * Slide-in to left transition
     *
     * @property SlideInLeft
     * @type TransitionType
     * @static
     * @final
     */
    SlideInLeft: "slideInLeft",

    /**
     * Slide-in to right transition
     *
     * @property SlideInRight
     * @type TransitionType
     * @static
     * @final
     */
    SlideInRight: "slideInRight",

    /**
     * Slide-out to left transition
     *
     * @property SlideOutLeft
     * @type TransitionType
     * @static
     * @final
     */
    SlideOutLeft: "slideOutLeft",

    /**
     * Slide-out to right transition
     *
     * @property SlideOutRight
     * @type TransitionType
     * @static
     * @final
     */
    SlideOutRight: "slideOutRight"
};

/**
 * States of the component
 *
 * @class Component.State
 * @static
 */
Component.State = {
    /**
     * Component is transitioning from hidden to visible
     *
     * @property TransitionIn
     * @type Component.State
     * @static
     * @final
     */
    TransitionIn: 0,

    /**
     * Component is visible
     *
     * @property Visible
     * @type Component.State
     * @static
     * @final
     */
    Visible: 1,

    /**
     * Component is transitioning from visible to hidden
     *
     * @property TransitionOut
     * @type Component.State
     * @static
     * @final
     */
    TransitionOut: 2,

    /**
     * Component is hidden
     *
     * @property Hidden
     * @type Component.State
     * @static
     * @final
     */
    Hidden: 3
};

/**
 * Returns the component's width
 *
 * @method width
 * @return {Number} The component's width
 */
Component.prototype.width = function () {
    // The same comment of Component::height() applies here.
    var validCache = !isNaN(this._elWidth) && this._elWidth !== undefined;
    if (this._state === Component.State.Hidden && validCache)
        return this._elWidth;
    else
        return HTMLElementUtils.width(this._element);
};

/**
 * Sets the element's width (in pixels)
 *
 * @method setWidth
 * @param width {Number} The element's width (in pixels)
 * @static
 */
Component.prototype.setWidth = function (width) {
    HTMLElementUtils.setWidth(this._element, width);
};

/**
 * Returns the component's height
 *
 * @method height
 * @return {Number} The component's height
 */
Component.prototype.height = function () {
    /* The main reason to use property caching here is because when an element
     * has `display: none`, i.e state == hidden, the HTMLElementUtils::height()
     * will return the height from the CSS and if the height in the CSS is set to
     * 100%, this method will return 100, which obviously is not the expected value.
     *
     * But we need to check if the cache is valid because there are some cases where
     * a Component is created but the element is not yet add to the DOM, so during
     * the creation (where the cache is first updated) HTMLElementUtils::height()
     * will return an invalid value even if the height in CSS is valid (e.g 80 px).
     */
    var validCache = !isNaN(this._elHeight) && this._elHeight !== undefined;
    if (this._state === Component.State.Hidden && validCache)
        return this._elHeight;
    else
        return HTMLElementUtils.height(this._element);
};

/**
 * Sets the element's height (in pixels)
 *
 * @method setHeight
 * @param height {Number} The element's height (in pixels)
 * @static
 */
Component.prototype.setHeight = function (height) {
    HTMLElementUtils.setHeight(this._element, height);
};

/**
 * Sets the transition type to happen while becoming visible
 *
 * @method setTransitionIn
 * @param transition {TransitionType} The transition type
 * @for Component
 */
Component.prototype.setTransitionIn = function (transition) {
    if (this._state === Component.State.TransitionIn)
        this._setState(Component.State.Visible);

    this._transitionIn = transition;
};

/**
 * Sets the transition type to happen while becoming hidden
 *
 * @method setTransitionOut
 * @param transition {TransitionType} The transition type
 */
Component.prototype.setTransitionOut = function (transition) {
    if (this._state === Component.State.TransitionOut)
        this._setState(Component.State.Hidden);

    this._transitionOut = transition;
};

/**
 * Returns whether the component is visible or not
 *
 * @method isVisible
 * @return {Boolean} Whether the component is visible or not
 */
Component.prototype.isVisible = function () {
    return this._state !== Component.State.Hidden;
};

/**
 * Shows the component
 *
 * @method show
 */
Component.prototype.show = function () {
    if (this._state === Component.State.Visible ||
        this._state === Component.State.TransitionIn)
        return;

    if (this._transitionIn)
        this._setState(Component.State.TransitionIn);
    else
        this._setState(Component.State.Visible);
};

/**
 * Hides the component
 *
 * @method hide
 */
Component.prototype.hide = function () {
    if (this._state === Component.State.Hidden ||
        this._state === Component.State.TransitionOut)
        return;

    if (this._transitionOut)
        this._setState(Component.State.TransitionOut);
    else
        this._setState(Component.State.Hidden);
};

/**
 * Adds a listener to the on show event
 *
 * @method addShowEventListener
 * @param listener {Function} The listener to be added
 */
Component.prototype.addShowEventListener = function (listener) {
    this._showDispatcher.addListener(listener);
};

/**
 * Removes a listener to the on show event
 *
 * @method removeShowEventListener
 * @param listener {Function} The listener to be removed
 */
Component.prototype.removeShowEventListener = function (listener) {
    this._showDispatcher.removeListener(listener);
};

/**
 * Adds a listener to the on hide event
 *
 * @method addHideEventListener
 * @param listener {Function} The listener to be added
 */
Component.prototype.addHideEventListener = function (listener) {
    this._hideDispatcher.addListener(listener);
};

/**
 * Removes a listener to the on hide event
 *
 * @method removeHideEventListener
 * @param listener {Function} The listener to be removed
 */
Component.prototype.removeHideEventListener = function (listener) {
    this._hideDispatcher.removeListener(listener);
};

/**
 * Returns the current state of the component
 *
 * @method state
 * @return {Component.State} The current state of the component
 */
Component.prototype.state = function () {
    return this._state;
};

/**
 * Sets the state of the component
 *
 * @method _setState
 * @param state {Component.State} The new state
 * @private
 */
Component.prototype._setState = function (state) {
    if (state === this._state)
        return;

    var oldState = this._state;
    this._state = state;
    this._onStateChanged(oldState, this._state);
};

/**
 * Called when the state changes
 *
 * @method _onStateChanged
 * @param oldState {Component.State} The old state
 * @param newState {Component.State} The new state
 * @private
 */
Component.prototype._onStateChanged = function (oldState, newState) {
    var className = HTMLElementUtils.className(this._element);

    // remove old state class name
    switch (oldState) {
    case Component.State.TransitionIn:
        className = StringUtils.removeStringFromSet(className, this._transitionIn);
        break;

    case Component.State.Visible:
        className = StringUtils.removeStringFromSet(className, "visible");
        break;

    case Component.State.TransitionOut:
        className = StringUtils.removeStringFromSet(className, this._transitionOut);
        break;

    case Component.State.Hidden:
        className = StringUtils.removeStringFromSet(className, "hidden");
        HTMLElementUtils.setDisplay(this._element, this._elDisplayStyle);
        break;
    }

    // add new state class name
    switch (newState) {
    case Component.State.TransitionIn:
        className = StringUtils.addStringToSet(className, this._transitionIn);
        break;

    case Component.State.Visible:
        className = StringUtils.addStringToSet(className, "visible");
        break;

    case Component.State.TransitionOut:
        className = StringUtils.addStringToSet(className, this._transitionOut);
        break;

    case Component.State.Hidden:
        className = StringUtils.addStringToSet(className, "hidden");
        // Save element's dimensions before hiding it
        // When the component is hidden, it's dimensions won't be returned correctly
        this._elWidth = HTMLElementUtils.width(this._element);
        this._elHeight = HTMLElementUtils.height(this._element);
        HTMLElementUtils.setDisplay(this._element, "none");
        break;
    }

    HTMLElementUtils.setClassName(this._element, className);

    // the element must receive the new class name before firing the events
    if (newState === Component.State.Visible) {
        this._onShow();
        this._showDispatcher.dispatch();
    } else if (newState === Component.State.Hidden) {
        this._onHide();
        this._hideDispatcher.dispatch();
    }
};

/**
 * Called when the component becomes visible
 *
 * @method _onShow
 * @protected
 */
Component.prototype._onShow = function () {
};

/**
 * Called when the component becomes hidden
 *
 * @method _onHide
 * @protected
 */
Component.prototype._onHide = function () {
};

/**
 * Called when a transition ends
 *
 * @method _onTransitionEnded
 * @param event {Event} the event that was fired
 * @private
 */
Component.prototype._onTransitionEnded = function (event) {
    if (event.target !== this._element)
        return;

    if (this._state === Component.State.TransitionIn)
        this._setState(Component.State.Visible);
    else if (this._state === Component.State.TransitionOut)
        this._setState(Component.State.Hidden);
};
