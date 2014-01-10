var HomePage = function (element, navigator) {
    Page.call(this, element, navigator);

    this._levelData = {};
    this._playButton = new Button(DOMTree.get(R.HomePage.Play), this._onPlayClicked.bind(this));
};

inherits(HomePage, Page);

HomePage.prototype._onPlayClicked = function () {
    var levelData = this._levelData;
    this.goTo("game-page", Component.TransitionType.SlideOutLeft,
            Component.TransitionType.SlideInRight, levelData);
};

HomePage.prototype.onNavigatedTo = function (params) {
    this._levelData = params;
};
