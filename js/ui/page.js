/*global inherits, Component*/

/**
 * A page in the UI
 *
 * @class Page
 * @module ui
 * @constructor
 * @param element {HTMLElement} The HTML element representing the page
 * @param navigator {PageNavigator} The page navigator
 */
var Page = function (element, navigator) {
    Component.call(this, element);

    this._navigator = navigator;
    this._navigationEnabled = false;
};

inherits(Page, Component);

/**
 * Returns whether this page is allowed to request navigation operations
 *
 * @method isNavigationEnabled
 * @return {Boolean} Whether this page is allowed to request navigation operations
 */
Page.prototype.isNavigationEnabled = function () {
    return this._navigationEnabled;
};

/**
 * Sets whether this page is allowed to request navigation operations
 *
 * @method setNavigationEnabled
 * @param navigationEnabled {Boolean} Whether this page is allowed to request navigation operations
 */
Page.prototype.setNavigationEnabled = function (navigationEnabled) {
    this._navigationEnabled = navigationEnabled;
};

/**
 * Asks the given page to prepare for a transition
 *
 * See {{#crossLink "PageNavigator/prepare"}}{{/crossLink}}
 *
 * @method prepare
 * @param uri {String} The URI of the page
 * @param prepared {Function} The function to call when it is prepared
 * @param [params] {Object} Parameters to pass to the page
 */
Page.prototype.prepare = function (uri, prepared, params) {
    if (!this.isNavigationEnabled())
        return;

    this._navigator.prepare(uri, prepared, params);
};

/**
 * Navigates to the page registered to a given URI
 *
 * See {{#crossLink "PageNavigator/goTo"}}{{/crossLink}}
 *
 * @method goTo
 * @param uri {String} The URI of the page
 * @param transitionOut {TransitionType} transition type for current page
 * @param transitionIn {TransitionType} transition type for new page
 * @param [params] {Object} Parameters to pass to the page
 */
Page.prototype.goTo = function (uri, transitionOut, transitionIn, params) {
    if (!this.isNavigationEnabled())
        return;

    this._navigator.goTo(uri, transitionOut, transitionIn, params);
};

/**
 * Called when the page is being requested to prepare itself for a transition
 *
 * @method onPrepare
 * @param prepared {Function} The function to call when it is prepared
 * @param [params] {Object} Parameters to pass to the page
 */
Page.prototype.onPrepare = function (prepared /*, params*/) {
    if (prepared)
        prepared();
};

/**
 * Called when this page is being navigated to
 *
 * When the navigator is asked to go to the URI registered to this
 * page, this method is called with the parameters passed.
 *
 * See {{#crossLink "PageNavigator/goTo"}}{{/crossLink}}
 *
 * @method onNavigatedTo
 * @param params {Object} A dictionary containing the parameters
 */
Page.prototype.onNavigatedTo = function (/*params*/) {
};

/**
 * Called when the navigator is leaving from this page
 *
 * See {{#crossLink "PageNavigator/goTo"}}{{/crossLink}}
 *
 * @method onNavigatedFrom
 */
Page.prototype.onNavigatedFrom = function () {
};

/**
 * Handles the focus out event in the application
 *
 * @method focusOutEvent
 * @param evt {Event} Focus out event
 */
Page.prototype.focusOutEvent = function (/*evt*/) {};

/**
 * Handles the focus in event in the application
 *
 * @method focusInEvent
 * @param evt {Event} Focus in event
 */
Page.prototype.focusInEvent = function (/*evt*/) {};

/**
 * Handles the window resize event
 *
 * @method resizeEvent
 */
Page.prototype.resizeEvent = function () {};
