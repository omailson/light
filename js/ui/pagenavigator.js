/**
 * Responsible for the navigation among pages
 *
 * @class PageNavigator
 * @module ui
 * @constructor
 */
var PageNavigator = function () {
    /**
     * The URI to Page dictionary of the registered pages
     *
     * @property _pages
     * @private
     */
    this._pages = {};

    /**
     * The active page URI
     *
     * @property _activePage
     * @type String
     * @private
     */
    this._activePageUri = null;
};

/**
 * Returns whether there is an active page
 *
 * @method hasActivePage
 * @return {Boolean} Whether there is an active page
 */
PageNavigator.prototype.hasActivePage = function () {
    return this.activePageUri() !== null;
};

/**
 * Returns the uri of the active page
 *
 * @method activePageUri
 * @return {String} Returns the uri of the active page or null when there isn't an active page
 */
PageNavigator.prototype.activePageUri = function () {
    return this._activePageUri;
};

/**
 * Returns the active page
 *
 * @method activePage
 * @return {Page} Returns the active page or null when there isn't an active page
 */
PageNavigator.prototype.activePage = function () {
    if (this.hasActivePage()) {
        var uri = this.activePageUri();
        return this._pages[uri];
    } else {
        return null;
    }
};

/**
 * @method _activatePage
 */
PageNavigator.prototype._activatePage = function (page, params, transitionIn) {
    page.setTransitionIn(transitionIn);
    page.setNavigationEnabled(true);
    page.onNavigatedTo(params);
    page.show();
};

/**
 * @method _deactivatePage
 */
PageNavigator.prototype._deactivatePage = function (page, transitionOut) {
    page.setTransitionOut(transitionOut);
    page.setNavigationEnabled(false);
    page.onNavigatedFrom();
    page.hide();
};

/**
 * Associates a URI with a given page
 *
 * If the URI is already registered with another page, this registry is overwritten.
 *
 * @method registerUri
 * @param uri {String} The page URI
 * @param page {Page} The page
 */
PageNavigator.prototype.registerUri = function (uri, page) {
    this._pages[uri] = page;
};

/**
 * Returns whether a URI is registered to a page
 *
 * @method isRegistered
 * @param uri {String} The URI
 * @return {Boolean} Whether a URI is registered to a page
 */
PageNavigator.prototype.isRegistered = function (uri) {
    return this._pages[uri] !== undefined;
};

/**
 * Retrieves the page associated with a given URI
 *
 * @method _retrievePage
 * @param uri {String} The URI
 * @return {Page} The page or null if the URI isn't registered
 */
PageNavigator.prototype._retrievePage = function (uri) {
    if (this.isRegistered(uri))
        return this._pages[uri];
    else
        return null;
};

/**
 * Asks the given page to prepare for a transition
 *
 * @method prepare
 * @param uri {String} The URI of the page
 * @param prepared {Function} The function to call when it is prepared
 * @param [params] {Object} Parameters to pass to the page
 */
PageNavigator.prototype.prepare = function (uri, prepared, params) {
    if (!this.isRegistered(uri))
        return;

    if (this.activePageUri() === uri)
        return;

    var page = this._retrievePage(uri);
    page.onPrepare(prepared, params);
};

/**
 * Navigates to the page registered to a given URI
 *
 * If the URI isn't registered, no action is taken.
 *
 * @method goTo
 * @param uri {String} The URI of the page
 * @param transitionOut {TransitionType} transition type for current page
 * @param transitionIn {TransitionType} transition type for new page
 * @param [params] {Object} Parameters to pass to the page
 */
PageNavigator.prototype.goTo = function (uri, transitionOut, transitionIn, params) {
    if (!this.isRegistered(uri))
        return;

    if (this.activePageUri() === uri)
        return;

    if (this.hasActivePage()) {
        var activePage = this._retrievePage(this.activePageUri());
        this._deactivatePage(activePage, transitionOut);
    }
    
    this._activePageUri = uri;

    var page = this._retrievePage(uri);
    this._activatePage(page, params, transitionIn);
};
