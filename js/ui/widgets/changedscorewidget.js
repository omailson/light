var ChangedScoreWidget = function (value) {
    this._element = DOMTree.get(R.ChangedScoreWidget);
    this._value = value;
    this._init();
};

ChangedScoreWidget.prototype._init = function () {
    this._element.textContent = this._value;
    this._element.addEventListener(Browser.transitionEndEventName(), this._onTransitionEnd.bind(this));
};

ChangedScoreWidget.prototype.setPosition = function (x, y) {
    this._element.style.left = (x + 30) + "px";
    this._element.style.top = (y - 20) + "px";
};

ChangedScoreWidget.prototype.animate = function () {
    HTMLElementUtils.addClass(this._element, "animate");
};

ChangedScoreWidget.prototype._onTransitionEnd = function () {
    HTMLElementUtils.removeClass(this._element, "animate");
    this._element.style.left = "";
    this._element.style.top = "";
};
